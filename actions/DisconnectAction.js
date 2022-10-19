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
        this.oldActiveNodeIds = [...activeNodesFromNodeId(this.inputNodeId).map(n => n.id)];


        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        this.inputNode.invalidate();
        

        if (!activeFromNode(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.newActiveNodeIds.push(this.inputNodeId);
        }


        if (   !activeLeftOnlyFromNode(this.outputNode)
            && !activeRightFromNode(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
        }


        this.outputNode.updateNode();
        this.inputNode .updateNode();


        pushUpdate([this.inputNode]);
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
        

        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        this.inputNode.updateNode();
    }
    
    
    
    redo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);
        

        if (!activeFromNode(this.inputNode))
            uiMakeNodeActive(this.inputNode);

        if (   !activeLeftOnlyFromNode(this.outputNode)
            && !activeRightFromNode(this.outputNode))
            uiMakeNodeActive(this.outputNode);


        this.outputNode.updateNode();
        this.inputNode .updateNode();


        pushUpdate([this.inputNode]);
    }
}