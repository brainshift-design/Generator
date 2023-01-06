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


    const value = new NumberValue();


    if (inputs.length > 0)
    {
        const val0 = inputs[0].eval(parse).toValue();

        value.value    = val0.toNumber();
        // value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value.value = Math.max(value.value, val.toNumber());
            // value.decimals = Math.max(value.decimals, val.decimals);
        }


        if (value.value != 0)
            value.value = 1;
    }


    return value;
}