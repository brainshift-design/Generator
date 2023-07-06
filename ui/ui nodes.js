var requestObjects = [];



function createNode(nodeType, creatingButton = null, createdNodeId = -1, options = {})
{
    let node;
 
    switch (nodeType)
    {
        case LIST:                    node = new OpList();              break;
        case ITEMS:                   node = new OpItems();             break;
        case SELECT:                  node = new OpSelect();            break;
        case LIST_COUNT:              node = new OpListCount();         break;
        case IF_ELSE:                 node = new OpIfElse();            break;
        case START:                   node = new OpStart();             break;
        case REPEAT:                  node = new OpRepeat();            break;
        case CACHE:                   node = new OpCache();             break;
        case COPY:                    node = new OpCopy();              break;
        case TIMER:                   node = new OpTimer();             break;

        case NUMBER:                  node = new OpNumber();            break;
        case NUMBER_SIGN:             node = new OpSign();              break;
        case NUMBER_ABSOLUTE:         node = new OpAbsolute();          break;
        case NUMBER_ROUND:            node = new OpRound();             break;
        case NUMBER_LIMITS:           node = new OpLimits();            break;
        case NUMBER_CONSTANT:         node = new OpConstant();          break;
        case NUMBER_DATETIME:         node = new OpDateTime();          break;
        
        case NUMBER_DEFINE:           node = new OpDefine();            break;
        case NUMBER_DISTRIBUTE:       node = new OpDistribute();        break;
        case NUMBER_SEQUENCE:         node = new OpSequence();          break;
        case NUMBER_RANDOM:           node = new OpRandom();            break;
        case NUMBER_NOISE:            node = new OpNoise();             break;
        case NUMBER_PROBABILITY:      node = new OpProbability();       break;

        case NUMBER_INTERPOLATE:      node = new OpInterpolate();       break;
        case NUMBER_TO_TEXT:          node = new OpNumberToText();      break;
        case NUMBER_SOLVE:            node = new OpSolve();             break;
        case NUMBER_ANIMATE:          node = new OpAnimate();           break;

        case NUMBER_MATH:             node = new OpMath();              break;
        case NUMBER_ADD:              node = new OpAdd();               break;
        case NUMBER_SUBTRACT:         node = new OpSubtract();          break;
        case NUMBER_MULTIPLY:         node = new OpMultiply();          break;
        case NUMBER_DIVIDE:           node = new OpDivide();            break;
        case NUMBER_MODULO:           node = new OpModulo();            break;
        case NUMBER_EXPONENT:         node = new OpExponent();          break;

        case NUMBER_BOOLEAN:          node = new OpBoolean();           break;
        case NUMBER_NOT:              node = new OpNot();               break;
        case NUMBER_AND:              node = new OpAnd();               break;
        case NUMBER_OR:               node = new OpOr();                break;
        case NUMBER_XOR:              node = new OpXor();               break;

        case NUMBER_CONDITION:        node = new OpCondition();         break;
        case NUMBER_EQUAL:            node = new OpEqual();             break;
        case NUMBER_NOT_EQUAL:        node = new OpNotEqual();          break;
        case NUMBER_LESS:             node = new OpLess();              break;
        case NUMBER_LESS_OR_EQUAL:    node = new OpLessOrEqual();       break;
        case NUMBER_GREATER:          node = new OpGreater();           break;
        case NUMBER_GREATER_OR_EQUAL: node = new OpGreaterOrEqual();    break;

        case NUMBER_TRIG:             node = new OpTrig();              break;
        case NUMBER_SIN:              node = new OpSine();              break;
        case NUMBER_COS:              node = new OpCosine();            break;
        case NUMBER_TAN:              node = new OpTangent();           break;

        case TEXT:                    node = new OpText();              break;
        case TEXT_LENGTH:             node = new OpTextLength();        break;
        case TEXT_TRIM:               node = new OpTextTrim();          break;
        case TEXT_SUBSTRING:          node = new OpTextSubstring();     break;
        case TEXT_CASE:               node = new OpTextCase();          break;
        case TEXT_CHAR:               node = new OpTextCharacter();     break;
        case TEXT_REPLACE:            node = new OpTextReplace();       break;
        case TEXT_JOIN:               node = new OpTextJoin();          break;
        case TEXT_PAD:                node = new OpTextPad();           break;
        case TEXT_COMPARE:            node = new OpTextCompare();       break;
        case TEXT_TO_NUMBER:          node = new OpTextToNumber();      break;
        case TEXT_CSV:                node = new OpTextCSV();           break;
        case TEXT_JSON:               node = new OpTextJson();          break;
        case TEXT_FETCH:              node = new OpTextFetch();         break;

        case COLOR:                   node = new OpColor(options);      break;
        case VALID_COLOR:             node = new OpValidColor();        break;
        case CORRECT_COLOR:           node = new OpCorrectColor();      break;
        case COLOR_CONTRAST:          node = new OpColorContrast();     break;
        case COLORBLIND:              node = new OpColorBlind();        break;
        case COLOR_INTERPOLATE:       node = new OpColorInterpolate();  break;
        case COLOR_BLEND:             node = new OpColorBlend();        break;

        
        case FILL:                    node = new OpFill();              break;
        case GRADIENT:                node = new OpGradient();          break;
        case COLOR_STOP:              node = new OpColorStop();         break;

        case STROKE:                  node = new OpStroke();            break;

        case DROP_SHADOW:             node = new OpDropShadow();        break;
        case INNER_SHADOW:            node = new OpInnerShadow();       break;
        case LAYER_BLUR:              node = new OpLayerBlur();         break;
        case BACK_BLUR:               node = new OpBackBlur();          break;

        case LAYER_MASK:              node = new OpLayerMask();         break;

        case COLOR_STYLE:             node = new OpColorStyle(options); break;

        case RECTANGLE:               node = new OpRectangle();         break;
        case LINE:                    node = new OpLine();              break;
        case ELLIPSE:                 node = new OpEllipse();           break;
        case TRAPEZE:                 node = new OpTrapeze();           break;
        case POLYGON:                 node = new OpPolygon();           break;
        case STAR:                    node = new OpStar();              break;
        case TEXT_SHAPE:              node = new OpTextShape();         break;
        case POINT:                   node = new OpPoint();             break;
        case VECTOR_PATH:             node = new OpVectorPath();        break;
        case BOOLEAN:                 node = new OpShapeBoolean();      break;
        case SHAPE_GROUP:             node = new OpShapeGroup();        break;
        case FRAME:                   node = new OpFrame();             break;

        case MOVE:                    node = new OpMove();              break;
        case ROTATE:                  node = new OpRotate();            break;
        case SCALE:                   node = new OpScale();             break;
        case SKEW:                    node = new OpSkew();              break;
        
        case PLACE:                   node = new OpPlace();             break;

        case RENDER:                  node = new OpRender();            break;

        case GROUP_NODE:              node = new OpGroupNode();         break;
        case GROUP_PARAM:             node = new OpGroupParam();        break;

        case COMMENT:                 node = new OpComment();           break;

        default:                      consoleError('Graph.js/createNode() cannot create type ' + nodeType);
    }
    
    node._creatingButton = creatingButton;

    return node;
}



function idFromNode(node)
{
    return node ? node.id : '';
}



function nodesToJson(nodes, encloseBraces = true, connOutputMustBeInNodes = true)
{
    const tab = HTAB;
    
    let json = 
          (encloseBraces ? '{\n' : '')
          + tab + '"nodes":\n'
          + tab + '[';

    let first = true;
    for (let i = 0; i < nodes.length; i++)
    {
        if (!first) json += ','; first = false;

        nodes[i].stripIdForCopy = true;
        json += NL + nodes[i].toJson(4);
    }

    json += NL + tab + ']';
    json += connectionsToJson(nodes, connOutputMustBeInNodes);
    json += (encloseBraces ? '\n}' :'');

    return json;
}



function connectionsToJson(nodes, connOutputMustBeInNodes)
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
                   && !nodes.includes(node.inputs[j].connectedOutput.node))
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



function canAutoConnectNode(node)
{
    const selNode = graph.pageNodes.find(n => n.selected);

    if (  !selNode
        || isEmpty(selNode.headerOutputs))
        return false;

    const inputs = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));

    return !isEmpty(inputs)
         && node.canAutoConnectFrom(selNode.headerOutputs[0]);
}



function uiDeleteNodes(nodeIds)
{
    nodeIds.forEach(id => nodeFromId(id).makePassive());

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



function uiVariableConnect(outputNode, outputId, inputNode, inputId, outputOrder = -1)
{
    //console.log('uiVariableConnect()');

    const output = outputNode.outputFromId(outputId);
    return uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder);
}



function uiVariableConnectFromOutput(output, inputNode, inputId, outputOrder = -1)
{
    //console.log('uiVariableConnectFromOutput()');

    const input = inputNode.inputFromId( inputId);


    if (    inputNode.variableInputs
        && (!input || !input.param))
    {
        const conn = uiConnect(
            output,
            inputNode.headerInputs.at(-1),
            inputId,
            outputOrder);

        if (outputOrder > -1)
            conn.outputOrder = outputOrder;

        if (   !graphView.loadingNodes
            && !graphView.pastingNodes
            && !graphView.restoringNodes)
            uiUpdateSavedConnectionsToNodeId(inputNode.id, true);

        return conn;
    }
    else
        return uiConnect(output, input, '', outputOrder);
}



function uiConnect(output, input, inputId = '', outputOrder = -1)
{
    return output.node.graph.connect(output, input, inputId, outputOrder);
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



function makeSelectedNodesActive()
{
    if (graphView.selectedNodes.find(n => !n.active))
        actionManager.do(new MakeActiveNodesAction(graphView.selectedNodes.map(n => n.id), false));
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



function uiMakeNodesActive(nodes, shiftKey = false)
{
    if (!shiftKey)
    {
        const treeNodes = [];

        for (const node of nodes)
            pushUnique(treeNodes, getAllNodesFromNode(node));

        for (const node of treeNodes)
            if (node.active)
                uiMakeNodePassive(node);


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
        param.controls[0].setValue(value, false);
    }
}



function uiCopyNodes(nodeIds)
{
    const nodes      = graph.nodes.filter(n => nodeIds.includes(n.id));
    const copiedJson = nodesToJson(nodes, true, false);

    // console.log(copiedJson);

    return copiedJson;
}



function uiPasteNodes(nodesJson, loading, pasteConnected, x, y, updateNodes)
{
    //console.log(nodesJson);

    graphView.pastingNodes = true;


    pasteOffset.x += pasteOffsetDelta.x;
    pasteOffset.y += pasteOffsetDelta.y;


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
            data.nodes[i].x = parseFloat(data.nodes[i].x) + pasteOffset.x;
            data.nodes[i].y = parseFloat(data.nodes[i].y) + pasteOffset.y;
        }
    }


    //moveNodesToViewport(data.nodes);


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



function uiUpdateValuesAndObjects(requestId, actionId, updateNodeId, updateParamId, values, objects, styles, updatedNodes, totalNodes, isLastChunk)
{
    // console.log('requestId =',       requestId);
    // console.log('lastRequestedId =', lastRequestedId);


    if (requestId < lastRequestedId) 
        return;
    
    lastRequestedId = -1;

        
    if (loadRestartTimer > -1)
    {
        clearTimeout(loadRestartTimer);
        loadRestartTimer = -1;
    }


    if (settings.logRawValues)  
        console.log('raw values = ', values);

    if (settings.logValueUpdates)  
        logValueUpdates(updateNodeId, updateParamId, values);


    const nodes = [];

    let i = 0;
    while (i < values.length)
    {
        const nodeId = values[i++];
        const count  = values[i++];

        const node   = nodeFromId(nodeId);


        if (node)
            pushUnique(nodes, node);


        if (count > 0)
        {
            const _ids    = [];
            const _values = [];


            for (let j = 0; j < count; j++)
            {
                const id   = values[i++];
                const type = values[i++];

                _ids.push(id);

                let value = parseValueFromType(type, values[i++]);

                if (value.nodeId)
                    value.nodeId = nodeId;
    
                _values.push(value);
            }


            if (node)
            {
                node.updateValues( 
                    requestId,
                    actionId,
                    updateNodeId == nodeId ? updateParamId : '',
                    _ids,
                    _values);

                node.valid = true;
            }
        }
    }

    
    if (   !isEmpty(objects)
        || !isEmpty(styles))
    {
        if (settings.logObjectUpdates) logObjectUpdates([...objects]);
        if (settings.logStyleUpdates)  logStyleUpdates ([...styles ]);

        objects = objects.filter(o => nodeFromId(o[FO_NODE_ID]).active);

        uiQueueMessageToFigma({
            cmd:          'figUpdateObjectsAndStyles',
            updateNodeId:  updateNodeId,
            updateParamId: updateParamId,
            nodeIds:       nodes.map(n => n.id),
            objects:       [...objects],
            styles:        [...styles ]});

        requestObjects.push(...objects);
    }


    if (   !graphView.loadingNodes
        && !numberControlChanging)
        uiSaveNodes(nodes.map(n => n.id));


    for (const node of nodes)
    {
        if (   graphView.creatingNodes
            || graphView.loadingNodes
            || graphView.pastingNodes
            || graphView.restoringNodes)
            node.div.style.display = 'block';

        node.updateMeasureData();
        node.updateNode();
    }


    if (isLastChunk)
    {
        uiQueueMessageToFigma({
            cmd:          'figDeleteObjectsExcept',
            updateNodeId:  updateNodeId,
            updateParamId: updateParamId,
            nodeIds:       nodes.map(n => n.id),
            ignoreObjects: [...requestObjects]});

        requestObjects = [];
    }


    graphView.updateNodes(nodes);
    graphView.updateScrollWithBounds();


    if (graphView.loadingNodes)
        setLoadingProgress((0.7 + 0.3 * updatedNodes / totalNodes) / 0.7)


    if (isLastChunk)
    {
        if (graphView.loadingNodes)
        {
            uiSaveNodes(graph.nodes.map(n => n.id));
            graph.updatePages();
        }

        graphView.creatingNodes  = false;
        graphView.pastingNodes   = false;
        graphView.loadingNodes   = false;
        graphView.restoringNodes = false;

        actionManager.undoing    = false;
        actionManager.redoing    = false;
        

        loadingOverlay.style.display = 'none'; // for loading
    }
}



function uiToggleDisableNodes(nodes)
{
    nodes.forEach(n => { n.enabled = !n.enabled; });
}



function uiSavePages(pageIds, pageJson, currentPageId)
{
    if (settings.logRawSavePages)
        logSavePages(pageJson.join('\n'));

    uiQueueMessageToFigma({
        cmd:          'figSavePages',
        pageIds:       pageIds,
        pageJson:      pageJson,
        currentPageId: currentPageId });
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



function uiImportFromLocalFile()
{
    loadFromLocalFile(json => 
    {
        actionManager.do(new PasteNodesAction(json, false, false, true));
    });
}



function uiSaveSelectionToLocalFile()
{
    if (isEmpty(graphView.selectedNodes))
        return;
        
    const json = uiCopyNodes(graphView.selectedNodes.map(n => n.id));

    saveToLocalFile(json, 'selection.gen', 'text/plain');
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