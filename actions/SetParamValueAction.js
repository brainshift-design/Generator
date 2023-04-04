class SetParamValueAction
extends Action
{
    nodeId;
    paramId;


    get param() 
    { 
        return this.graph.nodeFromId(this.nodeId).params
               .find(p => p.id == this.paramId); 
    } 


    oldValue; // decimal
    newValue; // decimal



    constructor(graph, param, value)
    {
        super(
            graph,
            SET_PARAM_VALUE_ACTION,
            'SET PARAM VALUE ' + param.node.id + '.' + param.id + ' = ' + value.toDisplayString());

        this.nodeId     = param.node.id;
        this.paramId    = param.id;
  
        this.newValue   = value;

        this.selfUpdate = true;
    }



    do(updateNodes)
    {
        this.oldValue = this.param.oldValue;

        this.name = 
              'SET PARAM VALUE ' 
            + this.param.node.id 
            + '.' + this.param.id 
            + ' = ' + this.newValue.toDisplayString() 
            + ' (old value = ' + this.oldValue.toDisplayString() + ')';

        pushUpdateFromParam(this, [this.param.node], this.param);
    }



    undo(updateNodes)
    {
        // if (this.oldValue.type == TEXT_VALUE)
        // {
        //     console.log('this.param.controls[0] =', this.param.controls[0]);
        //     this.param.controls[0].textbox.managing = true;
        // }

        this.param.setValue(this.oldValue, false, true);
        pushUpdateFromParam(this, [this.param.node], this.param);
    }



    redo(updateNodes)
    {
        this.param.setValue(this.newValue);
        pushUpdateFromParam(this, [this.param.node], this.param);
    }
}