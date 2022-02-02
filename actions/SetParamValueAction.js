class SetParamValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return graph.nodes.find(n => n.id == this.nodeId).params[this.paramIndex]; } 


    oldValue;
    newValue;



    constructor(param, value)
    {
        super('set param value');

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.newValue   = value;
    }



    do()
    {
        console.log('SetParamValueAction()');
        this.oldValue = this.param.oldValue;
        this.param.op.pushUpdate();
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
        this.param.op.pushUpdate();
    }



    redo()
    {
        this.param.setValue(this.newValue);
        this.param.op.pushUpdate();
    }
}