function nodeFromId(id)
{
    return graph.nodes.find(n => n.id == id);
}



function nodesFromIds(ids)
{
    return ids.map(id => nodeFromId(id));
}



function setNodeId(nodeId, newId)
{
    const node = nodeFromId(nodeId);
    node.id = newId;
}



function getActiveFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodesAfterNodeId(nodeId, alreadyChecked = [])
{
    const rightActive = [];
    
   
    const node = nodeFromId(nodeId);
    
    if (node.active) 
        rightActive.push(node);


    for (const output of node.headerOutputs)
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                rightActive.push(...getActiveNodesAfterNodeId(
                    input.node.id, 
                    [...alreadyChecked, node]));
            }
        }
    }


    return rightActive;
}



function getActiveNodesFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodesFromNode(nodeFromId(nodeId), alreadyChecked);
}