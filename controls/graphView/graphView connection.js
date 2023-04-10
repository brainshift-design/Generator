GraphView.prototype.startConnectionFromOutput = function(pointerId, output, updateTempWire = true, backInit = false)
{
    this.connPointerId = pointerId;

    this.tempConn          = new Connection(output, null);
    this.tempConn.backInit = backInit;

    //this.tempConnected = false;
    this.addConnWires(this.tempConn, false);

    if (updateTempWire)
        this.tempConn.wire.update(this.pStart.x, this.pStart.y);

    output.updateControl();
};



GraphView.prototype.startConnectionFromInput = function(pointerId, input, backInit = false)
{
    this.connPointerId = pointerId;

    this.tempConn          = new Connection(null, input);
    this.tempConn.backInit = backInit;
    
    this.addConnWires(this.tempConn, false);

    this.tempConn.wire.update(this.pStart.x, this.pStart.y);

    input.updateControl();
};



GraphView.prototype.cancelConnection = function(pointerId)
{
    const output = this.tempConn.output;
    const input  = this.tempConn.input;

    this.removeConnWires(this.tempConn);    

    if (this.savedConn)
        this.savedConn.wire.update();

    this.savedConn = null;
    this.tempConn  = null;

    if (output) output.updateControl();
    if (input ) input .updateControl();

    if (this.overInput ) this.overInput .updateControl();
    if (this.overOutput) this.overOutput.updateControl();


    if (this.div.hasPointerCapture(pointerId))
        this.div.releasePointerCapture(pointerId);

    this.connPointerId = -1;


    newReorderIndex  = Number.NaN;
    prevReorderIndex = Number.NaN;
    oldReorderIndex  = Number.NaN;
};



GraphView.prototype.endConnection = function(pointerId, backInit = false)
{
    if (this.tempConn.output) // FROM OUTPUT
    {
        let output = this.tempConn.output;
        let input  = this.overInput;

        let savedConnInput = 
            this.savedConn
            ? this.savedConn.input
            : null;

        output.connecting = false;
        

        if (   input
            && input.canConnectFrom(output))
        {
            if (  !savedConnInput
                || savedConnInput != input) // TO INPUT
            {
                if (input.node.variableInputs) this.endConnectionFromOutputToVariable(output, input, savedConnInput, backInit);
                else                           this.endConnectionFromOutputToFixed   (output, input, savedConnInput, backInit);
            }
            // if (   !isNaN(newReorderIndex)
            //     && !isNaN(oldReorderIndex)
            //     &&  newReorderIndex != oldReorderIndex
            //     &&  newReorderIndex >= 0
            //     &&  input.node.variableInputs
            //     && !input.param
            //     && !isLastInArray(input.node.headerInputs, input))
            // {
            //     console.log('1 reorder');
            //     actionManager.do(new ReorderInputsAction(input.node.id, oldReorderIndex, newReorderIndex));
            // }
            // else if (savedConnInput
            //       && savedConnInput.connectedOutput == this.tempConn.output
            //       && savedConnInput.index != input.index
            //       && savedConnInput.node.headerInputs.includes(savedConnInput) == savedConnInput.node.headerInputs.includes(input)
            //       && (  !input.node.variableInputs &&  input.index < input.node.inputs.length
            //           || input.node.variableInputs && (input.index < input.node.headerInputs.length-1 || input.index >= input.node.headerInputs.length)))
            // {
            //     console.log('2 reorder');
            //     // if (input.node.variableInputs)
            //     // {
            //     //     moveInArray(
            //     //         input.node.inputs,
            //     //         input.node.inputs.indexOf(savedConnInput),
            //     //         input.index);

            //     //     actionManager.do(new ReorderInputsAction(savedConnInput.node.id, oldReorderIndex, savedConnInput.index));
            //     // }
            //     // else
            //     // {
            //         actionManager.do(new ReorderInputConnectionsAction(savedConnInput.node.id, savedConnInput.id, input.id));
            //     // }
            // }
            // else if (input == savedConnInput
            //       && input.connection) // reconnect old
            // {
            //     console.log('3 reconnect');
            //     this.savedConn = null; // done here to redraw the saved wire correctly
            //     input.connection.wire.show(true);
            // }
            // else if (savedConnInput
            //       && input.node.variableInputs
            //       && savedConnInput.index >= input.node.headerInputs.length
            //       && input.index == input.node.headerInputs.length-1
            //       && input.isNew)
            // {
            //     // reconnect from below header to new variable new input
            //     console.log('4 reconnect');
            //     actionManager.do(new ReconnectAction(output, savedConnInput, input));
            // }
            // else if (savedConnInput
            //       && savedConnInput.connectedOutput == output
            //       && (  !input.node.variableInputs
            //           || input.index >= input.node.headerInputs.length
            //           || (   input.node.variableInputs
            //               && (      input.node.headerInputs.length > 1 
            //                      && input.index < input.node.headerInputs.length-1
            //                   ||    input.node.headerInputs.length == 1 
            //                      && input.index == 0))))
            // {
            //     console.log('5 reconnect');
            //     actionManager.do(new ReconnectAction(output, savedConnInput, input));
            // }
            // else if (   !savedConnInput
            //         && (  !input.connected
            //             || input.connectedOutput != this.tempConn.output)) // connect new
            // {
            //     console.log('6 createConnectAction');
            //     actionManager.do(new ConnectAction(output, input, {backInit: backInit}));
            // }
        }
        else if (savedConnInput)
            actionManager.do(new DisconnectAction(savedConnInput));
        

        if (this.savedConn) this.savedConn.wire.show(true);
        this.cancelConnection(pointerId);
    }
    
    else if (this.tempConn.input) // FROM INPUT
    {
        let input  = this.tempConn.input;
        let output = this.overOutput;

        input.connecting = false;

        if (   output
            && input.canConnectFrom(output)) // TO OUTPUT
            actionManager.do(new ConnectAction(output, input, {backInit: backInit}));

        this.cancelConnection(pointerId);
    }
};



GraphView.prototype.endConnectionFromOutputToFixed = function(output, input, savedConnInput, backInit = false)
{
    if (   !savedConnInput
        && (  !input.connected
            || input.connectedOutput != this.tempConn.output))
    {
        //console.log('F1 connect new');
        actionManager.do(new ConnectAction(output, input, {backInit: backInit}));
    }
    else if (savedConnInput
          && savedConnInput.connectedOutput == output)
    {
        //console.log('F2 reconnect');
        actionManager.do(new ReconnectAction(output, savedConnInput, input));
    }
    // else if (savedConnInput
    //       && savedConnInput.connectedOutput == this.tempConn.output
    //       && savedConnInput.index != input.index
    //       && savedConnInput.node.inputs.includes(savedConnInput) == savedConnInput.node.inputs.includes(input))
    // {
    //     console.log('2 reorder');
    //     actionManager.do(new ReorderInputConnectionsAction(savedConnInput.node.id, savedConnInput.id, input.id));
    // }
};



GraphView.prototype.endConnectionFromOutputToVariable = function(output, input, savedConnInput, backInit = false)
{
    if (   !savedConnInput
        && (  !input.connected
            || input.connectedOutput != this.tempConn.output))
    {
        //console.log('V1 connect new');
        actionManager.do(new ConnectAction(output, input, {backInit: backInit}));
    }
    else if (savedConnInput
          && savedConnInput.connectedOutput == output
          && (   savedConnInput.node != input.node
              ||    savedConnInput.index < input.node.headerInputs.length-1
                 && input.index >= input.node.headerInputs.length
              ||    savedConnInput.index >= input.node.headerInputs.length 
                 && input.index < input.node.headerInputs.length-1))
    {
        // if (input.index <)
        //console.log('V2 reconnect');
        actionManager.do(new ReconnectAction(output, savedConnInput, input));
    }
};



GraphView.prototype.createTempConnSwap = function(oldInput, newInput)
{
    this.tempConnSwap = new Connection(oldInput.output, newInput);
    this.addConnWires(this.tempConnSwap, false);
    this.tempConnSwap.wire.update();
};



GraphView.prototype.deleteTempConnSwap = function(oldInput, newInput)
{
    this.removeConnWires(this.tempConnSwap);    
    this.tempConnSwap = null;
};