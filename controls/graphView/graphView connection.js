graphView.startConnectionFromOutput = (pointerId, output, updateTempWire = true) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(output, null);
    graphView.tempConn.wire.output = output;

    graphView.addWire(graphView.tempConn.wire2, false);
    graphView.addWire(graphView.tempConn.wire,  false);

    if (updateTempWire)
    {
        updateWire(graphView.tempConn.wire2, graphView.pStart.x, graphView.pStart.y);
        updateWire(graphView.tempConn.wire,  graphView.pStart.x, graphView.pStart.y);
    }

    output.updateControl();
};



graphView.startConnectionFromInput = (pointerId, input) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(null, input);
    
    graphView.tempConn.wire.input = input;
    
    graphView.addWire(graphView.tempConn.wire2, false);
    graphView.addWire(graphView.tempConn.wire,  false);

    updateWire(graphView.tempConn.wire2, graphView.pStart.x, graphView.pStart.y);
    updateWire(graphView.tempConn.wire,  graphView.pStart.x, graphView.pStart.y);

    input.updateControl();
};



graphView.cancelConnection = pointerId =>
{
    const output = graphView.tempConn.output;
    const input  = graphView.tempConn.input;

    graphView.removeWire(graphView.tempConn.wire2);    
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

     newReorderIndex = Number.NaN;
    prevReorderIndex = Number.NaN;
     oldReorderIndex = Number.NaN;
};



graphView.endConnection = pointerId =>
{
    if (graphView.tempConn.output) // FROM OUTPUT
    {
        console.log('graphView.tempConn.output.node =', graphView.tempConn.output.node);

        let output = graphView.tempConn.output;
        let input  = graphView.overInput;

        let savedConnInput = 
            graphView.savedConn
            ? graphView.savedConn.input
            : null;

        output.connecting = false;
        
        if (   input
            && input.supports(output.types)) // TO INPUT
        {
            if (   !isNaN(newReorderIndex)
                && !isNaN(oldReorderIndex)
                &&  newReorderIndex >= 0
                &&  input.node.variableInputs
                && !input.param
                && !isLastInArray(input.node.headerInputs, input))
                actionManager.do(new ReorderInputAction(input.node.id, oldReorderIndex, newReorderIndex));

            else if (input == savedConnInput) // reconnect old
            {
                graphView.savedConn = null; // done here to redraw the saved wire correctly
                
                updateWire(input.connection.wire2);
                updateWire(input.connection.wire );
            }

            else if (savedConnInput)
            {
                if (savedConnInput.connectedOutput != output)
                    actionManager.do(new ReconnectAction(output, savedConnInput, input));
            }
            else if (   !savedConnInput
                     && (  !input.connected
                         || input.connectedOutput != graphView.tempConn.output)) // connect new
            {
                console.log('output =', output.toString());
                actionManager.do(new ConnectAction(output, input));
            }
        }
        else if (savedConnInput) // disconnect old
            actionManager.do(new DisconnectAction(output, savedConnInput));
        
        graphView.cancelConnection(pointerId);
    }
    
    else if (graphView.tempConn.input) // FROM INPUT
    {
        let input  = graphView.tempConn.input;
        let output = graphView.overOutput;

        input.connecting = false;
        
        if (   output
            && input.supports(output.types)) // TO OUTPUT
            actionManager.do(new ConnectAction(output, input));

        graphView.cancelConnection(pointerId);
    }
}