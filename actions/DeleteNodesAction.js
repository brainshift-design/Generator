class DeleteNodesAction
extends Action
{
    nodeIds          = [];
    nodes            = [];
    nodePos          = [];
    
    prevSelectedIds  = [];

    oldActiveNodeIds = [];
    newActiveNodeIds = [];
   


    constructor(nodeIds)
    {
        super('DELETE ' + nodeIds.length + ' ' + countString('node', nodeIds.length));

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

        uiSaveNodes(this.newActiveNodeIds);
    }



    undo(updateNodes)
    {
        deleteNodesAction_restoreNodes(this);
        
        this.deactivateNewActiveNodes();
        deleteNodesAction_activateOldActiveNodes(this, updateNodes);

        uiSaveNodes([
            ...this.nodeIds,
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



function deleteNodesAction_disconnect(act, input, ignoreNodeIds = [])
{
    // console.log('deleteNodesAction_disconnect');

    const output      = input.connectedOutput;
    const updateNodes = [];        


    uiDisconnect(input);


    const activeLeft        = getActiveBeforeNode    (output.node);
    const activeLeftOnly    = getActiveOnlyBeforeNode(output.node);
    const activeRight       = getActiveAfterNode     (output.node, true);
    const activeRightHeader = getActiveAfterNode     (output.node);

  
    if (  !activeLeftOnly
        && activeLeft != activeRight)
        pushUnique(updateNodes, output.node);

    if (!activeRightHeader)
    {
        if (!ignoreNodeIds.includes(input.node.id))
        {
            uiMakeNodeActive(input.node);
            pushUnique(act.newActiveNodeIds, input.node.id);
            pushUnique(updateNodes, input.node);
        }
    }
    else
        pushUnique(updateNodes, activeRightHeader);

    
    return updateNodes;
}



function deleteNodesAction_deleteNodes(act)
{
    uiDeleteNodes(act.nodeIds);
    uiDeleteObjects(act.oldActiveNodeIds); // clean up now irrelevant objects
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