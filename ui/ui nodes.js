var importZoomToNodes  = false;
var deactivateAllNodes = false;



function idFromNode(node)
{
    return node ? node.id : '';
}



function nodesToJson(nodes, encloseBraces = true, connOutputMustBeInNodes = true, keepVarsConnected = true, isSnapshot = false)
{
    const tab = HTAB;
    
    let json = '';

    json +=
           (encloseBraces ? '{\n' : '')
          + tab + '"generatorVersion": "' + generatorVersion + '",\n';

    
    if (isSnapshot)
        json += tab + '"snapshot": "true",\n';
    
    json +=
            tab + '"nodes":\n'
          + tab + '[';

    let first = true;
    for (let i = 0; i < nodes.length; i++)
    {
        if (!first) json += ','; first = false;

        nodes[i].stripIdForCopy = true;
        json += NL + nodes[i].toJson(4);
    }

    json += NL + tab + ']';
    json += connectionsToJson(nodes, connOutputMustBeInNodes, keepVarsConnected);
    json += (encloseBraces ? '\n}' :'');

    return json;
}



function connectionsToJson(nodes, connOutputMustBeInNodes, keepVarsConnected = true)
{
    const connections = [];


    for (let i = 0; i < nodes.length; i++)
    {
        let node = nodes[i];

        // if (node.variableInputs)
        //     continue;

        for (let j = 0; j < node.inputs.length; j++)
        {
            if (   !node.inputs[j].connected
                ||     connOutputMustBeInNodes
                   && !nodes.includes(node.inputs[j].connectedOutput.node)
                ||     node.type == VARIABLE
                   && !keepVarsConnected)
                continue;

            connections.push(node.inputs[j].connection);
        }
    }
    

    if (isEmpty(connections))
        return '';


    const tab = HTAB;

    let json = 
          ',\n'
        + tab + '"connections":\n'
        + tab + '[';
    
    for (let i = 0; i < connections.length; i++)
    {
        if (i > 0) json += ',';

        connections[i].stripIdForCopy = true;
        json += NL + connections[i].toJson(4);
    }

    json += NL + tab + ']';

    return json;
}



function canAutoConnectNode(node, allowCombine = false)
{
    if (   node.variableInputs
        && allowCombine)
    {
        const selNodes = graph.pageNodes
            .filter(n => 
                    n.selected
                && !isEmpty(n.headerOutputs));

        return !isEmpty(selNodes);
    }
    else
    {
        const selNode = graph.pageNodes.find(n => n.selected);

        if (  !selNode
            || isEmpty(selNode.headerOutputs))
            return false;

        const inputs = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));

        return !isEmpty(inputs)
            && node.canAutoConnectFrom(selNode.headerOutputs[0]);
    }
}



function uiDeleteNodes(nodeIds)
{
    //nodeIds.forEach(id => nodeFromId(id).makePassive());

    graph.deleteNodes(nodeIds);

    uiRemoveSavedNodesAndConns(nodeIds);
    uiDeleteObjectsAndStyles(nodeIds, true);
}



function uiDeleteObjectsAndStyles(nodeIds, mustDelete = true)
{
    uiQueueMessageToFigma({
        cmd:       'figDeleteObjectsAndStyles',
        nodeIds:    nodeIds,
        mustDelete: mustDelete
    });
}



function uiCommitFigmaUndo()
{
    uiQueueMessageToFigma({cmd: 'figCommitUndo'});
}



function uiVariableConnect(outputNode, outputId, inputNode, inputId, outputOrder = -1, createTime = -1)
{
    //console.log('uiVariableConnect()');

    const output = outputNode.outputFromId(outputId);

    return output
         ? uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder, createTime)
         : null;
}



function uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder = -1, createTime = -1)
{
    //console.log('uiVariableConnectFromOutput()');

    if (!inputNode)
        return;
    

    const input = inputNode.inputFromId(inputId);


    if (    inputNode.variableInputs
        && (!input || !input.param))
    {
        const conn = uiConnect(
            output,
            inputNode.headerInputs.at(-1),
            inputId,
            outputOrder,
            createTime);

        if (outputOrder > -1)
            conn.outputOrder = outputOrder;

        if (   !graphView.loadingNodes
            && !graphView.pastingNodes
            && !graphView.restoringNodes)
            uiUpdateSavedConnectionsToNodeId(inputNode.id, true);

        return conn;
    }
    else
        return uiConnect(output, input, '', outputOrder, createTime);
}



function uiConnect(output, input, inputId = '', outputOrder = -1, createTime = -1)
{
    return output.node.graph.connect(output, input, inputId, outputOrder, createTime);
}



function uiDisconnect(input, saveOld = true)
{
    //console.log('uiDisconnect()');
    
    const node = input.node;

    node.graph.disconnect(input);

    if (node.variableInputs)
        uiUpdateSavedConnectionsToNodeId(node.id, saveOld);
}



function uiDisconnectAny(input)
{
    //console.log('uiDisconnect()');
    
    uiDeleteSavedConnectionsToNodeId(input.node.id);

    input.node.graph.disconnect(input);
}



function uiUpdateSavedConnectionsToNodeId(nodeId, saveOld)
{
    const node = nodeFromId(nodeId);


    uiDeleteSavedConnectionsToNodeId(node.id);


    if (saveOld)
    {
        for (const input of node.inputs.filter(i => i.connected))
        {
            uiSaveConnection(
                input.connectedOutput.node.id,
                input.connectedOutput.id,
                input.connection.outputOrder,
                node .id,
                input.id,
                input.connection.toJson());
        }
    }
}



function uiUpdateSavedConnectionsFromNodeId(nodeId, saveOld)
{
    const node = nodeFromId(nodeId);


    uiDeleteSavedConnectionsFromNodeId(node.id);


    if (saveOld)
    {
        for (const output of node.outputs)
        {
            for (const input of output.connectedInputs)
            {
                uiSaveConnection(
                    output.node.id,
                    output.id,
                    input.connection.outputOrder,
                    input.node.id,
                    input.id,
                    input.connection.toJson());
            }
        }
    }
}



function makeSelectedNodesActive(shift)
{
    actionManager.do(new MakeActiveNodesAction(
        graph.currentPage.nodes.filter(n => graphView.selectedNodes.includes(n)).map(n => n.nodeId),
        !settings.activateDeactiatesOthers && !shift,
         settings.activateDeactiatesOthers && !shift));
}



// function makeSelectedNodesInactive()
// {
//     if (graphView.selectedNodes.some(n => n.active))
//     {
//         actionManager.do(new MakeActiveNodesAction(
//             graph.currentPage.nodes.filter(n => n.active && !graphView.selectedNodes.includes(n)).map(n => n.nodeId),
//             false));
//     }
// }



function makeAllNodesInactive()
{
    actionManager.do(new MakeActiveNodesAction([], false, true));
}



function toggleSelectedNodesNotCondition()
{
    actionManager.do(new MakeNotConditionNodesAction(
         graphView.selectedNodes.map  (n => n.id), 
        !graphView.selectedNodes.every(n => n.notCondition)));
}



function uiMakeNodeActive(node, makePassive = true)
{
    if (makePassive)
    {
        uiMakeNodeLeftPassive (node);
        uiMakeNodeRightPassive(node);
    }
    
    node.makeActive();
}    



function uiMakeNodesActive(nodes, shiftKey = false, deactivate = true)
{
    curRequestId = nextRequestId++;


    if (!shiftKey)
    {
        if (deactivate)
        {
            for (const node of graph.nodes)
                if (node.active)
                    uiMakeNodePassive(node);
        }
        

        for (const node of nodes)
        {
            if (node.active) continue;
            
            pushUnique(graphView.activeNodes, node);
            node._active = true;
        }
    }
    else
    {
        for (const node of nodes)
        {
            if (node.active)
                uiMakeNodePassive(node);
            else
            {
                pushUnique(graphView.activeNodes, node);
                node._active = true;
            }
        }
    }
}



function uiMakeNodePassive(node)
{
    if (node.active)
    {
        node.makePassive();
        node.updateNode();
        
        uiDeleteObjectsAndStyles([node.id], false);
    }
}



function uiMakeNodeLeftPassive(node, fromNode = null)
{
    for (const input of node.inputs)
    {
        if (   input.connected
            && (  !fromNode
                || input.connectedOutput.node != fromNode))
        {
            uiMakeNodePassive(input.connectedOutput.node);
            uiMakeNodeLeftPassive(input.connectedOutput.node, node);
        }
    }
}



function uiMakeNodeRightPassive(node, fromNode = null)
{
    for (const output of node.outputs)
    {
        for (const connInput of output.connectedInputs)
        {
            uiMakeNodePassive(connInput.node);
            uiMakeNodeRightPassive(connInput.node, node);
        }
    }
}



function uiShowParamValue(nodeId, paramName, value)
{
    const node = nodeFromId(nodeId);

    if (!!node) // this is for deleted nodes which still exist
    {           // in genGraph but no longer in graph
        const param = node.params.find(p => p.name == paramName);

        if (param.type == NUMBER_VALUE)
            param.controls[0].setValue(value, decDigits(value), false);
        else
            param.controls[0].setValue(value, false);
    }
}



function uiCopyNodes(nodeIds, keepVarsConnected = true)
{
    const nodes = graph.nodes.filter(n => 
           nodeIds.includes(n.id)
        && (!n.subscription || subscribed()));

    const copiedJson = nodesToJson(nodes, true, false, keepVarsConnected);

    return copiedJson;
}



function uiPasteNodes(nodesJson, loading, pasteConnected, x, y, updateNodes, zoomToFitNodes = false, zoomToFitObjects = false)
{
    graphView.pastingNodes      = true;
    
    graphView._zoomToFitNodes   = zoomToFitNodes;
    graphView._zoomToFitObjects = zoomToFitObjects;


    pasteOffset.x += pasteOffsetDelta.x;
    pasteOffset.y += pasteOffsetDelta.y;


    try
    {
        const data = JSON.parse(nodesJson);


        if (   !isNaN(x) 
            && !isNaN(y)) // position new nodes
        {
            const positions = data.nodes.map(n => point(parseFloat(n.x), parseFloat(n.y)));

            for (let i = 0; i < data.nodes.length; i++)
            {
                data.nodes[i].x = x + positions[i].x - positions[0].x + 5 / graph.currentPage.zoom;
                data.nodes[i].y = y + positions[i].y - positions[0].y;
            }
        }
        else // offset new nodes (must be done before loading)
        {
            for (let i = 0; i < data.nodes.length; i++)
            {
                data.nodes[i].x = (parseFloat(data.nodes[i].x) + pasteOffset.x).toString();
                data.nodes[i].y = (parseFloat(data.nodes[i].y) + pasteOffset.y).toString();
            }
        }


        //moveNodesToViewport(data.nodes);


        //const nodes = await loadNodesAndConnsAsync(data.nodes, data.connections, null, true);


        const nodes = loadNodes(data, true);

        nodes.forEach(n => n.div.style.display ='none');

        
        // get the new names of the nodes after they've been added
        for (let i = 0; i < nodes.length; i++)
        {
            graph.addNode(nodes[i], false);
            data.nodes[i].newId = nodes[i].id;
        }


        if (data.connections)
        {
            correctNodeNamesInConnections(data);
            data.connections = parseConnectionsAndConnect(data, pasteConnected);
        }
        else
            data.connections = []; // return an empty array if no data was loaded


        if (loading)
        {
            graphView.selectedNodes = nodes;
            finishLoadingNodes(data.nodes, nodes, updateNodes, true);
        }


        return [nodes, data.connections];
    }
    catch (e)
    {
        initCrashDialog(e);
        showCrashDialog();

        addMetricsEvent('CRASH', e);

        return [[], []];
    }
}



function loadNodes(data, pasting)
{
    const nodes = [];
   
    for (let i = 0; i < data.nodes.length; i++)
    {
        const node = loadNode(
            data.nodes[i], 
            pasting, 
            data.generatorVersion ? data.generatorVersion : 0);
            
        nodes.push(node);
    }

    return nodes;
}



function loadNode(_node, pasting, genVersion = 0)
{
    handleLegacyNode(_node, genVersion);


    const node = createNode(_node.type);


    node.loadFromParsedJson(_node, pasting);

    if (node.pageId == NULL)
        node.id = makeNodePath(node);

        
    node.setPosition(
        parseFloat(_node.x), 
        parseFloat(_node.y),
        false);

    
    return node;
}



function handleLegacyNode(_node, genVersion)
{
    // update legacy node names

         if (_node.type == 'CDENSE'                     ) _node.type = LIST_AS_ITEM;
    else if (_node.type == 'SEL'                        ) _node.type = SELECT_FROM_LIST;
    else if (_node.type == 'EXTRP'                      ) _node.type = GET_PARAM;
    else if (_node.type == 'CENTR'                      ) _node.type = SET_CENTER;
    else if (_node.type == 'DEFINE'                     ) _node.type = ITERATE;
    else if (_node.type == 'START'                      ) _node.type = FEEDBACK;
    else if (_node.type == 'RENDER'                     ) _node.type = PERSIST;
    else if (_node.type == 'VNAME'                      ) _node.type = SET_VALUE_NAME;
    else if (_node.type == 'VNAMES'                     ) _node.type = SET_LIST_VALUE_NAMES;
    else if (_node.type == 'ONAME'                      ) _node.type = SET_OBJECT_NAME;
    else if (_node.type == 'TCONT'  && genVersion <  441) _node.type = TEXT_FIND;
    else if (_node.type == 'LCONT'  && genVersion <  441) _node.type = LIST_FIND;
    else if (_node.type == 'LIST'   && genVersion <  441) _node.type = ITEMS;
    else if (_node.type == 'EXPAND' && genVersion == 441) _node.type = ITEMS;
    else if (_node.type == 'CMB'    && genVersion <  441) _node.type = LIST;


    // remove 'showCenter' param from everything

    if (_node.params)
    {
        const foundIndex = _node.params.findIndex(p => p[1] == 'showCenter');

        if (foundIndex > -1)
            _node.params.splice(foundIndex, 1);
    }


    // handle math order of operations switch in version 339

    if (   (   _node.type == NUMBER_MATH
            || _node.type == NUMBER_SIMPLE_MATH)
        && genVersion == 0)
    {
        if (!_node.params)
            _node.params = [];
        
        let param = _node.params.find(p => p[1] == 'operation');

        if (!param)
            param = [NUMBER_VALUE, 'operation', '1,0'];

            
        switch (param[2])
        {
            case '0,0': param[2] = '2,0'; break;
            case '1,0': param[2] = '3,0'; break;
            case '2,0': param[2] = '0,0'; break;
            case '3,0': param[2] = '1,0'; break;
        }

        const value = _node.params.find(p => p[1] == 'value');

        if (value) 
            removeFromArray(_node.params, param);
    }

    else if (_node.type == TEXT_SPLIT
          && genVersion == 0)
    {
        let parts = _node.params.find(p => p[1] == 'parts');

        if (parts)
            removeFromArray(_node.params, parts);
    }

    else if (   _node.type == COLOR
             && genVersion < 441) 
    {
        if (!_node.params)
            _node.params = [];

        const paramSpace = _node.params.find(p => p[1] == 'space');

        if (paramSpace)
        {
                 if (paramSpace[2] == '2,0') paramSpace[2] = '3,0';
            else if (paramSpace[2] == '3,0') paramSpace[2] = '2,0';
        }
    }

    else if (   (   _node.type == MOVE
                 || _node.type == ROTATE
                 || _node.type == SCALE
                 || _node.type == SKEW)
             && genVersion < 425) 
    {
        if (!_node.params)
            _node.params = [];

        const paramAffectSpace = _node.params.find(p => p[1] == 'affectSpace');

        if (!paramAffectSpace)
            _node.params.push(["NUM#", "affectSpace", "2,0"]);
        else
            paramAffectSpace[2] = paramAffectSpace[2] == '1,0' ? '2,0' : '1,0';
    }

    else if (_node.type == ELLIPSE
          && _node.params
          && _node.params.length > 0)
    {
        const paramFrom = _node.params.find(p => p[1] == 'from');
        if (paramFrom) paramFrom[1] = 'start';

        const paramTo = _node.params.find(p => p[1] == 'to');
        if (paramTo) paramTo[1] = 'sweep';
    }

    else if (_node.type == COLOR_BLEND
          && _node.params
          && _node.params.length > 0)
    {
        const paramFrom = _node.params.find(p => p[1] == 'opacity');
        if (paramFrom) paramFrom[1] = 'amount';
    }

    else if (_node.type == VALID_COLOR
          && _node.params
          && _node.params.length > 0
          &&  genVersion < 441)
    {
        const paramFrom = _node.params.find(p => p[1] == 'quality');
        if (paramFrom) paramFrom[1] = 'method';
    }

    else if (_node.type == GRADIENT
          && _node.params
          && _node.params.length > 0)
    {
        const paramType = _node.params.find(p => p[1] == 'type');
        if (paramType) paramType[1] = 'gradType';

        const paramPosition = _node.params.find(p => p[1] == 'position');

        if (   genVersion < 423
            && paramPosition
            && paramPosition[2] == '3,0')
            paramPosition[1] = '4,0';

        const paramTo = _node.params.find(p => p[1] == 'to');
        if (paramTo) paramTo[1] = 'sweep';

        const paramAspect = _node.params.find(p => p[1] == 'aspect');

        if (paramAspect) 
        {
            if (   genVersion >= 398
                && genVersion <  413)
            {
                const value = parseNumberValue(paramAspect[2]);
                value.value = 100/(value.value/100);
                paramAspect[2] = value.toString();
            }
        }
    }

    else if (_node.type == TEXT_SHAPE
          && _node.params
          && _node.params.length > 0)
    {
        const paramAlignH = _node.params.find(p => p[1] == 'alignH');
        if (paramAlignH) paramAlignH[1] = 'alignX';

        const paramAlignY = _node.params.find(p => p[1] == 'alignV');
        if (paramAlignY) paramAlignY[1] = 'alignY';
    }

    else if (_node.type == NUMBER_WAVE)
    {
        if (!_node.useWavelength)
            _node.useWavelength = false;
    }

    else if (_node.type == IF_ELSE
          && genVersion < 441)
    {
        const paramCondition = _node.params.find(p => p[1] == 'condition');
        
        if (paramCondition) 
        {
            const value = parseNumberValue(paramCondition[2]);

            if (value.value > 0) value.value = 0;
            else                 value.value = 1;

            paramCondition[2] = value.toString();
        }
        else
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'condition',
                '1,0'
            ]);
        }
    }

    else if (_node.type == REPEAT
          && genVersion < 441)
    {
        const paramCount = _node.params.find(p => p[1] == 'count');
        
        if (!paramCount) 
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'count',
                '5,0'
            ]);
        }
    }

    else if (_node.type == NUMBER_SEQUENCE
          && genVersion < 441)
    {
        const paramAdd = _node.params.find(p => p[1] == 'add');
        
        if (!paramAdd) 
        {
            _node.params.push(
            [
                NUMBER_VALUE,
                'add',
                '10,0'
            ]);
        }
    }
}



function handleLegacyConnection(_conn)
{
    if (_conn.outputId == 'parts')
        _conn.outputId = 'h0';
}



function uiUpdateLegacyNodes()
{
    const params = [];
    const values = [];


    for (const node of graph.currentPage.nodes)
    {
        if (   node.type == NUMBER_MATH
            || node.type == NUMBER_SIMPLE_MATH)
        {
            switch (node.paramOperation.value.value)
            {
                case 0:  params.push(node.paramOperation);  values.push(new NumberValue(2));  break;
                case 1:  params.push(node.paramOperation);  values.push(new NumberValue(3));  break;
                case 2:  params.push(node.paramOperation);  values.push(new NumberValue(0));  break;
                case 3:  params.push(node.paramOperation);  values.push(new NumberValue(1));  break;
            }
        }
    }


    actionManager.do(new SetMultipleValuesAction(params, values, true));
}



function parseConnectionsAndConnect(data, pasteConnected, setProgress = null)
{
    data.connections.sort((c1, c2) =>
    {
        // if (c1.outputOrder != c2.outputOrder) return c1.outputOrder - c2.outputOrder;
        // if (c1.inputNodeId != c2.inputNodeId) return c1.inputNodeId - c2.inputNodeId;
        // if (c1.inputId     != c2.inputId    ) return c1.inputId     - c2.inputId;
        
        if (c1.inputNodeId != c2.inputNodeId ) return c1.inputNodeId < c2.inputNodeId ? -1 : 1;
        if (c1.inputId     != c2.inputId     ) return c1.inputId     < c2.inputId     ? -1 : 1;
        
        if (c1.inputNodeId == c2.outputNodeId) return -1;
        if (c2.inputNodeId == c1.outputNodeId) return  1;

        return 0;
    });

    
    const connections = [];
    const createTime  = Date.now();
    
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];
        
        if (      data.nodes.find(n => (n.newId ?? n.id) == _conn.outputNodeId)
               && data.nodes.find(n => (n.newId ?? n.id) == _conn. inputNodeId)
            || pasteConnected)
        {
            parseConnectionJsonAndConnect(_conn, pasteConnected, createTime);
            connections.push(_conn);
        }

        if (setProgress)
            setProgress(((data.nodes.length + i) / (data.nodes.length + data.connections.length)));
    }


    return connections;
}



function moveNodesToViewport(nodes)
{
    // if new nodes are outside of viewport, move them to center of viewport

    // const viewRect = graphView.measureData.clientRect;

    // let l = Number.MAX_SAFE_INTEGER;
    // let t = Number.MAX_SAFE_INTEGER;
    // let r = Number.MIN_SAFE_INTEGER;
    // let b = Number.MIN_SAFE_INTEGER;
    
    // for (let i = 0; i < nodes.length; i++)
    // {
    //     console.log('nodes[i] =', nodes[i]);

    //     l = Math.min(l, nodes[i].x);
    //     t = Math.min(t, nodes[i].y);
    //     r = Math.max(r, nodes[i].x + nodes[i].width);
    //     b = Math.max(b, nodes[i].y + nodes[i].height);
    // }
    
    // console.log('l =', l);
    // console.log('t =', t);
    // console.log('r =', r);
    // console.log('b =', b);

    // if (   l >  viewRect.r 
    //     || t >  viewRect.b 
    //     || r <= viewRect.l
    //     || b <= viewRect.t)
    // {
    //     const cx = (l + r) / 2;
    //     const cy = (t + b) / 2;
        
    //     const vx = viewRect.c;
    //     const vy = viewRect.m;
        
    //     for (let i = 0; i < nodes.length; i++)
    //     {
    //         nodes[i].x -= vx - cx;
    //         nodes[i].y -= vy - cy;

    //         console.log('nodes[i] =', nodes[i]);
    //     }
    // }
}



function correctNodeNamesInConnections(data)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];

        let outputNode = data.nodes.find(n => n.id == _conn.outputNodeId);
        if (outputNode) data.connections[i].outputNodeId = outputNode.newId;

        const inputNode = data.nodes.find(n => n.id == _conn.inputNodeId);

        data.connections[i].inputNodeId = inputNode.newId;
    }

    for (let i = 0; i < data.nodes.length; i++)
    {
        const _node = data.nodes[i];

        if (_node.newId && _node.newId != _node.id)
            _node.id = _node.newId;
    }
}



function updateGraphNodes()
{
    [...graphView.selectedNodes,     
     ...graphView._prevSelectedNodes,
     ...graphView.lastSelectedNodes]
       .forEach(n => n.updateNode());
}



function findConnectedClusters(nodes)
{
    let clusters = nodes.map(n => [n]);
    let first    = 0;


    while (true)
    {
        let moved = false;
        
        for (let i = clusters.length-1; i > first; i--)
        {
            if (clusters[i].at(0).immediatelyFollows(clusters[i-1].at(-1), true))
            {
                clusters[i-1].push(...clusters[i]);
                removeAt(clusters, i);
                moved = true;
            }
            else if (clusters[i-1].at(-1).immediatelyFollows(clusters[i].at(0)), true)
            {
                clusters[first] = [...clusters[i], ...clusters[i-1]];
                removeAt(clusters, i);
                moved = true;
            }
        }

        first++;

        if (  !moved
            || first >= clusters.length)
            break;
    }


    return clusters;
}



function uiToggleDisableNodes(nodes)
{
    nodes.forEach(n => { n.enabled = !n.enabled; });
}



function uiSavePages(pageIds, pageJson, currentPageId)
{
    if (settings.logRawSavePages)
        logSavePages(pageJson.join('\n'));

    if (   pageIds
        && pageJson)
    {
        uiQueueMessageToFigma({
            cmd:          'figSavePages',
            pageIds:       pageIds,
            pageJson:      pageJson,
            currentPageId: currentPageId });
    }
}



function uiSaveNodes(nodeIds)
{
    const nodeJson = [];

    for (const id of nodeIds)
    {
        const node = nodeFromId(id);
        nodeJson.push(node.toJson());
    }

    uiSaveNodesJson(nodeIds, nodeJson);
}



function uiSaveNodesJson(nodeIds, nodeJson)
{
    if (isEmpty(nodeJson))
        return;

    if (settings.logRawSaveNodes)
        logSaveNodes(nodeJson.join('\n'));

    uiQueueMessageToFigma({
        cmd:     'figSaveNodes',
        nodeIds:  nodeIds,
        nodeJson: nodeJson });
}



function uiSaveConn(conn)
{
    if (settings.logRawSaveConnections)
        console.log('%cSAVING CONN\n' + conn.toJson(), 'color: black; background: #ddffee;');

    uiQueueMessageToFigma({
        cmd: 'figSaveConnection',
        key:  getConnKey(conn),
        json: conn.toJson()
    });
}



function uiSaveConnection(outputNodeId, outputId, outputOrder, inputNodeId, inputId, connJson)
{
    if (settings.logRawSaveConnections)
        console.log('%cSAVING CONNECTION\n' + connJson, 'color: black; background: #ddffee;');

    uiQueueMessageToFigma({
        cmd: 'figSaveConnection',
        key:  getConnectionKey(
                  outputNodeId, outputId, outputOrder,
                  inputNodeId, inputId),
        json: connJson
    });
}



function uiSaveConnections(conns)
{
    if (settings.logRawSaveConnections)
        logSaveConnections(conns);


    const keys     = [];
    const connJson = [];

    for (const conn of conns)
    {
        keys.push(getConnKey(conn));
        connJson.push(conn.toJson());
    }


    uiQueueMessageToFigma({
        cmd: 'figSaveConnections',
        keys: JSON.stringify(keys),
        json: JSON.stringify(connJson)
    });
}



function uiUpdateSavedConnections(curKeys, newKeys, conns)
{
    if (settings.logRawSaveConnections)
        logUpdateSavedConnections(conns);


    const connJson = [];

    for (const conn of conns)
        connJson.push(conn.toJson());


    uiQueueMessageToFigma({
        cmd:    'figUpdateSavedConnections',
        curKeys: JSON.stringify(curKeys),
        newKeys: JSON.stringify(newKeys),
        json:    JSON.stringify(connJson)
    });
}



function uiDeleteSavedConn(conn)
{
    if (settings.logRawSaveConnections)
    {
        //console.trace();

        console.log(
             '%cDELETING SAVED CONN '
            + getConnString(conn, true),
            'color: black; background: #ddeeff;');
    }


    uiQueueMessageToFigma({
        cmd: 'figDeleteSavedConnection',
        key:  getConnKey(conn)
    });
}



function uiDeleteSavedConnection(key, outputNodeId, outputId, outputOrder, inputNodeId, inputId, list)
{
    if (settings.logRawSaveConnections)
    {
        //console.trace();

        console.log(
             '%cDELETING SAVED CONNECTION ' 
            + getConnectionString(
                outputNodeId,
                outputId,
                outputOrder,
                inputNodeId,
                inputId,
                list,
                true), 
            'color: black; background: #ddeeff;');
    }


    uiQueueMessageToFigma({
        cmd: 'figDeleteSavedConnection',
        key:  key
    });
}



function uiRemoveSavedPage(pageId)
{
    uiQueueMessageToFigma({
        cmd:   'figRemoveSavedPage',
        pageId: pageId
    });
}



function uiRemoveAllSavedPages()
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedPages'
    });
}



function uiRemoveAllSavedConnections()
{
    for (const node of graph.nodes)
        for (const input of node.inputs)
            if (input.connected)
                uiDisconnectAny(input);

    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedConnections'
    });
}



function uiDeleteSavedConnectionsToNodeId(nodeId)
{
    if (settings.logRawSaveConnections)
    {
        //console.trace();

        console.log(
            '%cDELETING SAVED CONNECTIONS TO ' + nodeId, 
            'color: black; background: #ddeeff;');
    }


    uiQueueMessageToFigma({
        cmd:   'figDeleteSavedConnectionsToNode',
        nodeId: nodeId
    });
}



function uiDeleteSavedConnectionsFromNodeId(nodeId)
{
    uiQueueMessageToFigma({
        cmd:   'figDeleteSavedConnectionsFromNode',
        nodeId: nodeId
    });
}



function uiRemoveSavedNodesAndConns(nodeIds)
{
    uiQueueMessageToFigma({
        cmd:    'figRemoveSavedNodesAndConns',
        nodeIds: nodeIds
    });
}



function uiRemoveConnsToNodes(nodeIds)
{
    const nodes = nodeIds.map(id => nodeFromId(id));

    for (const node of nodes)
        for (const input of node.inputs)
            if (input.connected)
                uiDisconnectAny(input);

                
    uiQueueMessageToFigma({
        cmd:    'figRemoveConnsToNodes',
        nodeIds: nodeIds
    });
}



function uiDeleteAllObjects()
{
    uiQueueMessageToFigma({
        cmd: 'figDeleteAllObjects'
    });
}



function uiDeleteAllVariables()
{
    uiQueueMessageToFigma({
        cmd: 'figDeleteAllVariables'
    });
}



function uiRemoveAllSavedNodesAndConns()
{
    uiQueueMessageToFigma({
        cmd: 'figRemoveAllSavedNodesAndConns'
    });
}



function uiRemovePluginDataFromAllLocalStyles()
{
    uiQueueMessageToFigma({
        cmd: 'figRemovePluginDataFromAllLocalStyles'
    });
}



function uiCleanAllIds()
{
    uiQueueMessageToFigma({
        cmd: 'figCleanAllIds'
    });
}



function uiLogAllSavedNodesAndConns()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedNodesAndConns',
        darkMode: darkMode,
        settings: settings
    });
}



function uiLogAllSavedNodes()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedNodes',
        darkMode: darkMode,
        settings: settings
    });
}



function uiLogAllSavedConns()
{
    uiQueueMessageToFigma({
        cmd:     'figLogAllSavedConns',
        settings: settings
    });
}



function uiTriggerUndo()
{
    uiQueueMessageToFigma({
        cmd: 'figTriggerUndo'
    });
}



function uiUpdateViewportRect()
{
    uiQueueMessageToFigma({
        cmd: 'figUpdateViewportRect'
    });
}



function uiOpenLocalFile()
{
    hideAllMenus();


    if (isEmpty(graph.pages))
        graph.createPage('');

    uiDeleteAllObjects();
    uiDeleteAllVariables();
    uiRemoveAllSavedNodesAndConns();
    graph.clear();


    totalObjectCount = 0;
    updateObjectCountDisplay();


    loadFromLocalFile(json => 
    {
        importZoomToNodes = true;
        actionManager.do(new PasteNodesAction(json, false, false, true, Number.NaN, Number.NaN, true, true));

        addMetricsEvent(METRICS_LOAD_FILE);
    });
}



function uiImportFromLocalFile()
{
    loadFromLocalFile(json => 
    {
        importZoomToNodes = true;
        actionManager.do(new PasteNodesAction(json, false, false, true, Number.NaN, Number.NaN, true, true));

        addMetricsEvent(METRICS_IMPORT_FILE);
    });
}



async function uiSaveToLocalFile(defaultName = 'graph.gen')
{
    if (!subscribed())
        return;

    const nodes = graph.currentPage.nodes;
    const json  = uiCopyNodes(nodes.map(n => n.id));

    await saveToLocalFile(json, defaultName, 'text/plain');
}



async function uiSaveSelectionToLocalFile()
{
    if (  !subscribed()
        || isEmpty(graphView.selectedNodes))
        return;

    const nodes = graphView.selectedNodes;
    const json  = uiCopyNodes(nodes.map(n => n.id));

    await saveToLocalFile(json, 'selection.gen', 'text/plain');
}



function getConnsFromNodes(nodes)
{
    const conns = [];

    for (const node of nodes)
    {
        pushUnique(conns, node.connectedInputs .map(i => i.connection));
        pushUnique(conns, node.connectedOutputs.map(o => o.connections));
    }

    return conns;
}



function uiUpdateGroupBounds(msg)
{
    const node = nodeFromId(msg.nodeId);

    node.paramX     .setValue(new NumberValue(msg.x     ), false, true, true);
    node.paramY     .setValue(new NumberValue(msg.y     ), false, true, true);
    node.paramWidth .setValue(new NumberValue(msg.width ), false, true, true);
    node.paramHeight.setValue(new NumberValue(msg.height), false, true, true);
}



function editSelectedGroup()
{
    const groupNode = graphView.selectedNodes[0];

    
    // set group as current page


    // hide page nodes


    // show group nodes
}



function findNodeAbove(node)
{
    const nodesAbove = [];

    for (const n of graph.nodes)
    {
        if (n == node) continue;

        if (   n.div.offsetTop < node.div.offsetTop
            && n.div.offsetLeft < node.div.offsetLeft + node.div.offsetWidth
            && n.div.offsetLeft + n.div.offsetWidth > node.div.offsetLeft
            && n.params.filter(p => !p.readOnly).length > 0)
            nodesAbove.push(n);
    }

    nodesAbove.sort((a, b) => b.div.offsetTop - a.div.offsetTop);

    return nodesAbove.length > 0
         ? nodesAbove[0]
         : null;
}



function findNodeBelow(node)
{
    const nodesBelow = [];

    for (const n of graph.nodes)
    {
        if (n == node) continue;

        if (   n.div.offsetTop + n.div.offsetHeight > node.div.offsetTop + node.div.offsetHeight
            && n.div.offsetLeft < node.div.offsetLeft + node.div.offsetWidth
            && n.div.offsetLeft + n.div.offsetWidth > node.div.offsetLeft
            && n.params.filter(p => !p.readOnly).length > 0)
            nodesBelow.push(n);
    }

    nodesBelow.sort((a, b) => a.div.offsetTop + a.div.offsetHeight - b.div.offsetTop - b.div.offsetHeight);

    return nodesBelow.length > 0
         ? nodesBelow[0]
         : null;
}



function layoutSelectedNodes()
{
    let bounds = Rect.NaN;

    for (const node of graphView.selectedNodes)
    {
        bounds = expandRect(
            bounds, 
            new Rect(
                node.div.offsetLeft, 
                node.div.offsetTop, 
                node.div.offsetWidth, 
                node.div.offsetHeight));
    }


    graphView.selectedNodes.forEach(n => n.layoutIndex = -1);
    graphView.selectedNodes.forEach(n => n.setLayoutIndex());


    let maxIndex = 0;

    for (const node of graphView.selectedNodes)
        maxIndex = Math.max(maxIndex, node.layoutIndex);


    let   totalWidth = 0;
    const maxWidth   = [];
    const gap        = 70;


    for (let i = 0; i <= maxIndex; i++)
    {
        const colNodes = graphView.selectedNodes.filter(n => n.layoutIndex == i);
        
        let width = 0;

        colNodes.forEach(n => width = Math.max(width, n.div.offsetWidth));
        maxWidth.push(width);

        totalWidth += width;
    }

    totalWidth += gap * Math.max(0, maxWidth.filter(w => w > 0).length - 1);


    let x = bounds.x + bounds.width/2 - totalWidth/2;


    // let first = false;
    
    for (let i = 0; i <= maxIndex; i++)
    {
        const colNodes = graphView.selectedNodes.filter(n => n.layoutIndex == i);
        colNodes.forEach(n => n.newX = x);

        x += maxWidth[i];

        if (maxWidth[i] > 0)
            x += gap;
    }


    const positions = graphView.selectedNodes.map(n => point(n.newX, n.div.offsetTop));


    actionManager.do(new MoveNodesAction(graphView.selectedNodes.map(n => n.nodeId), positions));
}



function setNodeHighlight(nodes, color)
{
    actionManager.do(new HighlightNodesAction(nodes.map(n => n.nodeId), color));
}



function uiDeactivateAllNodes()
{
    deactivateAllNodes = true;

    
    const activeNodes = [];

    for (const node of graph.nodes)
    {
        if (node.active)
        {
            uiMakeNodePassive(node);
            activeNodes.push(node);

            if (node.type == ITEMS)
                pushUpdate(null, [node]);
        }
    }

    
    curRequestId = nextRequestId++;

    
    uiSaveNodes(activeNodes.map(n => n.id));
    graphView.updateNodes(activeNodes);
    
    uiDeleteObjectsAndStyles(activeNodes.map(n => n.id));


    totalObjectCount    = 0;
    totalObjectProgress = 1;
    updateObjectCountDisplay();

    
    if (objectProgressTimer)
    {
        clearTimeout(objectProgressTimer);
        objectProgressTimer = null;
    }
}