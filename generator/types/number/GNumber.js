class GNumber
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER, nodeId, options);
    }



    copy()
    {
        const copy = new GNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        copy.value = this.value.copy();

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
            this.value = NumberValue.NaN();


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