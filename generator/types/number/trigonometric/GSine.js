class GSine
extends GTrigBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_SIN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSine(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = evalSine(this.input, parse);


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}



async function evalSine(input, parse)
{
    if (!input)
        return NumberValue.NaN;


    const value = (await input.eval(parse)).toValue();

    value.value = new NumberValue(Math.sin(value.value, 10));

    return value;
}