class GCache
extends GOperator1
{
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


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.value ? new TextValue(this.value.type) : null],
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
}
