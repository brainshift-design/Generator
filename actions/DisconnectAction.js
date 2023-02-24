class DisconnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder      = -1;
    
    inputNodeId;
    inputId;

    
    get outputNode() { return nodeFromId(this.outputNodeId); }
    get output()     { return this.outputNode.outputFromId(this.outputId); }
    
    get inputNode()  { return nodeFromId(this.inputNodeId); }
    get input()      { return this.inputNode.inputFromId(this.inputId); }
    
    
    oldActiveNodeIds = [];
    newActiveNodeIds = [];



    constructor(input)
    {
        super('DISCONNECT ' 
            + input.connectedOutput.node.id + '.' + input.connectedOutput.id
            + ' ' + rightArrowChar(input.connectedOutput.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId = input.connectedOutput.node.id;
        this.outputId     = input.connectedOutput.id;
        this.outputOrder  = input.connection.outputOrder;

        this.inputNodeId  = input.node.id;
        this.inputId      = input.id;
    }



    do(updateNodes)
    {
        this.newActiveNodeIds = [];

        this.saveOldActiveNodes();
        this.removeConnection();        

        DisconnectAction_activateNewNodes(this);
        this.updateNodes(updateNodes);

        this.cleanup();
    }
    
    
    
    undo(updateNodes)
    {
        this.deactivateNewActiveNodes();

        this.activateOldActiveNodes(updateNodes);
        pushUnique(updateNodes, this.outputNode);

        this.oldActiveNodeIds = [];
    }



    saveOldActiveNodes()
    {
        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id)];

        if (!getActiveFromNode(this.outputNode, [this.inputNode]))
            this.newActiveNodeIds.push(this.outputNodeId);

        if (   !getActiveOnlyBeforeNode(this.inputNode)
            && !getActiveAfterNode     (this.inputNode))
            this.newActiveNodeIds.push(this.inputNodeId);
    }



    removeConnection()
    {
        uiDeleteSavedConn(this.input.connection);
        uiDisconnect(this.input);


        this.output.updateSavedConnectionOrder(this.outputOrder, -1);
    }



    updateNodes(updateNodes)
    {
        pushUnique(updateNodes, [this.inputNode, this.outputNode]);

        if (!this.outputNode.cached)
            pushUnique(updateNodes, this.outputNode.getUncachedInputNodes());
    }



    cleanup()
    {
        const nodeIds = [];

        nodeIds.push(this.oldActiveNodeIds.filter(id => 
            !this.newActiveNodeIds.includes(id)));

        uiDeleteObjectsAndStyles(nodeIds, false);
    }



    deactivateNewActiveNodes()
    {
        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        uiDeleteObjectsAndStyles(this.newActiveNodeIds, false);
    }



    activateOldActiveNodes(updateNodes)
    {
        const oldActiveNodeIds = [...this.oldActiveNodeIds].sort((x, y) => 
            (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        pushUnique(updateNodes, oldActiveNodeIds.map(id => nodeFromId(id)));

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }
}



function DisconnectAction_activateNewNodes(act)
{
    for (const id of act.newActiveNodeIds)
        uiMakeNodeActive(nodeFromId(id));
}