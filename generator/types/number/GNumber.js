class GNumber
extends GNumberType
{
    input = null;
    


    constructor(nodeId, options)
    {
        super(NUMBER, nodeId, options);
    }



    copy()
    {
        const copy = new GNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();
        
        copy.value = this.value;

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.input || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        if (this.input)
            this.value = (await this.input.eval(parse)).toValue();
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN;


        if (this.feedbackValue)
            this.value = this.feedbackValue();


        this.updateValues = [[returnValueId, this.value]];    


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}