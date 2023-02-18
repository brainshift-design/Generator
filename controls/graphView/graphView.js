graphView.wires           = [];
 
graphView.loadingNodes    = false;
graphView.pastingNodes    = false;
graphView.restoringNodes  = false;


graphView.canUpdateNodes  = true;


graphView.activeNodes     = [];


graphView.overNode        = null;
graphView.overInput       = null;
graphView.overOutput      = null;
    
graphView.headerInput     = null; // same as overInput, but when snapping from a header
graphView.headerOutput    = null; // same as overOutput, but when snapping from a header
    
graphView.tempConn        = null;
graphView.savedConn       = null;
graphView.tempConnected   = false;

graphView.connPointerId   = -1;

graphView._soloNode       = null;
   
graphView.selecting       = false;
graphView.selectionRect   = Rect.NaN;

graphView.btn1down        = false; // this is to help deal with mouse wheels that send X values as
                                   // sometimes a MMB press is followed by wheelX as a "deeper" middle-click

                                   
graphView.pan             = point(0, 0);
graphView.zoom            = 1;
 
graphView.panning         = false;
 
graphView.pViewport; 
graphView.pStart          = point(0, 0);
graphView.zoomStart;


scrollbarX.style.zIndex   = MAX_INT32-1;
scrollbarY.style.zIndex   = MAX_INT32-2;


graphView.touches         = [];


graphView.wheelTimer      = null;


var graphViewClient       = null; // rect



graphView.getAllNodeBounds = function(onlySelected = false)
{
    let bounds = Rect.NaN;

    const nodes =
            onlySelected
        && !isEmpty(graphView.selectedNodes)
        ? graphView.selectedNodes
        : graph.nodes;

    for (const node of nodes)
        bounds = expandRect(bounds, node.measureData.divBounds);//boundingRect(node.div));

    return bounds;
};



graphView.getAllNodeOffsets = function(nodes = null)
{
    let bounds = Rect.NaN;

    if (!nodes)
        nodes = graph.nodes;

    for (const node of nodes)
        bounds = expandRect(bounds, node.measureData.divOffset);//boundingRect(node.div));

    return bounds;
};



graphView.getAllNodeBounds = function()
{
    let bounds = Rect.NaN;

    for (const node of graph.nodes)
        bounds = expandRect(bounds, node.measureData.divBounds);//boundingRect(node.div));

    return bounds;
};



graphView.getNodeBounds = node =>
{
    const bounds = boundingRect(node.div);

    return new Rect(
        parseFloat(node.div.style.left ),
        parseFloat(node.div.style.top  ),
        parseFloat(node.div.style.width),
        bounds.h / graphView.zoom); // node height isn't defined
}



graphView.getZoomedNodeBounds = node =>
{
    const bounds = graphView.getNodeBounds(node);

    bounds.x += graphView.pan.x / graphView.zoom;
    bounds.y += graphView.pan.y / graphView.zoom;
    bounds.w /= graphView.zoom;
    bounds.h /= graphView.zoom;

    return bounds;
};



graphView.getIntersectingNodes = node =>
{
    const nodeBounds = graphView.getZoomedNodeBounds(node);

    const intersecting = [];
    
    for (const n of graph.nodes)
    {
        const nBounds = graphView.getZoomedNodeBounds(n);
        
        if (   n != node
            && rectsIntersect(nBounds, nodeBounds))
            intersecting.push(n);
    }

    return intersecting;
}



graphView.placeNewNode = function(node)
{
    //console.log('graphView.placeNewNode()');

    const nodeRect = boundingRect(node.div);
    
    const btn = node._creatingButton;

    if (btn)
    {
        node.div.style.left = (btn.offsetLeft + btn.offsetWidth/2 - graphView.pan.x) / graphView.zoom - nodeRect.width/2;
        node.div.style.top  = (20 - graphView.pan.y) / graphView.zoom;
    }
    else
    {
        node.div.style.left = (graphView.offsetWidth /2 - graphView.pan.x                       ) / graphView.zoom - nodeRect.width /2;
        node.div.style.top  = (graphView.offsetHeight/2 - graphView.pan.y - menuBarHeight) / graphView.zoom - nodeRect.height/2;
    }
};



graphView.autoPlaceNewNode = function(output, input)
{
    //console.log('graphView.autoPlaceNewNode()');

    const defaultPlacementGap = 30;

    input.node.div.style.left = output.node.div.offsetLeft + output.node.div.offsetWidth + defaultPlacementGap;
    input.node.div.style.top  = output.node.div.offsetTop;//outputRect.y - graphView.pan.y/graphView.zoom - (inputRect.y - inputNodeRect.y);
};



graphView.putNodeOnTop = function(node)
{
    const topIndices = 
          1 
        + node.inputs.filter(i => i.connected).length 
        + (node.outputs.find(o => o.connected) ? 1 : 0);
        
    for (const n of graph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);
        
    node.div.style.zIndex = MAX_INT32-3; // -3 is for scrollbars;

    graphView.putWiresOnTop(node);
};



graphView.putWiresOnTop = function(node)
{
    // changing z-index doesn't work so easily with SVG,
    // so reinsert the wires on top instead 🤷‍♂️

    let z = MAX_INT32;

    for (const input of node.inputs.filter(i => i.connected))
    {
        wireContainer.removeChild(input.connection.wire);
        wireContainer.appendChild(input.connection.wire);
    }
        
    for (const output of node.outputs)
    {
        for (const connInput of output.connectedInputs)
        {
            wireContainer.removeChild(connInput.connection.wire);
            wireContainer.appendChild(connInput.connection.wire);
        }
    }
};



graphView.updateNodeTransforms = function(nodes, _updateWires = true)
{
    const nodeLeft = nodes.map(n => n.div.offsetLeft);
    const nodeTop  = nodes.map(n => n.div.offsetTop);
    const nodeRect = nodes.map(n => graphView.getNodeOffsetRect(n.div));
    

    const wires = [];

    for (const node of nodes)
    {
        for (const input of node.inputs)
            if (   input.connected
                && input.connection
                && !wires.includes(input.connection.wire))
                wires.push(input.connection.wire);        

        for (const output of node.outputs)
            for (const connInput of output.connectedInputs)
                if (   connInput.connection
                    && !wires.includes(connInput.connection.wire))
                    wires.push(connInput.connection.wire);
    }


    for (let i = 0; i < nodes.length; i++)
        graphView.setNodeTransform(nodes[i], nodeLeft[i], nodeTop[i], nodeRect[i]);


    if (_updateWires)
        updateWires(wires);
};



graphView.updateNodeTransform = function(node)
{
    const nodeLeft = node.div.offsetLeft;
    const nodeTop  = node.div.offsetTop;
    const nodeRect = graphView.getNodeOffsetRect(node.div);
    

    const wires = [];

    for (const input of node.inputs)
        if (   input.connected
            && input.connection)
            wires.push(input.connection.wire);        

    for (const output of node.outputs)
        for (const connInput of output.connectedInputs)
            if (connInput.connection)
                wires.push(connInput.connection.wire);

    graphView.setNodeTransform(node, nodeLeft, nodeTop, nodeRect);

    updateWires(wires);
};



graphView.setNodeTransform = function(node, nodeLeft, nodeTop, nodeRect)
{
    node.div.style.transform =
          'translate(' 
        + (graphView.pan.x * graphView.zoom) + 'px, '  
        + (graphView.pan.y * graphView.zoom) + 'px) '
        + 'scale(' + graphView.zoom + ')';
    
    node.div.style.transformOrigin = 
          ((graphView.pan.x - nodeLeft) / nodeRect.width  * 100) + '% ' 
        + ((graphView.pan.y - nodeTop ) / nodeRect.height * 100) + '%';  
};



graphView.getNodeOffsetRect = function(node)
{
    const ox   = -graphView.pan.x / graphView.zoom;
    const oy   = -graphView.pan.y / graphView.zoom;

    const rect = boundingRect(node);

    return new DOMRect(
        ox + (rect.left / graphView.zoom),
        oy + (rect.top  / graphView.zoom), 
        rect.width      / graphView.zoom, 
        rect.height     / graphView.zoom);
};



graphView.soloNode = function(node)
{
    graphView._soloNode = node;

    graph.nodes.forEach(n => 
        n.div.style.opacity = 
               n == graphView._soloNode
            || n.isConnectedTo(graphView._soloNode)
            ? 1 
            : 0.12);

    graph.connections.forEach(c =>
    { 
        c.wire .style.opacity = 
               c.input  && graphView._soloNode == c.input .node
            || c.output && graphView._soloNode == c.output.node
            ? 1 
            : 0.09;
    });

    updateWires(graph.connections.map(c => c.wire));
};



graphView.unsoloNode = function()
{
    graphView._soloNode = null;

    graph.nodes      .forEach(n => n.div.style.opacity = 1);
    graph.connections.forEach(c => c.wire .style.opacity = 1);

    updateWires(graph.connections.map(c => c.wire));
};



graphView.updateShowWires = function(updateNodes = true)
{
    graph.connections.forEach(c => show(c.wire, true));//settings.showWires));

    if (updateNodes) 
        graph.nodes.forEach(n => n.updateNode());
};



graphView.toJson = function()
{
    const tab = '\n' + TAB;

    return '{'
        + tab + '"zoom": "' + graphView.zoom  + '",'
        + tab + '"panx": "' + graphView.pan.x + '",'
        + tab + '"pany": "' + graphView.pan.y + '"'
        + '\n}';
};



function selectAllNodes(invert)
{
    const lastSelected = [...graphView.selectedNodes];

    graphView.selectedNodes = 
        invert
        ? graph.nodes.filter(n => !lastSelected.includes(n))
        : graph.nodes;
        
    actionManager.do(new SelectNodesAction(
        graphView.selectedNodes.map(n => n.id), 
        lastSelected           .map(n => n.id)));
}



function copySelectedNodes()
{
    pasteOffset     = point(0, 0);
    copiedNodesJson = uiCopyNodes(graphView.selectedNodes.map(n => n.id));

    writeTextToClipboard(copiedNodesJson);
}



function pasteCopiedNodes(pasteConnected, clientX = Number.NaN, clientY = Number.NaN)
{
    readTextFromClipboard().then(clipboardText =>
    {
        if (clipboardText == '')//if (copiedNodesJson == '')
            return;

        const x = (clientX - graphView.pan.x) / graphView.zoom;
        const y = (clientY - graphView.pan.y) / graphView.zoom;
            
        actionManager.do(new PasteNodesAction(clipboardText, pasteConnected, false, x, y));
    });
}



function duplicateSelectedNodes(pasteConnected)
{
    if (!isEmpty(graphView.selectedNodes))
    {
        pasteOffset = point(0, 0);
        actionManager.do(new PasteNodesAction(uiCopyNodes(graphView.selectedNodes.map(n => n.id)), pasteConnected, true));
    }
}



function deleteSelectedNodes()
{
    const nodeIds = graphView.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new DeleteNodesAction(nodeIds));
        graphView._selected = [];
    }
}



function removeSelectedNodes()
{
    const nodeIds = graphView.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new RemoveNodesAction(nodeIds));
        graphView._selected = [];
    }
}



function layoutSelectedNodes()
{
    
}



function renameSelectedNode()
{
    if (graphView.selectedNodes.length == 1)
        graphView.selectedNodes[0].showLabelTextbox();
}