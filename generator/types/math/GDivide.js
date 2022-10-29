class GDivide
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_DIVIDE, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;

        this.value = evalDivideInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
    }
}



function evalDivideInputs(inputs, parse)
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

            if (val.value == 0) 
            { 
                value.value    = Number.NaN; 
                value.decimals = 0;
                break; 
            }

            value.decimals = Math.max(value.decimals, val.decimals);
            value.value    = floorTo(value.value / val.value, value.decimals);
        }
    }


    return value;
}