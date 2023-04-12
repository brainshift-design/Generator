class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    nodes            = [];
    nodePos          = [];
    
    prevSelectedIds  = [];

    oldActiveNodeIds = [];
    newActiveNodeIds = [];
   


    constructor(nodeIds, cut = false)
    {
        super(
            DELETE_ACTION, 
            (cut ? 'CUT ' : 'DELETE ') + nodeIds.length + ' ' + countString('node', nodeIds.length));

        this.nodeIds         = [...nodeIds];
        this.nodes           = nodeIds.map(id => nodeFromId(id));
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);
    }



    do(updateNodes)
    {
        this.oldActiveNodeIds = [];
        this.newActiveNodeIds = [];

        deleteNodesAction_saveNodePositions(this);
        deleteNodesAction_saveOldActiveNodes(this);
        
        deleteNodesAction_getUpdateNodes(this, updateNodes);
        deleteNodesAction_deleteNodes(this);

        DisconnectAction_activateNewNodes(this);

        uiSaveNodes(this.newActiveNodeIds);
    }



    undo(updateNodes)
    {
        deleteNodesAction_restoreNodes(this);
        
        this.deactivateNewActiveNodes();
        deleteNodesAction_activateOldActiveNodes(this, updateNodes);

        uiSaveNodes(
            graph,
            [...this.nodeIds,
             ...this.newActiveNodeIds]);
    }
}



function deleteNodesAction_saveOldActiveNodes(act)
{
    for (const nodeId of act.nodeIds)
        pushUnique(act.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));
}



function deleteNodesAction_saveNodePositions(act)
{
    act.nodePos = [];

    for (const nodeId of act.nodeIds)
    {
        const node = nodeFromId(nodeId);

        act.nodePos.push(point(
            node.div.offsetLeft, 
            node.div.offsetTop));
    }
}



function deleteNodesAction_getUpdateNodes(act, updateNodes)
{
    for (const node of act.nodes)
    {
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
                const node1  = i1.node;
                const node2  = i2.node;
                    
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



function deleteNodesAction_disconnect(act, input, ignoreNodeIds = [])
{
    // console.log('deleteNodesAction_disconnect');

    const output            = input.connectedOutput;

    const updateNodes       = [];        


    const activeLeft        = getActiveBeforeNode    (input.node, [input.node]);
    const activeLeftOnly    = getActiveOnlyBeforeNode(input.node, [input.node]);
    const activeRightHeader = getActiveAfterNode     (output.node, false, [output.node]);
    const terminalsRight    = getTerminalsAfterNode  (input.node);


    uiDisconnect(input);
    
    
    if (   !activeLeftOnly
        && !activeLeft)
    {
        if (!ignoreNodeIds.includes(output.node.id))
        {
            pushUnique(act.newActiveNodeIds, output.node.id);
            pushUnique(updateNodes, output.node);
        }
    }


    if (!activeRightHeader)
    {
        const _activeLeft = getActiveBeforeNode(input.node, [input.node]);

        if (   !ignoreNodeIds.includes(input.node.id)
            && !_activeLeft)
        {
            uiMakeNodeActive(input.node);
            pushUnique(act.newActiveNodeIds, input.node.id);
            pushUnique(updateNodes, input.node);
        }
    }


    pushUnique(updateNodes, terminalsRight);

    
    return updateNodes;
}



function deleteNodesAction_deleteNodes(act)
{
    uiDeleteNodes(act.nodeIds);
    uiDeleteObjectsAndStyles(act.oldActiveNodeIds); // clean up now irrelevant objects
}



function deleteNodesAction_restoreNodes(act)
{
    // console.log('act.nodes', act.nodes);

    graphView.restoringNodes = true;

    graph.addNodes(act.nodes);

    graphView.putNodeOnTop(act.nodes.at(-1));
    graphView.selected = act.nodes;


    for (let i = 0; i < act.nodes.length; i++)
    {
        const node = act.nodes[i];
        node.id = act.nodeIds[i];

        node.setPosition(
            act.nodePos[i].x, 
            act.nodePos[i].y);

        node.updateMeasureData();
    }
}



function deleteNodesAction_activateOldActiveNodes(act, updateNodes)
{
    let oldActiveNodeIds = [...act.oldActiveNodeIds].sort((x, y) => 
        (nodeFromId(x) === nodeFromId(y)) 
        ? 0 
        : nodeFromId(y).isOrFollows(nodeFromId(x)) 
          ? -1 
          :  1);
    
    
    const oldActiveNodes = oldActiveNodeIds.map(id => nodeFromId(id));
    
    graphView.selectByIds(act.prevSelectedIds);
    uiMakeNodesActive(oldActiveNodes);

    pushUnique(updateNodes, oldActiveNodes);
}