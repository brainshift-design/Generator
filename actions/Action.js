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



    do  () {}
    undo() {}
    redo() { this.do(); }



    initSaveArrays()
    {
        this.oldConnections     = [];
        this.newConnections     = [];
    }



    //   DO   ////////////////////////////////////////////////////////////////////////



    saveOldConnections()
    {
        for (const conn of graph.connections)
            this.oldConnections.push(conn.toDataObject());
    }



    updateOldConnections()
    {
        this.oldConnections = this.oldConnections
            .filter(c => !graph.connections.find(gc =>
                   c.outputNodeId == gc.outputNodeId
                && c.outputId     == gc.outputId
                && c.outputOrder  == gc.outputOrder
                && c.inputNodeId  == gc.inputNodeId
                && c.inputId      == gc.inputId));
    }



    //   UNDO   ////////////////////////////////////////////////////////////////////////



    deleteNewConnections()
    {
        for (const conn of this.newConnections)
        {
            uiDeleteSavedConn(conn);
            uiDisconnect(conn.input);
        }
    }



    restoreOldConnections()
    {
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
    }
};



function linkActions(prevAction, nextAction)
{
    prevAction.nextAction = nextAction;
    nextAction.prevAction = prevAction;
}