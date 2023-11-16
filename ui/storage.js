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
   


async function uiReturnFigGetLocalData(msg)
{
    switch (msg.key)
    {
        case 'minZoomForParams':
            if (!isNaN(msg.value))
                updateSetting(msg.key, parseFloat(msg.value));
    
            break;

        case 'dataMode':
        case 'debugMode':

        case 'enableZoomedOutParams':
        case 'showPages':
        case 'showNodeIcons':
        case 'showBoolValues':
        case 'showColorLegendInMenus':
        case 'showOperationResults':
        case 'showClearUndoWarning':
        case 'shareUsageMetrics':
        case 'showDebugMenu':

        case 'showNodeId':       
        case 'showTransformPoints':       
        case 'enableAsserts':       

        case 'showTooltipLongText':
        case 'showTooltipColorInterpolation':
        case 'showTooltipColorBlindness':
        case 'showTooltipColorContrast':

        //case 'enableBetaFeatures':       

        case 'logThreadMessages':      
        case 'logDataMessages':      
        case 'logMessages':     

        case 'logActions':       

        case 'logLoading':       
        case 'logRequests':      
        case 'logValueUpdates':  
        case 'logObjectUpdates': 
        case 'logStyleUpdates': 

        case 'logRawLoadPages':    
        case 'logRawLoadNodes':    
        case 'logRawLoadConnections':    

        case 'logRawSavePages': 
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

        case 'canvasEmpty':
            if (msg.value)
                loadPresetGraph('targets');
            
            if (!tutorialsShown)
            {
                findTutorials.style.display = 'block';
                tutorialsShown = true;
            }
                
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
     
        
        onClassChange(document.childNodes[0], () =>
        { 
            initThemeColors();

            if (!settings.dataMode)
            {
                graph.nodes.forEach(n => n.updateNode());
                graphView.updateNodeWireTransforms(graph.nodes);
            }
        });
    }


    if (!settings.dataMode)
    {
        // if (msg.key == 'enableBetaFeatures')
            //enableFeatures(true, settings.enableBetaFeatures); 

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



function uiReturnFigLoadNodesAndConns(msg)
{
    if (settings.logRawLoadNodes)
    {
        for (const json of msg.nodeJson)
        {
            console.log(
                '%cnodes JSON = \n%s', 
                'background: #fed; color: black;',
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

    
    const _showAllColorSpaces = msg.showAllColorSpaces;


    updateSettingAndMenu(
        'showAllColorSpaces',
        _showAllColorSpaces, 
        _showAllColorSpaces ? parseBool(_showAllColorSpaces) : false,
        false); 


    graphView.loadingNodes   = true;
    graphView.canUpdateNodes = false;


    if (!isEmpty(msg.pageKeys))
    {
        if (settings.logRawLoadPages)
        {
            for (const json of msg.pageJson)
            {
                console.log(
                    '%cpages JSON = %s', 
                    'background: #fee; color: black;',
                    json.replaceAll('\\n', '\n')
                        .replaceAll('\\"', '"'));
            }
        }


        const pages = [];

        for (let i = 0; i < msg.pageKeys.length; i++)
        {
            const page = new GraphPage();
            page.load(msg.pageJson[i]);
            pages.push(page);
        }

        
        for (const id of msg.pageOrder)
            graph.addPage(pages.find(p => p.id == id));


        //console.log('msg.currentPageId =', msg.currentPageId);
        graph.pageIndex = graph.pages.findIndex(p => p.id == msg.currentPageId);

        if (graph.pageIndex < 0) // for cases where the pages were corrupted
            graph.pageIndex = 0; // because of a crash or a bug
    }
    else
    {
        graph.createPage('');
        graph.updateSavedPages();
    }



    if (!settings.dataMode)
        graphView.updatePanAndZoom(true);


    let _pageKeys = msg.pageKeys;
    let _pages    = msg.pageJson;

    let _nodeKeys = msg.nodeKeys;
    let _nodes    = msg.nodeJson;

    let _connKeys = msg.connKeys;
    let _conns    = msg.connJson;

    
    const _p = [];
    const _n = [];
    const _c = [];

    for (let i = 0; i < _pages.length; i++) _p.push({key: _pageKeys[i], value: _pages[i]});
    for (let i = 0; i < _nodes.length; i++) _n.push({key: _nodeKeys[i], value: _nodes[i]});
    for (let i = 0; i < _conns.length; i++) _c.push({key: _connKeys[i], value: _conns[i]});
    

    _n.sort((a, b) => a.value.z - b.value.z);

    
    if (settings.dataMode)
    {
        menuBar.style.display = 'none';

        loadNodesAndConnsData(_p, _n, _c);
    }
    else
    {
        _nodes = _nodes.map(n => JSON.parse(n));
        _conns = _conns.map(c => JSON.parse(c));
            
        graph.clear();

        loadNodesAndConnsAsync(_nodes, _conns, setLoadingProgress);
    }
}



function setLoadingProgress(progress)
{
    if (graphView.loadingNodes) 
        progress *= 0.7;

    loadingProgress.style.width = (progress * 100) + '%';
}



function loadNodesAndConnsAsync(_nodes, _conns, setProgress, pasting = false)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    _nodes = _nodes.sort((a, b) => 
           a.type == GROUP_NODE 
        && b.type != GROUP_NODE);


    const chunkSize = 10; // nodes

    for (let i = 0; i < _nodes.length; i += chunkSize)
    {
        restartLoadingTimer();
        
        promise = promise.then(nodes => 
        {
            const res = resolveNodes(
                _nodes, 
                i, 
                Math.min(i + chunkSize, _nodes.length), // exclusive
                nodes,
                pasting);

            if (setProgress)
                setProgress(i / (_nodes.length + (_conns ? _conns.length : 0)));
    
            return res;
        });
    }

    return new Promise(resolve =>
    {
        promise.then(nodes => 
        {
            graph.addNodes(nodes, false, false);


            const varNodes = nodes.filter(n => 
                    n.type             == VARIABLE 
                    && n.linkedVariableId != NULL);
                    
            uiGetValueFromFigma('getVariableData', varNodes.map(n => n.linkedVariableId))
                .then(response =>
                {
                    for (const value of response.value)
                    {
                        const node = varNodes.find(n => n.linkedVariableId == value.id);

                        node.updateValueParamType  (value.resolvedType);
                        node.updateValueParamValues(value.resolvedType, value.name, [value.value]);
                    }

                    loadConnectionsAsync(_nodes, _conns, nodes, setProgress);    
                });

            
            resolve(nodes);
        });
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
        

        // first resolve group parameter connections,
        // as they create inputs and outputs in other nodes
        
        restartLoadingTimer();


        const _paramConns = _conns.filter(c => 
               nodeFromId(c. inputNodeId) && nodeFromId(c. inputNodeId).type == GROUP_PARAM
            || nodeFromId(c.outputNodeId) && nodeFromId(c.outputNodeId).type == GROUP_PARAM);

        const _otherConns = _conns.filter(c => !_paramConns.includes(c));

        
        const chunkSize = 10; // connections

        for (let i = 0; i < _paramConns.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveConnections(
                    _nodes,
                    _paramConns, 
                    i, 
                    Math.min(i + chunkSize, _paramConns.length)); // exclusive

                return res;
            });
        }

        for (let i = 0; i < _otherConns.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveConnections(
                    _nodes,
                    _otherConns, 
                    i, 
                    Math.min(i + chunkSize, _otherConns.length)); // exclusive

                if (setProgress)
                    setProgress((_nodes.length + i) / nozero(_nodes.length + _otherConns.length * 19/20)); // the proportion is arbitrary

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
        graphView.creatingNodes  = false;
        graphView.pastingNodes   = false;
        graphView.loadingNodes   = false;
        graphView.restoringNodes = false;

        clearTimeout(loadRestartTimer);
        loadRestartTimer = -1;

        loadingOverlay.style.display = 'none';
    }


    graphView.canUpdateNodes = true;
    graphView.updateShowWires(false);


    // if (!settings.dataMode)
    //     enableFeatures(subscribed());

        
    generatorStarted = true;


    graphView.update();

    
    window.focus();
}



function finishLoadingNodes(_nodes, loadedNodes, updateNodes, duplicates = false)
{
    loadedNodes.forEach(n => n.updateSubscribeStatus(subscribed()));

    _nodes
        .filter(_n => _n.active)
        .map   (_n => nodeFromId(duplicates ? _n.newId : (pageIdFromPath(_n.id) == NULL ? makeNodePath(_n) : _n.id)))
            .forEach(n => n.makeActive());

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



function resolveConnections(nodes, _connections, first, last)
{
    _connections.sort((c1, c2) =>
    {
        if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
        if (c1.inputId     != c2.inputId    ) return c1.inputId     - c2.inputId;

        // if (c1.inputNodeId == c2.outputNodeId) return -1;
        // if (c2.inputNodeId == c1.outputNodeId) return  1;

        //if (c1.outputOrder != c2.outputOrder) return c1.outputOrder - c2.outputOrder;
        return 0;
    });

    // for (const conn of _connections)
    //     console.log('conn =', getConnectionString(
    //         conn.outputNodeId,
    //         conn.outputId,
    //         conn.outputOrder,
    //         conn.inputNodeId,
    //         conn.inputId,
    //         false));


    return new Promise(resolve => 
        //requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                const outputNode = nodes.find(n => (n.newId ?? n.id) == _conn.outputNodeId);
                const  inputNode = nodes.find(n => (n.newId ?? n.id) == _conn. inputNodeId);


                const strConn = connToString(_conn);

                if (!outputNode)
                { 
                    uiError(
                        '(no output) Cannot connect  ' + strConn + ',  \'' + _conn.outputNodeId + '\' not found', 
                        {
                            buttonText:   'Remove connection',
                            buttonAction: 'removeConnection,' + getStorageConnKey(_conn)
                        });

                    continue; 
                }

                if (!inputNode) 
                { 
                    uiError(
                        '(no input) Cannot connect  ' + strConn + ',  \'' + _conn.inputNodeId + '\' not found',
                        {
                            buttonText:   'Remove connection',
                            buttonAction: 'removeConnection,' + getStorageConnKey(_conn)
                        });
 
                    continue; 
                }


                parseConnectionJsonAndConnect(_conn, false);
            }

            resolve();
        });
        // /);
}



// function uiSaveGraphView()
// {
//     uiSetPageData(currentUser.id + ',graphView', graphView.toJson());
// }



function dataColorToJson(color, nTab)
{
    let   pos = ' '.repeat(nTab);
    const tab = HTAB;

    let json =
          pos + tab + '[\n'
        + pos + tab + tab + '"' + color[0] +'",\n'
        + pos + tab + tab +       color[1] + ',\n'
        + pos + tab + tab +       color[2] + ',\n'
        + pos + tab + tab +       color[3] +  '\n'
        + pos + tab + ']';

    return json;
}



async function uiGetValueFromFigma(key, spec = null) 
{
    return new Promise((resolve, reject) => 
    {
        const timeout = 60000;

        uiPostMessageToFigma(
        {
            cmd: 'figGetValue',
            key:  key,
            spec: spec
        });

        const timeoutId = setTimeout(() => 
            reject(new Error('Timeout: Result not received within the specified time')),
            timeout);

        function handleMessage(event) 
        {
            const msg = JSON.parse(event.data.pluginMessage);

            if (msg.cmd === 'returnFigGetValue') 
            {
                clearTimeout(timeoutId);

                resolve(
                { 
                    // key:   msg.key, 
                    // spec:  msg.spec,
                    value: msg.value 
                });

                self.removeEventListener('message', handleMessage);
            }
        }

        self.addEventListener('message', handleMessage);
    });
}