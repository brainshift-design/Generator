class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }

    newActiveOpIds    = [];
    oldActiveOpIds = [];



    constructor(output, input)
    {
        const outputIndex = output.op.outputs.indexOf(output);
        const  inputIndex = input .op. inputs.indexOf( input); 


        super('disconnect ' 
            + output.op.id + '.outputs[' + outputIndex + ']'
            + ' -> '
            + input.op.id + '.inputs[' + inputIndex + ']');


        this.outputOpId  = output.op.id;
        this.outputIndex = outputIndex;

        this.inputOpId   = input.op.id;
        this.inputIndex  = inputIndex;


        this.oldActiveOpIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputOpId)).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);
        
        if (!getActiveNodeInTreeFrom(this.inputOp))
        {
            uiMakeNodeActive(this.inputOp);
            this.newActiveOpIds.push(this.inputOpId);
            this.inputOp.pushUpdate();
            //graphView.updateNodeTransform(this.inputOp);
        }

        if (!getActiveNodeInTreeFrom(this.outputOp))
        {
            uiMakeNodeActive(this.outputOp);
            this.newActiveOpIds.push(this.outputOpId);
            this.outputOp.pushUpdate();
            //graphView.updateNodeTransform(this.outputOp);
        }
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputOp, this.outputIndex, 
            this. inputOp, this. inputIndex);

        for (const id of this.newActiveOpIds)
            uiMakeNodePassive(nodeFromId(id));

        let oldActiveOpIds = [...this.oldActiveOpIds];
        oldActiveOpIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveOpIds)
            uiMakeNodeActive(nodeFromId(id));

        //graphView.updateNodeTransform(this.inputOp);
        this.inputOp.pushUpdate();
    }
    
    
    
    redo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);
        
        if (!getActiveNodeInTreeFrom(this.inputOp))
        {
            uiMakeNodeActive(this.inputOp);
            this.inputOp.pushUpdate();
            //graphView.updateNodeTransform(this.inputOp);
        }

        if (!getActiveNodeInTreeFrom(this.outputOp))
        {
            uiMakeNodeActive(this.outputOp);
            this.outputOp.pushUpdate();
            //graphView.updateNodeTransform(this.outputOp);
        }
   }
}