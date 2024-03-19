class GExponent
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_EXPONENT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GExponent(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalExponentInputs(this.inputs, parse);


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}



async function evalExponentInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberValue(inputs[0], parse);

        if (   !val0
            || !val0.isValid())
            return NumberValue.NaN.copy();


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
                return NumberValue.NaN.copy();


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