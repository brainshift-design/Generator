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
    
    
    oldActiveNodeIds = [];
    newActiveNodeIds = [];



    constructor(output, input)
    {
        super('DISCONNECT ' 
            + output.node.id + '.' + output.id
            + ' ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId = output.node.id;
        this.outputId     = output.id;
        this.outputOrder  = input.connection.outputOrder;

        this.inputNodeId  = input.node.id;
        this.inputId      = input.id;
    }



    do()
    {
        this.newActiveNodeIds = [];
        const updateNodes     = [];


        // save old active nodes

        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id)];


        // remove connection

        const input = this.inputNode.inputFromId(this.inputId);

        uiDeleteSavedConn(input.connection);
        uiDisconnect(input);

        this.output.updateSavedConnectionOrder(this.outputOrder, -1);
        

        // save input node
        
        if (!getActiveFromNode(this.inputNode))
            this.newActiveNodeIds.push(this.inputNodeId);


        // save output node

        if (   !getActiveOnlyBeforeNode(this.outputNode)
            && !getActiveAfterNode   (this.outputNode))
            this.newActiveNodeIds.push(this.outputNodeId);


        // activate nodes

        for (const id of this.newActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        // update nodes

        pushUnique(updateNodes, [this.inputNode, this.outputNode]);

        if (!this.outputNode.cached)
            pushUnique(updateNodes, this.outputNode.getUncachedInputNodes());

        
        // clean up now irrelevant objects

        uiDeleteObjects(this.oldActiveNodeIds); 


        //
        
        pushUpdate(this, updateNodes);
    }
    
    
    
    undo()
    {
        const updateNodes = [];


        // restore old connection

        this.output.updateSavedConnectionOrder(this.outputOrder, +1);

        const conn = uiVariableConnect(
            this.outputNode, this.outputId, 
            this. inputNode, this. inputId,
            this.outputOrder);
        
        uiSaveConn(conn);

        
        // deactivate new active nodes & clean up their objects

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        uiDeleteObjects(this.newActiveNodeIds);
        

        // update old active nodes

        const oldActiveNodeIds = [...this.oldActiveNodeIds].sort((x, y) => 
            (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        pushUnique(updateNodes, oldActiveNodeIds.map(id => nodeFromId(id)));


        // activate old active nodes

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        // update nodes

        pushUnique(updateNodes, this.outputNode);


        // clean up
        
        this.oldActiveNodeIds = [];


        //

        pushUpdate(this, updateNodes);
    }
}