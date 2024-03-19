class GTextCompare
extends GOperator2
{
    operation;



    constructor(nodeId, options)
    {
        super(TEXT_COMPARE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
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


        this.value = NumberValue.NaN.copy();
        
        
        const op = await evalNumberValue(this.operation, parse);

        
        if (op)
        {
            op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

            switch (op.value)
            {
                case CONDITION_LESS:              this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a <  b), parse);  break;
                case CONDITION_LESS_OR_EQUAL:     this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a <= b), parse);  break;
                case CONDITION_NOT_EQUAL:         this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a != b), parse);  break;
                case CONDITION_EQUAL:             this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a == b), parse);  break;
                case CONDITION_GREATER_OR_EQUAL:  this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a >= b), parse);  break;
                case CONDITION_GREATER:           this.value = await evalCompareInputs(this.input0, this.input1, ((a, b) => a >  b), parse);  break;
            }
        }


        this.setUpdateValues(parse,
        [
            ['value',     this.value],
            ['operation', op        ]
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
    }
}



async function evalCompareInputs(input0, input1, op, parse) 
{
    const val0 = await evalTextValue(input0, parse);
    const val1 = await evalTextValue(input1, parse);

    if (   val0 && val0.isValid() 
        && val1 && val1.isValid())
        return new NumberValue(op(val0.value, val1.value) ? 1 : 0);
    else                  
        return new NullValue();
}