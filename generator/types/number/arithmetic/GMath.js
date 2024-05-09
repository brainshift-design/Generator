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


        let op = await evalNumberValue(this.operation, parse);

        if (op) op = op.toInteger();
        

        if (op.isValid())
        {
            op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
            op.decimals = 0;
        }


        if (this.options.enabled)
        {
            switch (op.value)
            {
                case 0: this.value = await evalModuloInputs  (this, this.inputs, parse); break;
                case 1: this.value = await evalDivideInputs  (this, this.inputs, parse); break;
                case 2: this.value = await evalSubtractInputs(this, this.inputs, parse); break;
                case 3: this.value = await evalAddInputs     (this, this.inputs, parse); break;
                case 4: this.value = await evalMultiplyInputs(this, this.inputs, parse); break;
                case 5: this.value = await evalExponentInputs(this, this.inputs, parse); break;
            }
        }

        else if (this.inputs.length > 0)
            this.value = 
                   this.inputs.length > 0 
                && this.inputs[0] 
                ? (await this.inputs[0].eval(parse)).toValue() 
                : null;

        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            //['value',     this.value],
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



async function evalAddInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = await evalValue(inputs[i], parse);
        
        if (node.nodeId == 'math')
            console.log('val =', val);
        

        if (   !val
            || !val.isValid())
        {
            for (let j = i+1; j < inputs.length; j++)
                await evalValue(inputs[j], parse);
            
            return NumberValue.NaN.copy();
        }


        if (isListValueType(val.type))
        {
            if (   isEmpty(val.items)
                || val.items[0].type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            for (const item of val.items)
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
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');

            value.value   += val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}



async function evalSubtractInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    let value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const val0 = await evalValue(inputs[0], parse);

        if (   !val0
            || !val0.isValid())
        {
            for (let j = 1; j < inputs.length; j++)
                await evalValue(inputs[j], parse);
            
            return NumberValue.NaN.copy();
        }


        // if (   inputs.length == 1
        //     && val0.type == NUMBER_VALUE)
        // {
        //     value = new NumberValue(-val0.value, val0.decimals);
        // }
        //else 
        if (     isListValueType(val0.type)
             && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value.value    = item0.value;
            value.decimals = item0.decimals;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];

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
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            value.value    = val0.value;
            value.decimals = val0.decimals;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberValue(inputs[i], parse);

            if (   !val
                || !val.isValid())
            {
                for (let j = i+1; j < inputs.length; j++)
                    await evalValue(inputs[j], parse);
                
                return NumberValue.NaN.copy();
            }


            if (isListValueType(val.type))
            {
                for (const item of val.items)
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
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
                    
                value.value   -= val.value;
                value.decimals = Math.max(value.decimals, val.decimals);
            }
        }
    }


    return value;
}



async function evalMultiplyInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        value.value = 1;

        for (let i = 0; i < inputs.length; i++)
        {
            const val = await evalValue(inputs[i], parse);

            if (   !val
                || !val.isValid())
            {
                for (let j = i+1; j < inputs.length; j++)
                    await evalValue(inputs[j], parse);
                
                return NumberValue.NaN.copy();
            }


            if (isListValueType(val.type))
            {
                if (   isEmpty(val.items)
                    || val.items[0].type != NUMBER_VALUE)
                    return NumberValue.NaN.copy();

                for (const item of val.items)
                {
                    value.value   *= item.value;
                    value.decimals = Math.max(value.decimals, item.decimals);
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                value.value   *= val.value;
                value.decimals = Math.max(value.decimals, val.decimals);
            }
        }
    }


    return value;
}



async function evalDivideInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();

        
    let value = new NumberValue(0);

        
    if (!isEmpty(inputs))
    {
        const val0 = await evalValue(inputs[0], parse);

        if (   !val0
            || !val0.isValid())
        {
            for (let j = 1; j < inputs.length; j++)
                await evalValue(inputs[j], parse);
            
            return NumberValue.NaN.copy();
        }


        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value.value    = item0.value;
            value.decimals = item0.decimals;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];

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
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            value.value    = val0.value;
            value.decimals = val0.decimals;
        }

        
        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberValue(inputs[i], parse);

            if (   !val
                || !val.isValid())
            {
                for (let j = i+1; j < inputs.length; j++)
                    await evalValue(inputs[j], parse);
                
                return NumberValue.NaN.copy();
            }


            if (isListValueType(val.type))
            {
                for (const item of val.items)
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

                        //value = new NumberValue(value.toNumber() / item.toNumber());
                        value.value    = value.value / item.value;
                        value.decimals = Math.max(value.decimals, item.decimals);
                    }                    
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                if (val.value == 0) 
                { 
                    value.value    = Number.NaN; 
                    value.decimals = 0;
                    break; 
                }
    
                //value = new NumberValue(value.toNumber() / val.toNumber());
                
                value.value    = value.value / val.value;
                value.decimals = Math.max(value.decimals, val.decimals);
            }
        }
    }


    return value;
}



async function evalModuloInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();

        
    const value = new NumberValue(0);

        
    if (!isEmpty(inputs))
    {
        const val0 = await evalValue(inputs[0], parse);

        if (   !val0
            || !val0.isValid())
        {
            for (let j = 1; j < inputs.length; j++)
                await evalValue(inputs[j], parse);
            
            return NumberValue.NaN.copy();
        }


        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value.value    = item0.value;
            value.decimals = item0.decimals;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
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
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            value.value    = val0.value;
            value.decimals = val0.decimals;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberValue(inputs[i], parse);

            if (   !val
                || !val.isValid())
            {
                for (let j = i+1; j < inputs.length; j++)
                    await evalValue(inputs[j], parse);
                
                return NumberValue.NaN.copy();
            }


            if (isListValueType(val.type))
            {
                for (const item of val.items)
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
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                if (val.value == 0) 
                { 
                    value.value    = Number.NaN; 
                    value.decimals = 0;
                    break; 
                }

                value.decimals = Math.max(value.decimals, val.decimals);
                value.value    = floorTo(value.value % val.value, value.decimals);
            }
        }
    }


    return value;
}



async function evalExponentInputs(node, inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const val0 = await evalValue(inputs[0], parse);

        if (   !val0
            || !val0.isValid())
        {
            for (let j = 1; j < inputs.length; j++)
                await evalValue(inputs[j], parse);
            
            return NumberValue.NaN.copy();
        }


        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            if (   !item0
                || !item0.isValid())
                return NumberValue.NaN.copy();


            value.value    = item0.value;
            value.decimals = item0.decimals;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
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
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            value.value    = val0.value;
            value.decimals = val0.decimals;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberValue(inputs[i], parse);

            if (   !val
                || !val.isValid())
            {
                for (let j = i+1; j < inputs.length; j++)
                    await evalValue(inputs[j], parse);
                
                return NumberValue.NaN.copy();
            }


            if (isListValueType(val.type))
            {
                for (const item of val.items)
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
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                value.value    = Math.pow(value.value,    val.value);
                value.decimals = Math.max(value.decimals, val.decimals);
            }
        }
    }


    return value;
}