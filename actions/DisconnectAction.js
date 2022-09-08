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
            + output.node.id + ' ' + output.index
            + ' → '
            + input.node.id + ' ' + input.index);


        this.outputNodeId = output.node.id;
        this.outputIndex  = output.index;

        this.inputNodeId  = input.node.id;
        this.inputIndex   = input.index;
    }



    do()
    {
        this.oldActiveNodeIds = [...getActiveNodesInTreeFromNodeId(this.inputNodeId).map(n => n.id)];


        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        this.inputNode.invalidate();
        

        if (!getActiveNodeInTreeFromNode(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.newActiveNodeIds.push(this.inputNodeId);
        }


        if (   !getActiveNodeLeftOnlyInTreeFromNode(this.outputNode)
            && !getActiveNodeRightInTreeFromNode(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
        }


        this.outputNode.updateNode();
        this.inputNode .updateNode();
        //uiSaveNodes([this.outputNodeId, this.inputNodeId]);
        //pushUpdate([this.outputNode, this.inputNode]);
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputNode, this.outputIndex, 
            this. inputNode, this. inputIndex);

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        this.oldActiveNodeIds = [];
        

        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        this.inputNode.updateNode();
        //uiSaveNodes([this.inputNodeId]);
        //pushUpdate([this.inputNode]);
    }
    
    
    
    redo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        

        if (!getActiveNodeInTreeFromNode(this.inputNode))
            uiMakeNodeActive(this.inputNode);

        if (   !getActiveNodeLeftOnlyInTreeFromNode(this.outputNode)
            && !getActiveNodeRightInTreeFromNode(this.outputNode))
            uiMakeNodeActive(this.outputNode);


        this.outputNode.updateNode();
        this.inputNode .updateNode();
        //uiSaveNodes([this.outputNodeId, this.inputNodeId]);
        // pushUpdate([this.outputNode, this.inputNode]);
   }
}