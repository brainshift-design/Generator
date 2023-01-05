class GDivide
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_DIVIDE, nodeId, options);
    }


    
    copy()
    {
        const div = new GDivide(this.nodeId, this.options);
        div.copyBase(this);
        div.inputs = this.inputs.map(i => i.copy());
        return div;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalDivideInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalDivideInputs(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;

        
    const value = new NumberValue(0);

        
    if (inputs.length > 0)
    {
        const val0 = inputs[0].eval(parse).toValue();

        value.value    = val0.value;
        value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();

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