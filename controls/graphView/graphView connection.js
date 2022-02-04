graphView.startConnectionFromOutput = (pointerId, output) =>
{
    //graphView.setPointerCapture(pointerId);

    graphView.tempConn = new Connection(output, null);
    graphView.addWire(graphView.tempConn.wire, false);

    //graphView.tempConn.wire.scale  = graphView.zoom;
    graphView.tempConn.wire.output = output;

    graphView.updateNodeWire(
        graphView.tempConn.wire,
        graphView.pStart.x, 
        graphView.pStart.y);

    output.updateControl();
};



graphView.startConnectionFromInput = (pointerId, input) =>
{
    //graphView.setPointerCapture(pointerId);

    graphView.tempConn = new Connection(null, input);
    graphView.addWire(graphView.tempConn.wire, false);
    
    //graphView.tempConn.wire.scale = graphView.zoom;
    graphView.tempConn.wire.input = input;

    graphView.updateNodeWire(
        graphView.tempConn.wire,
        graphView.pStart.x, 
        graphView.pStart.y);

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
                if (  !input.op._variableInputs
                    || input != lastOf(input.op.inputs)) // disconnect old, connect new
                    actionManager.do(new ReconnectAction(output, savedInput, input));
                else
                {
                    show(savedInput.connection.wire); // show old wire
                    savedInput.updateControl();
                }
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