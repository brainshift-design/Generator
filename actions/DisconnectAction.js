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
        super('disconnect ' 
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
            this.inputNode.pushUpdate();
            //graphView.updateNodeTransform(this.inputNode);
        }

        if (!getActiveNodeInTreeFrom(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
            this.outputNode.pushUpdate();
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
        this.inputNode.pushUpdate();
    }
    
    
    
    redo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        
        if (!getActiveNodeInTreeFrom(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.inputNode.pushUpdate();
            //graphView.updateNodeTransform(this.inputNode);
        }

        if (!getActiveNodeInTreeFrom(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.outputNode.pushUpdate();
            //graphView.updateNodeTransform(this.outputNode);
        }
   }
}