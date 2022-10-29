class GMultiply
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MULTIPLY, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;

        this.value = evalMultiplyInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
    }
}



function evalMultiplyInputs(inputs, parse)
{
    const value = new NumberValue(0);


    if (inputs.length > 0)
    {
        value.value = 1;

        for (const input of inputs)
        {
            input.eval(parse);
            const val = input.toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');

            value.value   *= val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}