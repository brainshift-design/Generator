class GTangent
extends GOperator1
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


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}



async function evalTangent(input, arc)
{
    if (!input)
        return NumberValue.NaN;

    const val = 
        !arc 
        ? Math.tan (input.value) 
        : Math.atan(input.value);
    
    return new NumberValue(val, decDigits(val));
}