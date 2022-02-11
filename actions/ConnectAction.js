class ConnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }

    oldOutputOpId;
    oldOutputIndex;
    get oldOutputOp() { return nodeFromId(this.oldOutputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }


    constructor(output, input)
    {
        const    outIndex = output.op.outputs.indexOf(output);
        const oldOutIndex = input.isConnected ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) : -1; 
        const     inIndex = input.op.inputs.indexOf(input); 


        super('connect ' 
            + output.op.id + '.outputs[' + outIndex + ']'
            + ' -> '
            + input.op.id + '.inputs[' + inIndex + ']');


        this.outputOpId     = output.op.id;
        this.outputIndex    = outIndex;

        this.oldOutputOpId  = input.isConnected ? input.connectedOutput.op.id : -1;
        this.oldOutputIndex = oldOutIndex;

        this.inputOpId      = input.op.id;
        this.inputIndex     = inIndex;
    }


    
    do()
    {
        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this.inputOp. inputs [this. inputIndex],
            this.inputIndex);

            graphView.updateNodeTransform(this.inputOp);

            this.inputOp.pushUpdate();
    }



    undo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);

        if (this.oldOutputOpId > -1)
        {
            uiVariableConnect(
                this.oldOutputOp, 
                this.oldOutputIndex, 
                this.inputOp, 
                this.inputIndex);
        }

        graphView.updateNodeTransform(this.inputOp);

        this.inputOp.pushUpdate();
    }
}