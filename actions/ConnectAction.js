class ConnectAction
extends Action
{
    outputNodeId;
    outputIndex;
    get outputNode() { return nodeFromId(this.outputNodeId); }
    
    oldOutputNodeId = '';
    oldOutputIndex;
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    
    inputNodeId;
    inputIndex;
    get inputNode() { return nodeFromId(this.inputNodeId); }
    
    oldOutputActiveNodeId;      // the active node in the output node's tree
    oldInputActiveNodeIds = []; // the active nodes in the input node's tree
    
    newActiveNodeIds = [];

    oldinputValues = []; // in index,value pairs, to be restored on undo



    constructor(output, input)
    {
        const oldOutIndex = 
            input.connected 
            ? input.connectedOutput.index
            : -1; 

        super('CONNECT ' 
            + output.node.id + ' ' + output.index
            + ' -> '
            + input.node.id + ' ' + input.index);


        this.outputNodeId          = output.node.id;
        this.outputIndex           = output.index;
   
        this.oldOutputNodeId       = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputIndex        = oldOutIndex;
   
        this.inputNodeId           = input.node.id;
        this.inputIndex            = input.index;

        this.oldInputValues = 
            input.getValuesForUndo
            ? input.getValuesForUndo()
            : [];
    }


    
    do()
    {
        this.oldOutputActiveNodeId = getActiveNodeInTreeFromNodeId(this.outputNodeId).id;
        this.oldInputActiveNodeIds = getActiveNodesInTreeFromNodeId(this.inputNodeId).map(n => n.id);


        uiConnect(
            this.outputNode.outputs[this.outputIndex], 
            this.inputNode. inputs [this. inputIndex],
            this.inputIndex);


        this.newActiveNodeIds = [];

        const updatedNodes = [];

        if (    this.oldOutputNode
            && !getActiveNodeInTreeFromNode(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            pushUnique(updatedNodes, this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);
        }


        pushUnique(updatedNodes, nodeFromId(this.oldOutputActiveNodeId));

        const oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
        {
            uiMakeNodeActive(nodeFromId(id));
            pushUnique(updatedNodes, nodeFromId(id));
        }


        uiSaveNodes(updatedNodes.map(n => n.id));
        pushUpdate(updatedNodes);
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
            this.inputNode.params[param[0]].setValue(param[1], true, true, false);


        const updatedNodes = [];

        for (const id of this.newActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodePassive(node);
            pushUnique(updatedNodes, node);
        }

        for (const id of this.oldInputActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodeActive(node);
            pushUnique(updatedNodes, node);
        }

        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
        {
            const node = nodeFromId(this.oldOutputActiveNodeId);
            uiMakeNodeActive(node);
            pushUnique(updatedNodes, node);
        }


        uiSaveNodes(updatedNodes.map(n => n.id));
        pushUpdate([this.inputNode]);
 

        // cleanup
        this.oldOutputActiveNodeId = [];
        this.oldInputActiveNodeIds = [];
   }
}