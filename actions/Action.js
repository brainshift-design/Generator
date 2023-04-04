const EMPTY_ACTION               = 'EMPTY';
const CONNECT_ACTION             = 'CONNECT';
const CREATE_ACTION              = 'CREATE';
const CREATE_INSERT_ACTION       = 'CREATE_INSERT';
const DELETE_ACTION              = 'DELETE';
const DISCONNECT_ACTION          = 'DISCONNECT';
const LINK_STYLE_ACTION          = 'LINK_STYLE';
const MAKE_ACTIVE_ACTION         = 'MAKE_ACTIVE';
const PASTE_ACTION               = 'PASTE';
const RECONNECT_ACTION           = 'RECONNECT';
const REMOVE_ACTION              = 'REMOVE';
const RENAME_ACTION              = 'RENAME';
const REORDER_INPUTS_ACTION      = 'REORDER_INPUTS';
const REORDER_CONNECTIONS_ACTION = 'REORDER_CONNECTIONS';
const SELECT_ACTION              = 'SELECT';
const SELECT_MOVE_ACTION         = 'SELECT_MOVE';
const SET_PARAM_VALUE_ACTION     = 'SET_PARAM_VALUE';
const SET_PARAM_SETTING_ACTION   = 'SET_PARAM_SETTING';
const SET_NODE_RECT_ACTION       = 'SET_NODE_RECT';
const TOGGLE_DISABLE_ACTION      = 'TOGGLE_DISABLE';
const TOGGLE_SYMBOL_ACTION       = 'TOGGLE_SYMBOL';
const SET_CURRENT_GRAPH_ACTION   = 'SET_CURRENT_GRAPH';



class Action
{
    manager;
 
    id;
    type;
    name;

    
    graph;
    

    prevAction = null; // these are used to link actions into sequences
    nextAction = null; 
  
    data;
  
    onBefore;
    onAfter;

    onBeforeUndo;
    onAfterUndo;

    
    selfUpdate         = false;
    affectsConnections = true;

    _linkWithNext      = false;

    
    oldConnectionData  = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    newConnectionData  = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    
    oldOutputParams    = []; // actual Parameter objects
    newOutputParams    = []; // copies of old params for paste/duplicate



    constructor(graph, type, name)
    {
        this.graph = graph;

        this.type  = type;
        this.name  = name;

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

        this.oldOutputParams   = [];
        this.newOutputParams   = [];
    }



    saveOldConnections()
    {
        for (const conn of this.graph.connections)
        {
            this.oldConnectionData.push(conn.toDataObject());
 
            if (conn.output.param)
            {
                conn.output.param._nodeId = conn.output.param.node.id;
                this.oldOutputParams.push(conn.output.param);
            }
        }
    }



    updateOldConnections()
    {
        this.oldConnectionData = this.oldConnectionData
            .filter(c => 
                  !this.graph.connections.find(gc => 
                         gc.id == c.id
                      && (   !gc.output.param
                          || !gc.output.param.volatile)));

        const oldOutputParams = this.oldOutputParams.filter(p => 
            this.oldConnectionData.find(c =>
                       p._nodeId   == c.outputNodeId
                    && p.output.id == c.outputId));

        this.oldOutputParams = oldOutputParams;
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
  
            uiDisconnect(this.graph.nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));
        }

        this.newConnectionData = [];
    }



    restoreOldConnections()
    {
        for (const _conn of this.oldConnectionData)
        {
            const outputNode = this.graph.nodeFromId(_conn.outputNodeId);
            let   output     = outputNode.outputFromId(_conn.outputId);

            if (!isValid(output))
            {
                const param = this.oldOutputParams.find(p => 
                       p._nodeId == _conn.outputNodeId
                    && p.id      == _conn.outputId); 

                output = param.output;

                const node = this.graph.nodeFromId(_conn.outputNodeId);
                
                param ._node = node;
                output._node = node; 
            }

            console.assert(isValid(output), 'output should be found at this point');


            output.updateSavedConnectionOrder(_conn.outputOrder, +1);


            const oldConn = uiVariableConnectFromOutput(
                output,
                this.graph.nodeFromId(_conn.inputNodeId), _conn.inputId,
                _conn.outputOrder);

 
            uiSaveConn(oldConn);
        }


        // at this point a request should be sent 
        // and the update received with some flag to indicate that this is that kind of an update
        // at the end of the update reconnect the connections to the real connections and save them


        this.oldConnectionData = [];
    }



    deactivateNewActiveNodes()
    {
        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(this.graph.nodeFromId(id));
    
        uiDeleteObjectsAndStyles(this.newActiveNodeIds, false); 
    }



    getPrevLinkString()
    {
        return this.prevAction ? '← ' : '';
    }

    

    getNextLinkString()
    {
        return this.nextAction ? ' →' : '';
    }
}



function linkActions(prevAction, nextAction)
{
    prevAction.nextAction = nextAction;
    nextAction.prevAction = prevAction;
}