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



    perform()
    {
        this.oldValue = this.param.oldValue;
        uiSetParam(this.param, this.newValue);

        console.log("perform oldValue = " + this.oldValue);
        console.log("perform newValue = " + this.newValue);
    }



    undo()
    {
        console.log("undo param.value = " + this.param.value);
        console.log("undo oldValue    = " + this.oldValue);

        this.param.setValue(this.oldValue, true, false);
    }



    redo()
    {
        uiSetParam(this.param, this.newValue);
        this.param.setValue(this.newValue, false, false);

        console.log("redo oldValue = " + this.oldValue);
        console.log("redo newValue = " + this.newValue);
    }
}