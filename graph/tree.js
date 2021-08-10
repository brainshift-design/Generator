function activeNodeInTree(node) 
{ 
    const left  = getActiveNodeLeft(node);  if (!!left ) return left;
    const right = getActiveNodeRight(node); if (!!right) return right;

    return null;
}



function getActiveNodeLeft(node)
{
    if (node.active) return node;

    for (const input of node.inputs)
    {
        if (input.connected)
        {
            const left = getActiveNodeLeft(input.connectedOutput.op);
            if (left) return left;
        }
    }

    return null;
}



function getActiveNodeRight(node)
{
    if (node.active) return node;

    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
        {
            const right = getActiveNodeRight(input.op);
            if (right) return right;
        }
    }

    return null;
}



function lastNodeInTree(node) 
{ 
    const right = getLastNodeRight(node); 
    return !!right ? right : null;
}



function getLastNodeRight(node)
{
    var right = null;

    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
        {
            const _right = getLastNodeRight(input.op);
            if (_right && !!right) return node;
            right = _right;
        }
    }

    return !!right ? right : node;
}