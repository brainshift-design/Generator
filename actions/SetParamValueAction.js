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
            SET_VALUE_ACTION,
            'SET VALUE ' + param.node.id + '.' + param.id + ' = ' + value.toDisplayString());

        this.nodeId     = param.node.id;
        this.paramId    = param.id;
  
        this.newValue   = value;

        this.selfUpdate = true;
    }



    do(updateNodes)
    {
        this.oldValue = this.param.oldValue;
        pushUpdateFromParam(this, [this.param.node], this.param);
    }



    undo(updateNodes)
    {
        this.param.setValue(this.oldValue, false, true);
        pushUpdateFromParam(this, [this.param.node], this.param);
    }



    redo(updateNodes)
    {
        this.param.setValue(this.newValue);
        pushUpdateFromParam(this, [this.param.node], this.param);
    }
}