class SetParamValueAction
extends Action
{
    nodeId;
    paramId;

    setValue;



    get param() 
    { 
        return nodeFromId(this.nodeId).params
              .find(p => p.id == this.paramId); 
    } 


    oldValue; 
    newValue; 



    constructor(param, value, setValue = false)
    {
        super(
            SET_PARAM_VALUE_ACTION,
            'SET PARAM VALUE ' + param.node.id + '.' + param.id);// + ' = ' + value.toDisplayString());

        this.nodeId     = param.node.id;
        this.paramId    = param.id;
  
        this.newValue   = value;

        this.selfUpdate = true;
        this.setValue   = setValue;
    }



    do(updateNodes)
    {
        this.oldValue = this.param.oldValue;

        this.name = 
              'SET PARAM VALUE ' 
                  + this.param.node.id 
            + '.' + this.param.id;

        if (this.setValue)
            this.param.setValue(this.newValue, false, true);
        
        if (this.param.pushUpdate) this.param.pushUpdate();
        else                       pushUpdateFromParam(this, [this.param.node], this.param);
    }



    undo(updateNodes)
    {
        this.param.setValue(this.oldValue, false, true);

        if (param.pushUpdate) param.pushUpdate();
        else                  pushUpdateFromParam(this, [this.param.node], this.param);
    }



    redo(updateNodes)
    {
        this.param.setValue(this.newValue);

        if (this.param.pushUpdate) this.param.pushUpdate();
        else                       pushUpdateFromParam(this, [this.param.node], this.param);
    }
}