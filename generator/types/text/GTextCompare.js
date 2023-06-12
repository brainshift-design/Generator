class GTextCompare
extends GTextType
{
    input0 = null;
    input1 = null;

    operation;



    constructor(nodeId, options)
    {
        super(TEXT_COMPARE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCompare(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

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


        this.updateValues =
        [
            ['result',    result],
            ['operation', op    ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0   ) this.input0   .pushValueUpdates(parse);
        if (this.input1   ) this.input1   .pushValueUpdates(parse);
        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0   ) this.input0   .invalidateInputs(from);
        if (this.input1   ) this.input1   .invalidateInputs(from);
        if (this.operation) this.operation.invalidateInputs(from);
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