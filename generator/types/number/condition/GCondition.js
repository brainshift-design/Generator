class GCondition
extends GNumberType1
{
    operation;
    operand;



    constructor(nodeId, options)
    {
        super(NUMBER_CONDITION, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCondition(this.nodeId, this.options);

        copy.copyBase(this);

        copy.operation = this.operation.copy();
        copy.operand   = this.operand  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const op      = (await this.operation.eval(parse)).toValue();
        const operand = (await this.operand  .eval(parse)).toValue();

        op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

        
        switch (op.value)
        {
            case CONDITION_LESS:              this.value = await evalConditionInputs(this.input, operand, ((a, b) => a <  b), parse);  break;
            case CONDITION_LESS_OR_EQUAL:     this.value = await evalConditionInputs(this.input, operand, ((a, b) => a <= b), parse);  break;
            case CONDITION_NOT_EQUAL:         this.value = await evalConditionInputs(this.input, operand, ((a, b) => a != b), parse);  break;
            case CONDITION_EQUAL:             this.value = await evalConditionInputs(this.input, operand, ((a, b) => a == b), parse);  break;
            case CONDITION_GREATER_OR_EQUAL:  this.value = await evalConditionInputs(this.input, operand, ((a, b) => a >= b), parse);  break;
            case CONDITION_GREATER:           this.value = await evalConditionInputs(this.input, operand, ((a, b) => a >  b), parse);  break;
        }


        this.updateValues =
        [
            ['value',     this.value],
            ['operation', op        ],
            ['operand',   operand   ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
        if (this.operand  ) this.operand  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.operation) this.operation.invalidateInputs(from);
        if (this.operand  ) this.operand  .invalidateInputs(from);
    }
}



async function evalConditionInputs(input0, input1, op, parse) 
{
    const val0 = input0 ? (await input0.eval(parse)).toValue() : NumberValue.NaN;
    const val1 = input1 ? (await input1.eval(parse)).toValue() : NumberValue.NaN;

    if (   val0.isValid() 
        && val1.isValid())
        return new NumberValue(op(val0.toNumber(), val1.toNumber()) ? 1 : 0);
    else                  
        return NumberValue.NaN;
}