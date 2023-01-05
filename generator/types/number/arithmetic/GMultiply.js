class GMultiply
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MULTIPLY, nodeId, options);
    }



    copy()
    {
        const mul = new GMultiply(this.nodeId, this.options);
        mul.copyBase(this);
        mul.inputs = this.inputs.map(i => i.copy());
        return mul;
    }

    

    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalMultiplyInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalMultiplyInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (inputs.length > 0)
    {
        value.value = 1;

        for (let i = 0; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');

            value.value   *= val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}