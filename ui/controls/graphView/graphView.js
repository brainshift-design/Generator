graphView.wires         = [];


graphView.overInput     = null;
graphView.overOutput    = null;
   
graphView.tempConn      = null;
   
   
graphView.selecting     = false;
graphView.selectionRect = Rect.NaN;

graphView.btn1down      = false; // this is to help deal with mouse wheels that send X values as
                                 // sometimes a MMB press is followed by wheelX as a "deeper" middle-click


graphView.pStart = {x:0, y:0};


scrollbarX.style.zIndex = MAX_INT32-1;
scrollbarY.style.zIndex = MAX_INT32-2;



graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = { x: e.clientX, 
                         y: e.clientY };

    if (   e.button == 0                 
        && !graphView.panning
        && !document.canResizeX
        && !document.canResizeY
        && !scrollbarX.moving
        && !scrollbarY.moving)
    {
        if (graphView.spaceDown)
        {
            if (getCtrlKey(e)) graphView.startZoomSelection(e.pointerId, e.clientX, e.clientY);
            else               graphView.startPan(e.pointerId);
        }
        else if (graphView.overOutput)
        {
            graphView.overOutput.connecting = true;
            graphView.startConnectionFromOutput(graphView.overOutput);
            graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
        }
        else if (graphView.overInput)
        {
            if (graphView.overInput.connectedOutput) // pretend to disconnect
            {
                graphView.startConnectionFromOutput(graphView.overInput.connectedOutput);
                graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
                graphView.tempConn.savedInput = graphView.overInput;
                hide(graphView.overInput.connection.wire);
                hide(graphView.overInput.connection.wire.outBall);
            }
            else
            {
                graphView.overInput.connecting = true;
                graphView.startConnectionFromInput(graphView.overInput);
                graphView.tempConn.wire.updateFromInput(e.clientX, e.clientY)
            }
        }
        else // selection
        {
            graphView.lastSelected = [...graphView.selected];

            graphView.startSelection(
                e.pointerId, 
                e.clientX, 
                e.clientY, 
                e.shiftKey,
                getCtrlKey(e));
        }
    }
    
    else if (e.button == 1)
    {
        e.preventDefault();
        
        graphView.btn1down = true;
        graphView.startPan(e.pointerId);
    }
});



graphView.addEventListener('pointermove', e =>
{
    graphView.p = { 
        x: e.clientX, 
        y: e.clientY };

    if (graphView.panning)
    {
        const dp = subv(graphView.p, graphView.pStart);
        graphView.pan = addv(graphView.panStart, dp);
        setCursor(panCursor);
    }
    
    else if (graphView.selecting)
        graphView.updateSelection(e.clientX, e.clientY, e.shiftKey, getCtrlKey(e));
    
    else if (graphView.zoomSelecting)
        graphView.updateZoomSelection(e.clientX, e.clientY);
    
    else if (graphView.tempConn)
    {
             if (graphView.tempConn.output) graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
        else if (graphView.tempConn.input ) graphView.tempConn.wire.updateFromInput (e.clientX, e.clientY);
    }
});



graphView.addEventListener('pointerup', e =>
{
    if (   e.button == 0
        && graphView.spaceDown)
    {
        if (getCtrlKey(e))
        {
            if (   graphView.selectionRect.w > 0
                && graphView.selectionRect.h > 0)
            {
                graphView.endZoomSelection(e.pointerId, true);
            }
            else
            {
                graphView.endZoomSelection(e.pointerId, false);

                graphView.oldZoom = graphView.zoom;

                if (e.altKey) graphView.zoom /= 2;
                else          graphView.zoom *= 2;

                graphView.pan = subv(graphView.pan, mulvs(subv(position(e), graphView.pan), graphView.zoom / graphView.oldZoom - 1));
            }
        }
        
        graphView.endPan(e.pointerId, false);
    }

    else if (e.button == 0
         && !graphView.selectionRect.isNaN)
        graphView.endSelection(e.pointerId);

    else if (e.button == 0
          && graphView.tempConn)
        graphView.endConnection();

    else if (e.button == 1
          && graphView.panning)
    {
        graphView.btn1down = false;
        graphView.endPan(e.pointerId, true);
    }
});



graphView.addEventListener('wheel', e =>
{
    if (graphView.btn1down)
        return;


    const dZoom = Math.log(graphView.zoom) / Math.log(2);

    const dWheelX = e.deltaX / 120;
    const dWheelY = e.deltaY / 120;

    if (getCtrlKey(e))
    {
        const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / 10));
        const pan  = subv(graphView.pan, mulvs(subv(position(e), graphView.pan), zoom / graphView.zoom - 1));

        graphView.setZoomAndPan(zoom, pan);
    }
    else
    {
        const dPanX = dWheelX * 20 / Math.pow(graphView.zoom, 0.1);
        const dPanY = dWheelY * 20 / Math.pow(graphView.zoom, 0.1);

        graphView.pan = 
            dWheelX != 0
            ? { x:  e.shiftKey ? graphView.pan.x : graphView.pan.x - dPanX,
                y: !e.shiftKey ? graphView.pan.y : graphView.pan.y - dPanX }
            : { x: !e.shiftKey ? graphView.pan.x : graphView.pan.x - dPanY,
                y:  e.shiftKey ? graphView.pan.y : graphView.pan.y - dPanY };

        if (graphView.selecting)
        {
            graphView.updateSelection(
                e.clientX, 
                e.clientY, 
                e.shiftKey);
        }
    }
});



graphView.getAllNodeBounds = () =>
{
    let bounds = Rect.NaN;

    for (const node of graph.nodes)
        bounds = expandRect(bounds, boundingRect(node.div));

    return bounds;
};



// graphView.getNodeBounds = (nodes) =>
// {
//     let boundsL = Number.MAX_SAFE_INTEGER;
//     let boundsT = Number.MAX_SAFE_INTEGER;
//     let boundsR = Number.MIN_SAFE_INTEGER;
//     let boundsB = Number.MIN_SAFE_INTEGER;
    
//     for (const node of nodes)
//     {
//         const bounds = boundingRect(node.div);

//         boundsL = Math.min(boundsL, bounds.l);
//         boundsT = Math.min(boundsT, bounds.t);
//         boundsR = Math.max(boundsR, bounds.r);
//         boundsB = Math.max(boundsB, bounds.b);
//     }

//     return {
//         x: boundsL - graphView.pan.x, 
//         y: boundsT - graphView.pan.y,
//         w: boundsR - boundsL,
//         h: boundsB - boundsT };
// };



// graphView.getZoomedNodeBounds = (nodes) =>
// {
//     let bounds = graphView.getNodeBounds(nodes);

//     bounds.x /= graphView.zoom;
//     bounds.y /= graphView.zoom;
//     bounds.w /= graphView.zoom;
//     bounds.h /= graphView.zoom;

//     return boundsl;
// }



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
        {
            intersecting.push(n);
        }
    }

    return intersecting;
}



graphView.placeNewNode = node =>
{
    node.div.style.left = (graphView.offsetWidth  / 6 - graphView.pan.x) / graphView.zoom;
    node.div.style.top  = (graphView.offsetHeight / 4 - graphView.pan.y) / graphView.zoom;


    const dx = 30;
    const dy = 20;


    let maxLength = 100; // stack overflow safeguard
    
    let intersecting;
    while (   maxLength-- > 0
           && (intersecting = graphView.getIntersectingNodes(node)).length > 0)
    {
        let bounds = Rect.NaN;
        
        for (const n of intersecting)
            bounds = expandRect(bounds, graphView.getNodeBounds(n));

        const right = intersecting.reduce((a, b) => 
            graphView.getNodeBounds(a).r > graphView.getNodeBounds(b).r ? a : b);

        if (right.opType == node.opType) node.div.style.top  = bounds.b + dy;
        else                             node.div.style.left = bounds.r + dx;
    }
};



graphView.putNodeOnTop = node =>
{
    const topIndices = 
          1 
        + node.inputs.filter(i => i.isConnected).length 
        + (node.outputs.find(o => o.isConnected) ? 1 : 0);
        
    for (const n of graph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);
        
    var z = MAX_INT32-3; // -3 is for scrollbars

    for (const input of node.inputs.filter(i => i.isConnected))
        input.connection.wire.style.zIndex = z--;
        
    for (const output of node.outputs)
        for (const connInput of output.connectedInputs)
            connInput.connection.wire.style.zIndex = z--;
    
    node.div.style.zIndex = z;
};



graphView.updateNodeTransform = function(node)
{
    node.div.style.transform =
          'translate(' 
        + (graphView.pan.x * graphView.zoom) + 'px, '
        + (graphView.pan.y * graphView.zoom) + 'px) '
        + 'scale(' + graphView.zoom + ')';
    

    const nodeRect = graphView.getNodeOffsetRect(node.div);

    node.div.style.transformOrigin = 
          ((graphView.pan.x - node.div.offsetLeft) / nodeRect.width  * 100) + '% ' 
        + ((graphView.pan.y - node.div.offsetTop ) / nodeRect.height * 100) + '%';  

   
    for (const input of node.inputs)
    {
        if (input.isConnected)
            graphView.updateWireTransform(input.connection.wire);        
    }


    for (const output of node.outputs)
        for (const connInput of output.connectedInputs)
            graphView.updateWireTransform(connInput.connection.wire);
};



graphView.updateWireTransform = function(wire)
{
    wire.setAttribute('width',  graphView.clientWidth  / graphView.zoom);
    wire.setAttribute('height', graphView.clientHeight / graphView.zoom);

    wire.setAttribute('viewBox',
                 0
        + ' ' + 20                     / graphView.zoom // 20 seems to be the plugin title bar
        + ' ' + graphView.clientWidth  / graphView.zoom
        + ' ' + graphView.clientHeight / graphView.zoom);

    wire.update();
};



graphView.addWire = wire =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);
    graphView.updateWireTransform(wire);
};



graphView.addWireFromOutput = (wire, output) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);
};



graphView.addWireFromInput = (wire, input) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);  
};



graphView.removeWire = wire =>
{
    graphView.removeChild(wire);    
    removeFromArray(graphView.wires, wire);
};



graphView.getNodeOffsetRect = (node) =>
{
    const ox   = -graphView.pan.x / graphView.zoom;
    const oy   = -graphView.pan.y / graphView.zoom;

    const rect = boundingRect(node);

    return new DOMRect(
        ox + (rect.left / graphView.zoom),
        oy + (rect.top  / graphView.zoom), 
        rect.width      / graphView.zoom, 
        rect.height     / graphView.zoom);
}