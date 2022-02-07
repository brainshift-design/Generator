graphView.wires          = [];

graphView.loadingNodes   = false;
graphView.canUpdateNodes = true;


graphView.overNode       = null;
graphView.overInput      = null;
graphView.overOutput     = null;
   
graphView.headerInput    = null; // same as overInput, but when snapping from a header
graphView.headerOutput   = null; // same as overOutput, but when snapping from a header
   
graphView.tempConn       = null;
graphView.savedConn      = null;

graphView.connPointerId  = -1;

graphView.showWires      = true;
graphView._soloNode      = null;
   
graphView.selecting      = false;
graphView.selectionRect  = Rect.NaN;

graphView.btn1down       = false; // this is to help deal with mouse wheels that send X values as
                                  // sometimes a MMB press is followed by wheelX as a "deeper" middle-click

graphView.panning        = false;

graphView.pViewport;
graphView.pStart         = point(0, 0);
graphView.zoomStart;


scrollbarX.style.zIndex  = MAX_INT32-1;
scrollbarY.style.zIndex  = MAX_INT32-2;


graphView.touches        = [];



graphView.addEventListener('pointerenter', e => 
{
    if (    graphView.hasPointerCapture(e.pointerId)
        && !graphView.tempConn)
        graphView.releasePointerCapture(e.pointerId);
});



graphView.addEventListener('pointerleave', e => 
{
    if (graphView.tempConn)
        graphView.setPointerCapture(e.pointerId);
});



graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = point(e.clientX, e.clientY);

    const sx = e.clientX;
    const sy = e.clientY;

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
            graphView.updateNodeWire(graphView.tempConn.wire, sx, sy);
        }
        else if (graphView.overInput)
        {
            if (graphView.overInput.connectedOutput) // pretend to disconnect
            {
                graphView.startConnectionFromOutput(e.pointerId, graphView.overInput.connectedOutput);
                graphView.updateNodeWire(graphView.tempConn.wire, sx, sy);
                
                graphView.savedConn = graphView.overInput.connection;
                graphView.updateNodeWire(graphView.savedConn.wire);
            }
            else
            {
                graphView.overInput.connecting = true;
                graphView.startConnectionFromInput(e.pointerId, graphView.overInput);
                graphView.updateNodeWire(graphView.tempConn.wire, sx, sy);
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
        setCursor(panCursor);
        graphView.startPan(e.pointerId);
    }
});



graphView.addEventListener('pointermove', graphView_onpointermove);



function graphView_onpointermove(e)
{
    graphView.p = point(e.clientX, e.clientY);


    if (   graphView.panning
        && graphView.hasPointerCapture(e.pointerId))
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
        graphView.updateNodeWire(
            graphView.tempConn.wire, 
            e.clientX, 
            e.clientY);
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

                graphView.pan = subv(
                    graphView.pan, 
                    mulvs(
                        subv(
                            point(e.clientX, e.clientY), 
                            graphView.pan), 
                        graphView.zoom / graphView.oldZoom - 1));
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


    e.preventDefault();


    const dZoom = Math.log(graphView.zoom) / Math.log(2);


    const isTouchpad = 
           Math.abs(e.deltaX) < 100
        && Math.abs(e.deltaY) < 100;


    const dWheelX = e.deltaX / (isTouchpad ? 20 : 100);
    const dWheelY = e.deltaY / (isTouchpad ? 20 : 100);


    if (e.ctrlKey)
    {
        let pos = point(e.clientX, e.clientY);
        pos.y -= controlBar.offsetHeight;

        const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / (isTouchpad ? 5 : 10)));
        const pan  = subv(graphView.pan, mulvs(subv(pos, graphView.pan), zoom / graphView.zoom - 1));

        graphView.setPanAndZoom(pan, zoom);
        graphView.updatePanAndZoom();
    }
    else
    {
        const dPanX = dWheelX * 20 / Math.pow(graphView.zoom, 0.1);
        const dPanY = dWheelY * 20 / Math.pow(graphView.zoom, 0.1);

        graphView.pan = point(
            graphView.pan.x - dPanX,
            graphView.pan.y - dPanY);

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



graphView.addEventListener('gesturestart', e => { graphView.zoomStart = graphView.zoom; });

graphView.addEventListener('gesturechange', e => 
{
    const p = point(
        graphView.p.x,
        graphView.p.y - controlBar.offsetHeight);

    const zoom = graphView.zoomStart * e.scale;
    const pan  = subv(graphView.pan, mulvs(subv(p, graphView.pan), zoom / graphView.zoom - 1));

    graphView.setPanAndZoom(pan, zoom);
    graphView.updatePanAndZoom();
});



graphView.addEventListener('touchstart', e =>
{
    graphView.touches.push(e);
    e.preventDefault();
});



graphView.addEventListener('touchmove', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches[i] = e;
            break;
        }

    e.preventDefault();
});



graphView.addEventListener('touchend', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches.splice(i, 1);
            break;
        }

    e.preventDefault();
});



graphView.addEventListener('touchcancel', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches.splice(i, 1);
            break;
        }

    e.preventDefault();
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
    //log('graphView.placeNewNode()');

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
        
    node.div.style.zIndex = MAX_INT32-3; // -3 is for scrollbars;

    graphView.putWiresOnTop(node);
};



graphView.putWiresOnTop = node =>
{
    // changing z-index doesn't work so easily with SVG,
    // so reinsert the wires on top instead 🤷‍♂️

    let z = MAX_INT32;

    for (const input of node.inputs.filter(i => i.isConnected))
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



graphView.updateNodeTransforms = nodes =>
{
    const nodeLeft = nodes.map(n => n.div.offsetLeft);
    const nodeTop  = nodes.map(n => n.div.offsetTop);
    const nodeRect = nodes.map(n => graphView.getNodeOffsetRect(n.div));
    

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


    for (let i = 0; i < nodes.length; i++)
        graphView.setNodeTransform(nodes[i], nodeLeft[i], nodeTop[i], nodeRect[i]);


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
    const pOut    = [];            
    const pIn     = [];
    
    const cw      = graphView.clientWidth;
    const ch      = graphView.clientHeight;
    const yOffset = controlBar.offsetHeight;


    wires.forEach(w => 
    {
        const ro = boundingRect(w.connection.output.control);
        const ri = boundingRect(w.connection.input .control);

        pOut.push(point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset));
        pIn .push(point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset));
    });

    
    for (let i = 0; i < wires.length; i++)
    {
        const wire = wires[i];

        // the yOffset is to start wire coords just below the control bar,
        // not at the top of the window

        wire.updateCurve  (pOut[i].x, pOut[i].y, pIn[i].x, pIn[i].y);
        wire.updateOutBall(pOut[i].x, pOut[i].y                    );
        wire.updateInBall (                      pIn[i].x, pIn[i].y);

        wire.updateStyle(wire.getColor());

        wire.setAttribute('width',  cw);
        wire.setAttribute('height', ch);
    
        wire.setAttribute('viewBox',
                    0
            + ' ' + yOffset/2 // why is only half of yOffset taken???
            + ' ' + cw
            + ' ' + ch);
    }


    for (let i = 0; i < wires.length; i++)
    {
        const conn   = wires[i].connection;
        const input  = conn.input;
        const output = conn.output;

            const isSolo = 
                   graphView._soloNode
                && (    input.op == graphView._soloNode
                    || output.op == graphView._soloNode);

        show(wires[i],         (graphView.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].curve,   (graphView.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].outBall, !graphView.tempConn || graphView.tempConn.output);
        show(wires[i]. inBall, !graphView.tempConn || graphView.tempConn. input);
    }
};



graphView.updateNodeWire = (wire, x = 0, y = 0) =>
{
    const yOffset = controlBar.offsetHeight;

    let pOut = point(0, 0),
        pIn  = point(0, 0);


    if (wire.connection.output)
    {
        const ro = boundingRect(wire.connection.output.control);
        pOut = point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset);
    }
    else
        pOut = point(x, y - yOffset);


    if (wire.connection.input)
    {
        const ri = boundingRect(wire.connection.input .control);
        pIn = point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset);
    }
    else
        pIn = point(x, y - yOffset);


    wire.update(
        pOut.x, 
        pOut.y, 
        pIn.x, 
        pIn.y);        
};



graphView.addWire = (wire, updateTransform = true) =>
{
    graphView.wires.push(wire);
    wireContainer.appendChild(wire);

    if (updateTransform)
        graphView.updateNodeWire(wire);
};



graphView.removeWire = wire =>
{
    wireContainer.removeChild(wire);    
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
    { 
        c.wire.style.opacity = 
               c.input  && graphView._soloNode == c.input .op
            || c.output && graphView._soloNode == c.output.op
            ? 1 
            : 0.09;
    });

    graphView.updateNodeWires(graph.connections.map(c => c.wire));
};



graphView.unsoloNode = () =>
{
    graphView._soloNode = null;

    graph.nodes.forEach(n => n.div .style.opacity = 1);

    graph.connections.forEach(c => c.wire.style.opacity = 1);
    graphView.updateNodeWires(graph.connections.map(c => c.wire));
};



graphView.toggleShowWires = () =>
{
    graphView.showWires = !graphView.showWires;

    graphView.updateShowWiresButton();
    graphView.updateShowWires();
};



graphView.updateShowWiresButton = () =>
{
    btnToggleWires.style.color           = graphView.showWires ? 'white'   : '#d5d5d5';
    btnToggleWires.style.backgroundColor = graphView.showWires ? '#18a0fb' : (btnToggleWires.mouseOver ? 'black' : '#2c2c2c');
};



graphView.updateShowWires = () =>
{
    graph.nodes      .forEach(n => n.updateNode());
    graph.connections.forEach(c => show(c.wire, graphView.showWires));
};