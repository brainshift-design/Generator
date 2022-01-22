class SetValueAction
extends Action
{
    nodeId;
    paramIndex;

    get param() { return graph.nodes.find(n => n.id == this.nodeId).params[this.paramIndex]; } 


    oldValue;
    value;



    constructor(param, value)
    {
        super('Set Value');

        this.nodeId     = param.op.id;
        this.paramIndex = param.op.params.indexOf(param);

        this.value      = value;
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
        this.param.setValue(this.value);
    }
}