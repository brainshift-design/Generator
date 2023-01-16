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
        const cache = new GCache(this.nodeId, this.options);

        cache.copyBase(this);

        if (this.input) cache.input = this.input.copy();
        if (this.value) cache.value = this.value.copy();

        return cache;
    }



    eval(parse)
    {
        if (this.valid)//isCached())
            return this;


        this.value = 
            this.input
            ? this.input.eval(parse).toValue()
            : NullValue;


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
}
