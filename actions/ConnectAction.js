class ConnectAction
extends Action
{
    outputNodeId;
    outputIndex;
    get outputNode() { return nodeFromId(this.outputNodeId); }
    get output()     { return this.outputNode.outputs[this.outputIndex]; }
    
    oldOutputNodeId = '';
    oldOutputIndex;
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    
    inputNodeId;
    inputIndex;
    get inputNode() { return nodeFromId(this.inputNodeId); }
    get input()     { return this.inputNode.inputs[this.inputIndex]; }
    
    oldOutputActiveNodeId;      // the active node in the output node's tree
    oldInputActiveNodeIds = []; // the active nodes in the input node's tree
    
    newActiveNodeIds = [];

    oldinputValues   = []; // in index,value pairs, to be restored on undo



    constructor(output, input)
    {
        const oldOutIndex = 
            input.connected 
            ? input.connectedOutput.index
            : -1; 

        super('CONNECT ' 
            + output.node.id + ' ' + output.index
            + ' → '
            + input.node.id + ' ' + input.index);


        this.outputNodeId    = output.node.id;
        this.outputIndex     = output.index;
   
        this.oldOutputNodeId = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputIndex  = oldOutIndex;
   
        this.inputNodeId     = input.node.id;
        this.inputIndex      = input.index;
    }


    
    do()
    {
        this.oldInputValues = 
            this.input.getValuesForUndo
            ? this.input.getValuesForUndo()
            : [];


        this.oldOutputActiveNodeId = idFromNode(getActiveFromNodeId(this.outputNodeId));
        this.oldInputActiveNodeIds = getActiveNodesRightFromNodeId(this.inputNodeId).map(n => n.id);


        for (const id of [this.oldOutputActiveNodeId, ...this.oldInputActiveNodeIds]) 
            uiDeleteObjects([id]); // clean up now irrelevant objects


        uiConnect(
            this.outputNode.outputs[this.outputIndex], 
            this.inputNode. inputs [this. inputIndex],
            this.inputIndex);


        this.newActiveNodeIds = [];

        const updateNodes = [this.inputNode];

        
        if (    this.oldOutputNode
            && !getActiveFromNode(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);
        }


        const oldOutputActiveNode = nodeFromId(this.oldOutputActiveNodeId);
        if (oldOutputActiveNode) pushUnique(updateNodes, oldOutputActiveNode);


        const oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
        {
            uiMakeNodeActive(nodeFromId(id));
            this.newActiveNodeIds.push(id);
        }


        pushUpdate(oldInputActiveNodeIds.map(id => nodeFromId(id)));

        updateNodes.forEach(n => n.updateNode());
    }



    undo()
    {

        uiDisconnect(this.inputNode.inputs[this.inputIndex]);


        if (this.oldOutputNodeId != '')
        {
            uiVariableConnect(
                this.oldOutputNode, 
                this.oldOutputIndex, 
                this.inputNode, 
                this.inputIndex);
        }


        // restore old values
        for (const param of this.oldInputValues)
        {
            this.inputNode.params[this.inputNode.params.findIndex(p => p.id == param[0])]
                .setValue(param[1], true, true, false);
        }


        const updateNodes = [];


        for (const id of this.newActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodePassive(node);
        }
console.log('this.newActiveNodeIds =', this.newActiveNodeIds);
        uiDeleteObjects(this.newActiveNodeIds); // clean up now irrelevant objects


        for (const id of this.oldInputActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodeActive(node);
        }


        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
        {
            const node = nodeFromId(this.oldOutputActiveNodeId);
            uiMakeNodeActive(node);
        }


        this.inputNode.updateNode();
 

        // cleanup
        this.oldOutputActiveNodeId = [];
        this.oldInputActiveNodeIds = [];
   }
}