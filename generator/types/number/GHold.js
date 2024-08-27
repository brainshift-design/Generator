class GHold
extends GOperator1
{
    current;
    first;



    constructor(nodeId, options)
    {
        super(HOLD, nodeId, options);

        this.current = null;
    }


    
    reset()
    {
        super.reset();

        this.current = null;
        this.first   = null;
    }



    copy()
    {
        const copy = new GHold(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.first  ) copy.first   = this.first  .copy();
        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (    this.isCached()
            || !parse.evalAccumulate)
            return this;


        const input = await evalValue(this.input, parse);
        const first = await evalValue(this.first, parse);
            

        if (   input
            && first)
        {
            if (this.options.enabled)
            {
                this.value   = this.current ? this.current : first;
                this.current = input;
            }
            else
                this.value = input;
        }
        else
            this.value = new NullValue();


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



    isValid()
    {
        return super.isValid()
            && this.first && this.first.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.first) this.first.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.first) this.first.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.first) this.first.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.current = null;
    }
}
