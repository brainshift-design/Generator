graphView.startConnectionFromOutput = output =>
{
    graphView.tempConn = new Connection(output, null);
    graphView.addWireFromOutput(graphView.tempConn.wire, output);
    graphView.tempConn.wire.style.zIndex = MAX_INT32-3;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.output       = output;
    graphView.tempConn.wire.updateFromOutput(graphView.pStart.x, graphView.pStart.y);

    output.updateControl();
};



graphView.startConnectionFromInput = input =>
{
    graphView.tempConn = new Connection(null, input);
    graphView.addWireFromInput(graphView.tempConn.wire, input);    
    graphView.tempConn.wire.style.zIndex = MAX_INT32-3;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.input        = input;
    graphView.tempConn.wire.updateFromInput(graphView.pStart.x, graphView.pStart.y);

    input.updateControl();
};



graphView.cancelConnection = () =>
{
    const output = graphView.tempConn.output;
    
    graphView.removeWire(graphView.tempConn.wire);    
    graphView.tempConn = null;

    output.updateControl();
};



graphView.endConnection = function()
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
            graph.connect(output, input); // connect new

        graphView.cancelConnection();
    }
};