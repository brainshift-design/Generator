class GSubtract
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_SUBTRACT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSubtract(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = await evalSubtractInputs(this.inputs, parse);

        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



async function evalSubtractInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue(0);


    if (!isEmpty(inputs))
    {
        const val0 = (await inputs[0].eval(parse)).toValue();

        value.value    = val0.value;
        value.decimals = val0.decimals;


        for (let i = 1; i < inputs.length; i++)
        {
            const val = (await inputs[i].eval(parse)).toValue();

            console.assert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value.value   -= val.value;
            value.decimals = Math.max(value.decimals, val.decimals);
        }
    }


    return value;
}