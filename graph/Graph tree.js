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
    return [...getNodesBeforeNode(node),
            ...getNodesAfterNode (node)];
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



function getProgressNodesAfterNode(node, stackOverflowProtect = 100)
{
    let after = [];

    if (stackOverflowProtect <= 0)
        return after;

    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (input.node.hasProgressBar)
                pushUnique(after, input.node);

            pushUnique(after, getProgressNodesAfterNode(input.node, stackOverflowProtect-1));
        }
    }

    return after;
}



function getTerminalsInNodes(nodes)
{
    return nodes.filter(n => 
           !n.outputs.find(o => o.connected)
        || !n.outputs.find(o => arraysIntersect(
               o.connectedInputs.map(i => i.node),
               nodes)));
}



function getTerminalsAfterNode(node, except = [], stackOverflowProtect = 100)
{
    if (stackOverflowProtect <= 0)
        return [];
    
    
    let after = [];

    
    if (node.type == COMPOUND)
    {
        for (const input of node.inputs)
            pushUnique(after, getTerminalsAfterNode(input.paramNode, except, stackOverflowProtect-1));
            
        for (const output of node.outputs) 
            for (const input of output.connectedInputs) 
                pushUnique(after, getTerminalsAfterNode(input.node, except, stackOverflowProtect-1));//input.node);
    }

    else if (node.type == COMPOUND_PARAM)
    {
        // if (   !isEmpty(node.inputs)
        //     && !isEmpty(node.outputs))
        // {
        //     pushUnique(after, node);
        // }

        //else 
        if (!isEmpty(node.outputs))
        {
            const afterNode = [];

            for (const output of node.outputs)
            {
                for (const input of output.connectedInputs)
                    pushUnique(afterNode, getTerminalsAfterNode(input.node, except, stackOverflowProtect-1));
            }

            if (isEmpty(afterNode))
               pushUnique(afterNode, node);

            pushUnique(after, afterNode);
        }

        
        if (!isEmpty(node.inputs))
        {
            const afterGroupNode = [];

            for (const output of node.compoundNode.outputs)
            {
                for (const input of output.connectedInputs)
                    pushUnique(afterGroupNode, getTerminalsAfterNode(input.node, except, stackOverflowProtect-1));
            }

            if (isEmpty(afterGroupNode))
                pushUnique(afterGroupNode, node.compoundNode);

            pushUnique(after, afterGroupNode);
        }
    }
    
    else
    {
        for (const output of node.outputs)
        {
            for (const input of output.connectedInputs)
                if (!except.includes(input.node.id))
                    pushUnique(after, getTerminalsAfterNode(input.node, except, stackOverflowProtect-1));
        }
    }


    if (    node.type == NUMBER_SOLVE
        &&  node.headerInputs[0].connected
        && !except.includes(node.headerInputs[0].connectedOutput.node.id))
    {
        const terminals = getTerminalsAfterNode(
            node.headerInputs[0].connectedOutput.node, 
            [node.headerInputs[0].connectedOutput.node.id], 
            stackOverflowProtect-1);

        pushUnique(after, terminals);
    }


    return !isEmpty(after) 
          ? after 
          : [node];
}



function getTerminalsAfterParam(param)
{
    if (!param.output)
        return getTerminalsAfterNode(param.node);


    let after = [];

    for (const input of param.output.connectedInputs)
        pushUnique(after, getTerminalsAfterNode(input.node));


    return !isEmpty(after) ? after : [];
}



function updateTerminalsAfterNodes(nodes, updateNodes)
{
    for (const node of nodes)
        pushUnique(updateNodes, getTerminalsAfterNode(node));
}



function getActiveInBranchFromNode(node, alreadyChecked = [])
{
    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;

    pushUnique(alreadyChecked, node);


    const nodeInputs = [...node.inputs.filter(i => i.connected)];

    if (    nodeInputs.length == 1
        && !nodeInputs[0].connectedOutput.param
        && !alreadyChecked.includes(nodeInputs[0].connectedOutput.node))
    {
        const leftActive = getActiveInBranchFromNode(
            nodeInputs[0].connectedOutput.node, 
            alreadyChecked);

        if (leftActive) return leftActive;
    }


    const nodeOutputs = node.outputs//headerOutputs
        .filter(o => o.connectedInputs.length == 1);

    if (    nodeOutputs.length == 1
        && !nodeOutputs[0].connectedInputs[0].param
        && !alreadyChecked.includes(nodeOutputs[0].connectedInputs[0].node))
    {
        const rightActive = getActiveInBranchFromNode(
            nodeOutputs[0].connectedInputs[0].node, 
            alreadyChecked);

        if (rightActive) return rightActive;
    }


    return null;
}



function getActiveFromNode(node, alreadyChecked = [])
{
    if (    node.active
        && !alreadyChecked.includes(node)) 
        return node;

    pushUnique(alreadyChecked, node);


    const leftActive = getActiveBeforeNode(node, alreadyChecked);
    if (leftActive) return leftActive;


    for (const output of node.outputs)//headerOutputs)
    {
        for (const input of output.connectedInputs)//.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
            {
                const rightActive = getActiveFromNode(
                    input.node, 
                    alreadyChecked);

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

    pushUnique(alreadyChecked, node);


    for (const input of node.inputs)//headerInputs)
    {
        if (    input.connected
            //&& !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveFromNode(
                input.connectedOutput.node, 
                alreadyChecked);

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

    pushUnique(alreadyChecked, node);


    for (const input of node.inputs)//headerInputs)
    {
        if (    input.connected
            //&& !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
        {
            const leftActive = getActiveOnlyBeforeNode(
                input.connectedOutput.node, 
                alreadyChecked);

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

    pushUnique(alreadyChecked, node);


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

        for (const input of connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const activeAfter = getActiveAfterNode(
                    input.node, 
                    includeParams,
                    alreadyChecked);

                if (activeAfter) return activeAfter;
            }
        }
    }


    return null;
}



function getListAfterNode(node, includeParams = false, alreadyChecked = [])
{
    if (    node.type == ITEMS
        && !alreadyChecked.includes(node)) 
        return node;

    pushUnique(alreadyChecked, node);


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

        for (const input of connectedInputs)
        {
            if (!alreadyChecked.includes(input.node))
            {
                const listAfter = getListAfterNode(
                    input.node, 
                    includeParams,
                    alreadyChecked);

                if (listAfter) return listAfter;
            }
        }
    }


    return null;
}



function getActiveNodesFromNode(node, alreadyChecked = [])
{
    const activeNodes = [];


    if (node.active)
        activeNodes.push(node);

    pushUnique(alredyChecked, node);


    for (const input of node.inputs)//headerInputs)
    {
        if (    input.connected
            //&& !input.connectedOutput.param
            && !alreadyChecked.includes(input.connectedOutput.node))
            pushUnique(activeNodes, getActiveNodesFromNode(input.connectedOutput.node, alreadyChecked));
    }


    for (const output of node.outputs)//headerOutputs)
    {
        for (const input of output.connectedInputs)//.filter(i => !i.param))
        {
            if (!alreadyChecked.includes(input.node))
                pushUnique(activeNodes, getActiveNodesFromNode(input.node, alreadyChecked));
        }
    }


    return activeNodes;
}