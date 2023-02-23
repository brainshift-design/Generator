graphView.startConnectionFromOutput = (pointerId, output, updateTempWire = true, backInit = false) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(output, null);

    graphView.tempConn.wire.output = output;
    graphView.tempConn.backInit    = backInit;

    //graphView.tempConnected = false;
    graphView.addConnWires(graphView.tempConn, false);

    if (updateTempWire)
        updateWire(graphView.tempConn.wire, graphView.pStart.x, graphView.pStart.y);

    output.updateControl();
};



graphView.startConnectionFromInput = (pointerId, input, backInit = false) =>
{
    graphView.connPointerId = pointerId;

    graphView.tempConn = new Connection(null, input);
    graphView.tempConn.backInit = backInit;
    
    graphView.addConnWires(graphView.tempConn, false);

    updateWire(graphView.tempConn.wire, graphView.pStart.x, graphView.pStart.y);

    input.updateControl();
};



graphView.cancelConnection = (pointerId) =>
{
    const output = graphView.tempConn.output;
    const input  = graphView.tempConn.input;

    graphView.removeConnWires(graphView.tempConn);    

    if (graphView.savedConn)
        updateWire(graphView.savedConn.wire);

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



graphView.endConnection = function(pointerId, backInit = false)
{
    if (graphView.tempConn.output) // FROM OUTPUT
    {
        let output = graphView.tempConn.output;
        let input  = graphView.overInput;

        let savedConnInput = 
            graphView.savedConn
            ? graphView.savedConn.input
            : null;

        output.connecting = false;
        

        if (   input
            && input.canConnectFrom(output)) // TO INPUT
        {
            if (   !isNaN(newReorderIndex)
                && !isNaN(oldReorderIndex)
                &&  newReorderIndex != oldReorderIndex
                &&  newReorderIndex >= 0
                &&  input.node.variableInputs
                && !input.param
                && !isLastInArray(input.node.headerInputs, input))
                actionManager.do(new ReorderInputAction(input.node.id, oldReorderIndex, newReorderIndex));

            else if (savedConnInput
                  && savedConnInput.connectedOutput == graphView.tempConn.output
                  && savedConnInput.index != input.index
                  && (  !input.node.variableInputs && input.index < input.node.headerInputs.length
                      || input.node.variableInputs && input.index < input.node.headerInputs.length-1))
            {
                moveInArray(
                    input.node.inputs,
                    input.node.inputs.indexOf(savedConnInput),
                    input.index);

                actionManager.do(new ReorderInputAction(savedConnInput.node.id, oldReorderIndex, savedConnInput.index));
            }
            else if (   input == savedConnInput
                     && input.connection) // reconnect old
            {
                graphView.savedConn = null; // done here to redraw the saved wire correctly
                showWire(input.connection.wire, true);
            }

            else if (savedConnInput
                  && savedConnInput.connectedOutput == output
                  && (     !input.node.variableInputs
                      ||    input.node.variableInputs
                         && input.index < input.node.headerInputs.length-1))
                actionManager.do(new ReconnectAction(output, savedConnInput, input));

            else if (   !savedConnInput
                     && (  !input.connected
                         || input.connectedOutput != graphView.tempConn.output)) // connect new
                createConnectAction(output, input, backInit);
        }
        else if (savedConnInput) // disconnect old
            actionManager.do(new DisconnectAction(savedConnInput));
        

        if (graphView.savedConn) showWire(graphView.savedConn.wire, true);
        graphView.cancelConnection(pointerId);
    }
    
    else if (graphView.tempConn.input) // FROM INPUT
    {
        let input  = graphView.tempConn.input;
        let output = graphView.overOutput;

        input.connecting = false;

        if (   output
            && input.canConnectFrom(output)) // TO OUTPUT
            createConnectAction(output, input, backInit);

        graphView.cancelConnection(pointerId);
    }
}



function createConnectAction(output, input, backInit)
{
    actionManager.do(new ConnectAction(output, input, {backInit: backInit}));
}