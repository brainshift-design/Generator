class ConnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }
    
    oldOutputOpId = '';
    oldOutputIndex;
    get oldOutputOp() { return nodeFromId(this.oldOutputOpId); }
    
    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }
    
    oldOutputActiveOp; // the active node in the output node's tree
    oldInputActiveOp;  // the active node in the input node's tree



    constructor(output, input)
    {
        const outIndex = output.op.outputs.indexOf(output);
        const  inIndex = input.op.inputs.indexOf(input); 

        const oldOutIndex = 
            input.isConnected 
            ? input.connectedOutput.op.outputs.indexOf(input.connectedOutput) 
            : -1; 

        super('connect ' 
            + output.op.id + '.out[' + outIndex + ']'
            + ' -> '
            + input.op.id + '.in[' + inIndex + ']');


        this.outputOpId        = output.op.id;
        this.outputIndex       = outIndex;
   
        this.oldOutputOpId     = input.isConnected ? input.connectedOutput.op.id : '';
        this.oldOutputIndex    = oldOutIndex;
   
        this.inputOpId         = input.op.id;
        this.inputIndex        = inIndex;

        this.oldOutputActiveOp = getActiveNodeInTreeFrom(nodeFromId(this.outputOpId));
        this.oldInputActiveOp  = getActiveNodeInTreeFrom(nodeFromId(this. inputOpId));
    }


    
    do()
    {
        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this.inputOp. inputs [this. inputIndex],
            this.inputIndex);
            
        uiMakeNodeActive(this.oldInputActiveOp);

        graphView.updateNodeTransform(this.inputOp);
        this.inputOp.pushUpdate();

    }



    undo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);

        if (this.oldOutputOpId != '')
        {
            uiVariableConnect(
                this.oldOutputOp, 
                this.oldOutputIndex, 
                this.inputOp, 
                this.inputIndex);
        }

        graphView.updateNodeTransform(this.inputOp);
        this.inputOp.pushUpdate();

        uiMakeNodeActive(this.oldInputActiveOp);

        if (this.oldOutputActiveOp)
            uiMakeNodeActive(this.oldOutputActiveOp);
    }
}