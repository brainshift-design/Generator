// function activeNodeInTree(node) 
// { 
//     const left  = activeNodeLeft(node);  if (!!left ) return left;
//     const right = activeNodeRight(node); if (!!right) return right;

//     return null;
// }



// function activeNodeLeft(node)
// {
//     if (node.active) return node;

//     for (const input of node.inputs)
//     {
//         if (input.isConnected)
//         {
//             const left = activeNodeLeft(input.connectedOutput.op);
//             if (left) return left;
//         }
//     }

//     return null;
// }



// function activeNodeRight(node)
// {
//     if (node.active) return node;

//     for (const output of node.outputs)
//     {
//         for (const connInput of output.connectedInputs)
//         {
//             const right = activeNodeRight(connInput.op);
//             if (right) return right;
//         }
//     }

//     return null;
// }



function getAllNodesFromNode(node, ignore = [])
{
    const nodes = [node];


    if (!ignore.includes(node)) 
        ignore.push(node);


    for (const input of node.inputs.filter(i => i.isConnected))
    {
        const op = input.connectedOutput.op;
        if (ignore.includes(op)) continue;

        nodes.push(...getAllNodesFromNode(op, ignore));
    }


    for (const output of node.outputs)
    {
        for (const _input of output.connectedInputs)
        {
            const op = _input.op;
            if (ignore.includes(op)) continue;

            nodes.push(...getAllNodesFromNode(op, ignore));
        }
    }


    return nodes;
}



function getNodesAcrossNode(node)
{
    let nodes = [];

    nodes = [...nodes, ...getNodesBeforeNode(node)];
    nodes = [...nodes, ...getNodesAfterNode (node)];

    return nodes;
}


function getNodesBeforeNode(node)
{
    let before = [];

    for (const input of node.inputs.filter(i => i.isConnected))
    {
        if (!before.includes(input.connectedOutput.op)) // avoid including diamond tips twice
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
            if (!after.includes(input.op)) // avoid including diamond tips twice
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

    return after.length > 0 ? after : [node];
}



function updateTerminalsAfterNodes(nodes)
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