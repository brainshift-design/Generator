class GAdd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_ADD, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;

        this.value = evalAddInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
    }
}



function evalAddInputs(inputs, parse)
{
    const value = new NumberValue(0);


    for (const input of inputs)
    {
        input.eval(parse);
        const val = input.toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        value.value   += val.value;
        value.decimals = Math.max(value.decimals, val.decimals);
    }


    return value;
}