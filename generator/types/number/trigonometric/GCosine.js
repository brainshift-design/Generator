class GCosine
extends GTrigBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_COS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCosine(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = await evalCosine(this.input, parse);


        if (parse.isLastRepeat())
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}



async function evalCosine(input, parse)
{
    if (!input)
        return NumberValue.NaN;

    let value = (await input.eval(parse)).toValue();

    value = new NumberValue(Math.cos(value.value, 10));

    return value;
}