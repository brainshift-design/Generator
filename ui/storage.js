function      uiGetLocalData(key)        { uiQueueMessageToFigma({ cmd:      'figGetLocalData', key: key               }); }
function      uiSetLocalData(key, value) { uiQueueMessageToFigma({ cmd:      'figSetLocalData', key: key, value: value }); }
function    uiClearLocalData(key)        { uiQueueMessageToFigma({ cmd:      'figSetLocalData', key: key, value: ''    }); }
function uiClearAllLocalData(key)        { uiQueueMessageToFigma({ cmd: 'figClearAllLocalData', key: key, value: ''    }); }

function       uiGetPageData(key)        { uiQueueMessageToFigma({ cmd:       'figGetPageData', key: key               }); } 
function       uiSetPageData(key, value) { uiQueueMessageToFigma({ cmd:       'figSetPageData', key: key, value: value }); }
function     uiClearPageData(key)        { uiQueueMessageToFigma({ cmd:       'figSetPageData', key: key, value: ''    }); }



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
   


function uiReturnFigGetLocalData(msg)
{
    switch (msg.key)
    {
        case 'minZoomForParams':
            if (!isNaN(msg.value))
                updateSetting(msg.key, parseFloat(msg.value));
    
            break;

        case 'dataMode':
        case 'debugMode':

        case 'autoConnectNewNodes':
        case 'enableZoomedOutParams':
        case 'showBoolValues':
        case 'showOperationResults':
        case 'showClearUndoWarning':
        case 'showDebugMenu':

        case 'showNodeId':       

        case 'enableBetaFeatures':       

        case 'logMessages':      
        case 'logActions':       

        case 'logLoading':       
        case 'logRequests':      
        case 'logValueUpdates':  
        case 'logObjectUpdates': 
        case 'logStyleUpdates': 

        case 'logRawLoadNodes':    
        case 'logRawLoadConnections':    

        case 'logRawSaveNodes': 
        case 'logRawSaveConnections': 

        case 'logRawRequests':   
        case 'logRawValues':     
            updateSettingAndMenu(
                msg.key, 
                msg.value, 
                msg.value 
                    ? parseBool(msg.value) 
                    : false,
                false); 

            break;

        case 'showWhatsNew':
            if (  !msg.value
                || parseInt(msg.value) < generatorVersion)
                showWhatsNewDialog();

            break;
    }


    if (    msg.key == 'dataMode'
        && !generatorStarted)
    {
        if (settings.dataMode)
        {
            dataModeView.style.display = 'block';
            initDataModeMenus();
        }
        else
            initGeneratorMenus();
     
        
        initCheckbox(chkCrashRestart, 'Restart in debug mode', settings.dataMode);
    
    
        onClassChange(document.childNodes[0], () =>
        { 
            initThemeColors();
            
            if (!settings.dataMode)
                graphView.graph.nodes.forEach(n => n.updateNode());
        });
    }


    if (!settings.dataMode)
    {
        if (msg.key == 'enableBetaFeatures')
            enableFeatures(true, settings.enableBetaFeatures); 

        if (msg.key == 'showDebugMenu')
            updateMenuItemShowDebugMenu();
    }

    
    if (   msg.key == 'logLoading'
        && settings.logLoading)
        uiLogAllSavedNodesAndConns();
}



function uiReturnFigGetPageData(msg)
{
    // switch (msg.key)
    // {
    // }
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function uiLoadGraphView(json)
{
    graphView.loadingNodes   = true;
    graphView.canUpdateNodes = false;
   
    let pan  = point(0, 0);
    let zoom = 1;

    
    if (json)
    {
        const data = JSON.parse(json);

        pan = point( 
            parseFloat(data.panx), 
            parseFloat(data.pany));

        if (isNaN(pan.x)) pan.x = 0;
        if (isNaN(pan.y)) pan.y = 0;

        
        zoom = parseFloat(data.zoom);
        if (isNaN(zoom)) zoom = 1;
    }


    graphView._zoom = zoom;
    graphView._pan  = pan;


    if (!settings.dataMode)
        graphView.updatePanAndZoom(true);
}



function uiReturnFigLoadNodesAndConns(msg)
{
    if (settings.logRawLoadNodes)
    {
        for (const json of msg.nodeJson)
        {
            console.log(
                '%cnodes JSON = %s', 
                'background: #fed',
                json.replaceAll('\\n', '\n')
                    .replaceAll('\\"', '"'));
        }
    }


    if (settings.logRawLoadConnections)
    {
        for (const json of msg.connJson)
        {
            console.log(
                '%cconnections JSON = %s', 
                'background: #fed',
                json.replaceAll('\\n', '\n')
                    .replaceAll('\\"', '"'));
        }
    }

    
    const _graphView          = msg.graphView;

    const _showAllColorSpaces = msg.showAllColorSpaces;


    uiLoadGraphView(_graphView);

    updateSettingAndMenu(
        'showAllColorSpaces',
        _showAllColorSpaces, 
        _showAllColorSpaces ? parseBool(_showAllColorSpaces) : false,
        false); 


    let   _nodeKeys  = msg.nodeKeys;
    let   _nodes     = msg.nodeJson;

    let   _connKeys  = msg.connKeys;
    let   _conns     = msg.connJson;

    
    const _n = [];
    const _c = [];

    for (let i = 0; i < _nodes.length; i++) _n.push({key: _nodeKeys[i], value: _nodes[i]});
    for (let i = 0; i < _conns.length; i++) _c.push({key: _connKeys[i], value: _conns[i]});
    

    _n.sort((a, b) => a.value.z - b.value.z);


    if (settings.dataMode)
    {
        loadNodesAndConnsData(_n, _c);
    }
    else
    {
        _nodes = _nodes.map(n => JSON.parse(n));
        _conns = _conns.map(c => JSON.parse(c));
            
        graphView.graph.clear();

        loadNodesAndConnsAsync(_nodes, _conns, setLoadingProgress);
    }
}



function setLoadingProgress(progress)
{
    if (graphView.loadingNodes) 
        progress *= 0.7;

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
        if (dataModeTimeout) clearTimeout(dataModeTimeout);
        dataModeTimeout = setTimeout(() => chkLoadingRestart.style.display = 'inline-block', 5000);

        promise = promise.then(nodes => 
        {
            const res = resolveNodes(
                _nodes, 
                i, 
                Math.min(i + chunkSize, _nodes.length), // exclusive
                nodes,
                false);

            setProgress(i / (_nodes.length + (_conns ? _conns.length : 0)));
            return res;
        });
    }


    promise.then(nodes => 
    {
        graphView.graph.addNodes(nodes, false, false);
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
            if (c1.inputNodeId != c2.inputNodeId ) return c1.inputNodeId < c2.inputNodeId ? -1 : 1;
            if (c1.inputId     != c2.inputId     ) return c1.inputId     < c2.inputId     ? -1 : 1;
            
            if (c1.inputNodeId == c2.outputNodeId) return -1;
            if (c2.inputNodeId == c1.outputNodeId) return  1;

            return 0;
        });


        if (dataModeTimeout) clearTimeout(dataModeTimeout);
        dataModeTimeout = setTimeout(() => chkLoadingRestart.style.display = 'inline-block', 5000);

        const chunkSize = 10; // connections
        for (let i = 0; i < _conns.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveConnections(
                    graphView.graph,
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
        const updateNodes = [];
        
        finishLoadingNodes(_nodes, loadedNodes, updateNodes);
        finishLoading(_nodes);
        
        pushUpdate(null, updateNodes);
    });
}



function finishLoading(_nodes)
{
    if (isEmpty(_nodes))
    {
        clearTimeout(dataModeTimeout);
        dataModeTimeout = null;

        loadingOverlay.style.display = 'none'; // uncomment to monitor loading of slow nodes
    }


    graphView.canUpdateNodes = true;
    graphView.updateShowWires(false);

    generatorStarted = true;


    enableFeatures(productKey != NULL, settings.enableBetaFeatures); 


    window.focus();
}



function finishLoadingNodes(_nodes, loadedNodes, updateNodes, duplicates = false)
{
    _nodes
        .filter(_n => _n.active)
        .map(_n => graphView.graph.nodeFromId(duplicates ? _n.newId : _n.id))
        .forEach(n => n.makeActive());

    //graphView.updateNodeTransforms(loadedNodes);

    updateTerminalsAfterNodes(loadedNodes, updateNodes);
}



function resolveNodes(_nodes, first, last, nodes, pasting)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
                nodes.push(loadNode(_nodes[i], pasting));

            resolve(nodes);
        }));
}



function resolveConnections(graph, nodes, _connections, first, last)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                const outputNode = nodes.find(n => (n.newId ?? n.id) == _conn.outputNodeId);
                const  inputNode = nodes.find(n => (n.newId ?? n.id) == _conn. inputNodeId);


                const strConn = connToString(_conn);

                if (!outputNode)
                { 
                    uiError('Cannot connect  ' + strConn + ',  \'' + _conn.outputNodeId + '\' not found'); 
                    continue; 
                }

                if (!inputNode) 
                { 
                    uiError('Cannot connect  ' + strConn + ',  \'' + _conn.inputNodeId + '\' not found'); 
                    continue; 
                }


                parseConnectionJsonAndConnect(graph, _conn, false);
            }

            resolve();
        }));
}



function loadNodes(data, pasting)
{
    const nodes = [];
    
    for (let i = 0; i < data.nodes.length; i++)
        nodes.push(loadNode(data.nodes[i], pasting));

    return nodes;
}



function loadNode(_node, pasting)
{
    const node = createNode(_node.type);
    node.div.style.display = 'none';


    node.loadFromParsedJson(_node, pasting);

    node.setPosition(
        parseFloat(_node.x), 
        parseFloat(_node.y),
        false);

        
    return node;
}



function parseConnectionsAndConnect(graph, data, pasteConnected, setProgress = null)
{
    data.connections.sort((c1, c2) =>
    {
        if (c1.outputOrder != c2.outputOrder) return c1.outputOrder - c2.outputOrder;
        if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
        if (c1.inputId     != c2.inputId    ) return c1.inputId     - c2.inputId;
        return 0;
    });


    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];
        
        if (      data.nodes.find(n => (n.newId ?? n.id) == _conn.outputNodeId)
               && data.nodes.find(n => (n.newId ?? n.id) == _conn. inputNodeId)
            || pasteConnected)
            parseConnectionJsonAndConnect(graph, _conn, pasteConnected);

        if (setProgress)
            setProgress(((data.nodes.length + i) / (data.nodes.length + data.connections.length)));
    }
}



function uiSaveGraphView()
{
    uiSetPageData(currentUser.id + ',graphView', graphView.toJson());
}



function dataColorToJson(color, nTab)
{
    let   pos = ' '.repeat(nTab);
    const tab = TAB;

    let json =
          pos + tab + '[\n'
        + pos + tab + tab + '"'+color[0] +'",\n'
        + pos + tab + tab +     color[1] + ',\n'
        + pos + tab + tab +     color[2] + ',\n'
        + pos + tab + tab +     color[3] +  '\n'
        + pos + tab + ']';

    return json;
}