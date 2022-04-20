class DisconnectAction
extends Action
{
    outputOpId;
    outputIndex;
    get outputOp() { return nodeFromId(this.outputOpId); }

    inputOpId;
    inputIndex;
    get inputOp() { return nodeFromId(this.inputOpId); }

    oldActiveOpIds = [];
    newActiveOpIds = [];



    constructor(output, input)
    {
        super('disconnect ' 
            + output.op.id + '.out[' + output.index + ']'
            + ' -> '
            + input.op.id + '.in[' + input.index + ']');


        this.outputOpId  = output.op.id;
        this.outputIndex = output.index;

        this.inputOpId   = input.op.id;
        this.inputIndex  = input.index;


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