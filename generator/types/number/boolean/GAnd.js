class GAnd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_AND, nodeId, options);
    }


    
    copy()
    {
        const and = new GAnd(this.nodeId, this.options);
        and.copyBase(this);
        and.inputs = this.inputs.map(i => i.copy());
        return and;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalAndInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalAndInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(1);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() == 0)
            value.value = 0;
    }


    return value;
}