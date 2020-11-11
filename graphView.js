graphView.overInput  = null;
graphView.overOutput = null;

graphView.tempConn = null;


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
});


graphView.addEventListener('pointerup', e =>
{
    if (graphView.tempConn)
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
                    graph.disconnect(savedInput);
                    graph.connect(output, input);
                }
                else // connect new
                    graph.connect(output, input);
            }
            else if (savedInput)
                graph.disconnect(savedInput)
            
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
    if (graphView.tempConn)
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


function putNodeOnTop(node)
{
    for (const n of graph.nodes)
        n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - 1);

    node.div.style.zIndex = graph.nodes.length-1;
}