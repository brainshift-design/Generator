graphView.startConnectionFromOutput = (pointerId, output) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(output, null);
    graphView.addWire(graphView.tempConn.wire, false);

    graphView.tempConn.wire.output = output;

    graphView.updateNodeWire(
        graphView.tempConn.wire,
        graphView.pStart.x, 
        graphView.pStart.y);

    output.updateControl();
};



graphView.startConnectionFromInput = (pointerId, input) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(null, input);
    graphView.addWire(graphView.tempConn.wire, false);
    
    graphView.tempConn.wire.input = input;

    graphView.updateNodeWire(
        graphView.tempConn.wire,
        graphView.pStart.x, 
        graphView.pStart.y);

    input.updateControl();
};



graphView.cancelConnection = pointerId =>
{
    const output = graphView.tempConn.output;
    const input  = graphView.tempConn.input;

    graphView.removeWire(graphView.tempConn.wire);    

    graphView.savedConn = null;
    graphView.tempConn  = null;

    if (output) output.updateControl();
    if (input ) input .updateControl();

    if (graphView.overInput ) graphView.overInput .updateControl();
    if (graphView.overOutput) graphView.overOutput.updateControl();


    if (graphView.hasPointerCapture(pointerId))
        graphView.releasePointerCapture(pointerId);

    graphView.connPointerId = -1;
};



graphView.endConnection = pointerId =>
{
    if (graphView.tempConn.output) // FROM OUTPUT
    {
        let output = graphView.tempConn.output;
        let input  = graphView.overInput;

        let savedInput = 
            graphView.savedConn
            ? graphView.savedConn.input
            : null;
        
        output.connecting = false;
        
        if (   input
            && input.dataType == output.dataType) // TO INPUT
        {
            if (input == savedInput) // reconnect old
            {
                graphView.savedConn = null; // done here to redraw the saved wire correctly
                graphView.updateNodeWire(input.connection.wire);
            }
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


// assuming here elementsFromPoint() will always return graphViewCapture as [0], and then the element I need
// graphViewCapture.addEventListener('pointerdown', e => forwardEvent(e, document.elementsFromPoint(e.clientX, e.clientY)[1]));
// graphViewCapture.addEventListener('pointermove', e => forwardEvent(e, document.elementsFromPoint(e.clientX, e.clientY)[1]));
// graphViewCapture.addEventListener('pointerup',   e => forwardEvent(e, document.elementsFromPoint(e.clientX, e.clientY)[1]));