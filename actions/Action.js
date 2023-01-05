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

    
    selfUpdate    = false;

    _linkWithNext = false;

    
    oldConnections     = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    newConnections     = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]



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
        this.oldConnections = [];
        this.newConnections = [];
    }



    saveOldConnections()
    {
        for (const conn of graph.connections)
            this.oldConnections.push(conn.toDataObject());
    }



    updateOldConnections()
    {
        this.oldConnections = this.oldConnections
            .filter(c => !graph.connections.find(gc => _connEquals(gc, c)));
    }



    deleteNewConnections()
    {
        for (const _conn of this.newConnections)
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

        this.newConnections = [];
    }



    restoreOldConnections()
    {
        console.log('this.oldConnections =', [...this.oldConnections]);
        for (const _conn of this.oldConnections)
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

        this.oldConnections = [];
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