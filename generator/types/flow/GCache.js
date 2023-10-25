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

        return copy;
    }



    async eval(parse)
    {
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
                : NullValue;

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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);

        if (   repeat
            && repeat.nodeId == from.nodeId)
            this.cachedValue = null;
    }



    // iterateLoop(parse)
    // {
    //     super.iterateLoop(parse);

    //     this.cachedValue = null;
    // }
}
