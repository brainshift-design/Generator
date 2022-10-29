class GExponent
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_EXPONENT, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;

        this.value = evalExponentInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
    }
}



function evalExponentInputs(inputs, parse)
{
    const value = new NumberValue(0);


    if (inputs.length > 0)
    {
        inputs[0].eval(parse);
        const val0 = inputs[0].toValue();

        value.value    = val0.value;
        value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            inputs[i].eval(parse);
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