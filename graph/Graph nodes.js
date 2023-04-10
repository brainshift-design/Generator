Graph.prototype.nodeFromId = function(id)
{
    return this.nodes.find(n => n.id == id);
};



Graph.prototype.nodesFromIds = function(ids)
{
    return ids.map(id => this.nodeFromId(id));
};



Graph.prototype.setNodeId = function(nodeId, newId)
{
    const node = this.nodeFromId(nodeId);
    node.id = newId;
};



Graph.prototype.getActiveFromNodeId = function(nodeId, alreadyChecked = [])
{
    return getActiveFromNode(this.nodeFromId(nodeId), alreadyChecked);
};



Graph.prototype.getActiveNodesAfterNodeId = function(nodeId, alreadyChecked = [])
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
};



Graph.prototype.getActiveNodesFromNodeId = function(nodeId, alreadyChecked = [])
{
    return getActiveNodesFromNode(this.nodeFromId(nodeId), alreadyChecked);
};