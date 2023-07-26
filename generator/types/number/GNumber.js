class GNumber
extends GNumberType1
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

        
        if (this.input)
            this.value = (await this.input.eval(parse)).toValue();
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN;


        if (this.feedbackValue)
            this.value = this.feedbackValue();


        this.updateValues = [['value', this.value]];    


        this.validate();

        return this;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }
}