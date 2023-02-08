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



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalXorInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalXorInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue();


    let flipped;

    if (!isEmpty(inputs))
    {
        const val0 = inputs[0].eval(parse).toValue();

        //value.value = val0.toNumber();
        //value.decimals = val0.decimals;

        flipped = val0.toNumber() != 0;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            if (val.toNumber() != 0)
            {
                //value.value    = val.value;
                //value.decimals = val.decimals;

                flipped++;
            }
        }


        value.value = flipped == 1 ? 1 : 0;
    }


    // if (   value.value != 0
    //     && flipped > 1)
    //     value.value = 0;


    return value;
}