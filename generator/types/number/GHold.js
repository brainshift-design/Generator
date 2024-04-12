class GHold
extends GOperator1
{
    current;
    first;



    constructor(nodeId, options)
    {
        super(HOLD, nodeId, options);

        this.current = new NullValue();
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
        if (    this.isCached())
            //|| !parse.evalAccumulate)
            return this;


        const input = await evalNumberValue(this.input, parse);
        const first = await evalNumberValue(this.first, parse);
            

        if (   input
            && first)
        {
            if (this.options.enabled)
            {
                if (input)
                    this.current = this.current ? input : first;

                this.value = this.current;
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse, 
        [
            ['first', first]
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

        this.current = this.first ? this.first : new NullValue();
    }
}
