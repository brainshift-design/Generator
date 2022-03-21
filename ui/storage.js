function uiGetLocalData(key, value)
{
    uiPostMessageToFigma({ 
        cmd: 'figGetLocalData', 
        key:  key
    });
}



function uiSetLocalData(key, value)
{
    uiPostMessageToFigma({ 
        cmd:  'figSetLocalData',
        key:   key,
        value: value
    });
}



function uiGetPageData(key)
{
    uiPostMessageToFigma({ 
        cmd: 'figGetPageData', 
        key:  key
    });
}



function uiSetPageData(key, value)
{
    uiPostMessageToFigma({ 
        cmd:  'figSetPageData', 
        key:   key,
        value: value
    });
}



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



///////////////////////////////////////////////////////////////////////////////////////////////////
   


function uiGetLocalDataReturn(msg)
{
    switch (msg.key)
    {
        case 'graphView':
            uiLoadGraphView(msg.value);
            break;
    }
}


function uiGetPageDataReturn(msg)
{
    // switch (msg.key)
    // {
    //     case '':
    //         break;
    // }
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function uiLoadGraphView(json)
{
    graphView.loadingNodes   = true;
    graphView.canUpdateNodes = false;
    

    // if (  !json
    //     || json == '')
    // {
    //     // set defaults
    //     //graphView.setPanAndZoom(point(0, 0), 1);
    //     finishLoading();
    //     return;
    // }


    const data = JSON.parse(json);
    //log(json);


    const pan = point( 
        parseFloat(data.panx), 
        parseFloat(data.pany));

    if (isNaN(pan.x)) pan.x = 0;
    if (isNaN(pan.y)) pan.y = 0;

    
    const zoom = parseFloat(data.zoom);
    if (isNaN(zoom)) zoom  = 1;


    graphView.setPanAndZoom(pan, zoom);


    graphView.showWires = data.showWires == 'true';
}



function uiLoadNodesAndConns(nodesJson, connsJson)
{
    graph.clear();

    const nodes = JSON.parse(nodesJson).map(n => JSON.parse(n));
    const conns = JSON.parse(connsJson).map(c => JSON.parse(c));

    //console.log('nodes', nodes);
    //console.log('conns', conns);

    loadNodesAsync(nodes, conns, setLoadingProgress);
}



// function saveGraph()
// {
//     const json = graph.toJson(); 
//     //log(json); 
//     uiSetPageData("graph", json);
// }



function setLoadingProgress(progress)
{
    loadingProgress.style.width = (progress * 100) + '%';
}



function loadNodesAsync(nodes, connections, setProgress)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    const chunkSize = 10; // nodes
    for (let i = 0; i < nodes.length; i += chunkSize)
    {
        promise = promise.then(_nodes => 
        {
            const res = resolveLoadNodes(
                nodes, 
                i, 
                Math.min(i + chunkSize, nodes.length), // exclusive
                _nodes);

            setProgress(i / (nodes.length + (connections ? connections.length : 0)));
            return res;
        });
    }


    promise.then(_nodes => 
    {
        graph.addNodes(_nodes, false, false);
        //uiSaveNodes(_nodes.map(n => n.id));

        loadConnectionsAsync(nodes, connections, _nodes, setProgress);    
    });
}



function loadConnectionsAsync(nodes, connections, _nodes, setProgress)
{
    let promise = Promise.resolve([]);


    if (connections)
    {
        const chunkSize = 10; // connections
        for (let i = 0; i < connections.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveLoadConnections(
                    nodes,
                    connections, 
                    i, 
                    Math.min(i + chunkSize, connections.length)); // exclusive

                setProgress((nodes.length + i) / nozero(nodes.length + connections.length * 19/20)); // the proportion is arbitrary
                return res;
            });
        }
    }


    promise.then(() => 
    {
        updateTerminalsAfterNodes(_nodes);
        finishLoading();
    });
}



function finishLoading()
{
    loadingOverlay.style.display = 'none';
    
    graphView.loadingNodes   = false;
    graphView.canUpdateNodes = true;
   
    
    updateToggleShowWiresButton();
    graphView.updateShowWires();

    
    // now that the graph is loaded, the auto save can start
    //setInterval(autoSave, 1000);
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



function resolveLoadConnections(nodes, _connections, first, last)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                if (   nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputOp)
                    && nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputOp))
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
    const node = createNode(_node.type);
    node.loading = true;

    node.id   = _node.id;
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

    return node;
}



function loadConnections(data, loadOutsideConnections, setProgress = null)
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



function uiSaveGraphView()
{
    uiSetLocalData('graphView', graphView.toJson());
}



function dataColorToJson(color, nTab)
{
    let   pos = ' '.repeat(nTab);
    const tab = '  ';

    let json =
          pos + tab + '[\n'
        + pos + tab + tab + '"'+color[0] +'",\n'
        + pos + tab + tab +     color[1] + ',\n'
        + pos + tab + tab +     color[2] + ',\n'
        + pos + tab + tab +     color[3] + '\n'
        + pos + tab + ']';

    return json;
}