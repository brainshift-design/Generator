class Action
{
    manager;
 
    id;
    type;
    name;

    
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



    constructor(type, name)
    {
        this.type  = type;
        this.name  = name;

        consoleAssert(
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
        for (const conn of graph.connections)
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
                  !graph.connections.find(gc => 
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
        this.newConnectionData.sort((c1, c2) =>
        {
            if (c1.outputNodeId != c2.outputNodeId) return c1.outputNodeId < c2.outputNodeId ? -1 : 1;
            if (c1.outputId     != c2.outputId    ) return c1.outputId     < c2.outputId     ? -1 : 1;
            if (c1.outputOrder  != c2.outputOrder ) return parseInt(c1.outputOrder) - parseInt(c2.outputOrder);
            return 0;
        });


        for (let i = this.newConnectionData.length-1; i >= 0; i--)
        {
            const _conn = this.newConnectionData[i];

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
  
            const input = nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId);

            if (input)
                uiDisconnect(input);
        }

        
        this.newConnectionData = [];
    }



    restoreOldConnections()
    {
        for (const _conn of this.oldConnectionData)
        {
            const outputNode = nodeFromId(_conn.outputNodeId);
            let   output     = outputNode.outputFromId(_conn.outputId);

            if (!isValid(output))
            {
                const param = this.oldOutputParams.find(p => 
                       p._nodeId == _conn.outputNodeId
                    && p.id      == _conn.outputId); 

                output = param.output;

                const node = nodeFromId(_conn.outputNodeId);
                
                param ._node = node;
                output._node = node; 
            }

            consoleAssert(isValid(output), 'output should be found at this point');


            //output.updateSavedConnectionOrder(_conn.outputOrder, +1);


            // create connection if the connection doesn't already exist

            if (!graph.connections.find(c =>
                       c.output.node.id == _conn.outputNodeId
                    && c.output.id      == _conn.outputId
                    && c.input.node.id  == _conn.inputNodeId
                    && c.input.id       == _conn.inputId))
            {
                const oldConn = uiVariableConnectFromOutput(
                    output,
                    nodeFromId(_conn.inputNodeId), _conn.inputId,
                    _conn.outputOrder);

                uiSaveConn(oldConn);
            }
        }


        // at this point a request should be sent 
        // and the update received with some flag to indicate that this is that kind of an update
        // at the end of the update reconnect the connections to the real connections and save them


        this.oldConnectionData = [];
    }



    deactivateNewActiveNodes()
    {
        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));
    
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