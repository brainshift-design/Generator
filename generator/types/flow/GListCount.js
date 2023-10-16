class GListCount
extends GOperator1
{
    start = null;

    //value = null;



    constructor(nodeId, options)
    {
        super(LIST_COUNT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.start = null;
    }



    copy()
    {
        const copy = new GListCount(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.start) copy.start = this.start.copy();
        
        if (this.count) copy.count = this.count.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const start = (await this.start.eval(parse)).toValue();

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            this.value = new NumberValue(input.items.length - (start.value == 0 ? 1 : 0));
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['start', start     ]
        ]);


        this.validate();

        return this;
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    isValid()
    {
        return super.isValid()
            && this.start && this.start.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
    }    
}