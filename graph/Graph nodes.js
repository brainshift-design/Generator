function nodeFromId(id)
{
    return this.nodes.find(n => n.id == id);
}



function nodesFromIds(ids)
{
    return ids.map(id => this.nodeFromId(id));
}



function setNodeId(nodeId, newId)
{
    const node = this.nodeFromId(nodeId);
    node.id = newId;
}



function getActiveFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveFromNode(this.nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodesAfterNodeId(nodeId, alreadyChecked = [])
{
    const rightActive = [];
    
   
    const node = graph.nodeFromId(nodeId);
    
    if (node.active) 
        rightActive.push(node);


    for (const output of node.headerOutputs)
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                rightActive.push(...this.getActiveNodesAfterNodeId(
                    input.node.id, 
                    [...alreadyChecked, node]));
            }
        }
    }


    return rightActive;
}



function getActiveNodesFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodesFromNode(this.nodeFromId(nodeId), alreadyChecked);
}