class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;

    inputOpId;
    inputIndex;



    constructor(output, input)
    {
        const outputIndex = output.op.outputs.indexOf(output);
        const  inputIndex = input .op. inputs.indexOf( input); 


        super('Disconnect ' 
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
        uiDisconnect(graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }
    
    
    
    undo()
    {
        const outputOp = graph.nodes.find(n => n.id == this.outputOpId);
        const  inputOp = graph.nodes.find(n => n.id == this. inputOpId);

        uiVariableConnect(outputOp, this.outputIndex, inputOp, this.inputIndex);
    }
}