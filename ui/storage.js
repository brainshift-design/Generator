function      uiGetLocalData(key)        { uiQueueMessageToFigma({ cmd:      'figGetLocalData', key: key               }); }
function      uiSetLocalData(key, value) { uiQueueMessageToFigma({ cmd:      'figSetLocalData', key: key, value: value }); }
function    uiClearLocalData(key)        { uiQueueMessageToFigma({ cmd:      'figSetLocalData', key: key, value: ''    }); }
function uiClearAllLocalData(key)        { uiQueueMessageToFigma({ cmd: 'figClearAllLocalData', key: key, value: ''    }); }

function       uiGetPageData(key)        { uiQueueMessageToFigma({ cmd:       'figGetPageData', key: key               }); } 
function       uiSetPageData(key, value) { uiQueueMessageToFigma({ cmd:       'figSetPageData', key: key, value: value }); }
function     uiClearPageData(key)        { uiQueueMessageToFigma({ cmd:       'figSetPageData', key: key, value: ''    }); }



///////////////////////////////////////////////////////////////////////////////////////////////////
   


async function uiReturnFigSetLocalData(msg)
{
    switch (msg.key)
    {
        case 'debugMode':
            uiPostMessageToFigma({cmd: 'figRestartGenerator'});
            break;
    }
}



async function uiReturnFigGetLocalData(msg)
{
    switch (msg.key)
    {
        case 'minZoomForParams':
            if (!isNaN(msg.value))
                updateSetting(msg.key, parseFloat(msg.value));
    
            break;

        case 'objectCenterSize':
            if (!isNaN(msg.value))
                updateSetting(msg.key, parseFloat(msg.value));
    
            break;

        case 'objectBatchSize':
        case 'maxSolveIterations':  
            updateSetting(
                msg.key,
                msg.value
                    ? parseInt(msg.value)
                    : settings[msg.key]); 
            break;
 
        case 'numberVarNullValue':
            updateSetting(
                msg.key, 
                msg.value
                    ? parseFloat(msg.value)
                    : 0); 
            break;
 
        case 'boolVarNullValue': 
            updateSetting(
                msg.key, 
                msg.value
                    ? msg.value
                    : false); 
            break;
 
        case 'colorVarNullValue':
            updateSetting(
                msg.key,
                msg.value ?? [1, 0, 1]); 
            
            break;


        case 'debugMode':

        case 'enableZoomedOutParams':
        case 'showPages':
        case 'showAllColorSpaces':
        case 'showGrid':
        case 'showNodeIcons':
        case 'showBoolValues':
        case 'separateThousands':
        case 'allowInvertParams':
        case 'activateDeactiatesOthers':
        case 'preferHtmlColorNames':
        case 'normalizeRandomNumbers':
        case 'randomShiftR':
        case 'colorShiftR':
        case 'numberShiftR':

        case 'showSnapshots':
        case 'showRestartInfo':
        case 'showColorLegendInMenus':
        case 'showClearUndoWarning':
        case 'shareUsageMetrics':
        case 'showObjectCount':
        case 'showDebugMenu':

        case 'showNodeId':       
        case 'showTransformPoints':       
        case 'enableAsserts':       

        case 'showTooltipNodes':
        case 'showTooltipParams':
        case 'showTooltipLists':
        case 'showTooltipLongText':
        case 'showTooltipColorInterpolation':
        case 'showTooltipValidateMethod':
        case 'showTooltipColorBlindness':
        case 'showTooltipColorContrast':
        case 'showTooltipColorNames':
        case 'showTooltipAscii':

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
        
        case 'enableBetaFeatures':
            updatePanelButton();

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
            
            findTutorials.style.display = 'block';
            tutorialsShown = true;
                
            break;
    }


    if (msg.key == 'debugWarningCrash')
    {
        if (!msg.value)
            showDebugWarningDialog();
        else
            uiRestartGenerator(true);
    }


    if (msg.key == 'debugWarning')
    {
        if (!msg.value)
            showDebugWarningDialog();
        else
            updateSettingAndMenu('showDebugMenu', true, !settings.showDebugMenu); updateMenuItemShowDebugMenu();
    }


    if (    msg.key == 'debugMode'
        && !generatorStarted)
    {
        if (settings.debugMode)
        {
            debugModeView.style.display = 'block';
            initDebugModeMenus();
        }
        else
            initGeneratorMenus();
     
        
        onClassChange(document.childNodes[0], () =>
        { 
            initThemeColors();

            if (!settings.debugMode)
            {
                graph.nodes.forEach(n => n.updateNode());
                graphView.updateNodeWireTransforms(graph.nodes);
                toolbarButtons.forEach(b => b.update());
                updateZoomIcon();
            }
        });
    }


    if (!settings.debugMode)
    {
        // if (msg.key == 'enableBetaFeatures')
            //enableFeatures(false); 

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
    if (   msg.generatorVersion
        && msg.nodeKeys.length > 0
        && generatorVersion < msg.generatorVersion)
    {
        showVersionWarningDialog();
        return;
    }


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

    
    // const _showAllColorSpaces = msg.showAllColorSpaces;


    // updateSettingAndMenu(
    //     'showAllColorSpaces',
    //     _showAllColorSpaces, 
    //     _showAllColorSpaces ? parseBool(_showAllColorSpaces) : false,
    //     false); 

    // if (_showAllColorSpaces)
    // {
    //     console.log('udpate all nodes for color spaces');
    //     console.log('settings.showAllColorSpaces =', settings.showAllColorSpaces);
    //     graph.nodes
    //         .filter(n => COLOR_TYPES.includes(n.type))
    //         .forEach(n => n.updateNode());
    // }


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



    if (!settings.debugMode)
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

    
    if (settings.debugMode)
    {
        menuBar.style.display = 'none';

        loadNodesAndConnsData(_p, _n, _c);
    }
    else
    {
        _nodes = _nodes.map(n => JSON.parse(n));
        _conns = _conns.map(c => JSON.parse(c));
            
        graph.clear();

        loadNodesAndConnsAsync(_nodes, _conns, setLoadingProgress)
            .then(result =>
            {
                if (   graph.nodes.length == 0
                    && graph.currentPage)
                    graph.currentPage.zoom = 1;

                if (!tutorialsShown)
                    uiGetLocalData('canvasEmpty');
            })
            .catch(error => crash('Error loading nodes and connections:', error));
    }


    graph.currentPage.refreshPanAndZoom();
}



function setLoadingProgress(progress)
{
    if (graphView.loadingNodes) 
        progress *= 0.7;

    loadingProgress.style.width = (progress * 100) + '%';
}



async function loadNodesAndConnsAsync(_nodes, _conns, setProgress, pasting = false)
{
    loadingProgress.style.width   = 0;
    loadingOverlay .style.display = 'block';


    let promise = Promise.resolve([]);


    _nodes = _nodes.sort((a, b) => 
           a.type == COMPOUND 
        && b.type != COMPOUND);


    const chunkSize = 10; // nodes

    for (let i = 0; i < _nodes.length; i += chunkSize)
    {
        restartLoadingTimer();
        
        promise = promise
            .then(nodes => 
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
            })
            .catch(error => crash('Error resolving nodes:', error));
    }

    return new Promise(resolve =>
    {
        promise
            .then(nodes => 
            {
                graph.addNodes(nodes, false, false);


                const varNodes = nodes.filter(n => 
                           n.type       == VARIABLE 
                        && n.variableId != NULL);
                        
                uiGetValueFromFigma('getVariableData', varNodes.map(n => n.variableId))
                    .then(response =>
                    {
                        for (const variable of response.value)
                        {
                            const node = varNodes.find(n => n.variableId == variable.id);

                            node.updateValueParamsFromResolved(
                                variable.resolvedType, 
                                variable.resolvedValues,
                                variable.resolvedAliasNames);

                            node.updateValueParamValuesFromResolved(
                                variable.resolvedType, 
                                variable.name, 
                                variable.values,
                                variable.resolvedValues,
                                variable.resolvedModes,
                                variable.resolvedAliasNames);
                        }

                        loadConnectionsAsync(_nodes, _conns, nodes, setProgress);    
                    })
                    .catch(error => crash('Error loading variables:', error));

                
                resolve(nodes);
            })
            .catch(error => crash('Error loading nodes and connections:', error));
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
            if (c1.inputNodeId != c2.inputNodeId ) return c1.inputNodeId.localeCompare(c2.inputNodeId, undefined, { numeric: true });// ? -1 : 1;
            if (c1.inputId     != c2.inputId     ) return c1.inputId    .localeCompare(c2.inputId,     undefined, { numeric: true });// ? -1 : 1;

            if (c1.inputNodeId == c2.outputNodeId) return -1;
            if (c2.inputNodeId == c1.outputNodeId) return  1;

            return 0;
        });
        

        // first resolve group parameter connections,
        // as they create inputs and outputs in other nodes
        
        restartLoadingTimer();


        const _paramConns = _conns.filter(c => 
               nodeFromId(c. inputNodeId) && nodeFromId(c. inputNodeId).type == COMPOUND_PARAM
            || nodeFromId(c.outputNodeId) && nodeFromId(c.outputNodeId).type == COMPOUND_PARAM);

        const _otherConns = _conns.filter(c => !_paramConns.includes(c));

        
        const chunkSize = 10; // connections

        for (let i = 0; i < _paramConns.length; i += chunkSize)
        {
            promise = promise
                .then(() => 
                {
                    const res = resolveConnections(
                        _nodes,
                        _paramConns, 
                        i, 
                        Math.min(i + chunkSize, _paramConns.length)); // exclusive

                    return res;
                })
                .catch(error => crash('Error resolving parameter connections:', error));
        }

        for (let i = 0; i < _otherConns.length; i += chunkSize)
        {
            promise = promise
                .then(() => 
                {
                    const res = resolveConnections(
                        _nodes,
                        _otherConns, 
                        i, 
                        Math.min(i + chunkSize, _otherConns.length)); // exclusive

                    if (setProgress)
                        setProgress((_nodes.length + i) / nozero(_nodes.length + _otherConns.length * 19/20)); // the proportion is arbitrary

                    return res;
                })
                .catch(error => crash('Error resolving node connections:', error));
        }
    }



    promise
        .then(() => 
        {
            const updateNodes = [];
            
            finishLoadingNodes(_nodes, loadedNodes, updateNodes);
            finishLoading(_nodes);
            
            pushUpdate(null, updateNodes);
        })
        .catch(error => crash('Error finishing loading:', error));
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
        loadRestartTimer = null;

        //console.log('stopped in finish loading');
        loadingOverlay.style.display = 'none';
    }


    graphView.canUpdateNodes = true;
    graphView.updateShowWires(false);


    generatorStarted = true;


    graphView.update();

    
    window.focus();
}



function finishLoadingNodes(_nodes, loadedNodes, updateNodes, duplicates = false)
{
    loadedNodes.forEach(n => n.updateProStatus(!subscribed()));

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
            {
                const node = loadNode(_nodes[i], pasting, generatorVersion);
                nodes.push(node);
            }

            resolve(nodes);
        }));
}



function resolveConnections(nodes, _connections, first, last)
{
    _connections.sort((c1, c2) =>
    {
        if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId.localeCompare(c2.inputNodeId, undefined, { numeric: true });
        if (c1.inputId     != c2.inputId    ) return c1.inputId    .localeCompare(c2.inputId,     undefined, { numeric: true });

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
            const createTime = Date.now();

            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                
                const outputNode = nodes.find(n => (n.newId ?? n.id) == _conn.outputNodeId);
                const  inputNode = nodes.find(n => (n.newId ?? n.id) == _conn. inputNodeId);

                if (   outputNode
                    && inputNode)
                    handleLegacyConnection(_conn, outputNode, inputNode, generatorVersion);


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


                parseConnectionJsonAndConnect(_conn, false, createTime);
            }

            resolve();
        });
        // /);
}



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