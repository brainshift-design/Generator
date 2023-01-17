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

    
    selfUpdate        = false;

    _linkWithNext     = false;

    
    oldConnectionData = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    newConnectionData = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]
    
    oldOutputParams   = []; // actual Parameter objects
    newOutputParams   = []; // copies of old params for paste/duplicate



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
        console.log('1 this.oldOutputParams =', [...this.oldOutputParams]);
        console.log('1 this.oldConnectionData =', [...this.oldConnectionData]);

        this.oldConnectionData = this.oldConnectionData
            .filter(c => !graph.connections.find(gc => gc.id == c.id));

        console.log('2 this.oldConnectionData =', [...this.oldConnectionData]);

        const oldOutputParams = this.oldOutputParams
            .filter(p => this.oldConnectionData.find(c =>
                   p._nodeId   == c.outputNodeId
                && p.output.id == c.outputId));
        
        this.oldOutputParams = oldOutputParams;

        console.log('2 this.oldOutputParams =', [...this.oldOutputParams]);
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
            let   output     = outputNode.outputFromId(_conn.outputId);

            if (  !output
                || output == undefined)
            {
                const param = this.oldOutputParams.find(p => 
                       p._nodeId == _conn.outputNodeId
                    && p.id      == _conn.outputId); 

console.log('*******************************');
console.log('_conn.outputNodeId =', _conn.outputNodeId);
console.log('_conn.outputId =', _conn.outputId);
console.log('this.oldOutputParams =', [...this.oldOutputParams]);
console.log('param =', param);
console.log('-------------------------------');

                output = param.output; 
            }

            console.assert(output && output != undefined, 'output should be found at this point');


            output.updateSavedConnectionOrder(_conn.outputOrder, +1);


            // const oldConn = 
            uiVariableConnect(
                outputNode,                    _conn.outputId,
                nodeFromId(_conn.inputNodeId), _conn.inputId,
                _conn.outputOrder);
                
            // uiSaveConn(oldConn);
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
    
        uiDeleteObjects(this.newActiveNodeIds); 
    }
}



function linkActions(prevAction, nextAction)
{
    prevAction.nextAction = nextAction;
    nextAction.prevAction = prevAction;
}