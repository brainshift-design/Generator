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



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        if (this.input)
        {
            console.log('this.input =', this.input);
            this.value = (await this.input.eval(parse)).toValue();
            console.log('this.value =', this.value);
        }
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN;


        if (this.feedbackValue)
            this.value = this.feedbackValue();


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);    


        this.validate();

        return this;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    isCached()
    {
        return super.isCached()
            && (!this.input || this.input.isCached());
    }
}