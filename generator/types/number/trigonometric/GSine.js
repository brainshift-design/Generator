class GSine
extends GNumberType1
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


        this.value = await evalSine(this.input, parse);


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}



async function evalSine(input, parse)
{
    if (!input)
        return NumberValue.NaN;

    let value = (await input.eval(parse)).toValue();

    value = new NumberValue(Math.sin(value.value, 10));

    return value;
}