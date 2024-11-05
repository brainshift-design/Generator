class GMath
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_MATH, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.operation = null;
    }



   
    copy()
    {
        const copy = new GMath(this.nodeId, this.options);

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


        if (   op
            && op.isValid())
        {
            op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
            op.decimals = 0;
        }


        this.value = await evalMathInputs(this, inputs, op, parse);

    
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



async function evalMathInputs(node, inputs, op, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    const allAreLists = allInputsAreCondensedLists(inputs);

    if (allAreLists) return await evalMathListInputs(node, inputs, op, parse);
    else             return await evalMathItemInputs(node, inputs, op, parse);
}



async function evalMathListInputs(node, inputs, op, parse)
{
    const value = new ListValue();

    
    for (const input of inputs)
    {
        if (!input) continue;

        console.assert(
             isListValueType(input.type), 
            `input is ${input.type}, must be a list`);

        if (allInputsAreCondensedLists(input.items))
            value.items.push(...(await evalMathListInputs(node, input.items, op, parse)).items);
        else
            value.items.push(await evalMathItemInputs(node, input.items, op, parse));
    }


    return value;
}



async function evalMathItemInputs(node, inputs, op, parse)
{
    switch (op.value)
    {
        case 0: return await evalModuloInputs  (node, inputs, parse);
        case 1: return await evalDivideInputs  (node, inputs, parse);
        case 2: return await evalSubtractInputs(node, inputs, parse);
        case 3: return await evalAddInputs     (node, inputs, parse);
        case 4: return await evalMultiplyInputs(node, inputs, parse);
        case 5: return await evalExponentInputs(node, inputs, parse);
    }
}



async function evalAddInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    let value = new NumberValue(0);
    
    
    const options = { maxDec: 0 };


    for (let i = 0; i < inputs.length; i++)
    {
        const input = inputs[i];
        
        if (   !input
            || !input.isValid())
            return NumberValue.NaN();


        if (isListValueType(input.type))
        {
            if (   isEmpty(input.items)
                || input.items[0].type != NUMBER_VALUE)
                return NumberValue.NaN();

            for (const item of input.items)
                evalAddStep(value, item, options);
        }
        else
            evalAddStep(value, input, options);


        value          = new NumberValue(value.value);
        value.decimals = Math.max(value.decimals, options.maxDec);
    }


    return value;
}



function evalAddStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value = NumberValue.NaN();
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        value.value   += input.toNumber();
        options.maxDec = Math.max(options.maxDec, input.decimals);
    }                    
}



async function evalSubtractInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    let value;


    const options = { maxDec: 0 };


    const input0 = inputs[0];

    if (   !input0
        || !input0.isValid())
        return NumberValue.NaN();


    if (    isListValueType(input0.type)
        && !isEmpty(input0.items))
    {
        const item0 = input0.items[0];

        if (   !item0
            || !item0.isValid())
            return NumberValue.NaN();


        value  = new NumberValue(item0.toNumber());
        maxDec = item0.decimals;


        for (let j = 1; j < input0.items.length; j++)
            evalSubtractStep(value, input0.items[j], options);
    }
    else
    {
        if (input0.type != NUMBER_VALUE)
            return NumberValue.NaN();

        value          = new NumberValue(input0.toNumber());
        options.maxDec = input0.decimals;
    }


    for (let i = 1; i < inputs.length; i++)
    {
        const input = inputs[i];

        if (   !input
            || !input.isValid())
            return NumberValue.NaN();


        if (isListValueType(input.type))
        {
            for (const item of input.items)
                evalSubtractStep(value, item, options);
        }
        else
            evalSubtractStep(value, input, options);
    }
    
    
    value          = new NumberValue(value.value);
    value.decimals = Math.max(value.decimals, options.maxDec);


    return value;
}



function evalSubtractStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value = NumberValue.NaN();
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        value.value   -= input.toNumber();
        options.maxDec = Math.max(options.maxDec, input.decimals);
    }                    
}



async function evalMultiplyInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    let value = new NumberValue(1);


    const options = { maxDec: 0 };


    for (let i = 0; i < inputs.length; i++)
    {
        const input = inputs[i];

        if (   !input
            || !input.isValid())
            return NumberValue.NaN();


        if (isListValueType(input.type))
        {
            if (   isEmpty(input.items)
                || input.items[0].type != NUMBER_VALUE)
                return NumberValue.NaN();

            for (const item of input.items)
                evalMultiplyStep(value, item, options);
        }
        else
            evalMultiplyStep(value, input, options);
    }


    value          = new NumberValue(value.value);
    value.decimals = Math.max(value.decimals, options.maxDec);


    return value;
}



function evalMultiplyStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value = NumberValue.NaN();
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        value.value   *= input.toNumber();
        options.maxDec = Math.max(options.maxDec, input.decimals);
    }                    
}



async function evalDivideInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();

        
    let   value;

    
    const input0 = inputs[0];

    if (   !input0
        || !input0.isValid())
        return NumberValue.NaN();


    const options = { maxDec: 0 };


    if (isListValueType(input0.type))
    {
        if (!isEmpty(input0.items)) 
        {
            const item0 = input0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN();


            value          = new NumberValue(item0.toNumber());
            options.maxDec = item0.decimals;


            for (let j = 1; j < input0.items.length; j++)
                evalDivideStep(value, input0.items[j], options);
        }
    }
    else
    {
        if (input0.type != NUMBER_VALUE)
            return NumberValue.NaN();

        value          = new NumberValue(input0.toNumber());
        options.maxDec = input0.decimals;
    }

    
    for (let i = 1; i < inputs.length; i++)
    {
        const input = inputs[i];

        if (isListValueType(input.type))
        {
            for (const item of input.items)
                evalDivideStep(value, item, options);
        }
        else
            evalDivideStep(value, input, options);
    }


    value          = new NumberValue(value.value);
    value.decimals = Math.max(value.decimals, options.maxDec);


    return value;
}



function evalDivideStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value = NumberValue.NaN();
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        if (input.value == 0) // handle division by zero
        { 
            value = NumberValue.NaN();
            return;
        }

        value.value   /= input.toNumber();
        options.maxDec = Math.max(options.maxDec, input.decimals);
    }                    
}



async function evalModuloInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();

        
    let value;

        
    const input0 = inputs[0];

    if (   !input0
        || !input0.isValid())
        return NumberValue.NaN();


    const options = { maxDec: 0 };


    if (    isListValueType(input0.type)
        && !isEmpty(input0.items))
    {
        const item0 = input0.items[0];

        if (   !item0
            || !item0.isValid())
            return NumberValue.NaN();


        value          = new NumberValue(item0.toNumber());
        options.maxDec = item0.decimals;

        
        for (let i = 1; i < input0.items.length; i++)
            evalModuloStep(value, input0.items[i], options);
    }
    else
    {
        if (input0.type != NUMBER_VALUE)
            return NumberValue.NaN();

        value          = new NumberValue(input0.toNumber());
        options.maxDec = input0.decimals;
    }


    for (let i = 1; i < inputs.length; i++)
    {
        const input = inputs[i];

        if (   !input
            || !input.isValid())
            return NumberValue.NaN();


        if (isListValueType(input.type))
        {
            for (const item of input.items)
                evalModuloStep(value, item, options);
        }
        else
            evalModuloStep(value, input, options);
    }


    value          = new NumberValue(value.value);
    value.decimals = Math.max(value.decimals, options.maxDec);


    return value;
}



function evalModuloStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value.value    = Number.NaN; 
        value.decimals = 0;
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        if (input.value == 0) // handle division by zero
        { 
            value = NumberValue.NaN();
            return;
        }

        options.maxDec = Math.max(options.maxDec, input.decimals);
        value.value    = floorTo(value.toNumber() % input.toNumber(), options.maxDec);
    }                    
}



async function evalExponentInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN();


    let value;


    const input0 = inputs[0];

    if (   !input0
        || !input0.isValid())
        return NumberValue.NaN();


    const options = { maxDec: 0 };


    if (    isListValueType(input0.type)
        && !isEmpty(input0.items))
    {
        const item0 = input0.items[0];

        if (   !item0
            || !item0.isValid())
            return NumberValue.NaN();


        value          = new NumberValue(item0.toNumber());
        options.maxDec = item0.decimals;

        
        for (let i = 1; i < input0.items.length; i++)
            evalExponentStep(value, input0.items[i], options);
    }
    else
    {
        if (input0.type != NUMBER_VALUE)
            return NumberValue.NaN();

        value          = new NumberValue(input0.toNumber());
        options.maxDec = input0.decimals;
    }


    for (let i = 1; i < inputs.length; i++)
    {
        const input = inputs[i];

        if (   !input
            || !input.isValid())
            return NumberValue.NaN();


        if (isListValueType(input.type))
        {
            for (const item of input.items)
                evalExponentStep(value, item, options);
        }
        else
            evalExponentStep(value, input, options);
    }


    value          = new NumberValue(value.value);
    value.decimals = Math.max(value.decimals, options.maxDec);


    return value;
}



function evalExponentStep(value, input, options)
{
    if (   !input
        || !input.isValid())
    { 
        value = NumberValue.NaN();
        return;
    }

        
    if (input.type == NUMBER_VALUE)
    {
        value.value    = Math.pow(value.toNumber(), input.toNumber());
        options.maxDec = Math.max(options.maxDec, input.decimals);
    }                    
}