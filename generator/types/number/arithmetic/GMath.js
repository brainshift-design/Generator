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

        if (op) op = op.toInteger();
        

        if (op.isValid())
        {
            op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
            op.decimals = 0;
        }


        this.value = await evalMathInputs(inputs, op, parse);


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



async function evalMathInputs(inputs, op, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const allAreLists = allInputsAreCondensedLists(inputs);

    if (allAreLists) return await evalMathListInputs(inputs, op, parse);
    else             return await evalMathItemInputs(inputs, op, parse);
}



async function evalMathListInputs(inputs, op, parse)
{
    const value = new ListValue();

    
    for (const input of inputs)
    {
        if (!input) continue;

        console.assert(
             isListValueType(input.type), 
            `input is ${input.type}, must be a list`);

        if (allInputsAreCondensedLists(input.items))
            value.items.push(...(await evalMathListInputs(input.items, op, parse)).items);
        else
            value.items.push(await evalMathItemInputs(input.items, op, parse));
    }


    return value;
}



async function evalMathItemInputs(inputs, op, parse)
{
    switch (op.value)
    {
        case 0: return await evalModuloInputs  (inputs, parse);
        case 1: return await evalDivideInputs  (inputs, parse);
        case 2: return await evalSubtractInputs(inputs, parse);
        case 3: return await evalAddInputs     (inputs, parse);
        case 4: return await evalMultiplyInputs(inputs, parse);
        case 5: return await evalExponentInputs(inputs, parse);
    }
}



async function evalAddInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const input = await evalNumberOrListValue(inputs[i], parse);
        

        if (   !input
            || !input.isValid())
            return NumberValue.NaN.copy();


        if (isListValueType(input.type))
        {
            if (   isEmpty(input.items)
                || input.items[0].type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            for (const item of input.items)
            {
                if (item.type == NUMBER_VALUE)
                {
                    value.value   += item.value;
                    value.decimals = Math.max(value.decimals, item.decimals);
                }
            }
        }
        else
        {
            consoleAssert(
                 input.type == NUMBER_VALUE, 
                'input.type must be NUMBER_VALUE');

            value.value   += input.value;
            value.decimals = Math.max(value.decimals, input.decimals);
        }
    }


    return value;
}



async function evalSubtractInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    let value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const input0 = await evalNumberOrListValue(inputs[0], parse);

        if (   !input0
            || !input0.isValid())
            return NumberValue.NaN.copy();


        if (     isListValueType(input0.type)
             && !isEmpty(input0.items))
        {
            const item0 = input0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value = item0;


            for (let i = 1; i < input0.items.length; i++)
            {
                const item = input0.items[i];

                if (   !item
                    || !item.isValid())
                    return NumberValue.NaN.copy();

                if (item.type == NUMBER_VALUE)
                {
                    value.value   -= item.value;
                    value.decimals = Math.max(value.decimals, item.decimals);
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

            if (   !input
                || !input.isValid())
                return NumberValue.NaN.copy();


            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    if (item.type == NUMBER_VALUE)
                    {
                        value.value   -= item.value;
                        value.decimals = Math.max(value.decimals, item.decimals);
                    }                    
                }
            }
            else
            {
                consoleAssert(
                     input.type == NUMBER_VALUE, 
                    'input.type must be NUMBER_VALUE');
                    
                value.value   -= input.value;
                value.decimals = Math.max(value.decimals, input.decimals);
            }
        }
    }


    return value;
}



async function evalMultiplyInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        value.value = 1;

        for (let i = 0; i < inputs.length; i++)
        {
            const input = await evalNumberOrListValue(inputs[i], parse);

            if (   !input
                || !input.isValid())
                return NumberValue.NaN.copy();


            if (isListValueType(input.type))
            {
                if (   isEmpty(input.items)
                    || input.items[0].type != NUMBER_VALUE)
                    return NumberValue.NaN.copy();

                for (const item of input.items)
                {
                    value.value   *= item.value;
                    value.decimals = Math.max(value.decimals, item.decimals);
                }
            }
            else
            {
                consoleAssert(
                     input.type == NUMBER_VALUE, 
                    'input.type must be NUMBER_VALUE');

                value.value   *= input.value;
                value.decimals = Math.max(value.decimals, input.decimals);
            }
        }
    }


    return value;
}



async function evalDivideInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();

        
    let value = new NumberValue(0);

        
    if (!isEmpty(inputs))
    {
        const input0 = await evalNumberOrListValue(inputs[0], parse);

        if (   !input0
            || !input0.isValid())
            return NumberValue.NaN.copy();


        if (    isListValueType(input0.type)
            && !isEmpty(input0.items))
        {
            const item0 = input0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value = item0;


            for (let i = 1; i < input0.items.length; i++)
            {
                const item = input0.items[i];

                if (   !item
                    || !item.isValid())
                    return NumberValue.NaN.copy();

                    
                if (item.type == NUMBER_VALUE)
                {
                    if (item.value == 0) 
                    { 
                        value.value    = Number.NaN; 
                        value.decimals = 0;
                        break; 
                    }

                    value.value    = value.value / item.value;
                    value.decimals = Math.max(value.decimals, item.decimals);
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

            if (   !input
                || !input.isValid())
                return NumberValue.NaN.copy();


            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    if (   !item
                        || !item.isValid())
                        return NumberValue.NaN.copy();


                    if (item.type == NUMBER_VALUE)
                    {
                        if (item.value == 0) 
                        { 
                            value.value    = Number.NaN; 
                            value.decimals = 0;
                            break; 
                        }

                        value.value    = value.value / item.value;
                        value.decimals = Math.max(value.decimals, item.decimals);
                    }                    
                }
            }
            else
            {
                consoleAssert(
                     input.type == NUMBER_VALUE, 
                    'input.type must be NUMBER_VALUE');

                if (input.value == 0) 
                { 
                    value.value    = Number.NaN; 
                    value.decimals = 0;
                    break; 
                }
    
                
                value.value    = value.value / input.value;
                value.decimals = Math.max(value.decimals, input.decimals);
            }
        }
    }


    return value;
}



async function evalModuloInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();

        
    let value = new NumberValue(0);

        
    if (!isEmpty(inputs))
    {
        const input0 = await evalNumberOrListValue(inputs[0], parse);

        if (   !input0
            || !input0.isValid())
            return NumberValue.NaN.copy();


        if (    isListValueType(input0.type)
            && !isEmpty(input0.items))
        {
            const item0 = input0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value = item0;

            
            for (let i = 1; i < input0.items.length; i++)
            {
                const item = input0.items[i];
                
                if (   !item
                    || !item.isValid())
                    return NumberValue.NaN.copy();


                if (item.type == NUMBER_VALUE)
                {
                    if (item.value == 0) 
                    { 
                        value.value    = Number.NaN; 
                        value.decimals = 0;
                        break; 
                    }

                    value.decimals = Math.max(value.decimals, item.decimals);
                    value.value    = value.value % item.value;
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

            if (   !input
                || !input.isValid())
                return NumberValue.NaN.copy();


            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    if (   !item
                        || !item.isValid())
                        return NumberValue.NaN.copy();


                    if (item.type == NUMBER_VALUE)
                    {
                        if (item.value == 0) 
                        { 
                            value.value    = Number.NaN; 
                            value.decimals = 0;
                            break; 
                        }

                        value.decimals = Math.max(value.decimals, item.decimals);
                        value.value    = floorTo(value.value % item.value, value.decimals);
                    }                    
                }
            }
            else
            {
                consoleAssert(
                     input.type == NUMBER_VALUE, 
                    'input.type must be NUMBER_VALUE');

                if (input.value == 0) 
                { 
                    value.value    = Number.NaN; 
                    value.decimals = 0;
                    break; 
                }

                value.decimals = Math.max(value.decimals, input.decimals);
                value.value    = floorTo(value.value % input.value, value.decimals);
            }
        }
    }


    return value;
}



async function evalExponentInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    let value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const input0 = await evalNumberOrListValue(inputs[0], parse);

        if (   !input0
            || !input0.isValid())
            return NumberValue.NaN.copy();


        if (    isListValueType(input0.type)
            && !isEmpty(input0.items))
        {
            const item0 = input0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value = item0;

            
            for (let i = 1; i < input0.items.length; i++)
            {
                const item = input0.items[i];
                
                if (   !item
                    || !item.isValid())
                    return NumberValue.NaN.copy();


                if (item.type == NUMBER_VALUE)
                {
                    value.value    = Math.pow(value.value,    item.value);
                    value.decimals = Math.max(value.decimals, item.decimals);
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

            if (   !input
                || !input.isValid())
                return NumberValue.NaN.copy();


            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    if (   !item
                        || !item.isValid())
                        return NumberValue.NaN.copy();

                    if (item.type == NUMBER_VALUE)
                    {
                        value.value    = Math.pow(value.value,    item.value);
                        value.decimals = Math.max(value.decimals, item.decimals);
                    }                    
                }
            }
            else
            {
                consoleAssert(
                    input.type == NUMBER_VALUE, 
                    'input.type must be NUMBER_VALUE');

                value.value    = Math.pow(value.value,    input.value);
                value.decimals = Math.max(value.decimals, input.decimals);
            }
        }
    }


    return value;
}