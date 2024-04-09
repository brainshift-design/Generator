class GTrig
extends GOperator1
{
    function;



    constructor(nodeId, options)
    {
        super(NUMBER_TRIG, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.function = null;
    }



    copy()
    {
        const copy = new GTrig(this.nodeId, this.options);

        copy.copyBase(this);

        copy.function = this.function.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input,    parse);
        const func  = await evalNumberValue(this.function, parse);

        func.value = Math.min(Math.max(0, func.value), TRIG_OPS.length-1);

        
        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? await getTrigValue(item, func, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = await getTrigValue(input, func, this.options.enabled);
}
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['function', func             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.function && this.function.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.function) this.function.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.function) this.function.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.function) this.function.iterateLoop(parse);
    }
}



async function getTrigValue(input, func, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
       'input.type must be NUMBER_VALUE');


    if (!enabled)
        return input;


    switch (func.value)
    {
        case TRIG_SIN:  return await evalSine   (input, false);
        case TRIG_COS:  return await evalCosine (input, false);
        case TRIG_TAN:  return await evalTangent(input, false);
        case TRIG_ASIN: return await evalSine   (input, true );
        case TRIG_ACOS: return await evalCosine (input, true );
        case TRIG_ATAN: return await evalTangent(input, true );
    }
}