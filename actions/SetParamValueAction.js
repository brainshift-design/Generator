class SetParamValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    oldValue;
    newValue;



    constructor(param, value)
    {
        super('set ' + param.op.id + '.' + param.name + ' = ' + value);

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.newValue   = value;
    }



    do()
    {
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