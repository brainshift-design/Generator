class SetParamValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    oldValue; // string, decimals matter
    newValue; // string, decimals matter



    constructor(param, value)
    {
        super('SET VALUE ' + param.node.id + '.' + param.id + ' = ' + value);

        this.nodeId     = param.node.id;
        this.paramIndex = param.index;

        this.newValue   = value;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        pushUpdateFromParam([this.param.node], this.param);

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
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