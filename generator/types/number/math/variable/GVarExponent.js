class GVarExponent
extends GVarArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_VAR_EXPONENT, nodeId, options);
    }


    
    copy()
    {
        const exp = new GVarExponent(this.nodeId, this.options);
        exp.copyBase(this);
        exp.inputs = this.inputs.map(i => i.copy());
        return exp;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

        this.value = evalVarExponentInputs(this.inputs, parse);

        this.validate();

        return this;
    }
}



function evalVarExponentInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (inputs.length > 0)
    {
        inputs[0] = inputs[0].eval(parse).copy();
        const val0 = inputs[0].toValue();

        value.value    = val0.value;
        value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            inputs[i] = inputs[i].eval(parse).copy();
            const val = inputs[i].toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value.value    = Math.pow(value.value,    val.value);
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}