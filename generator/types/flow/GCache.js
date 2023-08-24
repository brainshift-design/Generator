class GCache
extends GOperator1
{
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(CACHE, nodeId, options);
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
        if (this.isCached())
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


        const type = 
            this.value
            ? new TextValue(
                LIST_VALUES.includes(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['type', type]
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.cachedValue = null;
    }



    // iterateLoop(parse)
    // {
    //     super.iterateLoop(parse);

    //     this.cachedValue = null;
    // }
}
