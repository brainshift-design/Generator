function activeNodeInTree(node) 
{ 
    const left  = activeNodeLeft(node);  if (!!left ) return left;
    const right = activeNodeRight(node); if (!!right) return right;

    return null;
}



function activeNodeLeft(node)
{
    if (node.active) return node;

    for (const input of node.inputs)
    {
        if (input.isConnected)
        {
            const left = activeNodeLeft(input.connectedOutput.op);
            if (left) return left;
        }
    }

    return null;
}



function activeNodeRight(node)
{
    if (node.active) return node;

    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
        {
            const right = activeNodeRight(input.op);
            if (right) return right;
        }
    }

    return null;
}



function lastNodeInTree(node) 
{ 
    const right = lastNodeRight(node); 
    return !!right ? right : null;
}



function lastNodeRight(node)
{
    var right = null;

    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
        {
            const _right = lastNodeRight(input.op);
            if (_right && !!right) return node;
            right = _right;
        }
    }

    return !!right ? right : node;
}