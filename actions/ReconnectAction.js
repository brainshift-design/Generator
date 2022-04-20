class ReconnectAction
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

    oldInputOpId = '';
    oldInputIndex;
    get oldInputOp() { return nodeFromId(this.oldInputOpId); }
    
    oldOutputActiveOpId;      // the active node in the output node's tree
    oldInputActiveOpIds = []; // the active nodes in the input node's tree

    newActiveOpIds = [];



    constructor(output, oldInput, input)
    {
        const oldOutIndex = 
            input.isConnected 
            ? input.connectedOutput.index
            : -1; 


        super(
             'reconnect '
            + output.op.id + '.out[' + output.index + ']'
            + ' ( <- '
            + oldInput.op.id + '.in[' + oldInput.index + '])'
            + ' -> '
            + input.op.id + '.in[' + input.index + ']');


        this.outputOpId          = output.op.id;
        this.outputIndex         = output.index;
             
        this.oldOutputOpId       = input.isConnected ? input.connectedOutput.op.id : '';
        this.oldOutputIndex      = oldOutIndex;
     
        this.oldInputOpId        = oldInput.op.id;
        this.oldInputIndex       = oldInput.index;
     
        this.inputOpId           = input.op.id;
        this.inputIndex          = input.index;

        this.oldOutputActiveOpId = getActiveNodeInTreeFrom(nodeFromId(this.outputOpId)).id;
        this.oldInputActiveOpIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputOpId)).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.oldInputOp.inputs[this.oldInputIndex]);

        graphView.updateNodeTransform(this.oldInputOp);
        

        uiConnect(
            this.outputOp.outputs[this.outputIndex], 
            this. inputOp. inputs[this. inputIndex],
            this.inputIndex);
            

        this.newActiveOpIds = [];

        if (!getActiveNodeInTreeFrom(this.oldOutputOp))
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

        this.oldInputOp.pushUpdate();
        this.inputOp   .pushUpdate();
    }



    undo()
    {
        uiDisconnect(this.inputOp.inputs[this.inputIndex]);

        // if (this.oldOutputOpId != '')
        //     uiDisconnect(this.inputOp.inputs[this.inputIndex]);

            
        uiVariableConnect(
            this.outputOp, 
            this.outputIndex, 
            this.oldInputOp, 
            this.oldInputIndex);

        graphView.updateNodeTransform(this.oldInputOp);
        this.oldInputOp.pushUpdate();
    

        if (this.oldOutputOpId != '')
        {
            uiVariableConnect(
                this.oldOutputOp, 
                this.oldOutputIndex, 
                this.inputOp, 
                this.inputIndex);

            graphView.updateNodeTransform(this.inputOp);
            this.inputOp.pushUpdate();
        }


        for (const id of this.newActiveOpIds)
            uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldInputActiveOpIds)
            uiMakeNodeActive(nodeFromId(id));

        if (!this.oldInputActiveOpIds.includes(this.oldOutputActiveOpId))
            uiMakeNodeActive(nodeFromId(this.oldOutputActiveOpId));
    }
}