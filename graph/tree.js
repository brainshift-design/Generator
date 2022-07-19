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

console.log('nodes =', nodes);
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
    {
        for (const input of output.connectedInputs)
        {
            if (   input.param 
                && (   !input.param.output
                    || !input.param.output.connected))
                pushUnique(after, input.node);

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
        if (   input.param 
            && (   !input.param.output
                || !input.param.output.connected))
            pushUnique(after, input.node);

        pushUnique(after, getTerminalsAfterNode(input.node));
    }

    return after.length > 0 ? after : [];
}



function updateTerminalsAfterNodes(nodes)
{
    const terminals = [];

    for (const node of nodes)
        pushUnique(terminals, getTerminalsAfterNode(node));

    pushUpdate(terminals);
}



function getActiveNodeInBranchFrom(node, alreadyChecked = [])
{
    if (node.active) return node;


    const nodeInputs = [...node.inputs.filter(i => i.connected)];

    if (    nodeInputs.length == 1
        && !alreadyChecked.includes(nodeInputs[0].connectedOutput.node))
    {
        const leftActive = getActiveNodeInBranchFrom(
            nodeInputs[0].connectedOutput.node, 
            [...alreadyChecked, node]);

        if (leftActive) return leftActive;
    }


    const nodeOutputs = [...node.outputs.filter(o => o.connectedInputs.length == 1)];

    if (    nodeOutputs.length == 1
        && !alreadyChecked.includes(nodeOutputs[0].connectedInputs[0].node))
    {
        const rightActive = getActiveNodeInBranchFrom(
            nodeOutputs[0].connectedInputs[0].node, 
            [...alreadyChecked, node]);

        if (rightActive) return rightActive;
    }


    return null;
}



function getActiveNodeInTreeFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodeInTreeFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodeInTreeFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    const leftActive = getActiveNodeLeftInTreeFromNode(node, [...alreadyChecked]);
    if (leftActive) return leftActive;


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveNodeInTreeFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function getActiveNodeLeftInTreeFromNode(node, alreadyChecked = [])
{
    /*  This is different from LeftOnly in that it will check the left node, 
        but then it will also check the right nodes of that left node. */

    if (node.active) return node;


    for (const input of node.inputs)
    {
        if (    input.connected
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveNodeInTreeFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function getActiveNodeLeftOnlyInTreeFromNode(node, alreadyChecked = [])
{
    /*  This is different from Left in that it will only check left nodes. */

    if (node.active) return node;


    for (const input of node.inputs)
    {
        if (    input.connected
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveNodeLeftOnlyInTreeFromNode(
                input.connectedOutput.node, 
                [...alreadyChecked, node]);

            if (leftActive) return leftActive;
        }
    }


    return null;
}



function getActiveNodeRightInTreeFromNode(node, alreadyChecked = [])
{
    if (node.active) return node;


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveNodeRightInTreeFromNode(
                    input.node, 
                    [...alreadyChecked, node]);

                if (rightActive) return rightActive;
            }
        }
    }


    return null;
}



function getActiveNodesRightInTreeFromNodeId(nodeId, alreadyChecked = [])
{
    const rightActive = [];
    
   
    const node = nodeFromId(nodeId);
    
    if (node.active) 
        rightActive.push(node);


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                rightActive.push(...getActiveNodesRightInTreeFromNodeId(
                    input.node.id, 
                    [...alreadyChecked, node]));
            }
        }
    }


    return rightActive;
}



function getActiveNodesInTreeFromNodeId(nodeId, alreadyChecked = [])
{
    return getActiveNodesInTreeFromNode(nodeFromId(nodeId), alreadyChecked);
}



function getActiveNodesInTreeFromNode(node, alreadyChecked = [])
{
    const activeNodes = [];


    if (node.active)
        activeNodes.push(node);


    for (const input of node.inputs)
    {
        if (    input.connected
            && !alreadyChecked.includes(input.connectedOutput.node))
            pushUnique(activeNodes, getActiveNodesInTreeFromNode(input.connectedOutput.node, [...alreadyChecked, node]));
    }


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
                pushUnique(activeNodes, getActiveNodesInTreeFromNode(input.node, [...alreadyChecked, node]));
        }
    }


    return activeNodes;
}



// function validateActiveNodesInTrees(nodes)
// {
//     const treeNodes = [];

//     for (const node of nodes)
//     {
//         const found = treeNodes.find(n => areConnected(n, node));
//         if (!found) treeNodes.push(node);
//     }

//     for (const node of treeNodes)
//     {
//         if (!getActiveNodeLeftInTreeFromNode(node))
//             getTerminalsAfterNode(node).forEach(n => uiMakeNodeActive(n));
//     }
// }