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



    // canBeValid()
    // {
    //     return this.input
    //          ? this.input.canBeValid()
    //          : super.canBeValid();
    // }



    eval(parse)
    {
        if (this.valid)
            return this;


        if (this.input) 
        { 
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();
        }
        else
            this.value = this.value.eval(parse).copy();

        
        console.assert(this.value.type == NUMBER_VALUE, 'this.value.type must be NUMBER_VALUE');
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