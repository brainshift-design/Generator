// function activeNode(node) 
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
        const _node = input.connectedOutput.node;
        if (ignore.includes(_node)) continue;

        nodes.push(...getAllNodesFromNode(_node, ignore));
    }


    for (const output of node.outputs)
    {
        for (const _input of output.connectedInputs)
        {
            const _node = _input.node;
            if (ignore.includes(_node)) continue;

            nodes.push(...getAllNodesFromNode(_node, ignore));
        }
    }


    return nodes;
}



function getNodesAcrossNode(node)
{
    return [ ...getNodesBeforeNode(node),
             ...getNodesAfterNode (node) ];
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
    {
        for (const input of output.connectedInputs)
        {
            if (!after.includes(input.node)) // avoid including diamond tips twice
                after.push(input.node);

            after.push(...getNodesAfterNode(input.node));
        }
    }

    return after;
}



function getProgressNodesAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (input.node.hasProgressBar)
                pushUnique(after, input.node);

            pushUnique(after, getProgressNodesAfterNode(input.node));
        }
    }

    return after;
}



function getTerminalsAfterNode(node)
{
    let after = [];


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            // if (   input.param 
            //     && (   !input.param.output
            //         || !input.param.output.connected))
            //     pushUnique(after, input.node);

            pushUnique(after, getTerminalsAfterNode(input.node));
        }
    }


    return after.length > 0 ? after : [node];
}



function getTerminalsAfterParam(param)
{
    if (!param.output)
        return getTerminalsAfterNode(param.node);


    let after = [];

    for (const input of param.output.connectedInputs)
    {
        // if (   input.param 
        //     && (   !input.param.output
        //         || !input.param.output.connected))
        //     pushUnique(after, input.node);

        pushUnique(after, getTerminalsAfterNode(input.node));
    }


    return after.length > 0 ? after : [];
}



function updateTerminalsAfterNodes(nodes, updateNodes)
{
    //const terminals = [];

    for (const node of nodes)
        pushUnique(updateNodes, getTerminalsAfterNode(node));

    //pushUpdate(null, terminals);
}



function getActiveInBranchFromNode(node, alreadyChecked = [])
{
    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;


    const nodeInputs = [...node.inputs.filter(i => i.connected)];

    if (    nodeInputs.length == 1
        && !nodeInputs[0].connectedOutput.param
        && !alreadyChecked.includes(nodeInputs[0].connectedOutput.node))
    {
        const leftActive = getActiveInBranchFromNode(
            nodeInputs[0].connectedOutput.node, 
            [...alreadyChecked, node]);

        if (leftActive) return leftActive;
    }


    const nodeOutputs = node.headerOutputs
        .filter(o => o.connectedInputs.length == 1);

    if (    nodeOutputs.length == 1
        && !nodeOutputs[0].connectedInputs[0].param
        && !alreadyChecked.includes(nodeOutputs[0].connectedInputs[0].node))
    {
        const rightActive = getActiveInBranchFromNode(
            nodeOutputs[0].connectedInputs[0].node, 
            [...alreadyChecked, node]);

        if (rightActive) return rightActive;
    }


    return null;
}



function getActiveFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveFromNode(node, alreadyChecked = [])
{
    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;


    const leftActive = getActiveBeforeNode(node, [...alreadyChecked]);
    if (leftActive) return leftActive;


    for (const output of node.headerOutputs)
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function getActiveBeforeNode(node, alreadyChecked = [])
{
    //  this is different from LeftOnly in that it will check the left node, 
    //  but then it will also check the right nodes of that left node

    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;


    for (const input of node.headerInputs)
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function getActiveOnlyBeforeNode(node, alreadyChecked = [])
{
    // this is different from Left in that it will only check left nodes

    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;


    for (const input of node.headerInputs)
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveOnlyBeforeNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function getActiveAfterNode(node, includeParams = false, alreadyChecked = [])
{
    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;


    const outputs = 
        includeParams 
        ? node.outputs 
        : node.headerOutputs;

    for (const output of outputs)
    {
        const connectedInputs = 
            includeParams 
            ? output.connectedInputs
            : output.connectedHeaderInputs;

        for (const input of connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveAfterNode(
                    input.node, 
                    includeParams,
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
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



function getActiveNodesFromNode(node, alreadyChecked = [])
{
    const activeNodes = [];


    if (node.active)
        activeNodes.push(node);


    for (const input of node.headerInputs)
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
            pushUnique(activeNodes, getActiveNodesFromNode(input.connectedOutput.node, [...alreadyChecked, node]));
    }


    for (const output of node.headerOutputs)
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
                pushUnique(activeNodes, getActiveNodesFromNode(input.node, [...alreadyChecked, node]));
        }
    }


    return activeNodes;
}