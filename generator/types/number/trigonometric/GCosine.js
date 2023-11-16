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


        this.setUpdateValues(parse, [['value', this.value]]);


        this.validate();

        return this;
    }
}



async function evalCosine(input, parse, arc)
{
    if (!input)
        return NumberValue.NaN;

    let value = (await input.eval(parse)).toValue();

    const val = 
        !arc 
        ? Math.cos(value.value) 
        : Math.acos(value.value);

    value = new NumberValue(val, decDigits(val));

    return value;
}