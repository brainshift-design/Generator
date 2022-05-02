class DisconnectAction
extends Action
{
    outputNodeId;
    outputIndex;
    get outputNode() { return nodeFromId(this.outputNodeId); }

    inputNodeId;
    inputIndex;
    get inputNode() { return nodeFromId(this.inputNodeId); }

    oldActiveNodeIds = [];
    newActiveNodeIds = [];



    constructor(output, input)
    {
        super('DISCONNECT ' 
            + output.node.id + '.out[' + output.index + ']'
            + ' -> '
            + input.node.id + '.in[' + input.index + ']');


        this.outputNodeId = output.node.id;
        this.outputIndex  = output.index;

        this.inputNodeId  = input.node.id;
        this.inputIndex   = input.index;


        this.oldActiveNodeIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputNodeId)).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        
        if (!getActiveNodeInTreeFrom(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.newActiveNodeIds.push(this.inputNodeId);
            pushUpdate([this.inputNode]);
            //graphView.updateNodeTransform(this.inputNode);
        }

        if (!getActiveNodeInTreeFrom(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
            pushUpdate([this.outputNode]);
            //graphView.updateNodeTransform(this.outputNode);
        }
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputNode, this.outputIndex, 
            this. inputNode, this. inputIndex);

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        //graphView.updateNodeTransform(this.inputNode);
        pushUpdate([this.inputNode]);
    }
    
    
    
    redo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        
        if (!getActiveNodeInTreeFrom(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            pushUpdate([this.inputNode]);
            //graphView.updateNodeTransform(this.inputNode);
        }

        if (!getActiveNodeInTreeFrom(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            pushUpdate([this.outputNode]);
            //graphView.updateNodeTransform(this.outputNode);
        }
   }
}