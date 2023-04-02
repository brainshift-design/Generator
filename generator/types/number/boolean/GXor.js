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
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



async function evalXorInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue();


    let flipped;

    if (!isEmpty(inputs))
    {
        const val0 = (await inputs[0].eval(parse)).toValue();
        if (!val0.isValid()) return NumberValue.NaN;

        flipped = val0.toNumber() != 0;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = (await inputs[i].eval(parse)).toValue();
            if (!val.isValid()) return NumberValue.NaN;

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            if (val.toNumber() != 0)
                flipped++;
        }


        value.value = flipped == 1 ? 1 : 0;
    }


    return value;
}