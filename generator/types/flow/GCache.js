class GCache
extends GOperator1
{
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(CACHE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GCache(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        // if (this.cachedValue) copy.cachedValue = this.cachedValue.copy();

        return copy;
    }



    async eval(parse)
    {
        if (!this.options.enabled)
            this.cachedValue = null;
            
        if (   this.isCached()
            && this.cachedValue)
            return this;


        if (this.cachedValue)
            this.value = this.cachedValue.copy();

        else
        {
            this.value = 
                this.input 
                ? (await this.input.eval(parse)).toValue() 
                : new NullValue();

            if (   this.options.enabled
                && this.value)
                this.cachedValue = this.value.copy();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    iterateCache(parse, from)
    {
        this.cachedValue = null;

        super.iterateCache(parse, from);
    }
}
