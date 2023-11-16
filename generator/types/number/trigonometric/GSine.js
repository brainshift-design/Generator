class GSine
extends GOperator1
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


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}



async function evalSine(input, parse, arc)
{
    if (!input)
        return NumberValue.NaN;

    let value = (await input.eval(parse)).toValue();

    const val = 
        !arc 
        ? Math.sin(value.value) 
        : Math.asin(value.value);

    value = new NumberValue(val, decDigits(val));

    return value;
}