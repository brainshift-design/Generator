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


        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value.copy();
    }
}



async function evalSine(input, arc)
{
    if (!input)
        return NumberValue.NaN();

    const val = 
        !arc 
        ? Math.sin (input.value) 
        : Math.asin(input.value);

    return new NumberValue(val, decDigits(val));
}