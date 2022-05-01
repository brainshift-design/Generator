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



function uiClearLocalData(key)
{
    uiPostMessageToFigma({ 
        cmd:  'figSetLocalData',
        key:   key,
        value: ''
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



function uiClearPageData(key)
{
    uiPostMessageToFigma({ 
        cmd:  'figSetPageData', 
        key:   key,
        value: ''
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
   

    const data = JSON.parse(json);
    //console.log(json);


    const pan = point( 
        parseFloat(data.panx), 
        parseFloat(data.pany));

    if (isNaN(pan.x)) pan.x = 0;
    if (isNaN(pan.y)) pan.y = 0;

    
    const zoom = parseFloat(data.zoom);
    if (isNaN(zoom)) zoom  = 1;


    graphView.setPanAndZoom(pan, zoom);

    graphView.showWires = isTrue(data.showWires);
}



function uiLoadNodesAndConns(nodesJson, connsJson, activeJson)
{
    graph.clear();

    const nodes = JSON.parse( nodesJson).map(n => JSON.parse(n));
    const conns = JSON.parse( connsJson).map(c => JSON.parse(c));

    loadNodesAndConnsAsync(nodes, conns, setLoadingProgress);
}



function setLoadingProgress(progress)
{
    loadingProgress.style.width = (progress * 100) + '%';
}



function loadNodesAndConnsAsync(_nodes, _conns, setProgress)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    const chunkSize = 10; // nodes
    for (let i = 0; i < _nodes.length; i += chunkSize)
    {
        promise = promise.then(nodes => 
        {
            const res = resolveLoadNodes(
                _nodes, 
                i, 
                Math.min(i + chunkSize, _nodes.length), // exclusive
                nodes);

            setProgress(i / (_nodes.length + (_conns ? _conns.length : 0)));
            return res;
        });
    }


    promise.then(nodes => 
    {
        graph.addNodes(nodes, false, false);
        loadConnectionsAsync(_nodes, _conns, nodes, setProgress);    
    });
}



function loadConnectionsAsync(_nodes, _conns, loadedNodes, setProgress)
{
    let promise = Promise.resolve([]);
    
    if (_conns)
    {
        // variable inputs connections must be sorted by input index
        // as well as connection position left to right

        _conns.sort((c1, c2) => 
        {
            if (c1.inputNodeId == c2.outputNodeId) return -1;
            if (c2.inputNodeId == c1.outputNodeId) return  1;

            if (c1.inputNodeId != c2.inputNodeId ) return c1.inputNodeId - c2.inputNodeId;
            if (c1.inputIndex  != c2.inputIndex  ) return c1.inputIndex  - c2.inputIndex;
            
            return 0;
        });


        const chunkSize = 10; // connections
        for (let i = 0; i < _conns.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveLoadConnections(
                    _nodes,
                    _conns, 
                    i, 
                    Math.min(i + chunkSize, _conns.length)); // exclusive

                setProgress((_nodes.length + i) / nozero(_nodes.length + _conns.length * 19/20)); // the proportion is arbitrary
                return res;
            });
        }
    }


    promise.then(() => 
    {
        finishLoading();

        _nodes
            .filter(n => n.active)
            .map(n => nodeFromId(n.id))
            .forEach(n => n.makeActive());

        updateTerminalsAfterNodes(loadedNodes);
    });
}



function finishLoading()
{
    loadingOverlay.style.display = 'none';
    
    graphView.loadingNodes   = false;
    graphView.canUpdateNodes = true;
    
    updateToggleShowWiresButton();
    graphView.updateShowWires(false);
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
                const _conn      = _connections[i];
                const outputNode = nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputNodeId);
                const  inputNode = nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputNodeId);

                if (!outputNode) { uiError('node \'' + _conn.outputNodeId + '\' not found'); continue; }
                if (! inputNode) { uiError('node \'' + _conn. inputNodeId + '\' not found'); continue; }

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
    //node.loading = true;

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
        
        if (      data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputNode)
               && data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputNode)
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