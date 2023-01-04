class RemoveNodesAction
extends Action
{
    nodeIds            = [];
    nodes              = [];
    nodePos            = [];
    
    prevSelectedIds    = [];
    
    oldConnections     = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    newConnections     = []; // [{outputNodeId, outputId, inputNodeId, inputId}]

    oldActiveNodeIds   = [];
    newActiveNodeIds   = [];
    
    clusterActiveLeft  = [];
    clusterActiveRight = [];
    


    constructor(nodeIds)
    {
        super('REMOVE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

        this.nodeIds         = [...nodeIds];
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    do()
    {
        this.oldActiveNodeIds = [];
        this.newActiveNodeIds = [];
        const updateNodes     = [];


        deleteNodesAction_saveActiveNodes(this);
        deleteNodesAction_saveOldConnections(this);

        this.prepareNewReconnections();

        deleteNodesAction_getUpdateNodes(this, updateNodes);
        deleteNodesAction_deleteNodes(this);

        removeNodesAction_makeNewConnections(this);


        uiSaveNodes(this.newActiveNodeIds);
       
        pushUpdate(this, updateNodes.filter(n => graph.nodes.includes(n)));
    }



    undo()
    {
        deleteNodesAction_removeNewConnections(this);

        deleteNodesAction_restoreNodes(this);
        deleteNodesAction_restoreOldConnections(this);
        
        deleteNodesAction_activateOldActiveNodes(this);


        uiSaveNodes([
            ...this.nodeIds,
            ...this.newActiveNodeIds]);

        deleteNodesAction_cleanup(this);
    }



    addOldConnection(conn)
    {
        if (!this.oldConnections.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputId     == conn.output.id
                && c.outputOrder  == conn.outputOrder
                && c. inputNodeId == conn. input.node.id
                && c. inputId     == conn. input.id))
            this.oldConnections.push(getConnectionForArrayWithIds(conn));
    }



    prepareNewReconnections()
    {
        const clusters = findConnectedClusters(this.nodeIds.map(n => nodeFromId(n)));

        
        for (const cluster of clusters)
        {
            const first = firstOf(cluster);
            const last  =  lastOf(cluster);

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
                    // {
                        this.newConnections.push(connDataObject(input.connectedOutput, connectedInput));
                        // {
                        //     outputNodeId: input.connectedOutput.node.id,
                        //     outputId:     input.connectedOutput.id,
                        //     outputOrder:  input.connection.outputOrder,
                        //     inputNodeId:  connectedInput.node.id,
                        //     inputId:      connectedInput.id
                        // });
                    // }
                }
            }
        }


        this.clusterActiveLeft  = [];
        this.clusterActiveRight = [];

        for (const cluster of clusters)
        {
            this.clusterActiveLeft .push(getActiveBeforeNode(firstOf(cluster),        [firstOf(cluster)]));
            this.clusterActiveRight.push(getActiveAfterNode (lastOf (cluster), false, [lastOf (cluster)]));
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
    for (let i = 0; i < act.newConnections.length; i++)
    {
        const _conn = act.newConnections[i];
        
        const conn = uiVariableConnect(
            nodeFromId(_conn.outputNodeId), _conn.outputId, 
            nodeFromId(_conn. inputNodeId), _conn. inputId,
            _conn.outputOrder);

        uiSaveConn(conn);


             if (act.clusterActiveLeft [i]) pushUpdate(act, [act.clusterActiveLeft [i]]);
        else if (act.clusterActiveRight[i]) pushUpdate(act, [act.clusterActiveRight[i]]);
        else                                uiMakeNodeActive(nodeFromId(_conn.inputNodeId));
    }
}