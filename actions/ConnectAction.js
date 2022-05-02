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

        this.oldOutputActiveNodeId = getActiveNodeInTreeFrom(nodeFromId(this.outputNodeId)).id;
        this.oldInputActiveNodeIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputNodeId)).map(n => n.id)];

        this.oldInputValues = 
            input.getValuesForUndo
            ? input.getValuesForUndo()
            : [];
    }


    
    do()
    {
        uiConnect(
            this.outputNode.outputs[this.outputIndex], 
            this.inputNode. inputs [this. inputIndex],
            this.inputIndex);


        this.newActiveNodeIds = [];

        if (    this.oldOutputNode
            && !getActiveNodeInTreeFrom(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);
            pushUpdate([this.oldOutputNode]);
            //graphView.updateNodeTransform(oldPrevOutputActiveNode);
        }


        let oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        // graphView.updateNodeTransform(this.inputNode);
        pushUpdate([this.inputNode]);
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
            this.inputNode.params[param[0]].setValue(param[1].toString(), true, true, false);


        // graphView.updateNodeTransform(this.inputNode);
        pushUpdate([this.inputNode]);


        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
            uiMakeNodeActive(nodeFromId(this.oldOutputActiveNodeId));
    }
}