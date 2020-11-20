graphView.wires = [];


graphView.overInput  = null;
graphView.overOutput = null;

graphView.tempConn   = null;


graphView.selection  = Rect.NaN;


graphView._selected = [];

Object.defineProperty(graphView, 'selected',
{
    get: () => graphView._selected,
    set: selected =>
    {
        for (const node of graphView._selected)            
            node.setSelected(false);
    
        graphView._selected = selected;
    
        for (const node of graphView._selected)
            node.setSelected(true);
    }
});


graphView._pan = {x:0, y:0};
  
Object.defineProperty(graphView, 'pan',
{
    get: () => graphView._pan,
    set: pan =>
    {
        if (graphView._pan == pan) return;
        graphView._pan = pan;
        graphView.updatePanAndZoom();
    }
});

graphView.panning = false;
graphView.panStart;


graphView._zoom = 1;

Object.defineProperty(graphView, 'zoom',
{
    get: () => graphView._zoom,
    set: zoom =>
    {
        if (graphView._zoom == zoom) return;
        graphView._zoom = zoom;
        graphView.updatePanAndZoom();
    }
});

graphView.zooming   = false;
graphView.zoomStart = 1;


graphView.pStart = {x:0, y:0};


graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = { x: e.clientX, 
                         y: e.clientY };

    if (e.button == 0)
    {
        if (graphView.overOutput)
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
            if (!e.shiftKey)
            {
                graphView.selected = [];
                graphView.startSelection(e.clientX, e.clientY);
            }
        }
    }
    
    else if (e.button == 1)
    {
        graphView.panning  = true;
        graphView.panStart = graphView.pan;
        graphView.style.cursor = 'grab';
    }
});


graphView.addEventListener('pointerup', e =>
{
    if (   e.button == 0
        && !graphView.selection.isNaN)
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
                    disconnect(savedInput);
                    connect(output, input);
                }
                else // connect new
                    connect(output, input);
            }
            else if (savedInput) // disconnect old
            {
                disconnect(savedInput)
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
                graph.connect(output, input); // connect new

            graphView.cancelConnection();
        }
    }

    else if (e.button == 1
          && graphView.panning)
    {
        graphView.panning = false;
        graphView.style.cursor = 'auto';
    }
});


graphView.addEventListener('pointermove', e =>
{
    graphView.p = { x: e.clientX, y: e.clientY };

    if (graphView.panning)
        graphView.pan = mulvs(addv(graphView.panStart, subv(graphView.p, graphView.pStart)), graphView.zoom);

    else if (!graphView.selection.isNaN)
        graphView.updateSelection(e.clientX, e.clientY);

    else if (graphView.tempConn)
    {
             if (graphView.tempConn.output) graphView.tempConn.wire.updateFromOutput(e.clientX, e.clientY);
        else if (graphView.tempConn.input ) graphView.tempConn.wire.updateFromInput (e.clientX, e.clientY);
    }
});


graphView.addEventListener('mousewheel', e =>
{
    if (e.ctrlKey)
    {
        const dZoom  = Math.log(graphView.zoom) / Math.log(2);
        const dWheel = e.wheelDeltaY/120 / 4;
        
        const oldZoom = graphView.zoom;
        graphView.zoom = Math.max(0.0001, Math.pow(2, dZoom + dWheel));

		//graphView.pan = subv(graphView.pan, mulvs(graphView.p, (oldZoom * graphView.zoom - 1) / graphView.zoom));

        //graphView.pStart = { x: e.clientX, y: e.clientY };
		//graphView.panStart = view.Pan;
    }
});


graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new Connection(output, null);
    graphView.addWireFromOutput(graphView.tempConn.wire, output);
};


graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new Connection(null, input);
    graphView.addWireFromInput(graphView.tempConn.wire, input);    
};


graphView.cancelConnection = () =>
{
    graphView.removeWire(graphView.tempConn.wire);    
    graphView.tempConn = null;
};


graphView.getNodeBounds = () =>
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (const node of graph.nodes)
    {
        var bounds = node.div.getBoundingClientRect();

        boundsL = Math.min(boundsL, bounds.left  );
        boundsT = Math.min(boundsT, bounds.top   );
        boundsR = Math.max(boundsR, bounds.right );
        boundsB = Math.max(boundsB, bounds.bottom);
    }

    return {
        x: boundsL, 
        y: boundsT,
        w: boundsR - boundsL,
        h: boundsB - boundsT };
};


graphView.putNodeOnTop = node =>
{
    const topIndices = 
          1 
        + node.inputs.filter(i => i.connected).length 
        + (!!node.output && node.output.connected ? 1 : 0);

    for (const n of graph.nodes)
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


graphView.getValidSelection = () =>
{
    return new Rect(
        graphView.selection.x + Math.min(graphView.selection.w, 0),
        graphView.selection.y + Math.min(graphView.selection.h, 0),
        Math.abs(graphView.selection.w),
        Math.abs(graphView.selection.h));
};


graphView.startSelection = (x, y) =>
{
    graphView.selection = new Rect(x, y, 0, 0);
    
    selectBox.style.visibility = 'visible';
    graphView.updateSelectBox();
};


graphView.updateSelection = (x, y) =>
{
    graphView.selection.w = x - graphView.selection.x;
    graphView.selection.h = y - graphView.selection.y;

    graphView.updateSelectBox();
};

graphView.updateSelectBox = () =>
{
    var selection = graphView.getValidSelection();

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    
    graphView.selected = [];

    for (const node of graph.nodes)
    {
        if (rectsIntersect(node.div.getBoundingClientRect(), graphView.getValidSelection()))
            node.selected = true;
    }
};

graphView.endSelection = () =>
{
    graphView.selection = Rect.NaN;
    selectBox.style.visibility = 'hidden';
};


graphView.updatePanAndZoom = () =>
{
    for (const node of graph.nodes)
    {
        node.div.style.transformOrigin =
              (graphView.p.x - graphView.pan.x - node.div.offsetLeft) / node.div.offsetWidth  * 100 + '% ' 
            + (graphView.p.y - graphView.pan.y - node.div.offsetTop ) / node.div.offsetHeight * 100 + '%';
            
        node.div.style.transform =
             'translate(' 
            + graphView.pan.x + 'px, ' 
            + graphView.pan.y + 'px) '
            + 'scale(' + graphView.zoom + ')';
    }

    for (const wire of graphView.wires)
    {
        wire.setAttribute('viewBox',
                    (-graphView.pan.x)
            + ' ' + (-graphView.pan.y + 20) // TODO wtf is this number? why do I need to offset here?
            + ' ' + graphView.clientWidth
            + ' ' + graphView.clientHeight);

        wire.style.transformOrigin = 
              graphView.p.x + 'px ' 
            + graphView.p.y + 'px';

        wire.style.transform = 'scale(' + graphView.zoom + ')';
    }
};


graphView.addWire = wire =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);  
    wire.update();
};


graphView.addWireFromOutput = (wire, output) =>
{
    graphView.wires.push(wire);
    graphView.appendChild(wire);
    wire.updateFromOutput(output);  
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
    removeFromArray(wire, graphView.wires);
};