class GMinMax
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_MINMAX, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.operation = null;
    }



    copy()
    {
        const copy = new GMinMax(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs    = this.inputs.map(i => i.copy());
        copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let op = await evalNumberValue(this.operation, parse);

        if (op) op = op.toInteger();


        if (this.options.enabled)
            op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);
        

        this.value = await evalMinMaxInputs(this.inputs, op.value, parse);

        
        this.setUpdateValues(parse,
        [
            ['operation', op        ]//,
            //['value',     this.value]
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



async function evalMinMaxInputs(inputs, op, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    let value = new NumberValue(0);


    const val0 = await evalNumberValue(inputs[0], parse);


    if (   inputs.length == 1
        && val0.type == NUMBER_VALUE)
    {
        value = new NumberValue(-val0.value);//, val0.decimals);
    }
    else if (isListValueType(val0.type)
            && !isEmpty(val0.items))
    {
        value = val0.items[0].copy();
        
        for (let i = 1; i < val0.items.length; i++)
        {
            const item = val0.items[i];

            if (item.type == NUMBER_VALUE)
            {
                value = new NumberValue( 
                    op == 0
                    ? Math.min(value.value, item.value)
                    : Math.max(value.value, item.value));
            }                    
        }
    }
    else
    {
        if (val0.type != NUMBER_VALUE)
            return NumberValue.NaN.copy();

        value = val0;
    }


    for (let i = 1; i < inputs.length; i++)
    {
        const val = await evalNumberValue(inputs[i], parse);


        if (isListValueType(val.type))
        {
            for (const item of val.items)
            {
                if (item.type == NUMBER_VALUE)
                {
                    value = new NumberValue(
                        op == 0
                        ? Math.min(value.value, item.value)
                        : Math.max(value.value, item.value));

                    // value.decimals = Math.max(value.decimals, item.decimals);
                }                    
            }
        }
        else
        {
            consoleAssert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value = new NumberValue(
                op == 0
                ? Math.min(value.value, val.value)
                : Math.max(value.value, val.value));

            //value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}