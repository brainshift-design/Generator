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
        const num = new GNumber(this.nodeId, this.options);
        
        num.copyBase(this);

        if (this.input) 
            num.input = this.input.copy();
        
        num.value = this.value;

        return num;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        if (this.input)
            this.value = this.input.eval(parse).toValue();
        else if (this.value)
            this.value.eval(parse);
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    toValue()
    {
        return this.value.copy();
    }
}