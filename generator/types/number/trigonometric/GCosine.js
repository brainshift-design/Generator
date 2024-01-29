class GCosine
extends GOperator1
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


        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);


        this.validate();

        return this;
    }
}



async function evalCosine(input, arc)
{
    if (!input)
        return NumberValue.NaN.copy();

    const val = 
        !arc 
        ? Math.cos (input.value) 
        : Math.acos(input.value);

   return new NumberValue(val, decDigits(val));
}