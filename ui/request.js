var nextRequestId =  0;
var curRequestId  = -1;



function pushUpdate(action, nodes, save = true)
{
    pushUpdateFromParam(action, nodes, null, save);
}



function pushUpdateFromParam(action, nodes, param, save = true)
{
    //console.trace();

    // first check if any nodes to the left are uncached
    // and replace in update array as necessary

    for (let i = nodes.length-1; i >= 0; i--)
    {
        const node               = nodes[i];
        const uncachedInputNodes = node.getUncachedInputNodes();
        
        if (!isEmpty(uncachedInputNodes))
        {
            removeFromArray(nodes, node);

            pushUnique(nodes, uncachedInputNodes);

            for (const uncached of uncachedInputNodes)
                pushUnique(nodes, getTerminalsAfterNode(uncached));

            param = null;
        }
    }

    
    const set =
          ((settings.showAllColorSpaces   ? 1 : 0) << 0)
        | ((settings.logRequests          ? 1 : 0) << 1)
        | ((settings.showTransformPoints  ? 1 : 0) << 2)
        | ((graphView.loadingNodes        ? 1 : 0) << 3)
        | ((graphView.showTooltipLongText ? 1 : 0) << 4)
        | ((graphView.showTooltipLists    ? 1 : 0) << 5);


    if (action)
        actionManager.updateActions.push(action);
        

    curRequestId = nextRequestId++;
    
    
    const request = 
    [
        curRequestId,
        action ? action.id : -1,
        set.toString(),
        settings.objectBatchSize.toString()
    ];




    if (param) request.push(param.node.id, param.id);
    else       request.push(NULL, NULL);


    request.push(viewportZoom);


    if (   !graphView.loadingNodes
        && !graphView.pastingNodes
        && !graphView.restoringNodes)
        nodes.forEach(n => n.invalidate());


    const terminals = [];
    nodes.forEach(n => pushUnique(terminals, getTerminalsAfterNode(n)));

    
    const uncachedInputNodes = [];
    terminals.forEach(n => pushUnique(uncachedInputNodes, n.getUncachedInputNodes()));
    uncachedInputNodes.forEach(n => pushUnique(terminals, getTerminalsAfterNode(n)));

    const progressNodes = [];
    nodes.forEach(n => pushUnique(progressNodes, getProgressNodesAfterNode(n)));


    const gen = createGenObject(
        param ? param.node : null,
        terminals);


    for (const node of terminals)
    {
        if (gen.passedNodes.includes(node))
            continue;

        request.push(...getNodeRequest(node, gen));
        
        pushUnique(gen.passedNodes, node);
    }


    for (const node of gen.paramNodes)
    {
        if (   !terminals.includes(node)
            && !gen.passedNodes.includes(node))
            request.push(...getNodeRequest(node, gen));
    }


    if (settings.logRawRequests)
        console.log(
            '%c%s%s', 
            'background: #60aa60; color: #cfd', 
            'raw request = ', 
            request.toString());


    uiQueueMessageToGenerator({
        cmd:     'genRequest',
        request:  request,
        save:     save
    });
}



function pushInputOrParam(input, gen)
{
    if (   input.connectedOutput.param
        && gen.markParams
        && gen.scope.at(-1).nodeId != input.connectedOutput.node.id)
    {
        pushUnique(gen.paramNodes, input.connectedOutput.node);

        return [ PARAM,
                 input.connectedOutput.types[0],
                 input.connectedOutput.node.id,
                 input.connectedOutput.param.id ];
    }
    else
        return input.connectedOutput.genRequest(gen);
}



function getNodeRequest(node, gen)
{
    const request = [];


    if (!isEmpty(node.headerOutputs))
    {
        node.headerOutputs
            .forEach(o =>
            {
                const _r = o.genRequest(gen);
                const  r = [..._r];
                request.push(...r);
            });
    }
    else
    {
        request.push(...node.genRequest(gen));
    }


    return request;
}