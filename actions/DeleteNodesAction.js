class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    nodes            = [];
    nodePos          = [];
    
    prevSelectedIds  = [];

    oldConnections   = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    newConnections   = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    
    oldActiveNodeIds = [];
    newActiveNodeIds = [];
   


    constructor(nodeIds)
    {
        super('DELETE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

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
        
        deleteNodesAction_getUpdateNodes(this, updateNodes);
        deleteNodesAction_deleteNodes(this);


        uiSaveNodes(this.newActiveNodeIds);

        pushUpdate(updateNodes.filter(n => graph.nodes.includes(n)));
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
}



function deleteNodesAction_saveActiveNodes(act)
{
    for (const nodeId of act.nodeIds)
        pushUnique(act.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));
}



function deleteNodesAction_saveOldConnections(act)
{
    for (const nodeId of act.nodeIds)
    {
        const node = nodeFromId(nodeId);

        act.nodePos.push(point(
            node.div.offsetLeft, 
            node.div.offsetTop));

        for (const input of node.inputs.filter(i => i.connected))
            act.addOldConnection(input.connection);

        for (const output of node.outputs)
            for (const input of output.connectedInputs)
                act.addOldConnection(input.connection);
    }
}



function deleteNodesAction_removeNewConnections(act)
{
    for (const _conn of act.newConnections)
    {
        const input = nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId);

        uiDeleteSavedConn(input.connection);
        uiDisconnect(input);
    }


    for (const id of act.newActiveNodeIds)
        uiMakeNodePassive(nodeFromId(id));
        
    uiDeleteObjects(act.newActiveNodeIds); // clean up now irrelevant objects
}



function deleteNodesAction_restoreNodes(act)
{
    //console.log('this.nodes', this.nodes);

    graph.addNodes(act.nodes);
    graphView.selected = act.nodes;
    graphView.putNodeOnTop(lastOf(act.nodes));

    for (let i = 0; i < act.nodes.length; i++)
    {
        setNodePosition(
            act.nodes[i], 
            act.nodePos[i].x, 
            act.nodePos[i].y);
    }

    for (let i = 0; i < act.nodes.length; i++)
        act.nodes[i].id = act.nodeIds[i];
}



function deleteNodesAction_restoreOldConnections(act)
{
    const connections    = act.oldConnections.filter(c => !nodeFromId(c.inputNodeId).variableInputs);
    const varConnections = act.oldConnections.filter(c =>  nodeFromId(c.inputNodeId).variableInputs);
    
    varConnections.sort((c1, c2) =>
    {
        if (c1.outputOrder != c2.outputOrder) return c1.outputOrder - c2.outputOrder;
        if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
        if (c1.inputId     != c2.inputId    ) return c1.inputId     - c2.inputId;
        return 0;
    });
    
    deleteNodesAction_connect(connections);
    deleteNodesAction_connect(varConnections);
}



function deleteNodesAction_disconnect(act, input, ignoreNodeIds = [])
{
    // console.log('deleteNodesAction_disconnect');

    const output      = input.connectedOutput;
    const updateNodes = [input.node];        


    uiDisconnect(input);


    const activeLeft        = getActiveBeforeNode    (output.node);
    const activeLeftOnly    = getActiveOnlyBeforeNode(output.node);
    const activeRight       = getActiveAfterNode   (output.node);
    const activeRightHeader = getActiveAfterNode   (output.node, true);
    
    if (  !activeLeftOnly
        && activeLeft != activeRight)
        pushUnique(updateNodes, output.node);


    if (   !activeRightHeader
        && !ignoreNodeIds.includes(output.node.id))
    {
        uiMakeNodeActive(output.node);
        pushUnique(act.newActiveNodeIds, output.node.id);
        pushUnique(updateNodes, output.node);
    }
    

    return updateNodes;
}



function deleteNodesAction_connect(connections)
{
    for (const _conn of connections)
    {
        const outputNode = nodeFromId(_conn.outputNodeId);
        const  inputNode = nodeFromId(_conn. inputNodeId);
        
        outputNode.outputFromId(_conn.outputId)
            .updateSavedConnectionOrder(_conn.outputOrder, +1);

        const conn = uiVariableConnect(
            outputNode, _conn.outputId, 
            inputNode,  _conn.inputId,
            _conn.outputOrder);

        uiSaveConn(conn);
    }
}



function deleteNodesAction_getUpdateNodes(act, updateNodes)
{
    for (const nodeId of act.nodeIds)
    {
        const node = nodeFromId(nodeId);


        const nodeInputs = node.inputs.filter(i => i.connected);
        
        for (let i = nodeInputs.length-1; i >= 0; i--)
        {
            const input       = nodeInputs[i];
            const output      = input.connectedOutput;
            const outputOrder = input.connection.outputOrder;
            
            uiDeleteSavedConn(input.connection);
            pushUnique(updateNodes, deleteNodesAction_disconnect(act, input, act.nodeIds));

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
                pushUnique(updateNodes, deleteNodesAction_disconnect(act, input, act.nodeIds));
                // don't need to update order as the output is deleted
            }
        }
    }
}



function deleteNodesAction_deleteNodes(act)
{
    uiDeleteNodes(act.nodeIds);
    uiDeleteObjects(act.oldActiveNodeIds); // clean up now irrelevant objects
}



function deleteNodesAction_activateOldActiveNodes(act)
{
    let oldActiveNodeIds = [...act.oldActiveNodeIds];
        
    oldActiveNodeIds.sort((x, y) => 
        (nodeFromId(x) === nodeFromId(y)) 
        ? 0 
        : nodeFromId(y).isOrFollows(nodeFromId(x)) 
          ? -1 
          :  1);
    
    
    const oldActiveNodes = oldActiveNodeIds.map(id => nodeFromId(id));
    
    graphView.selectByIds(act.prevSelectedIds);
    uiMakeNodesActive(oldActiveNodes);

    pushUpdate(oldActiveNodes);
}



function deleteNodesAction_cleanup(act)
{
    act.nodePos        = [];
    act.oldConnections = [];
    act.newConnections = [];
}