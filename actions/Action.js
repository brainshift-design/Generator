class Action
{
    manager;
 
    id;
    name;
  
    prevAction; // these are used to link actions into sequences
    nextAction; 
  
    data;
  
    onBefore;
    onAfter;

    onBeforeUndo;
    onAfterUndo;

    
    selfUpdate     = false;

    _linkWithNext  = false;

    
    oldConnectionData = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    newConnectionData = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]



    constructor(name)
    {
        this.name = name;

        console.assert(
               this.name != undefined
            && this.name != null
            && this.name != '',
            'cannot create user action');
    }



    do  (updateNodes) {}
    undo(updateNodes) {}
    redo(updateNodes) { this.do(updateNodes); }



    initSaveArrays()
    {
        this.oldConnectionData = [];
        this.newConnectionData = [];
    }



    saveOldConnections()
    {
        for (const conn of graph.connections)
            this.oldConnectionData.push(conn.toDataObject());
    }



    updateOldConnections()
    {
        this.oldConnectionData = this.oldConnectionData
            .filter(c => !graph.connections.find(gc => gc.id == c.id));//_connEquals(gc, c)));
    }



    deleteNewConnections()
    {
        for (const _conn of this.newConnectionData)
        {
            uiDeleteSavedConnection(
                getConnectionKey(
                    _conn.outputNodeId, _conn.outputId, _conn.outputOrder,
                    _conn.inputNodeId,  _conn.inputId),
                    _conn.outputNodeId,
                    _conn.outputId,
                    _conn.outputOrder,
                    _conn.inputNodeId,
                    _conn.inputId,
                    _conn.list);
  
            uiDisconnect(nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));
        }

        this.newConnectionData = [];
    }



    restoreOldConnections()
    {
        for (const _conn of this.oldConnectionData)
        {
            const outputNode = nodeFromId(_conn.outputNodeId);
            const output     = outputNode.outputFromId(_conn.outputId);

            output.updateSavedConnectionOrder(_conn.outputOrder, +1);


            const oldConn = uiVariableConnect(
                outputNode,                    _conn.outputId,
                nodeFromId(_conn.inputNodeId), _conn.inputId,
                _conn.outputOrder);

            uiSaveConn(oldConn);
        }

        this.oldConnectionData = [];
    }



    deactivateNewActiveNodes()
    {
        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));
    
        uiDeleteObjects(this.newActiveNodeIds); 
    }
};



function linkActions(prevAction, nextAction)
{
    prevAction.nextAction = nextAction;
    nextAction.prevAction = prevAction;
}