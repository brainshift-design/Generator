class SetParamValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    oldValue; // decimal
    newValue; // decimal



    constructor(param, value)
    {
        super('SET VALUE ' + param.node.id + '.' + param.id + ' = ' + value);

        this.nodeId     = param.node.id;
        this.paramIndex = param.index;

        this.newValue   = value;
    }



    do()
    {
        console.log('this.param.oldValue', this.param.oldValue);
        this.oldValue = shallowCopy(this.param.oldValue);
        console.log('this.oldValue', this.oldValue);
        pushUpdateFromParam([this.param.node], this.param);

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        console.log('this.oldValue', this.oldValue);
        this.param.setValue(this.oldValue, false, true);
        pushUpdateFromParam([this.param.node], this.param);

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setValue(this.newValue);
        pushUpdateFromParam([this.param.node], this.param);

        uiSaveNodes([this.nodeId]);
    }
}