class SetParamLockAction
extends Action
{
    nodeId;
    paramId;

    get param() 
    { 
        return nodeFromId(this.nodeId).params
            .find(p => p.id == this.paramId); 
    } 


    locked;



    constructor(param, locked)
    {
        super('SET PARAM LOCK ' + param.node.id + '.' + param.id + '.locked = ' + boolString(locked));

        this.nodeId  = param.node.id;
        this.paramId = param.id;

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