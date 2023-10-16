class GTimer
extends GOperator1
{
    interval = null;



    constructor(nodeId, options)
    {
        super(TIMER, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.interval = null;
    }



    copy()
    {
        const copy = new GTimer(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.interval) copy.interval = this.interval.copy();

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


        const interval = (await this.interval.eval(parse)).toValue();
            

        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            this.value = input ? input : NullValue;
        }
        else
            this.value = NullValue.copy();
            

        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['interval', interval  ]
        ]);

        
        this.updateValueObjects();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.interval && this.interval.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.interval) this.interval.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.interval) this.interval.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.interval) this.interval.iterateLoop(parse);
    }
}
