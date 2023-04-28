class GTangent
extends GTrigBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_TAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTangent(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = evalTangent(this.input, parse);


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}



async function evalTangeng(input, parse)
{
    if (!input)
        return NumberValue.NaN;


    const value = (await input.eval(parse)).toValue();

    value.value = new NumberValue(Math.tan(value.value, 10));

    return value;
}