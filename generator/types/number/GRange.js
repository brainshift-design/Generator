class GRange
extends GOperator
{
    from;
    start;
    end;
    spread;
    bias;



    constructor(nodeId, options)
    {
        super(NUMBER_RANGE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRange(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from  ) copy.from   = this.from  .copy();
        if (this.start ) copy.start  = this.start .copy();
        if (this.end   ) copy.end    = this.end   .copy();
        if (this.spread) copy.spread = this.spread.copy();
        if (this.bias  ) copy.bias   = this.bias  .copy();

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
        const spread = (await this.spread.eval(parse)).toValue();
        const bias   = (await this.bias  .eval(parse)).toValue();
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : 0;


        const startValue = Math.min(start.value, end.value);

        
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


        switch(spread.value)
        {
            case 0:
                break;

            case 1:
            {
                const b = bias.value / 50;

                f = 
                    b >= 0
                    ? 1 - Math.pow(1-f, 1+b)
                    :     Math.pow(  f, 1-b);

                break;
            }
            case 2:
            {
                const b = bias.value / 50;

                     if (b >= 0 && f >= 0.5) f = 1 - Math.pow((1-f)*2, 1+b) / 2;
                else if (b >= 0 && f <  0.5) f = Math.pow(f*2, 1+b) / 2;
                else if (b < 0)              f = lerp3(0, (1-b)/3, (2+b)/3, 1, f);

                break;
            }
        }


        this.value = new NumberValue(
            start.value + startOffset + delta * f,
            Math.max(start.decimals, end.decimals));


        this.setUpdateValues(parse,
        [
            ['from',   from  ],
            ['start',  start ],
            ['end',    end   ],
            ['spread', spread],
            ['bias',   bias  ]
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
            && this.spread && this.spread.isValid()
            && this.bias   && this.bias  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from  ) this.from  .pushValueUpdates(parse);
        if (this.start ) this.start .pushValueUpdates(parse);
        if (this.end   ) this.end   .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
        if (this.bias  ) this.bias  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.from  ) this.from  .invalidateInputs(parse, from);
        if (this.start ) this.start .invalidateInputs(parse, from);
        if (this.end   ) this.end   .invalidateInputs(parse, from);
        if (this.spread) this.spread.invalidateInputs(parse, from);
        if (this.bias  ) this.bias  .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from  ) this.from  .iterateLoop(parse);
        if (this.start ) this.start .iterateLoop(parse);
        if (this.end   ) this.end   .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
        if (this.bias  ) this.bias  .iterateLoop(parse);
    }
}
