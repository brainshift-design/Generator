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

        this.activateNewNodes();
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
    }



    removeConnection()
    {
        uiDeleteSavedConn(this.input.connection);
        uiDisconnect(this.input);


        this.output.updateSavedConnectionOrder(this.outputOrder, -1);
    }



    activateNewNodes()
    {
        if (!getActiveFromNode(this.inputNode))
            this.newActiveNodeIds.push(this.inputNodeId);

        if (   !getActiveOnlyBeforeNode(this.outputNode)
            && !getActiveAfterNode   (this.outputNode))
            this.newActiveNodeIds.push(this.outputNodeId);


        for (const id of this.newActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
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