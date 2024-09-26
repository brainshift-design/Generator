class GRange
extends GOperator
{
    from  = null;
    start = null;
    end   = null;
    
    

    constructor(nodeId, options)
    {
        super(NUMBER_RANGE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from  = null;
        this.start = null;
        this.end   = null;
    }



    copy()
    {
        const copy = new GRange(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from   ) copy.from    = this.from   .copy();
        if (this.start  ) copy.start   = this.start  .copy();
        if (this.end    ) copy.end     = this.end    .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const from  = await evalNumberValue(this.from,  parse);
        const start = await evalNumberValue(this.start, parse);
        const end   = await evalNumberValue(this.end,   parse);
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.currentIteration : 0;


        if (   from
            && start
            && end)
        {
            let delta = end.value - start.value;

            let step = 
                repeat
                && this.options.enabled
                ? delta / Math.max(1, repeat.total - (from.value == 1 ? 1 : 0))
                : 0;

                
            let startOffset;

                 if (from  .value == 2) startOffset = step;
            else if (from  .value == 1
                && repeat
                && repeat.total == 1) startOffset = delta/2;
            else                        startOffset = 0;


            let f;
            
            if (repeat)
            {
                     if (from.value == 2) f = iteration/repeat.total;
                else if (from.value == 1) f = (repeat.total > 1 ? iteration/(repeat.total-1) : 0);
                else if (from.value == 0) f = iteration/repeat.total;
            }
            else
                f = 0;


            this.value = new NumberValue(
                start.value + startOffset + f * delta,
                Math.max(start.decimals, end.decimals));
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['from',  from ],
            ['start', start],
            ['end',   end  ]
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
        return this.from  && this.from .isValid()
            && this.start && this.start.isValid()
            && this.end   && this.end  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from ) this.from .pushValueUpdates(parse);
        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from ) this.from .invalidateInputs(parse, from, force);
        if (this.start) this.start.invalidateInputs(parse, from, force);
        if (this.end  ) this.end  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from ) this.from .iterateLoop(parse);
        if (this.start) this.start.iterateLoop(parse);
        if (this.end  ) this.end  .iterateLoop(parse);
    }
}
