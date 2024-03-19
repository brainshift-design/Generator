class GCondition
extends GOperator1
{
    operation;
    operand;



    constructor(nodeId, options)
    {
        super(NUMBER_CONDITION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
        this.operand   = null;
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


        const op      = await evalNumberValue(this.operation, parse);
        const operand = await evalNumberValue(this.operand,   parse);

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


        this.setUpdateValues(parse,
        [
            //['value',     this.value],
            ['operation', op        ],
            ['operand',   operand   ]
        ]);


        this.validate();

    return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid()
            && this.operand   && this.operand  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
        if (this.operand  ) this.operand  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
        if (this.operand  ) this.operand  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
        if (this.operand  ) this.operand  .iterateLoop(parse);
    }
}



async function evalConditionInputs(input0, input1, op, parse) 
{
    const val0 = await evalNumberValue(input0, parse);
    const val1 = await evalNumberValue(input1, parse);

    if (   val0.isValid() 
        && val1.isValid())
        return new NumberValue(op(val0.toNumber(), val1.toNumber()) ? 1 : 0);
    else                  
        return NumberValue.NaN.copy();
}