class GCondition
extends GNumberType
{
    input0 = null;
    input1 = null;

    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_CONDITION, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCondition(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

        copy.operation = this.operation.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const op = this.operation.eval(parse).toValue().toInteger();

        op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

        
        switch (op.value)
        {
            case CONDITION_EQUAL:             this.value = evalEqualInputs         (this.input0, this.input1, parse);  break;
            case CONDITION_NOT_EQUAL:         this.value = evalNotEqualInputs      (this.input0, this.input1, parse);  break;
            case CONDITION_LESS:              this.value = evalLessInputs          (this.input0, this.input1, parse);  break;
            case CONDITION_LESS_OR_EQUAL:     this.value = evalLessOrEqualInputs   (this.input0, this.input1, parse);  break;
            case CONDITION_GREATER:           this.value = evalGreaterInputs       (this.input0, this.input1, parse);  break;
            case CONDITION_GREATER_OR_EQUAL:  this.value = evalGreaterOrEqualInputs(this.input0, this.input1, parse);  break;
        }


        genPushUpdateValue(parse, this.nodeId, 'operation', op);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);


        this.validate();

        return this;
    }
}