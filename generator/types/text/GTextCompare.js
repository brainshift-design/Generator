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

        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = NumberValue.NaN.copy();
        
        
        const input0 = await evalTextOrListValue(this.input0,    parse);
        const input1 = await evalTextValue      (this.input1,    parse);

        const op     = await evalNumberValue    (this.operation, parse);

        
        if (op)
        {
            op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

            if (isListValueType(input0.type))
                {
                    this.value = new ListValue();
    
                    for (let i = 0; i < input0.items.length; i++)
                    {
                        const item = input0.items[i];
    
                        this.value.items.push(
                            item.type == TEXT_VALUE
                            ? await evalCompareTextInputs(item, input1, op, parse)
                            : NumberValue.NaN.copy());
                    }
                }
                else
                {
                    this.value = await evalCompareTextInputs(input0, input1, op, parse);
                }
        }


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['operation', op               ]
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



async function evalCompareTextInputs(input0, input1, op, parse) 
{
    let opFunc = null;

    switch (op.value)
    {
        case CONDITION_LESS:              opFunc = (a, b) => a <  b;  break;
        case CONDITION_LESS_OR_EQUAL:     opFunc = (a, b) => a <= b;  break;
        case CONDITION_NOT_EQUAL:         opFunc = (a, b) => a != b;  break;
        case CONDITION_EQUAL:             opFunc = (a, b) => a == b;  break;
        case CONDITION_GREATER_OR_EQUAL:  opFunc = (a, b) => a >= b;  break;
        case CONDITION_GREATER:           opFunc = (a, b) => a >  b;  break;
    }


    if (   input0 && input0.isValid() 
        && input1 && input1.isValid())
        return new NumberValue(opFunc(input0.value, input1.value) ? 1 : 0, 0, true);
    else                  
        return new NullValue();
}