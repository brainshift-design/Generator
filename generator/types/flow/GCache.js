class GCache
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(CACHE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCache(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.valid)//isCached())
            return this;


        this.value = 
            this.input
            ? (await this.input.eval(parse)).toValue()
            : NullValue;


        if (parse.isLastRepeat())
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    invalidate()
    {
        super.invalidate();

        // if (this.input  ) this.input  .invalidate();
    }
}
