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



function getAllNodesBeforeNode(node, ignore)
{
    const before = [];


    for (const input of node.inputs.filter(i => i.isConnected))
    {
        const op = input.connectedOutput.op;


        if (!before.includes(op)) before.push(op);
        if (!ignore.includes(op)) ignore.push(op);
   

        const _before = getAllNodesBeforeNode(op, ignore);

        for (const b of _before)
            if (!before.includes(b)) 
                before.push(b);


        for (const output of op.outputs)
        {
            for (const _input of output.connectedInputs)
            {
                if (_input == input)
                    continue;

                const _after = getAllNodesAfterNode(op, ignore);

                for (const a in _after) 
                    if (!before.includes(a))
                        before.push(a);
            }
        }
    }


    return before;
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



function getAllNodesAfterNode(node, ignore)
{
    const after = [];


    for (const output of node.outputs)
    {
        for (const input of output.connectedInputs)
        {
            if (!after .includes(input.op)) after .push(input.op);
            if (!ignore.includes(input.op)) ignore.push(input.op);


            const _after = getAllNodesAfterNode(input.op, ignore);

            for (const a of _after)
                if (!after.includes(a)) 
                    after.push(a);


            for (const _input of input.op.inputs.filter(i => i.isConnected))
            {
                if (_input.connectedOutput == output)
                    continue;

                const _before = getAllNodesBeforeNode(input.op, ignore);

                for (const b in _before) 
                    if (!after.includes(b)) 
                        after.push(b);
            }
        }
    }


    return after;
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