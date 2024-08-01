class GBooleanNumber
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(BOOLEAN_NUMBER, nodeId, options);
    }



    copy()
    {
        const copy = new GBooleanNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        copy.value = this.value;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input, parse);


        if (input)
            this.value = input;
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN.copy();


        // force 0 or 1
        if (this.value.isValid())
            this.value = new NumberValue(Math.round(Math.min(Math.max(0, this.value.value), 1)), 0);


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return !this.input 
             || this.input.isValid();
    }
}