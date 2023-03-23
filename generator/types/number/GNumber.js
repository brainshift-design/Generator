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



    eval(parse)
    {
        if (this.isCached())
            return this;

            console.log('this.input =', this.input);
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
}