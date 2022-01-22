class SetParamValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return graph.nodes.find(n => n.id == this.nodeId).params[this.paramIndex]; } 


    oldValue;
    newValue;



    constructor(param, value)
    {
        super('set param value');

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.newValue   = value;
    }



    do()
    {
        this.oldValue = this.param.oldValue;
        //uiSetParam(this.param, this.value);
    }



    undo()
    {
        this.param.setValue(this.oldValue, false, true);
    }



    redo()
    {
        //uiSetParam(this.param, this.value);
        this.param.setValue(this.newValue);
    }
}