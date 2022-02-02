graphView.wires          = [];
graphView.canUpdateNodes = true;


graphView.overNode       = null;
graphView.overInput      = null;
graphView.overOutput     = null;
   
graphView.headerInput    = null; // same as overInput, but when snapping from a header
graphView.headerOutput   = null; // same as overOutput, but when snapping from a header
   
graphView.tempConn       = null;

graphView.showWires      = true;
graphView._soloNode      = null;
   
graphView.selecting      = false;
graphView.selectionRect  = Rect.NaN;

graphView.btn1down       = false; // this is to help deal with mouse wheels that send X values as
                                  // sometimes a MMB press is followed by wheelX as a "deeper" middle-click


graphView.panning        = false;

graphView.pStart         = {x:0, y:0};


scrollbarX.style.zIndex  = MAX_INT32-1;
scrollbarY.style.zIndex  = MAX_INT32-2;



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
            graphView.startConnectionFromOutput(e.pointerId, graphView.overOutput);

            graphView.tempConn.wire.updateFromOutput(
                e.clientX, 
                e.clientY, 
                boundingRect(graphView.overOutput.control),
                controlBar.offsetHeight);
        }
        else if (graphView.overInput)
        {
            if (graphView.overInput.connectedOutput) // pretend to disconnect
            {
                graphView.startConnectionFromOutput(e.pointerId, graphView.overInput.connectedOutput);
                
                graphView.tempConn.wire.updateFromOutput(
                    e.clientX, 
                    e.clientY, 
                    boundingRect(graphView.overInput.connectedOutput.control),
                    controlBar.offsetHeight);
                
                graphView.tempConn.savedInput = graphView.overInput;
                hide(graphView.overInput.connection.wire);
            }
            else
            {
                graphView.overInput.connecting = true;
                graphView.startConnectionFromInput(e.pointerId, graphView.overInput);
                
                graphView.tempConn.wire.updateFromInput(
                    e.clientX, 
                    e.clientY,
                    boundingRect(graphView.overInput.control),
                    controlBar.offsetHeight);
            }
        }
        else // selection
        {
            graphView.lastSelectedNodes = [...graphView.selectedNodes];

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
        graphView.btn1down = true;
        graphView.startPan(e.pointerId);
    }
});



graphView.addEventListener('pointermove', graphView_onpointermove);



function graphView_onpointermove(e)
{
    graphView.p = { 
        x: e.clientX, 
        y: e.clientY };

    if (graphView.panning)
    {
        setTimeout(() =>
        {
            setCursor(panCursor);

            const dp = subv(graphView.p, graphView.pStart);

            graphView.setPanAndZoom(
                addv(graphView.panStart, dp), 
                graphView.zoom);
        });
    }
    
    else if (graphView.selecting)
        graphView.updateSelection(e.clientX, e.clientY, e.shiftKey, getCtrlKey(e));
    
    else if (graphView.zoomSelecting)
        graphView.updateZoomSelection(e.clientX, e.clientY);
    
    else if (graphView.tempConn)
    {
        if (graphView.tempConn.output)
        { 
            graphView.tempConn.wire.updateFromOutput(
                e.clientX, 
                e.clientY,
                boundingRect(graphView.tempConn.output.control),
                controlBar.offsetHeight);
        }
        else if (graphView.tempConn.input) 
        {
            graphView.tempConn.wire.updateFromInput(
                e.clientX, 
                e.clientY,
                boundingRect(graphView.tempConn.input.control),
                controlBar.offsetHeight);
        };
    }
}



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
        graphView.endConnection(e.pointerId);

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
        let pos = position(e);
        pos.y -= controlBar.offsetHeight;

        const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / 10));
        const pan  = subv(graphView.pan, mulvs(subv(pos, graphView.pan), zoom / graphView.zoom - 1));

        graphView.setPanAndZoom(pan, zoom);
        graphView.updatePanAndZoom();
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


    if (graphView.tempConn)
        graphView_onpointermove(e);
});



graphView.getAllNodeBounds = () =>
{
    let bounds = Rect.NaN;

    for (const node of graph.nodes)
        bounds = expandRect(bounds, boundingRect(node.div));

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
        {
            intersecting.push(n);
        }
    }

    return intersecting;
}



graphView.placeNewNode = (node) =>
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

        if (   right.opType == node.opType
            && node.opType != 'color'
            && node.opType != 'webcontrast') node.div.style.top  = bounds.b + dy;
        else                                 node.div.style.left = bounds.r + dx;
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
        
    node.div.style.zIndex = MAX_INT32-3; // -3 is for scrollbars
};



graphView.updateNodeTransforms = nodes =>
{
    const nodeLeft = nodes.map(n => n.div.offsetLeft);
    const nodeTop  = nodes.map(n => n.div.offsetTop);
    const nodeRect = nodes.map(n => graphView.getNodeOffsetRect(n.div));
    
    for (let i = 0; i < nodes.length; i++)
        graphView.setNodeTransform(nodes[i], nodeLeft[i], nodeTop[i], nodeRect[i]);


    const wires = [];

    for (const node of nodes)
    {
        for (const input of node.inputs)
            if (   input.isConnected
                && input.connection
                && !wires.includes(input.connection.wire))
                wires.push(input.connection.wire);        

        for (const output of node.outputs)
            for (const connInput of output.connectedInputs)
                if (   connInput.connection
                    && !wires.includes(connInput.connection.wire))
                    wires.push(connInput.connection.wire);
    }


    graphView.updateNodeWires(wires);
};



graphView.updateNodeTransform = node =>
{
    const nodeLeft = node.div.offsetLeft;
    const nodeTop  = node.div.offsetTop;
    const nodeRect = graphView.getNodeOffsetRect(node.div);
    
    graphView.setNodeTransform(node, nodeLeft, nodeTop, nodeRect);
    

    const wires = [];

    for (const input of node.inputs)
        if (   input.isConnected
            && input.connection)
            wires.push(input.connection.wire);        

    for (const output of node.outputs)
        for (const connInput of output.connectedInputs)
            if (connInput.connection)
                wires.push(connInput.connection.wire);


    graphView.updateNodeWires(wires);
};



graphView.setNodeTransform = (node, nodeLeft, nodeTop, nodeRect) =>
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



graphView.updateNodeWires = wires =>
{
    const outRect = [];            
    const inRect  = [];
    const cw      = graphView.clientWidth;
    const ch      = graphView.clientHeight;
    const yOffset = controlBar.offsetHeight;

    wires.forEach(w => 
    {
        outRect.push(boundingRect(w.connection.output.control));
        inRect .push(boundingRect(w.connection.input .control));
    });

    for (let i = 0; i < wires.length; i++)
        graphView.updateWireTransform(wires[i], outRect[i], inRect[i], cw, ch, yOffset);        
};



graphView.updateWireTransform = function(wire, outRect, inRect, cw, ch, yOffset)
{
    wire.setAttribute('width',  cw / graphView.zoom);
    wire.setAttribute('height', ch / graphView.zoom);

    wire.setAttribute('viewBox',
                0
        + ' ' + yOffset/2 / graphView.zoom // why is only half of yOffset taken???
        + ' ' + cw        / graphView.zoom
        + ' ' + ch        / graphView.zoom);

    wire.update(outRect, inRect, yOffset);
};



graphView.addWire = (wire, updateTransform = true) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);

    if (updateTransform)
    {
        const outRect = boundingRect(wire.connection.output.control);            
        const inRect  = boundingRect(wire.connection.input .control);
        const cw      = graphView.clientWidth;
        const ch      = graphView.clientHeight;
        const yOffset = controlBar.offsetHeight;

        graphView.updateWireTransform(wire, outRect, inRect, cw, ch, yOffset);
    }
};



graphView.removeWire = wire =>
{
    graphView.removeChild(wire);    
    removeFromArray(graphView.wires, wire);
};



graphView.getNodeOffsetRect = node =>
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



graphView.soloNode = node =>
{
    graphView._soloNode = node;

    graph.nodes.forEach(n => 
        n.div.style.opacity = 
            graphView._soloNode == n 
            ? 1 
            : 0.12);

    graph.connections.forEach(c => 
        c.wire.style.opacity = 
               c.input  && graphView._soloNode == c.input .op
            || c.output && graphView._soloNode == c.output.op
            ? 1 
            : 0.09);
};



graphView.unsoloNode = () =>
{
    graphView._soloNode = null;

    graph.nodes.forEach(n => n.div.style.opacity = 1);
    graph.connections.forEach(c => c.wire.style.opacity = 1);
};



graphView.toggleShowWires = () =>
{
    graphView.showWires = !graphView.showWires;
    graphView.updateShowWires();
};



graphView.updateShowWires = () =>
{
    btnToggleWires.style.color           = graphView.showWires ? 'white'   : '#d5d5d5';
    btnToggleWires.style.backgroundColor = graphView.showWires ? '#18a0fb' : (btnToggleWires.mouseOver ? 'black' : '#2c2c2c');

    graph.nodes.forEach(n => n.updateNode());
    graph.connections.forEach(c => show(c.wire, graphView.showWires));
};