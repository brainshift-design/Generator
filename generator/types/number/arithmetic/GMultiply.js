class GMultiply
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MULTIPLY, nodeId, options);
    }



    copy()
    {
        const copy = new GMultiply(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }

    

    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalMultiplyInputs(this.inputs, parse);


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}



async function evalMultiplyInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        value.value = 1;

        for (let i = 0; i < inputs.length; i++)
        {
            const val = (await inputs[i].eval(parse)).toValue();

            if (LIST_VALUES.includes(val.type))
            {
                if (   isEmpty(val.items)
                    || val.items[0].type != NUMBER_VALUE)
                    return NumberValue.NaN;

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