class GAdd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_ADD, nodeId, options);
    }


    
    copy()
    {
        const add = new GAdd(this.nodeId, this.options);
        add.copyBase(this);
        add.inputs = this.inputs.map(i => i.copy());
        return add;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalAddInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalAddInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        value.value   += val.value;
        value.decimals = Math.max(value.decimals, val.decimals);
    }


    return value;
}