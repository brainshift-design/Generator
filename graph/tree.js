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

    for (const output of node.outputs)
    {
        for (const connInput of output.connectedInputs)
        {
            const right = activeNodeRight(connInput.op);
            if (right) return right;
        }
    }

    return null;
}



// function lastNodeInTree(node) 
// { 
//     const right = lastNodeRight(node); 
//     return !!right ? right : null;
// }



// function lastNodeRight(node)
// {
//     let right = null;

//     if (!!node.output)
//     {
//         for (const input of node.output.connectedInputs)
//         {
//             const _right = lastNodeRight(input.op);
//             if (_right && !!right) return node;
//             right = _right;
//         }
//     }

//     return !!right ? right : node;
// }



function getTerminalsAfterNode(node)
{
    let right = [];

    for (const output of node.outputs)
        for (const input of output.connectedInputs)
            right.push(...getTerminalsAfterNode(input.op));

    return right.length > 0 ? right : [node];
}



function updateTerminalsAfterNodes(nodes)
{
    //log('updateTerminalsAfterNodes()');

    const terminals = [];

    for (const node of nodes)
    {
        const tt = getTerminalsAfterNode(node);

        for (const t of tt)
        {
            if (!terminals.includes(t))
                terminals.push(t);
        }
    }

    for (const t of terminals)
        t.update();
}