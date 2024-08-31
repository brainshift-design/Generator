GraphView.prototype.startConnectionFromOutput = function(pointerId, output, updateTempWire = true, backInit = false)
{
    this.connPointerId = pointerId;

    this.tempConn          = new Connection(output, null);
    this.tempConn.backInit = backInit;

    //this.tempConnected = false;
    this.addConnWires(this.tempConn, false);

    if (updateTempWire)
        this.tempConn.wire.update(this.pStart.x, this.pStart.y);

    this.showCompatibleInputs(output);
    this.hideAllOutputs(this.tempConn.output);

    output.updateControl();


    // if (dragOutTimer) clearInterval(dragOutTimer);
    // dragOutTimer = setInterval(() => checkDragOut(), 200);

    //try { this.div.setPointerCapture(pointerId); } catch {}
};



GraphView.prototype.startConnectionFromInput = function(pointerId, input, backInit = false)
{
    this.connPointerId = pointerId;

    this.tempConn          = new Connection(null, input);
    this.tempConn.backInit = backInit;
    
    this.addConnWires(this.tempConn, false);

    this.tempConn.wire.update(this.pStart.x, this.pStart.y);

    this.showCompatibleOutputs(input);
    this.hideAllInputs(this.tempConn.input);

    
    input.updateControl();


    // if (dragOutTimer) clearInterval(dragOutTimer);
    // dragOutTimer = setInterval(() => checkDragOut(), 200);

    //try { this.div.setPointerCapture(pointerId); } catch {}
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


    this.showCompatibleInputs();
    this.showCompatibleOutputs();


    newReorderIndex  = Number.NaN;
    prevReorderIndex = Number.NaN;
    oldReorderIndex  = Number.NaN;


    // if (dragOutTimer) 
    // {
    //     clearInterval(dragOutTimer);
    //     dragOutTimer = null;
    // }
};



GraphView.prototype.endConnection = function(pointerId, backInit = false, shiftKey = false)
{
    let savedConnInput = 
        this.savedConn
        ? this.savedConn.input
        : null;


    if (   this.tempConn.output // FROM OUTPUT
        && this.tempConn._setOutFirst === true) // FROM OUTPUT
    {
        const output = this.tempConn.output;
        const input  = this.overInput;

        output.connecting = false;
        

        if (   input
            && output
            && input.canConnectFrom(output))
        {
            if (  !savedConnInput
                || savedConnInput != input) // TO INPUT
            {
                if (input.node.variableInputs) this.endConnectionFromOutputToVariable(output, input, savedConnInput, backInit, shiftKey);
                else                           this.endConnectionFromOutputToFixed   (output, input, savedConnInput, backInit, shiftKey);
            }
        }
        else if (savedConnInput)
            actionManager.do(new DisconnectAction(savedConnInput));
        

        if (this.savedConn) this.savedConn.wire.show(true);
        this.cancelConnection(pointerId);
    }
    
    else if (this.tempConn.input
          || savedConnInput) // FROM INPUT
          //&& this.tempConn._setOutFirst === false) // FROM INPUT
    {
        const input  = this.tempConn.input ?? savedConnInput;
        const output = this.overOutput;

        input.connecting = false;

        if (   output
            && this.tempConn.input
            && this.tempConn.input.canConnectFrom(output)) //input.canConnectFrom(output)) // TO OUTPUT
            actionManager.do(new ConnectAction(output, this.tempConn.input, {backInit: backInit, shiftKey: shiftKey}));

        else if (savedConnInput)
            actionManager.do(new DisconnectAction(savedConnInput));


        this.cancelConnection(pointerId);
    }


    // if (dragOutTimer) 
    // {
    //     clearInterval(dragOutTimer);
    //     dragOutTimer = null;
    // }
};



GraphView.prototype.endConnectionFromOutputToFixed = function(output, input, savedConnInput, backInit = false, shiftKey = false)
{
    if (   !savedConnInput
        && (  !input.connected
            || input.connectedOutput != this.tempConn.output))
    {
        //console.log('F1 connect new');
        actionManager.do(new ConnectAction(output, input, {backInit: backInit, shiftKey: shiftKey}));
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


    // if (dragOutTimer) 
    // {
    //     clearInterval(dragOutTimer);
    //     dragOutTimer = null;
    // }
};



GraphView.prototype.endConnectionFromOutputToVariable = function(output, input, savedConnInput, backInit = false, shiftKey = false)
{
    if (   !savedConnInput
        && (  !input.connected
            || input.connectedOutput != this.tempConn.output))
    {
        //console.log('V1 connect new');
        actionManager.do(new ConnectAction(output, input, {backInit: backInit, shiftKey: shiftKey}));
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


    // if (dragOutTimer) 
    // {
    //     clearInterval(dragOutTimer);
    //     dragOutTimer = null;
    // }
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