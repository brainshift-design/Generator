class SetParamLockAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    locked;



    constructor(param, locked)
    {
        super('set ' + param.op.id + '.' + param.id + '.locked = ' + boolString(locked));

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.locked  = locked;
    }



    do()
    {
        //this.oldValue = this.param.oldValue;
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setLocked(!this.locked);
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setLocked(this.locked);
        this.param.op.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }
}