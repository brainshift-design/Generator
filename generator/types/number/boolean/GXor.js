class GXor
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_XOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GXor(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalXorInputs(this.inputs, parse);
        

        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);


        this.validate();

        return this;
    }
}



async function evalXorInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN.copy();


    const value = new NumberValue(0);


    let flipped;

    if (!isEmpty(inputs))
    {
        const val0 = (await inputs[0].eval(parse)).toValue();
        if (!val0.isValid()) return NumberValue.NaN.copy();

        if (    isListValueType(val0.type)
            && !isEmpty(val0.items))
        {
            const item0 = val0.items[0];

            flipped = item0.toNumber() != 0;

            for (let i = 1; i < val0.items.length; i++)
            {
                const item = val0.items[i];
                
                if (   item.type == NUMBER_VALUE
                    && item.toNumber() != 0)
                    flipped++;
            }
        }
        else
        {
            if (val0.type != NUMBER_VALUE)
                return NumberValue.NaN.copy();

            flipped = val0.toNumber() != 0;
        }


        for (let i = 1; i < inputs.length; i++)
        {
            const val = (await inputs[i].eval(parse)).toValue();
            if (!val.isValid()) return NumberValue.NaN.copy();

            if (isListValueType(val.type))
            {
                for (const item of val.items)
                {
                    if (   item.type == NUMBER_VALUE
                        && item.toNumber() != 0)
                        flipped++;
                    }
            }
            else
            {
                consoleAssert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
                    
                if (val.toNumber() != 0)
                    flipped++;
            }
        }


        value.value = flipped == 1 ? 1 : 0;
    }


    return value;
}