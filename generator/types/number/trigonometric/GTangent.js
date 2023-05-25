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


        this.value = await evalTangent(this.input, parse);


        this.updateValues = [[returnValueId, this.value]];


        this.validate();

        return this;
    }
}



async function evalTangent(input, parse)
{
    if (!input)
        return NumberValue.NaN;

    let value = (await input.eval(parse)).toValue();

    value = new NumberValue(Math.tan(value.value, 10));

    return value;
}