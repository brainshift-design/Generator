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
        this.param.node.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
        this.param.node.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setValue(this.newValue);
        this.param.node.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }
}