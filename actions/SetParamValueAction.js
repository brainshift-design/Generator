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


    oldValue; // decimal
    newValue; // decimal



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
            + '.'   + this.param.id;
            // + ' = ' + this.newValue.toDisplayString() 
            // + ' (old value = ' + (this.oldValue ? this.oldValue.toDisplayString() : '') + ')';

        //console.log('SetParamValueAction.name =', this.name);

        if (this.setValue)
            this.param.setValue(this.newValue, false, true);

        pushUpdateFromParam(this, [this.param.node], this.param);


        // if (!this.selfUpdate)
        //     pushUnique(updateNodes, this.param.node);
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

        // if (!this.selfUpdate)
        //     pushUnique(updateNodes, this.param.node);
    }



    redo(updateNodes)
    {
        this.param.setValue(this.newValue);
        pushUpdateFromParam(this, [this.param.node], this.param);

        // if (!this.selfUpdate)
        //     pushUnique(updateNodes, this.param.node);
    }
}