class ReconnectAction
extends Action
{
    outputOpId;
    outputIndex;

    oldOutputOpId;
    oldOutputIndex;

    oldInputOpId;
    oldInputIndex;
    
    inputOpId;
    inputIndex;



    constructor(output, oldInput, input)
    {
        const    outIndex =   output.op.outputs.indexOf(output);
        const oldOutIndex = input.isConnected ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) : -1; 
        const  oldInIndex = oldInput.op. inputs.indexOf(oldInput); 
        const     inIndex =    input.op. inputs.indexOf(input); 
        

        super(  
              output.op.name + '.outputs[' + outIndex + ']'
            + ' ( <- '
            + oldInput.op.name + '.inputs[' + oldInIndex + '])'
            + ' -> '
            + input.op.name + '.inputs[' + inIndex + ']');


        this.outputOpId    = output.op.id;
        this.outputIndex   = outIndex;
        
        this.oldOutputOpId  = input.isConnected ? input.connectedOutput.op.id : -1;
        this.oldOutputIndex = oldOutIndex;

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
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex],
            this.inputIndex);
    }



    undo()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this.inputOpId).inputs[this.inputIndex]);


        const outputOp   = graph.nodes.find(n => n.id == this.  outputOpId);
        const oldInputOp = graph.nodes.find(n => n.id == this.oldInputOpId);

        uiVariableConnect(outputOp, this.outputIndex, oldInputOp, this.oldInputIndex);
        // if (oldInputOp._variableInputs)
        // {
        //     const input = lastOf(oldInputOp.inputs);

        //     uiConnect(
        //         outputOp.outputs[this.outputIndex],
        //         input,
        //         this.oldInputIndex);
        // }
        // else
        // {
        //     uiConnect(
        //           outputOp.outputs[this.  outputIndex],
        //         oldInputOp. inputs[this.oldInputIndex]);
        // }


        if (this.oldOutputOpId > -1)
        {
            const oldOutputOp = graph.nodes.find(n => n.id == this.oldOutputOpId);
            const inputOp     = graph.nodes.find(n => n.id == this.inputOpId);

            uiVariableConnect(oldOutputOp, this.oldOutputIndex, inputOp, this.inputIndex);
            // if (inputOp._variableInputs)
            // {
            //     const input = lastOf(inputOp.inputs);

            //     uiConnect(
            //         oldOutputOp.outputs[this.oldOutputIndex],
            //         input,
            //         this.inputIndex);
            // }
            // else
            // {
            //     uiConnect(
            //         oldOutputOp.outputs[this.oldOutputIndex],
            //             inputOp. inputs[this.    inputIndex]);
            // }
        }
    }
}