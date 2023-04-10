class RemoveNodesAction
extends Action
{
    nodeIds            = [];
    nodes              = [];
    nodePos            = [];
    
    prevSelectedIds    = [];
    
    oldActiveNodeIds   = [];
    newActiveNodeIds   = [];
    
    clusterActiveLeft  = [];
    clusterActiveRight = [];
    


    constructor(nodeIds)
    {
        super(
            REMOVE_ACTION,
            'REMOVE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

        this.nodeIds         = [...nodeIds];
        this.nodes           = nodeIds.map(id => graph.nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    do(updateNodes)
    {
        this.oldActiveNodeIds = [];
        this.newActiveNodeIds = [];

        deleteNodesAction_saveNodePositions(this);
        deleteNodesAction_saveOldActiveNodes(this);

        this.prepareNewReconnections();

        deleteNodesAction_getUpdateNodes(this, updateNodes);
        deleteNodesAction_deleteNodes(this);

        removeNodesAction_makeNewConnections(this);

        uiSaveNodes(this.newActiveNodeIds);
    }



    undo(updateNodes)
    {
        deleteNodesAction_restoreNodes(this);
        
        this.deactivateNewActiveNodes();
        deleteNodesAction_activateOldActiveNodes(this, updateNodes);

        uiSaveNodes([...this.nodeIds, ...this.newActiveNodeIds]);
    }



    addOldConnection(conn)
    {
        if (!this.oldConnectionData.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputId     == conn.output.id
                && c.outputOrder  == conn.outputOrder
                && c. inputNodeId == conn. input.node.id
                && c. inputId     == conn. input.id))
            this.oldConnectionData.push(conn.toDataObject());
    }



    prepareNewReconnections()
    {
        const clusters = findConnectedClusters(this.nodeIds.map(n => graph.nodeFromId(n)));

        
        for (const cluster of clusters)
        {
            const first = cluster.at(0);
            const last  = cluster.at(-1);

            if (   first.headerInputs .length == 1
                &&  last.headerOutputs.length == 1
                && first.inputs [0].connected
                &&  last.outputs[0].connected)
            {
                const input  = first.inputs [0];
                const output =  last.outputs[0];

                for (const connectedInput of output.connectedInputs)
                {
                    if (input.connectedOutput.canConnectTo(connectedInput))
                        this.newConnectionData.push(connDataObject(input.connectedOutput, connectedInput));
                }
            }
        }


        this.clusterActiveLeft  = [];
        this.clusterActiveRight = [];

        for (const cluster of clusters)
        {
            this.clusterActiveLeft .push(getActiveBeforeNode(cluster.at( 0),        [cluster.at( 0)]));
            this.clusterActiveRight.push(getActiveAfterNode (cluster.at(-1), false, [cluster.at(-1)]));
        }
    }



    disconnect(input, ignoreNodeIds = [])
    {
        uiDisconnect(input);
        return [input.node];
    }
}



function removeNodesAction_makeNewConnections(act)
{
    for (let i = 0; i < act.newConnectionData.length; i++)
    {
        const _conn = act.newConnectionData[i];
        
        const conn = uiVariableConnect(
             graph.nodeFromId(_conn.outputNodeId), _conn.outputId, 
             graph.nodeFromId(_conn. inputNodeId), _conn. inputId,
            _conn.outputOrder);

        uiSaveConn(conn);


             if (act.clusterActiveLeft [i]) pushUpdate(act, [act.clusterActiveLeft [i]]);
        else if (act.clusterActiveRight[i]) pushUpdate(act, [act.clusterActiveRight[i]]);
        else                                uiMakeNodeActive(graph.nodeFromId(_conn.inputNodeId));
    }
}