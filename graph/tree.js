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



function getNodesBeforeNode(node)
{
    let before = [];

    for (const input of node.inputs.filter(i => i.isConnected))
    {
        before.push(input.connectedOutput.op);
        before.push(...getNodesBeforeNode(input.connectedOutput.op));
    }

    return before;
}



function getNodesAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
        for (const input of output.connectedInputs)
        {
            after.push(input.op);
            after.push(...getNodesAfterNode(input.op));
        }

    return after;
}



function getTerminalsAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
        for (const input of output.connectedInputs)
            after.push(...getTerminalsAfterNode(input.op));

    return after.length > 0 ? after : [node];;
}



function updateTerminalsAfterNodes(nodes, includeNodeInEmpty = true)
{
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