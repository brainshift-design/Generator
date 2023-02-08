class GNot
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_NOT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNot(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
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
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue();


    if (!isEmpty(inputs))
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
