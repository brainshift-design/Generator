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


graphView.addEventListener('pointerdown', e =>
{
    if (graphView.overOutput)
    {
        graphView.overOutput.connecting = true;
        graphView.startConnectionFromOutput(graphView.overOutput);
        graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
    }
    else if (graphView.overInput)
    {
        if (graphView.overInput.connectedOutput) // pretend to disconnect
        {
            graphView.startConnectionFromOutput(graphView.overInput.connectedOutput);
            graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
            graphView.tempConn.savedInput = graphView.overInput;
            hide(graphView.overInput.connection.wire);
            hide(graphView.overInput.connection.wire.outBall);
        }
        else
        {
            graphView.overInput.connecting = true;
            graphView.startConnectionFromInput(graphView.overInput);
            graphView.tempConn.updateWireFromInput (e.clientX, e.clientY)
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
});


graphView.addEventListener('pointerup', e =>
{
    if (!graphView.selection.isNaN)
        graphView.endSelection();

    else if (graphView.tempConn)
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
});


graphView.addEventListener('pointermove', e =>
{
    if (!graphView.selection.isNaN)
        graphView.updateSelection(e.clientX, e.clientY);

    else if (graphView.tempConn)
    {
             if (graphView.tempConn.output) graphView.tempConn.updateWireFromOutput(e.clientX, e.clientY);
        else if (graphView.tempConn.input ) graphView.tempConn.updateWireFromInput (e.clientX, e.clientY);
    }
});


graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new Connection(output, null);
    wires.appendChild(graphView.tempConn.wire);    
};


graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new Connection(null, input);
    wires.appendChild(graphView.tempConn.wire);    
};


graphView.cancelConnection = () =>
{
    wires.removeChild(graphView.tempConn.wire);    
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
    for (const n of graph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - 1);

    node.div.style.zIndex = graph.nodes.length-1;
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