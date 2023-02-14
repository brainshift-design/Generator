function legacyLoadGraph(json)
{
    graphView.loadingNodes   = true;
    graphView.canUpdateNodes = false;


    const data = JSON.parse(json);
    //console.log('legacy json =', json);


    const pan = point( 
        parseFloat(data.panx), 
        parseFloat(data.pany));

    if (isNaN(pan.x)) pan.x = 0;
    if (isNaN(pan.y)) pan.y = 0;

    
    const zoom = parseFloat(data.zoom);
    if (isNaN(zoom)) zoom  = 1;


    graphView.setPanAndZoom(pan, zoom);


    legacyLoadNodesAsync(data, setLoadingProgress);
}



function legacyLoadNodesAsync(data, setProgress)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    const chunkSize = 10; // nodes
    for (let i = 0; i < data.nodes.length; i += chunkSize)
    {
        promise = promise.then(nodes => 
        {
            const res = legacyResolveLoadNodes(
                data.nodes, 
                i, 
                Math.min(i + chunkSize, data.nodes.length), // exclusive
                nodes);

            setProgress(i / (data.nodes.length + (data.connections ? data.connections.length : 0)));
            return res;
        });
    }


    promise.then(nodes => 
    {
        graph.addNodes(nodes, false, false);
        legacyLoadConnectionsAsync(data, nodes, nodes, setProgress);    
    });
}



function legacyLoadConnectionsAsync(data, nodes, loadedNodes, setProgress)
{
    let promise = Promise.resolve([]);


    if (data.connections)
    {
        const chunkSize = 10; // connections
        for (let i = 0; i < data.connections.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = legacyResolveLoadConnections(
                    data.connections, 
                    i, 
                    Math.min(i + chunkSize, data.connections.length), // exclusive
                    data);

                setProgress((data.nodes.length + i) / nozero(data.nodes.length + data.connections.length * 19/20)); // the proportion is arbitrary
                return res;
            });
        }
    }


    promise.then(() => 
    {
        uiSaveNodes(loadedNodes.map(n => n.id));

        const updateNodes = [];
        finishLoadingNodes(nodes, loadedNodes, updateNodes);
        finishLoading(nodes);
        
        pushUpdate(null, updateNodes);
    });
}



function legacyResolveLoadNodes(_nodes, first, last, nodes)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
                nodes.push(legacyLoadNode(_nodes[i]));

            resolve(nodes);
        }));
}



function legacyResolveLoadConnections(_connections, first, last, data)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                if (   data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputOp)
                    && data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputOp)
                    || loadOutsideConnections)
                    legacyParseConnectionJsonAndConnect(_conn, false);
            }

            resolve();
        }));
}



function legacyLoadNodes(data)
{
    const nodes = [];
    
    for (let i = 0; i < data.nodes.length; i++)
        nodes.push(legacyLoadNode(data.nodes[i]));

    return nodes;
}



function legacyLoadNode(_node)
{
    const node = createNode(_node.type);
    node.loading = true;

    node.id   = _node.id;
    node.name = _node.name;

    if (_node.labelOffset)
        node.labelOffsetFactor = parseFloat(_node.labelOffset);

    if (  _node.params
        || node.alwaysLoadParams)
        node.legacyLoadParams(_node);

    setNodePosition(
        node, 
        parseFloat(_node.x), 
        parseFloat(_node.y),
        false);

    return node;
}



function legacyLoadConnections(data, loadOutsideConnections, setProgress = null)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];
        
        if (      data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputOp)
               && data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputOp)
            || loadOutsideConnections)
            Connection.parseJson(_conn);

        if (setProgress)
            setProgress(((data.nodes.length + i) / (data.nodes.length + data.connections.length)));
    }
}