class ReconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }

    oldOutputOpId = '';
    oldOutputIndex;
    get oldOutputOp() { return nodeFromId(this.oldOutputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }

    oldInputOpId = '';
    oldInputIndex;
    get oldInputOp() { return nodeFromId(this.oldInputOpId); }
    


    constructor(output, oldInput, input)
    {
        const    outIndex =   output.op.outputs.indexOf(output);
        const oldOutIndex = input.isConnected ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) : -1; 
        const  oldInIndex = oldInput.op. inputs.indexOf(oldInput); 
        const     inIndex =    input.op. inputs.indexOf(input); 
        

        super(
             'reconnect '
            + output.op.id + '.outputs[' + outIndex + ']'
            + ' ( <- '
            + oldInput.op.id + '.inputs[' + oldInIndex + '])'
            + ' -> '
            + input.op.id + '.inputs[' + inIndex + ']');


        this.outputOpId    = output.op.id;
        this.outputIndex   = outIndex;
        
        this.oldOutputOpId  = input.isConnected ? input.connectedOutput.op.id : '';
        this.oldOutputIndex = oldOutIndex;

        this.oldInputOpId  = oldInput.op.id;
        this.oldInputIndex = oldInIndex;

        this.inputOpId     = input.op.id;
        this.inputIndex    = inIndex;
    }



    do()
    {
        uiDisconnect(this.oldInputOp.inputs[this.oldInputIndex]);

        graphView.updateNodeTransform(this.oldInputOp);
        
        
        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this. inputOp. inputs[this. inputIndex],
            this.inputIndex);
            
        graphView.updateNodeTransform(this.inputOp);

        this.oldInputOp.pushUpdate();
        this.inputOp   .pushUpdate();
    }



    undo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);


        uiVariableConnect(
            this.outputOp, 
            this.outputIndex, 
            this.oldInputOp, 
            this.oldInputIndex);

        this.oldInputOp.pushUpdate();
        graphView.updateNodeTransform(this.oldInputOp);
    

        if (this.oldOutputOpId != '')
        {
            uiVariableConnect(
                this.oldOutputOp, 
                this.oldOutputIndex, 
                this.inputOp, 
                this.inputIndex);

            this.inputOp.pushUpdate();
            graphView.updateNodeTransform(this.inputOp);
        }
    }
}