class ReconnectAction
extends Action
{
    outputOpId;
    outputIndex;

    oldInputOpId;
    oldInputIndex;
    
    inputOpId;
    inputIndex;



    constructor(output, oldInput, input)
    {
        const   outIndex =   output.op.outputs.indexOf(output  );
        const oldInIndex = oldInput.op. inputs.indexOf(oldInput); 
        const    inIndex =    input.op. inputs.indexOf(input   ); 
        

        super(  
              output.op.name + '.outputs[' + outIndex + ']'
            + ' ( <- '
            + oldInput.op.name + '.inputs[' + oldInIndex + '])'
            + ' -> '
            + input.op.name + '.inputs[' + inIndex + ']');


        this.outputOpId    = output.op.id;
        this.outputIndex   = outIndex;
        
        this.oldInputOpId  = oldInput.op.id;
        this.oldInputIndex = oldInIndex;

        this.inputOpId     = input.op.id;
        this.inputIndex    = inIndex;
    }



    do()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this.oldInputOpId)  .inputs[this.oldInputIndex ]);

        uiConnect(
            graph.nodes.find(n => n.id == this.outputOpId).outputs[this.outputIndex], 
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }



    undo()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this.inputOpId).inputs[this.inputIndex]);

        uiConnect(
            graph.nodes.find(n => n.id == this.  outputOpId).outputs[this.  outputIndex], 
            graph.nodes.find(n => n.id == this.oldInputOpId). inputs[this.oldInputIndex]);
    }



    // redo()
    // {
        
    // }
}