graphView.wires      = [];


graphView.overInput  = null;
graphView.overOutput = null;
   
graphView.tempConn   = null;
   
   
graphView.selecting  = false;
graphView.selectBox  = Rect.NaN;

graphView.btn1down   = false;



graphView.pStart = {x:0, y:0};



graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = { x: e.clientX, 
                         y: e.clientY };

    if (    e.button == 0
        && !graphView.panning)
    {
        if (graphView.spaceDown)
        {
            if (e.ctrlKey) graphView.startZoomSelection(e.clientX, e.clientY);
            else           graphView.startPan(e.pointerId);
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
            graphView._prevSelected = [...graphView.selected];

            if (!e.shiftKey)
                graphView.startSelection(e.clientX, e.clientY);
        }
    }
    
    else if (e.button == 1)
    {
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
    }
    
    else if (graphView.selecting)
        graphView.updateSelection(e.clientX, e.clientY);
    
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
        if (e.ctrlKey)
        {
            if (   graphView.selectBox.w > 0
                && graphView.selectBox.h > 0)
            {
                graphView.endZoomSelection(true);
            }
            else
            {
                graphView.endZoomSelection(false);

                graphView.oldZoom = graphView.zoom;

                if (e.altKey) graphView.zoom /= 2;
                else          graphView.zoom *= 2;

                graphView.pan = subv(graphView.pan, mulvs(subv(position(e), graphView.pan), graphView.zoom / graphView.oldZoom - 1));
            }
        }
        
        graphView.endPan(e.pointerId, false);
    }

    else if (e.button == 0
         && !graphView.selectBox.isNaN)
        graphView.endSelection();

    else if (e.button == 0
          && graphView.tempConn)
    {
        if (graphView.tempConn.output) // FROM OUTPUT
        {
            var output     = graphView.tempConn.output;
            var input      = graphView.overInput;
            var savedInput = graphView.tempConn.savedInput;
            
            output.connecting = false;
            
            if (   input
                && input.dataType == output.dataType) // TO INPUT
            {
                if (input == savedInput) // reconnect old
                {
                    show(input.connection.wire);
                    show(input.connection.wire.outBall);
                }
                else if (savedInput) // disconnect old, connect new
                {
                    uiDisconnect(savedInput);
                    uiConnect(output, input);
                }
                else // connect new
                    uiConnect(output, input);
            }
            else if (savedInput) // disconnect old
            {
                uiDisconnect(savedInput)
            }
            
            graphView.cancelConnection();
        }
        
        else if (graphView.tempConn.input) // FROM INPUT
        {
            var input  = graphView.tempConn.input;
            var output = graphView.overOutput;

            input.connecting = false;
            
            if (   output
                && output.dataType == input.dataType) // TO OUTPUT
                uiGraph.connect(output, input); // connect new

            graphView.cancelConnection();
        }
    }

    else if (e.button == 1
          && graphView.panning)
    {
        graphView.endPan(e.pointerId, true);
        graphView.btn1down = false;
    }
});



graphView.addEventListener('wheel', e =>
{
    if (graphView.btn1down)
        return;


    const dZoom = Math.log(graphView.zoom) / Math.log(2);
    
    const dWheelX = e.deltaX/120;
    const dWheelY = e.deltaY/120;

    if (e.ctrlKey)
    {
        graphView.setPanAndZoom(
            subv(graphView.pan, mulvs(subv(position(e), graphView.pan), graphView.zoom / graphView.oldZoom - 1)),
            Math.max(0.0001, Math.pow(2, dZoom - dWheelY / 10)));
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
            graphView.updateSelection(e.clientX, e.clientY);
    }
});



graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new UConnection(output, null);
    graphView.addWireFromOutput(graphView.tempConn.wire, output);
    graphView.tempConn.wire.style.zIndex = Number.MAX_SAFE_INTEGER;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.output       = output;
    graphView.tempConn.wire.updateFromOutput(graphView.pStart.x, graphView.pStart.y);
};



graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new UConnection(null, input);
    graphView.addWireFromInput(graphView.tempConn.wire, input);    
    graphView.tempConn.wire.style.zIndex = Number.MAX_SAFE_INTEGER;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.input        = input;
    graphView.tempConn.wire.updateFromInput(graphView.pStart.x, graphView.pStart.y);
};



graphView.cancelConnection = () =>
{
    graphView.removeWire(graphView.tempConn.wire);    
    graphView.tempConn = null;
};



graphView.getAllNodeBounds = () =>
{
    const bounds = Rect.NaN;

    for (const node of uiGraph.nodes)
        bounds.expandFromRect(Rect.fromTypical(node.div.getBoundingClientRect()));

    return bounds;
};



graphView.getNodeBounds = () =>
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (const node of uiGraph.nodes)
    {
        var bounds = node.div.getBoundingClientRect();

        boundsL = Math.min(boundsL, bounds.left  );
        boundsT = Math.min(boundsT, bounds.top   );
        boundsR = Math.max(boundsR, bounds.right );
        boundsB = Math.max(boundsB, bounds.bottom);
    }

    return {
        x: boundsL - graphView.pan.x, 
        y: boundsT - graphView.pan.y,
        w: boundsR - boundsL,
        h: boundsB - boundsT };
};



graphView.putNodeOnTop = node =>
{
    const topIndices = 
          1 
        + node.inputs.filter(i => i.connected).length 
        + (!!node.output && node.output.connected ? 1 : 0);
        
    for (const n of uiGraph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);
        
    var z = Number.MAX_SAFE_INTEGER;

    for (const input of node.inputs.filter(i => i.connected))
        input.connection.wire.style.zIndex = z--;
        
    if (!!node.output)
    {
        for (const input of node.output.connectedInputs)
        input.connection.wire.style.zIndex = z--;
    }
    
    node.div.style.zIndex = z;
};



graphView.updateNodeTransform = function(node)
{
    // const nodeRect = graphView.getNodeOffsetRect(node.div);

    // node.div.style.transformOrigin = 
    //       ((graphView.pan.x - nodeRect.x) / nodeRect.width  * 100) + '% ' 
    //     + ((graphView.pan.y - nodeRect.y) / nodeRect.height * 100) + '%';

    node.div.style.transformOrigin = 
          ((graphView.pan.x - node.div.offsetLeft) / node.div.offsetWidth  * 100) + '% ' 
        + ((graphView.pan.y - node.div.offsetTop ) / node.div.offsetHeight * 100) + '%';

    node.div.style.transform =
          'translate(' 
        + (graphView.pan.x * graphView.zoom) + 'px, '
        + (graphView.pan.y * graphView.zoom) + 'px) '
        + 'scale(' + graphView.zoom + ')';


    for (const input of node.inputs)
    {
        if (input.connected)
            graphView.updateWireTransform(input.connection.wire);        
    }


    if (node.output)
    {
        for (const input of node.output.connectedInputs)
            graphView.updateWireTransform(input.connection.wire);        
    }
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
    wire.update();
};



graphView.addWireFromOutput = (wire, output) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);
    //wire.updateFromOutput(output);  
};



graphView.addWireFromInput = (wire, input) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);  
    //wire.updateFromInput(input);  
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

    const rect = node.getBoundingClientRect();

    return new DOMRect(
        ox + (rect.left / graphView.zoom),
        oy + (rect.top  / graphView.zoom), 
        rect.width      / graphView.zoom, 
        rect.height     / graphView.zoom);
}