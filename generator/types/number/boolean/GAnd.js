class GAnd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_AND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAnd(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalAndInputs(this.inputs, parse);
        

        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);

        
        this.validate();

        return this;
    }
}



async function evalAndInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue();


    if (!isEmpty(inputs))
    {
        const val0 = await evalNumberOrListValue(inputs[0], parse);
        if (!val0.isValid()) return NumberValue.NaN.copy();


        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            value.value = item0.toNumber();

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (item.type == NUMBER_VALUE)
                    value.value = Math.min(value.value, item.toNumber());
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            value.value = val0.toNumber();
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = await evalNumberOrListValue(inputs[i], parse);
            if (!val.isValid()) return NumberValue.NaN.copy();


            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (item.type == NUMBER_VALUE)
                        value.value = Math.min(value.value, item.toNumber());
                }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');

                value.value = Math.min(value.value, val.toNumber());
            }
        }

        
        if (value.value != 0)
            value.value = 1;
    }


    return value;
}