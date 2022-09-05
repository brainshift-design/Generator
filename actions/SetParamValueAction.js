class SetParamValueAction
extends Action
{
    nodeId;
    paramId;

    get param() 
    { 
        return nodeFromId(this.nodeId).params
            .find(p => p.id == this.paramId); 
    } 


    oldValue; // decimal
    newValue; // decimal



    constructor(param, value)
    {
        super('SET VALUE ' + param.node.id + '.' + param.id + ' = ' + value.toDisplayString());

        this.nodeId   = param.node.id;
        this.paramId  = param.id;

        this.newValue = value;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        pushUpdateFromParam([this.param.node], this.param);

        //uiSaveNodes([this.nodeId]);
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
        pushUpdateFromParam([this.param.node], this.param);

        //uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        this.param.setValue(this.newValue);
        pushUpdateFromParam([this.param.node], this.param);

        //uiSaveNodes([this.nodeId]);
    }
}