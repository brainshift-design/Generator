class GAdd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_ADD, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAdd(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = await evalAddInputs(this.inputs, parse);
        
        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);

        this.validate();

        return this;
    }
}



async function evalAddInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = (await inputs[i].eval(parse)).toValue();
        
        if (   !val
            || !val.isValid())
            return NumberValue.NaN;

        if (isListType(val.type))
        {
            if (   isEmpty(val.items)
                || val.items[0].type != NUMBER_VALUE)
                return NumberValue.NaN;

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