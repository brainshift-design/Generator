class DisconnectAction
extends Action
{
    outputNodeId;
    outputId;
    get outputNode() { return nodeFromId(this.outputNodeId); }

    get output() { return nodeFromId(this.outputNodeId).outputFromId(this.outputId); }

    order;

    inputNodeId;
    inputId;
    get inputNode() { return nodeFromId(this.inputNodeId); }

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
        this.order        = input.connection.order;

        this.inputNodeId  = input.node.id;
        this.inputId      = input.id;
    }



    do()
    {
        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id)];

        for (const id of this.oldActiveNodeIds)
            uiDeleteObjects([id]); // clean up now irrelevant objects


        const input = this.inputNode.inputFromId(this.inputId);
        

        uiDeleteSavedConn(input.connection);
        uiDisconnect(input);


        // update output order on existing connections created after this one
        const afterConns = this.output.connectedInputs
            .map   (i => i.connection)
            .filter(c => c.order > this.order);

        const oldKeys = afterConns.map(c => getConnKey(c));
        console.log('oldKeys =', oldKeys);
        afterConns.forEach(c => c.order--);
        const newKeys = afterConns.map(c => getConnKey(c));
        console.log('newKeys =', newKeys);

        uiUpdateSavedConnections(oldKeys, newKeys, afterConns);
        
        
        this.inputNode.invalidate();
        
        
        if (!getActiveFromNode(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.newActiveNodeIds.push(this.inputNodeId);
        }


        if (   !getActiveLeftOnlyFromNode(this.outputNode)
            && !getActiveRightFromNode(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
        }


        const updateNodes = [this.inputNode, this.outputNode];

        if (!this.outputNode.cached)
            pushUnique(updateNodes, this.outputNode.getUncachedInputNodes());

        pushUpdate(updateNodes);
    }
    
    
    
    undo()
    {
        // update output order on existing connections
        const afterConns = this.output.connectedInputs
            .map   (i => i.connection)
            .filter(c => c.order >= this.order);

        const oldKeys = afterConns.map(c => getConnKey(c));
        afterConns.forEach(c => c.order++);
        const newKeys = afterConns.map(c => getConnKey(c));

        uiUpdateSavedConnections(oldKeys, newKeys, afterConns);


        const conn = uiVariableConnect(
            this.outputNode, this.outputId, 
            this. inputNode, this. inputId,
            this.order);
        
        uiSaveConn(conn);
console.log('conn.order =', conn.order);
console.log('conn.toJson() =', conn.toJson());
            
        for (const id of this.newActiveNodeIds)
        {
            uiMakeNodePassive(nodeFromId(id));
            uiDeleteObjects([id]); // clean up now irrelevant objects
        }


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        this.oldActiveNodeIds = [];
        

        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        
        pushUpdate([this.outputNode]);
    }
}