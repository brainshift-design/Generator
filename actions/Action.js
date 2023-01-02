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

    
    oldSelectedNodeIds = []; // currently selected nodes that are deselected as a result of the action
    newSelectedNodeIds = []; // nodes newly selected as a result of the action
   
    oldActiveNodeIds   = [];
    newActiveNodeIds   = [];

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



    do() {}



    redo()
    {
        this.do();
    }



    undo() {}



    initSaveArrays()
    {
        this.oldSelectedNodeIds = [];
        this.newSelectedNodeIds = [];
    
        this.oldActiveNodeIds   = [];
        this.newActiveNodeIds   = [];

        this.oldConnections     = [];
        this.newConnections     = [];
    }



    ////////////////////////////////////////////////////////////////////////



    saveOldSelectedNodes()
    {
        this.oldSelectedNodeIds = graphView.selectedNodes.map(n => n.id);
    }



    saveOldActiveNodes()
    {
        this.oldActiveNodeIds = graph.nodes.filter(n => n.active).map(n => n.id);
    }



    saveOldConnections()
    {
        for (const conn of graph.connections)
            this.oldConnections.push(conn.toDataObject());
    }



    updateOldSelectedNodes()
    {
        this.oldSelectedNodeIds = this.oldSelectedNodeIds
            .map(id => nodeFromId(id))
            .filter(n => !graphView.selectedNodes.includes(n));
    }



    updateOldActiveNodes()
    {
        // this.oldActiveNodeIds = this.oldActiveNodeIds
        //     .filter(id => !graph.nodes
        //         .filter(n => n.active)
        //         .find(n => n.id == id));

        uiDeleteObjects(this.oldActiveNodeIds);
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



    ////////////////////////////////////////////////////////////////////////



    deselectNewSelectedNodes()
    {

    }



    deactivateNewActiveNodes()
    {
        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        uiDeleteObjects(this.newActiveNodeIds); 
    }



    deleteNewConnections()
    {
        for (const conn of this.newConnections)
        {
            uiDeleteSavedConn(conn);
            uiDisconnect(conn.input);
        }
    }



    selectOldSelectedNodes()
    {
        graphView.selectedNodes = this.oldSelectedNodeIds.map(id => nodeFromId(id));
    }



    activateOldActiveNodes(updateNodes)
    {
        for (const id of this.oldActiveNodeIds)
        {
            const node = nodeFromId(id);
            
            uiMakeNodeActive(node);
            pushUnique(updateNodes, node);
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