graphView.startConnectionFromOutput = (pointerId, output) =>
{
    //graphView.setPointerCapture(pointerId);

    graphView.tempConn = new Connection(output, null);
    graphView.addWireFromOutput(graphView.tempConn.wire, output);
    //graphView.tempConn.wire.style.zIndex = MAX_INT32-3;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.output       = output;
    graphView.tempConn.wire.updateFromOutput(graphView.pStart.x, graphView.pStart.y);

    output.updateControl();
};



graphView.startConnectionFromInput = (pointerId, input) =>
{
    //graphView.setPointerCapture(pointerId);
    //console.log(graphView.hasPointerCapture(pointerId));

    graphView.tempConn = new Connection(null, input);
    graphView.addWireFromInput(graphView.tempConn.wire, input);
    //graphView.tempConn.wire.style.zIndex = MAX_INT32-3;
    graphView.tempConn.wire.scale        = graphView.zoom;
    graphView.tempConn.wire.input        = input;
    graphView.tempConn.wire.updateFromInput(graphView.pStart.x, graphView.pStart.y);

    input.updateControl();
};



graphView.cancelConnection = pointerId =>
{
    //graphView.releasePointerCapture(pointerId);

    const output = graphView.tempConn.output;
    const input  = graphView.tempConn.input;

    graphView.removeWire(graphView.tempConn.wire);    
    graphView.tempConn = null;
    
    if (output) output.updateControl();
    if (input ) input .updateControl();

    if (graphView.overInput ) graphView.overInput .updateControl();
    if (graphView.overOutput) graphView.overOutput.updateControl();
};



graphView.endConnection = pointerId =>
{
    if (graphView.tempConn.output) // FROM OUTPUT
    {
        let output     = graphView.tempConn.output;
        let input      = graphView.overInput;
        let savedInput = graphView.tempConn.savedInput;
        
        output.connecting = false;
        
        if (   input
            && input.dataType == output.dataType) // TO INPUT
        {
            if (input == savedInput) // reconnect old
                show(input.connection.wire);
            else if (savedInput)
            {
                //if (!input.op._variableInputs) // disconnect old, connect new
                    actionManager.do(new ReconnectAction(output, savedInput, input));
                //else
                //    show(savedInput.connection.wire); // show old wire
            }
            else if (!savedInput) // connect new
                actionManager.do(new ConnectAction(output, input));
        }
        else if (savedInput) // disconnect old
            actionManager.do(new DisconnectAction(output, savedInput));
        
        graphView.cancelConnection(pointerId);
    }
    
    else if (graphView.tempConn.input) // FROM INPUT
    {
        let input  = graphView.tempConn.input;
        let output = graphView.overOutput;

        input.connecting = false;
        
        if (   output
            && output.dataType == input.dataType) // TO OUTPUT
            actionManager.do(new ConnectAction(output, input));

        graphView.cancelConnection(pointerId);
    }
};