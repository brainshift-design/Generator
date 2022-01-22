class ConnectAction
extends Action
{
    outputOpId;
    outputIndex;

    inputOpId;
    inputIndex;



    constructor(output, input)
    {
        const outIndex = output.op.outputs.findIndex(o => o == output);
        const  inIndex = input .op. inputs.findIndex(i => i ==  input); 


        super('Connect ' 
            + output.op.name + '.outputs[' + outIndex + ']'
            + ' -> '
            + input.op.name + '.inputs[' + inIndex + ']');

            
        this.outputOpId  = output.op.id;
        this.outputIndex = outIndex;

        this.inputOpId   = input.op.id;
        this.inputIndex  = inIndex;
    }



    do()
    {
        uiConnect(
            graph.nodes.find(n => n.id == this.outputOpId).outputs[this.outputIndex], 
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }



    undo()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }



    // redo()
    // {
        
    // }
}