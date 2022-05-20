graphView.wires           = [];
 
graphView.loadingNodes    = false;
graphView.canUpdateNodes  = true;


graphView.overNode        = null;
graphView.overInput       = null;
graphView.overOutput      = null;
    
graphView.headerInput     = null; // same as overInput, but when snapping from a header
graphView.headerOutput    = null; // same as overOutput, but when snapping from a header
    
graphView.tempConn        = null;
graphView.savedConn       = null;
graphView.savedInputIndex = -1;

graphView.connPointerId   = -1;

graphView.showWires       = true;
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



graphView.getAllNodeBounds = function()
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
        node.div.style.left = (graphView.offsetWidth /2 - graphView.pan.x                          ) / graphView.zoom - nodeRect.width/2;
        node.div.style.top  = (graphView.offsetHeight/2 - graphView.pan.y - controlBar.offsetHeight) / graphView.zoom - nodeRect.height/2;
    }


    // const nodeRect = boundingRect(node.div);

    // const defx = (graphView.offsetWidth /2 - graphView.pan.x) / graphView.zoom - nodeRect.width /2,
    //       defy = (graphView.offsetHeight/2 - graphView.pan.y - controlBar.offsetHeight) / graphView.zoom - nodeRect.height/2;

    // node.div.style.left = (graphView.offsetWidth  / 6 - graphView.pan.x) / graphView.zoom;
    // node.div.style.top  = (graphView.offsetHeight / 4 - graphView.pan.y) / graphView.zoom;


    // const dx = 30,
    //       dy = 20;

    // let   ox = defx,
    //       oy = defy;

        
    // let maxIter = 100; // stack overflow safeguard
    
    // let intersecting;
    // while (   maxIter-- > 0
    //        && (intersecting = graphView.getIntersectingNodes(node)).length > 0)
    // {
    //     let bounds = Rect.NaN;
        
    //     for (const n of intersecting)
    //         bounds = expandRect(bounds, graphView.getNodeBounds(n));

    //     const right = intersecting.reduce((a, b) => 
    //         graphView.getNodeBounds(a).r > graphView.getNodeBounds(b).r ? a : b);

    //     if (   right.type == node.type
    //         && node.type != 'color'
    //         && node.type != 'webcontrast') ox = bounds.b + dy;
    //     else                                 oy = bounds.r + dx;
    // }

    
    // const margin = 100;

    // node.div.style.left = (ox > margin && ox < window.clientWidth  - margin) ? ox : defx;
    // node.div.style.top  = (oy > margin && oy < window.clientHeight - margin) ? oy : defy;
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



graphView.updateNodeTransforms = function(nodes)
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


    graphView.updateNodeWires(wires);
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

    graphView.updateNodeWires(wires);
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



graphView.updateNodeWires = function(wires)
{
    //logFunction('updateNodeWires()');


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
                && (    input.node == graphView._soloNode
                    || output.node == graphView._soloNode);

        show(wires[i],         (graphView.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].curve,   (graphView.showWires || isSolo) && conn != graphView.savedConn);
        show(wires[i].outBall, !graphView.tempConn || graphView.tempConn.output);
        show(wires[i]. inBall, !graphView.tempConn || graphView.tempConn. input);
    }
};



graphView.updateNodeWire = function(wire, x = 0, y = 0)
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



graphView.addWire = function(wire, updateTransform = true)
{
    graphView.wires.push(wire);
    wireContainer.appendChild(wire);

    if (updateTransform)
        graphView.updateNodeWire(wire);
};



graphView.removeWire = function(wire)
{
    wireContainer.removeChild(wire);    
    removeFromArray(graphView.wires, wire);
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
            graphView._soloNode == n 
            ? 1 
            : 0.12);

    graph.connections.forEach(c =>
    { 
        c.wire.style.opacity = 
               c.input  && graphView._soloNode == c.input .node
            || c.output && graphView._soloNode == c.output.node
            ? 1 
            : 0.09;
    });

    graphView.updateNodeWires(graph.connections.map(c => c.wire));
};



graphView.unsoloNode = function()
{
    graphView._soloNode = null;

    graph.nodes.forEach(n => n.div .style.opacity = 1);

    graph.connections.forEach(c => c.wire.style.opacity = 1);
    graphView.updateNodeWires(graph.connections.map(c => c.wire));
};



graphView.toggleShowWires = function()
{
    graphView.showWires = !graphView.showWires;

    uiSaveGraphView();

    updateToggleShowWiresButton();
    graphView.updateShowWires();
};



graphView.updateShowWires = function(updateNodes = true)
{
    graph.connections.forEach(c => show(c.wire, graphView.showWires));

    if (updateNodes) 
        graph.nodes.forEach(n => n.updateNode());
};



graphView.toJson = function()
{
    const tab = '  ';

    return '{\n'
        + tab + '"zoom": "'      + graphView.zoom  + '",\n'
        + tab + '"panx": "'      + graphView.pan.x + '",\n'
        + tab + '"pany": "'      + graphView.pan.y + '",\n'
        + tab + '"showWires": "' + boolString(graphView.showWires) + '"\n'
        + '\n}';
};