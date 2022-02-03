class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return graph.nodes.find(n => n.id == this.outputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return graph.nodes.find(n => n.id == this.inputOpId); }



    constructor(output, input)
    {
        const outputIndex = output.op.outputs.indexOf(output);
        const  inputIndex = input .op. inputs.indexOf( input); 


        super('disconnect ' 
            + output.op.name + '.outputs[' + outputIndex + ']'
            + ' -> '
            + input.op.name + '.inputs[' + inputIndex + ']');


        this.outputOpId  = output.op.id;
        this.outputIndex = outputIndex;

        this.inputOpId   = input.op.id;
        this.inputIndex  = inputIndex;
    }



    do()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);

        graphView.updateNodeTransform(this.inputOp);
        this.inputOp.pushUpdate();
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputOp, 
            this.outputIndex, 
            this.inputOp, 
            this.inputIndex);

            graphView.updateNodeTransform(this.inputOp);
            this.inputOp.pushUpdate();
    }
}