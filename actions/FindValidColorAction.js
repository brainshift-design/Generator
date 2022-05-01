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
        super('set ' + param.node.id + '.' + param.id + ' = ' + value);

        this.nodeId     = param.node.id;
        this.paramIndex = param.index;

        this.newValue   = value;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setValue(this.newValue);
        pushUpdate([this.param.node]);

        uiSaveNodes([this.nodeId]);
    }
}