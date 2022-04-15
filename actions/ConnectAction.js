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
    
    oldOutputActiveOpId;      // the active node in the output node's tree
    oldInputActiveOpIds = []; // the active nodes in the input node's tree

    newActiveOpIds = [];



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


        this.outputOpId          = output.op.id;
        this.outputIndex         = outIndex;
   
        this.oldOutputOpId       = input.isConnected ? input.connectedOutput.op.id : '';
        this.oldOutputIndex      = oldOutIndex;
   
        this.inputOpId           = input.op.id;
        this.inputIndex          = inIndex;

        this.oldOutputActiveOpId = getActiveNodeInTreeFrom(nodeFromId(this.outputOpId)).id;
        this.oldInputActiveOpIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputOpId)).map(n => n.id)];
    }


    
    do()
    {
        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this.inputOp. inputs [this. inputIndex],
            this.inputIndex);


        this.newActiveOpIds = [];

        if (    this.oldOutputOp
            && !getActiveNodeInTreeFrom(this.oldOutputOp))
        {
            uiMakeNodeActive(this.oldOutputOp);
            this.newActiveOpIds.push(this.oldOutputOpId);
            this.oldOutputOp.pushUpdate();
            //graphView.updateNodeTransform(oldPrevOutputActiveOp);
        }


        let oldInputActiveOpIds = [...this.oldInputActiveOpIds];
        oldInputActiveOpIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveOpIds)
            uiMakeNodeActive(nodeFromId(id));


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


        for (const id of this.newActiveOpIds)
            uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldInputActiveOpIds)
            uiMakeNodeActive(nodeFromId(id));

        if (!this.oldInputActiveOpIds.includes(this.oldOutputActiveOpId))
            uiMakeNodeActive(nodeFromId(this.oldOutputActiveOpId));
    }
}