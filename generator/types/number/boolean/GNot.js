class GNot
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_NOT, nodeId, options);
    }


    
    copy()
    {
        const not = new GNot(this.nodeId, this.options);
        not.copyBase(this);
        not.inputs = this.inputs.map(i => i.copy());
        return not;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalNandInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalNandInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue();


    if (inputs.length > 0)
    {
        const val0 = inputs[0].eval(parse).toValue();

        value.value = val0.toNumber() != 0 ? 0 : 1;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must belong to NUMBER_VALUE');

            if (val.toNumber() == 0)
                value.value = 1;
        }
    }


    return value;
}
