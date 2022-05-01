class SetParamLockAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return nodeFromId(this.nodeId).params[this.paramIndex]; } 


    locked;



    constructor(param, locked)
    {
        super('set ' + param.node.id + '.' + param.id + '.locked = ' + boolString(locked));

        this.nodeId     = param.node.id;
        this.paramIndex = param.index;

        this.locked  = locked;
    }



    do()
    {
        //this.oldValue = this.param.oldValue;
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setLocked(!this.locked);
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setLocked(this.locked);
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }
}