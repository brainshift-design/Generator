class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    nodes            = [];
    nodePos          = [];
    
    prevSelectedIds  = [];

    oldConnections   = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    newActiveNodeIds = [];

    newConnections   = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    oldActiveNodeIds = [];
   


    constructor(nodeIds)
    {
        super('DELETE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

        this.nodeIds         = [...nodeIds]; // clone the array
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    addConnection(conn)
    {
        if (!this.oldConnections.find(c => 
                   c.outputNodeId == conn.output.node.id
                && c.outputId     == conn.output.id
                && c.outputOrder  == conn.outputOrder
                && c. inputNodeId == conn. input.node.id
                && c. inputId     == conn. input.id))
            this.oldConnections.push(getConnectionForArrayWithIds(conn));
    }



    do()
    {
        this.newActiveNodeIds = [];
        this.oldActiveNodeIds = [];


        for (const nodeId of this.nodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));
        
        uiDeleteObjects(this.oldActiveNodeIds); // clean up now irrelevant objects
        

        this.newConnections = [];
        addDeleteActionConnections(this);


        const updateNodes = getDeleteActionUpdateNodes(this);

        uiDeleteNodes(this.nodeIds);
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
            
            outputNode.outputFromId(conn.outputId).updateSavedConnectionOrder(conn.outputOrder, +1);

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


        const activeLeft     = getActiveLeftFromNode(output.node);
        const activeLeftOnly = getActiveLeftOnlyFromNode(output.node);
        const activeRight    = getActiveRightFromNode(input.node);


        if (  !activeLeftOnly
            && activeLeft != activeRight)
        {
            if (!ignoreNodeIds.includes(output.node.id))
            {
                uiMakeNodeActive(output.node);
                pushUnique(this.newActiveNodeIds, output.node.id);
            }

            updateNodes.push(output.node);
        }


        if (   !activeRight
            && !ignoreNodeIds.includes(input.node.id))
        {
            uiMakeNodeActive(input.node);
            pushUnique(this.newActiveNodeIds, input.node.id);
        }
        

        return updateNodes;
    }
}



function getDeleteActionUpdateNodes(action)
{
    const updateNodes = [];


    for (const nodeId of action.nodeIds)
    {
        const node = nodeFromId(nodeId);


        const nodeInputs = [...node.inputs.filter(i => i.connected)];

        for (let i = nodeInputs.length-1; i >= 0; i--)
        {
            const input       = nodeInputs[i];
            const output      = input.connectedOutput;
            const outputOrder = input.connection.outputOrder;
            
            uiDeleteSavedConn(nodeInputs[i].connection);
            updateNodes.push(...action.disconnect(nodeInputs[i], action.nodeIds));

            output.updateSavedConnectionOrder(outputOrder, -1);
        }

            
        for (const output of node.outputs)
        {
            const connectedInputs = [...output.connectedInputs];
            removeFromArrayWhere(connectedInputs, i => i.node == node);

            // connected inputs need to be sorted by input index
            connectedInputs.sort((i1, i2) => 
            {
                const node1 = i1.node;
                const node2 = i2.node;
                    
                const index1 = node1.inputs.indexOf(i1);
                const index2 = node2.inputs.indexOf(i2);
                
                if (node1.id != node2.id) return node1.id - node2.id;
                if (index1   != index2)   return index1   - index2;
                return 0;
            });


            for (const input of connectedInputs)
            {
                uiDeleteSavedConn(input.connection);
                updateNodes.push(...action.disconnect(input, action.nodeIds));
                // don't need to update order as the output is deleted
            }
        }
    }


    return updateNodes;
}



function addDeleteActionConnections(action)
{
    for (const nodeId of action.nodeIds)
    {
        const node = nodeFromId(nodeId);

        action.nodePos.push(point(
            node.div.offsetLeft, 
            node.div.offsetTop));

        for (const input of node.inputs.filter(i => i.connected))
            action.addConnection(input.connection);

        for (const output of node.outputs)
            for (const input of output.connectedInputs)
                action.addConnection(input.connection);
    }
}