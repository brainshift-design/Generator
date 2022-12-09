class RemoveNodesAction
extends Action
{
    nodeIds            = [];
    prevSelectedIds    = [];
    
    nodes              = [];
    nodePos            = [];

    oldConnections     = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    newConnections     = []; // [{outputNodeId, outputId, inputNodeId, inputId}]

    clusterActiveLeft  = [];
    clusterActiveRight = [];
    
    newActiveNodeIds   = [];
    oldActiveNodeIds   = [];



    constructor(nodeIds)
    {
        super('REMOVE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

        this.nodeIds         = [...nodeIds]; // clone the array
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    addConnection(conn)
    {
        if (!this.oldConnections.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputId     == conn.output.id
                && c. inputNodeId == conn. input.node.id
                && c. inputId     == conn. input.id))
            this.oldConnections.push(getConnectionForArrayWithIds(conn));
    }



    prepareReconnections()
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
                    {
                        this.newConnections.push(
                        {
                            outputNodeId: input.connectedOutput.node.id,
                            outputId:     input.connectedOutput.id,
                            inputNodeId:  connectedInput.node.id,
                            inputId:      connectedInput.id
                        });
                    }
                }
            }
        }

        this.clusterActiveLeft  = [];
        this.clusterActiveRight = [];

        for (const cluster of clusters)
        {
            this.clusterActiveLeft .push(getActiveLeftFromNode (firstOf(cluster), [firstOf(cluster)]));
            this.clusterActiveRight.push(getActiveRightFromNode(lastOf (cluster), [lastOf (cluster)]));
        }
    }



    do()
    {
        this.newActiveNodeIds = [];
        this.oldActiveNodeIds = [];


        for (const nodeId of this.nodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));

            
        this.newConnections = [];

        this.prepareReconnections();
        uiDeleteObjects(this.oldActiveNodeIds); // clean up now irrelevant objects

        
        addDeleteActionConnections(this);


        const updateNodes = getDeleteActionUpdateNodes(this);

        uiDeleteNodes(this.nodeIds);


        for (let i = 0; i < this.newConnections.length; i++)
        {
            const _conn = this.newConnections[i];
            
            uiConnect(
                nodeFromId(_conn.outputNodeId).outputFromId(_conn.outputId), 
                nodeFromId(_conn. inputNodeId). inputFromId(_conn. inputId));

                 if (this.clusterActiveLeft [i]) pushUpdate([this.clusterActiveLeft [i]]);
            else if (this.clusterActiveRight[i]) pushUpdate([this.clusterActiveRight[i]]);
            else                                 uiMakeNodeActive(nodeFromId(_conn.inputNodeId));
        }


        uiSaveNodes(this.newActiveNodeIds);
       
        pushUpdate(updateNodes.filter(n => graph.nodes.includes(n)));
    }



    undo()
    {
        uiDeleteObjects(this.newActiveNodeIds); // clean up now irrelevant objects


        for (const _conn of this.newConnections)
            uiDisconnect(nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId));


        this.restoreNodes();
        this.restoreConns();
        

        this.nodePos        = [];
        this.oldConnections = [];

        graphView.selectByIds(this.prevSelectedIds);


        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));
        

        uiSaveNodes([
            ...this.nodeIds,
            ...this.newActiveNodeIds]);//,
            //...this.oldActiveNodeIds]);


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        
        const oldActiveNodes = oldActiveNodeIds.map(id => nodeFromId(id));
        
        uiMakeNodesActive(oldActiveNodes);

        pushUpdate(oldActiveNodes);
    }



    restoreNodes()
    {
        //console.log('this.nodes', this.nodes);

        graph.addNodes(this.nodes);
        graphView.selected = this.nodes;
        graphView.putNodeOnTop(lastOf(this.nodes));
    
        for (let i = 0; i < this.nodes.length; i++)
        {
            setNodePosition(
                this.nodes[i], 
                this.nodePos[i].x, 
                this.nodePos[i].y);
        }

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].id = this.nodeIds[i];
    }



    restoreConns()
    {
        const connections    = this.oldConnections.filter(c => !nodeFromId(c.inputNodeId).variableInputs);
        const varConnections = this.oldConnections.filter(c =>  nodeFromId(c.inputNodeId).variableInputs);
        
        varConnections.sort((c1, c2) =>
        {
            if (c1.outputOrder != c2.outputOrder) return c1.outputOrder - c2.outputOrder;
            if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
            if (c1.inputId     != c2.inputId    ) return c1.inputId     - c2.inputId;
            return 0;
        });
        
        this.connect(connections);
        this.connect(varConnections);
    }



    connect(connections)
    {
        for (const conn of connections)
        {
            const outputNode = nodeFromId(conn.outputNodeId);
            const  inputNode = nodeFromId(conn. inputNodeId);

            uiVariableConnect(
                outputNode, conn.outputId, 
                inputNode,  conn.inputId,
                conn.outputOrder);
        }
    }



    disconnect(input, ignoreNodeIds = [])
    {
        //console.log('disconnect');

        const output      = input.connectedOutput;
        const updateNodes = [input.node];        


        uiDisconnect(input);


        // const activeLeft     = getActiveLeftFromNode(output.node);
        // const activeLeftOnly = getActiveLeftOnlyFromNode(output.node);
        // const activeRight    = getActiveRightFromNode(input.node);


        // if (  !activeLeftOnly
        //     && activeLeft != activeRight)
        // {
        //     if (!ignoreNodeIds.includes(output.node.id))
        //     {
        //         uiMakeNodeActive(output.node);
        //         pushUnique(this.newActiveNodeIds, output.node.id);
        //     }

        //     updateNodes.push(output.node);
        // }


        // if (   !activeRight
        //     && !ignoreNodeIds.includes(input.node.id))
        // {
        //     uiMakeNodeActive(input.node);
        //     pushUnique(this.newActiveNodeIds, input.node.id);
        // }
        

        return updateNodes;
    }
}