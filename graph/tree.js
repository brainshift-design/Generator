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


    for (const input of node.inputs)
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

    nodes = [...nodes, ...nodesBeforeNode(node)];
    nodes = [...nodes, ...getNodesAfterNode (node)];

    return nodes;
}


function nodesBeforeNode(node)
{
    let before = [];

    for (const input of node.inputs)
    {
        if (!before.includes(input.connectedOutput.node)) // avoid including diamond tips twice
            before.push(input.connectedOutput.node);
    
        before.push(...nodesBeforeNode(input.connectedOutput.node));
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



function terminalsAfterNode(node)
{
    let after = [];

    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (   input.param 
                && (   !input.param.output
                    || !input.param.output.connected))
                pushUnique(after, input.node);

            pushUnique(after, terminalsAfterNode(input.node));
        }
    }

    return after.length > 0 ? after : [node];
}



function terminalsAfterParam(param)
{
    if (!param.output)
        return terminalsAfterNode(param.node);


    let after = [];

    for (const input of param.output.connectedInputs)
    {
        if (   input.param 
            && (   !input.param.output
                || !input.param.output.connected))
            pushUnique(after, input.node);

        pushUnique(after, terminalsAfterNode(input.node));
    }

    return after.length > 0 ? after : [];
}



function updateTerminalsAfterNodes(nodes)
{
    const terminals = [];

    for (const node of nodes)
        pushUnique(terminals, terminalsAfterNode(node));

    pushUpdate(terminals);
}



function activeInBranchFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    const nodeInputs = [...node.inputs.filter(i => i.connected)];

    if (    nodeInputs.length == 1
        && !nodeInputs[0].connectedOutput.param
        && !alreadyChecked.includes(nodeInputs[0].connectedOutput.node))
    {
        const leftActive = activeInBranchFromNode(
            nodeInputs[0].connectedOutput.node, 
            [...alreadyChecked, node]);

        if (leftActive) return leftActive;
    }


    const nodeOutputs = node.outputs
        .filter(o => o.connectedInputs.length == 1)
        .filter(o => !o.param);

    if (    nodeOutputs.length == 1
        && !nodeOutputs[0].connectedInputs[0].param
        && !alreadyChecked.includes(nodeOutputs[0].connectedInputs[0].node))
    {
        const rightActive = activeInBranchFromNode(
            nodeOutputs[0].connectedInputs[0].node, 
            [...alreadyChecked, node]);

        if (rightActive) return rightActive;
    }


    return null;
}



function activeFromNodeId(nodeId, alreadyChecked = [])
{
    return activeFromNode(nodeFromId(nodeId), alreadyChecked);
}



function activeFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    const leftActive = activeLeftFromNode(node, [...alreadyChecked]);
    if (leftActive) return leftActive;


    for (const output of node.outputs.filter(o => !o.param))
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = activeFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function activeLeftFromNode(node, alreadyChecked = [])
{
    /*  This is different from LeftOnly in that it will check the left node, 
        but then it will also check the right nodes of that left node. */

    if (node.active) return node;


    for (const input of node.inputs.filter(i => !i.param))
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = activeFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function activeLeftOnlyFromNode(node, alreadyChecked = [])
{
    /*  This is different from Left in that it will only check left nodes. */

    if (node.active) return node;


    for (const input of node.inputs.filter(i => !i.param))
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = activeLeftOnlyFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function activeRightFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    for (const output of node.outputs.filter(o => !o.param))
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = activeRightFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function activeNodesRightFromNodeId(nodeId, alreadyChecked = [])
{
    const rightActive = [];
    
   
    const node = nodeFromId(nodeId);
    
    if (node.active) 
        rightActive.push(node);


    for (const output of node.outputs.filter(o => !o.param))
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                rightActive.push(...activeNodesRightFromNodeId(
                    input.node.id, 
                    [...alreadyChecked, node]));
            }
        }
    }


    return rightActive;
}



function activeNodesFromNodeId(nodeId, alreadyChecked = [])
{
    return activeNodesFromNode(nodeFromId(nodeId), alreadyChecked);
}



function activeNodesFromNode(node, alreadyChecked = [])
{
    const activeNodes = [];


    if (node.active)
        activeNodes.push(node);


    for (const input of node.inputs.filter(i => !i.param))
    {
        if (    input.connected
            && !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
            pushUnique(activeNodes, activeNodesFromNode(input.connectedOutput.node, [...alreadyChecked, node]));
    }


    for (const output of node.outputs.filter(o => !o.param))
    {
        for (const input of output.connectedInputs.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
                pushUnique(activeNodes, activeNodesFromNode(input.node, [...alreadyChecked, node]));
        }
    }


    return activeNodes;
}