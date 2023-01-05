class GXor
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_XOR, nodeId, options);
    }


    
    copy()
    {
        const xor = new GXor(this.nodeId, this.options);
        xor.copyBase(this);
        xor.inputs = this.inputs.map(i => i.copy());
        return xor;
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
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    let flipped = 0;

    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() != 0)
        {
            value.value = 1;
            flipped++;
        }
    }


    if (   value.value != 0
        && flipped == inputs.length)
        value.value = 0;


    return value;
}