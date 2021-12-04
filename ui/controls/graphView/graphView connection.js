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
            uiGraph.connect(output, input); // connect new

        graphView.cancelConnection();
    }
};