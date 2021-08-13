class SetValueAction
extends Action
{
    param;

    oldValue;
    newValue;



    constructor(param, newValue)
    {
        super('Set Value');

        this.param    = param;
        this.newValue = newValue;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        uiSetParam(this.param, this.newValue);
    }



    undo()
    {
        this.param.setValue(this.oldValue, true, false);
    }



    redo()
    {
        uiSetParam(this.param, this.newValue);
        this.param.setValue(this.newValue, false, false);
    }
}