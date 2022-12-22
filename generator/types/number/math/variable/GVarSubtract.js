class GVarSubtract
extends GVarArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_VAR_SUBTRACT, nodeId, options);
    }


    
    copy()
    {
        const sub = new GVarSubtract(this.nodeId, this.options);
        sub.copyBase(this);
        sub.inputs = this.inputs.map(i => i.copy());
        return sub;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalVarSubtractInputs(this.inputs, parse);

        this.validate();

        return this;
    }
}



function evalVarSubtractInputs(inputs, parse)
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
                
            value.value   -= val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}