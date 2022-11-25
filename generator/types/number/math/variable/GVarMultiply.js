class GVarMultiply
extends GVarArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_VAR_MULTIPLY, nodeId, options);
    }



    copy()
    {
        const mul = new GVarMultiply(this.nodeId, this.options);
        mul.copyBase(this);
        mul.inputs = this.inputs.map(i => i.copy());
        return mul;
    }

    

    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalVarMultiplyInputs(this.inputs, parse);

        this.validate();

        return this;
    }
}



function evalVarMultiplyInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (inputs.length > 0)
    {
        value.value = 1;

        for (let i = 0; i < inputs.length; i++)
        {
            inputs[i] = inputs[i].eval(parse).copy();
            const val = inputs[i].toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');

            value.value   *= val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}