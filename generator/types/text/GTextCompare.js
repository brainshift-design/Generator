class GTextCompare
extends GOperator2
{
    operation;



    constructor(nodeId, options)
    {
        super(TEXT_COMPARE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCompare(this.nodeId, this.options);

        copy.copyBase(this);

        copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const op = (await this.operation.eval(parse)).toValue().toInteger();

        op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

        
        let result;

        switch (op.value)
        {
            case CONDITION_LESS:              result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a <  b), parse);  break;
            case CONDITION_LESS_OR_EQUAL:     result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a <= b), parse);  break;
            case CONDITION_NOT_EQUAL:         result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a != b), parse);  break;
            case CONDITION_EQUAL:             result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a == b), parse);  break;
            case CONDITION_GREATER_OR_EQUAL:  result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a >= b), parse);  break;
            case CONDITION_GREATER:           result = await evalCompareInputs(this.input0, this.input1, ((a, b) => a >  b), parse);  break;
        }


        this.setUpdateValues(parse,
        [
            ['result',    result],
            ['operation', op    ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.operation) this.operation.invalidateInputs(parse, from);
    }
}



async function evalCompareInputs(input0, input1, op, parse) 
{
    const val0 = input0 ? (await input0.eval(parse)).toValue() : TextValue.NaN;
    const val1 = input1 ? (await input1.eval(parse)).toValue() : TextValue.NaN;

    if (   val0 && val0.isValid() 
        && val1 && val1.isValid())
        return new NumberValue(op(val0.value, val1.value) ? 1 : 0);
    else                  
        return NullValue;//new NumberValue(0);
}