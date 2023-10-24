class GRange
extends GOperator
{
    from   = null;
    start  = null;
    end    = null;
    bias   = null;
    spread = null;
    
    

    constructor(nodeId, options)
    {
        super(NUMBER_RANGE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from   = null;
        this.start  = null;
        this.end    = null;
        this.bias   = null;
        this.spread = null;
    }



    copy()
    {
        const copy = new GRange(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from  ) copy.from   = this.from  .copy();
        if (this.start ) copy.start  = this.start .copy();
        if (this.end   ) copy.end    = this.end   .copy();
        if (this.bias  ) copy.bias   = this.bias  .copy();
        if (this.spread) copy.spread = this.spread.copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const from   = (await this.from  .eval(parse)).toValue();
        const start  = (await this.start .eval(parse)).toValue();
        const end    = (await this.end   .eval(parse)).toValue();
        const bias   = (await this.bias  .eval(parse)).toValue();
        const spread = (await this.spread.eval(parse)).toValue();
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : 0;


        //const startValue = Math.min(start.value, end.value);

        
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


        f = getSpreadBias(f, bias.value, spread.value);


        this.value = new NumberValue(
            start.value + startOffset + delta * f,
            Math.max(start.decimals, end.decimals));


        this.setUpdateValues(parse,
        [
            ['from',   from  ],
            ['start',  start ],
            ['end',    end   ],
            ['bias',   bias  ],
            ['spread', spread]
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
        return this.from   && this.from  .isValid()
            && this.start  && this.start .isValid()
            && this.end    && this.end   .isValid()
            && this.bias   && this.bias  .isValid()
            && this.spread && this.spread.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from  ) this.from  .pushValueUpdates(parse);
        if (this.start ) this.start .pushValueUpdates(parse);
        if (this.end   ) this.end   .pushValueUpdates(parse);
        if (this.bias  ) this.bias  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from  ) this.from  .invalidateInputs(parse, from, force);
        if (this.start ) this.start .invalidateInputs(parse, from, force);
        if (this.end   ) this.end   .invalidateInputs(parse, from, force);
        if (this.bias  ) this.bias  .invalidateInputs(parse, from, force);
        if (this.spread) this.spread.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from  ) this.from  .iterateLoop(parse);
        if (this.start ) this.start .iterateLoop(parse);
        if (this.end   ) this.end   .iterateLoop(parse);
        if (this.bias  ) this.bias  .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
    }
}



function getSpreadBias(f, bias, spread)
{
    const b = bias   / 50;
    const s = spread / 50;


    f = 
        b >= 0
        ? 1 - Math.pow(1-f, 1+b)
        :     Math.pow(  f, 1-b);


         if (s >= 0 && f >= 0.5) f = 1 - Math.pow((1-f)*2, 1+s) / 2;
    else if (s >= 0 && f <  0.5) f = Math.pow(f*2, 1+s) / 2;
    else if (s < 0)              f = lerp3(0, (1-s)/3, (2+s)/3, 1, f);


    return f;
}