// function saveToLocalFile(filename, str) 
// {
//     const link = document.createElement('a');
//     link.style.display = 'none';
    
//     link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
//     link.setAttribute('download', filename);
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }



function saveGraph()
{
    const json = graph.toJson(); 
    //log(json); 
    uiSetPluginData("graph", json);
}



function loadGraph(json)
{
    graphView.loadingNodes   = true;
    graphView.canUpdateNodes = false;


    graph.clear();
    
    const data = JSON.parse(json);
    //log(json);


    const pan = { 
        x: parseFloat(data.panx), 
        y: parseFloat(data.pany) };

    const zoom = parseFloat(data.zoom);

    if (isNaN(pan.x)) pan.x = 0;
    if (isNaN(pan.y)) pan.y = 0;

    if (isNaN(zoom))  zoom  = 1;

    graphView.setPanAndZoom(pan, zoom);


    graphView.showWires = data.showWires == 'true';


    loadNodesAsync(data, setLoadingProgress);
}



function setLoadingProgress(progress)
{
    loadingProgress.style.width = (progress * 100) + '%';
}



function loadNodesAsync(data, setProgress)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    const chunkSize = 10; // nodes
    for (let i = 0; i < data.nodes.length; i += chunkSize)
    {
        promise = promise.then(nodes => 
        {
            const res = resolveLoadNodes(
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
        loadConnectionsAsync(data, nodes, setProgress);    
    });
}



function loadConnectionsAsync(data, nodes, setProgress)
{
    let promise = Promise.resolve([]);


    if (data.connections)
    {
        const chunkSize = 10; // connections
        for (let i = 0; i < data.connections.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveLoadConnections(
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
        graphView.canUpdateNodes = true;

        //nodes.forEach(n => n.updateNode());
        updateTerminalsAfterNodes(nodes);

        graphView.updateShowWires();
        graphView.updatePanAndZoom();
        graphView.updateNodeTransforms(nodes);
        graphView.updateScroll();

        loadingOverlay.style.display = 'none';

        graphView.loadingNodes = false;
    });
}



function resolveLoadNodes(_nodes, first, last, nodes)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
                nodes.push(loadNode(_nodes[i]));

            resolve(nodes);
        }));
}



function resolveLoadConnections(_connections, first, last, data)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                if (   data.nodes.find(n => (n.newName ? n.newName : n.name) == _conn.outputOp)
                    && data.nodes.find(n => (n.newName ? n.newName : n.name) == _conn. inputOp)
                    || loadOutsideConnections)
                    Connection.parseJson(_conn);
            }

            resolve();
        }));
}



function loadNodes(data)
{
    const nodes = [];
    
    for (let i = 0; i < data.nodes.length; i++)
        nodes.push(loadNode(data.nodes[i]));

    return nodes;
}



function loadNode(_node)
{
    const node = graph.createNode(_node.type);

    node.name = _node.name;

    if (_node.labelOffset)
        node.labelOffsetFactor = parseFloat(_node.labelOffset);

    if (  _node.params
        || node.alwaysLoadParams)
        node.loadParams(_node);

    setNodePosition(
        node, 
        parseFloat(_node.x), 
        parseFloat(_node.y),
        false);

    node.loaded = true;

    return node;
}



function loadConnections(data, loadOutsideConnections, setProgress = null)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];
        
        if (      data.nodes.find(n => (n.newName ? n.newName : n.name) == _conn.outputOp)
               && data.nodes.find(n => (n.newName ? n.newName : n.name) == _conn. inputOp)
            || loadOutsideConnections)
            Connection.parseJson(_conn);

        if (setProgress)
            setProgress(((data.nodes.length + i) / (data.nodes.length + data.connections.length)));
    }
}



function autoSave()
{
    uiSetPluginData('graph', graph.toJson());
}