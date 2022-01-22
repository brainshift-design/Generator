class ConnectAction
extends Action
{
    outputOpId;
    outputIndex;

    oldOutputOpId;
    oldOutputIndex;

    inputOpId;
    inputIndex;



    constructor(output, input)
    {
        const    outIndex = output.op.outputs.indexOf(output);
        const oldOutIndex = input.isConnected ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) : -1; 
        const     inIndex = input.op.inputs.indexOf(input); 


        super('Connect ' 
            + output.op.name + '.outputs[' + outIndex + ']'
            + ' -> '
            + input.op.name + '.inputs[' + inIndex + ']');


        this.outputOpId     = output.op.id;
        this.outputIndex    = outIndex;

        this.oldOutputOpId  = input.isConnected ? input.connectedOutput.op.id : -1;
        this.oldOutputIndex = oldOutIndex;

        this.inputOpId      = input.op.id;
        this.inputIndex     = inIndex;


        console.log('this.outputOpId  = ', this.outputOpId);
        console.log('this.outputIndex = ', this.outputIndex);
        console.log('this.oldOutputOpId  = ', this.oldOutputOpId);
        console.log('this.oldOutputIndex = ', this.oldOutputIndex);
        console.log('this.inputOpId  = ', this.inputOpId);
        console.log('this.inputIndex = ', this.inputIndex);
    }



    do()
    {
        uiConnect(
            graph.nodes.find(n => n.id == this.outputOpId).outputs[this.outputIndex], 
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex]);
    }



    undo()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this.inputOpId).inputs[this.inputIndex]);

        if (this.oldOutputOpId > -1)
        {
            const oldOutputOp = graph.nodes.find(n => n.id == this.oldOutputOpId);
            const inputOp     = graph.nodes.find(n => n.id == this.inputOpId);

            if (inputOp._variableInputs)
            {
                const input = lastOf(inputOp.inputs);

                uiConnect(
                    oldOutputOp.outputs[this.oldOutputIndex],
                    input);

                // move new input back to correct index
                inputOp.inputs =
                            inputOp.inputs.slice(0, this.inputIndex)
                    .concat([input])
                    .concat(inputOp.inputs.slice(this.inputIndex, inputOp.inputs.length-1));
            }
            else
            {
                uiConnect(
                    oldOutputOp.outputs[this.oldOutputIndex],
                        inputOp. inputs[this.    inputIndex]);
            }
        }
    }
}