class GTextContains
extends GTextType2
{
    constructor(nodeId, options)
    {
        super(TEXT_CONTAINS, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextContains(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;
    
        if (   input0 && input0.isValid() 
            && input1 && input1.isValid())
            this.value = new NumberValue(input0.value.includes(input1.value) ? 1 : 0);
        else                  
            this.value = NumberValue.NaN;
    

        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }
}