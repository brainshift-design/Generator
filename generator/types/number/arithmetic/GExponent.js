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



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalExponentInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalExponentInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const val0 = inputs[0].eval(parse).toValue();

        value.value    = val0.value;
        value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

            crashAssert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value.value    = Math.pow(value.value,    val.value);
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}