class ReconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return graph.nodes.find(n => n.id == this.outputOpId); }

    oldOutputOpId;
    oldOutputIndex;
    get oldOutputOp() { return graph.nodes.find(n => n.id == this.oldOutputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return graph.nodes.find(n => n.id == this.inputOpId); }

    oldInputOpId;
    oldInputIndex;
    get oldInputOp() { return graph.nodes.find(n => n.id == this.oldInputOpId); }
    


    constructor(output, oldInput, input)
    {
        const    outIndex =   output.op.outputs.indexOf(output);
        const oldOutIndex = input.isConnected ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) : -1; 
        const  oldInIndex = oldInput.op. inputs.indexOf(oldInput); 
        const     inIndex =    input.op. inputs.indexOf(input); 
        

        super(
             'reconnect '
            + output.op.name + '.outputs[' + outIndex + ']'
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
        uiDisconnect(this.oldInputOp.inputs[this.oldInputIndex]);

        this.oldInputOp.pushUpdate();
        graphView.updateNodeTransform(this.oldInputOp);


        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this. inputOp. inputs[this. inputIndex],
            this.inputIndex);

        this.inputOp.pushUpdate();
        graphView.updateNodeTransform(this.inputOp);
    }



    undo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);


        uiVariableConnect(
            this.outputOp, 
            this.outputIndex, 
            this.oldInputOp, 
            this.oldInputIndex);

        this.oldInputOp.pushUpdate();
        graphView.updateNodeTransform(this.oldInputOp);
    

        if (this.oldOutputOpId > -1)
        {
            uiVariableConnect(
                this.oldOutputOp, 
                this.oldOutputIndex, 
                this.inputOp, 
                this.inputIndex);

            this.inputOp.pushUpdate();
            graphView.updateNodeTransform(this.inputOp);
        }
    }
}