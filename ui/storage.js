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
   


function uiGetLocalDataReturn(msg)
{
    switch (msg.key)
    {
        case 'graphView':        
            uiLoadGraphView(msg.value); 
            graphView.updatePanAndZoom();
            break;

        case 'autoConnectNewNodes':
        case 'includeLxxColorSpaces':
        case 'debugMode':

        case 'showNodeId':       
        case 'showWires':        

        case 'logMessages':      
        case 'logActions':       

        case 'logLoading':       
        case 'logRequests':      
        case 'logValueUpdates':  
        case 'logObjectUpdates': 

        case 'logRawLoading':    
        case 'logRawSaving':     
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
    }


    if (msg.key == 'debugMode')
        menuItemDebug.setVisible(settings.debugMode);

    else if (msg.key == 'logLoading')
        if (settings.logLoading)
            uiLogAllSavedNodesAndConns();
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
        if (isNaN(zoom)) zoom  = 1;
    }


    graphView._zoom     = zoom;
    graphView._pan      = pan;
}



function uiLoadNodesAndConns(nodesJson, connsJson, activeJson)
{
    if (settings.logRawLoading)
        console.log(
            '%cnodes json = %s', 
            'background: #fed',
            nodesJson
                .replaceAll('\\n', '\n')
                .replaceAll('\\"', '\"'));

        
    graph.clear();

    const _nodes = JSON.parse(nodesJson).map(n => JSON.parse(n));
    const  conns = JSON.parse(connsJson).map(c => JSON.parse(c));

    _nodes.sort((a, b) => a.z - b.z);

    loadNodesAndConnsAsync(_nodes, conns, setLoadingProgress);
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
            const res = resolveNodes(
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
            if (c1.inputNodeId != c2.inputNodeId ) return c1.inputNodeId < c2.inputNodeId ? -1 : 1;
            if (c1.inputIdd    != c2.inputId     ) return c1.inputId - c2.inputId;
            
            if (c1.inputNodeId == c2.outputNodeId) return -1;
            if (c2.inputNodeId == c1.outputNodeId) return  1;

            return 0;
        });


        const chunkSize = 10; // connections
        for (let i = 0; i < _conns.length; i += chunkSize)
        {
            promise = promise.then(() => 
            {
                const res = resolveConnections(
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
        finishLoadingNodes(_nodes, loadedNodes);
    });
}



function finishLoading()
{
    loadingOverlay.style.display = 'none';
    
    graphView.loadingNodes   = false;
    graphView.canUpdateNodes = true;
    
    //updateToggleShowWiresButton();
    graphView.updateShowWires(false);
}



function finishLoadingNodes(_nodes, loadedNodes, duplicates = false)
{
    _nodes
        .filter(_n => _n.active)
        .map(_n => nodeFromId(duplicates ? _n.newId : _n.id))
        .forEach(n => n.makeActive());

    // validateActiveNodesInTrees(loadedNodes);

    loadedNodes.forEach(n => n.updateNode());
    graphView.updateNodeTransforms(loadedNodes);

    updateTerminalsAfterNodes(loadedNodes);
}



function resolveNodes(_nodes, first, last, nodes)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
                nodes.push(loadNode(_nodes[i]));

            resolve(nodes);
        }));
}



function resolveConnections(nodes, _connections, first, last)
{
    return new Promise(resolve => 
        requestAnimationFrame(() => 
        {
            for (let i = first; i < last; i++)
            {
                const _conn = _connections[i];

                const outputNode = nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputNodeId);
                const  inputNode = nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputNodeId);

                if (!outputNode)
                { 
                    uiError('node \'' + _conn.outputNodeId + '\' not found'); 
                    uiRemoveConnsToNodes([_conn.outputNodeId]); 
                    continue; 
                }

                if (!inputNode) 
                { 
                    uiError('node \'' + _conn. inputNodeId + '\' not found'); 
                    uiRemoveConnsToNodes([_conn. inputNodeId]); 
                    continue; 
                }

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


    node.loadFromParsedJson(_node);


    node.updateNode();
    
    updateHeaderLabelOffset(node, 0.5);

    setNodePosition(
        node, 
        parseFloat(_node.x), 
        parseFloat(_node.y),
        false);

        
    return node;
}



function loadConnections(data, /*loadOutsideConnections, */setProgress = null)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];
        
        if (      data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn.outputNodeId)
               && data.nodes.find(n => (n.newId ? n.newId : n.id) == _conn. inputNodeId))
            //|| loadOutsideConnections)
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
    const tab = TAB;

    let json =
          pos + tab + '[\n'
        + pos + tab + tab + '"'+color[0] +'",\n'
        + pos + tab + tab +     color[1] + ',\n'
        + pos + tab + tab +     color[2] + ',\n'
        + pos + tab + tab +     color[3] + '\n'
        + pos + tab + ']';

    return json;
}