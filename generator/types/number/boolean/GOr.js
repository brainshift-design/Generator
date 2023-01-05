class GOr
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_OR, nodeId, options);
    }


    
    copy()
    {
        const or = new GOr(this.nodeId, this.options);
        or.copyBase(this);
        or.inputs = this.inputs.map(i => i.copy());
        return or;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalOrInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalOrInputs(inputs, parse)
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

        if (val.toNumber() != 0)
            value.value = 1;
    }


    return value;
}
