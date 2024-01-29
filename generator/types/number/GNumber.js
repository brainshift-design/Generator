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

        copy.value = this.value;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        if (input)
            this.value = input.copy();
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse, 
        [
            ['value', this.value.copy()]
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