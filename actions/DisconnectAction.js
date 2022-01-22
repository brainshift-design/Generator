class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;

    inputOpId;
    inputIndex;



    constructor(output, input)
    {
        console.log(output);
        console.log(input);
        const outputIndex = output.op.outputs.indexOf(output);
        const  inputIndex = input .op. inputs.indexOf( input); 

        console.log(outputIndex);
        console.log(inputIndex );

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
        uiConnect(
            graph.nodes.find(n => n.id == this.outputOpId).outputs[this.outputIndex], 
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }



    // redo()
    // {
        
    // }
}