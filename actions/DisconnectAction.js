class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }



    constructor(output, input)
    {
        const outputIndex = output.op.outputs.indexOf(output);
        const  inputIndex = input .op. inputs.indexOf( input); 


        super('disconnect ' 
            + output.op.idName + '.outputs[' + outputIndex + ']'
            + ' -> '
            + input.op.idName + '.inputs[' + inputIndex + ']');


        this.outputOpId  = output.op.id;
        this.outputIndex = outputIndex;

        this.inputOpId   = input.op.id;
        this.inputIndex  = inputIndex;
    }



    do()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);

        this.inputOp.pushUpdate();
        //graphView.updateNodeTransform(this.inputOp);
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputOp, 
            this.outputIndex, 
            this.inputOp, 
            this.inputIndex);

        //graphView.updateNodeTransform(this.inputOp);
        this.inputOp.pushUpdate();
    }
}