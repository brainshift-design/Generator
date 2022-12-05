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
        if (this.vaoid)//isCached())
            return this;


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();
        }
        else
            this.value = null;


        if (this.value) genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        else            genPushUpdateValue(parse, this.nodeId, '',      NumberValue.NaN);

        
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
