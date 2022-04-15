class FindValidColorAction
extends Action
{
    nodeId;

    oldValue1;
    oldValue1;
    oldValue1;
    
    newValue;



    constructor(param, value)
    {
        super('set ' + param.op.id + '.' + param.id + ' = ' + value);

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.newValue   = value;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setValue(this.newValue);
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }
}