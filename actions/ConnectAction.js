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
    }


    
    do()
    {
        uiConnect(
            graph.nodes.find(n => n.id == this.outputOpId).outputs[this.outputIndex], 
            graph.nodes.find(n => n.id == this. inputOpId). inputs[this. inputIndex],
            this.inputIndex);
    }



    undo()
    {
        uiDisconnect(graph.nodes.find(n => n.id == this.inputOpId).inputs[this.inputIndex]);

        
        if (this.oldOutputOpId > -1)
        {
            const oldOutputOp = graph.nodes.find(n => n.id == this.oldOutputOpId);
            const inputOp     = graph.nodes.find(n => n.id == this.inputOpId);

            uiVariableConnect(oldOutputOp, this.oldOutputIndex, inputOp, this.inputIndex);
        }
    }
}