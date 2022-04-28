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
//         if (input.connected)
//         {
//             const left = activeNodeLeft(input.connectedOutput.node);
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
//             const right = activeNodeRight(connInput.node);
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


    for (const input of node.inputs.filter(i => i.connected))
    {
        const node = input.connectedOutput.node;
        if (ignore.includes(node)) continue;

        nodes.push(...getAllNodesFromNode(node, ignore));
    }


    for (const output of node.outputs)
    {
        for (const _input of output.connectedInputs)
        {
            const node = _input.node;
            if (ignore.includes(node)) continue;

            nodes.push(...getAllNodesFromNode(node, ignore));
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

    for (const input of node.inputs.filter(i => i.connected))
    {
        if (!before.includes(input.connectedOutput.node)) // avoid including diamond tips twice
            before.push(input.connectedOutput.node);
    
        before.push(...getNodesBeforeNode(input.connectedOutput.node));
    }

    return before;
}



function getNodesAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
        for (const input of output.connectedInputs)
        {
            if (!after.includes(input.node)) // avoid including diamond tips twice
                after.push(input.node);

            after.push(...getNodesAfterNode(input.node));
        }

    return after;
}



function getTerminalsAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
        for (const input of output.connectedInputs)
            after.push(...getTerminalsAfterNode(input.node));

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

    //for (const t of terminals)
    //    t.pushUpdate();
}