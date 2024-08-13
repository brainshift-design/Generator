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

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const inputs = await Promise.all(this.inputs.map(async i => await evalNumberOrListValue(i, parse)));
        let   op     = await evalNumberValue(this.operation, parse);


        if (op) op = op.toInteger();


        if (this.options.enabled)
            op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);
        

        this.value = await evalMinMaxInputs(inputs, op, parse);

        
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



async function evalMinMaxInputs(inputs, op, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const allAreLists = allInputsAreCondensedLists(inputs);

    if (allAreLists) return await evalMinMaxListInputs(inputs, op, parse);
    else             return await evalMinMaxItemInputs(inputs, op, parse);
}



async function evalMinMaxListInputs(inputs, op, parse)
{
    const value = new ListValue();

    
    for (const input of inputs)
    {
        if (!input) continue;

        console.assert(
             isListValueType(input.type), 
            `input is ${input.type}, must be a list`);

        if (allInputsAreCondensedLists(input.items))
            value.items.push(...(await evalMinMaxListInputs(input.items, op, parse)).items);
        else
            value.items.push(await evalMinMaxItemInputs(input.items, op, parse));
    }


    return value;
}



async function evalMinMaxItemInputs(inputs, op, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    let value = new NumberValue(0);


    const input0 = await evalNumberOrListValue(inputs[0], parse);


    if (    isListValueType(input0.type)
        && !isEmpty(input0.items))
    {
        value = input0.items[0].copy();
        
        for (let i = 1; i < input0.items.length; i++)
        {
            const item = input0.items[i];

            if (item.type == NUMBER_VALUE)
            {
                value = new NumberValue( 
                    op.value == 0
                    ? Math.min(value.value, item.value)
                    : Math.max(value.value, item.value));
            }                    
        }
    }
    else
    {
        if (input0.type != NUMBER_VALUE)
            return NumberValue.NaN.copy();

        value = input0;
    }


    for (let i = 1; i < inputs.length; i++)
    {
        const input = await evalNumberOrListValue(inputs[i], parse);


        if (isListValueType(input.type))
        {
            for (const item of input.items)
            {
                if (item.type == NUMBER_VALUE)
                {
                    value = new NumberValue(
                        op.value == 0
                        ? Math.min(value.value, item.value)
                        : Math.max(value.value, item.value));
                }                    
            }
        }
        else
        {
            consoleAssert(
                input.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value = new NumberValue(
                op.value == 0
                ? Math.min(value.value, input.value)
                : Math.max(value.value, input.value));
        }
    }


    return value;
}