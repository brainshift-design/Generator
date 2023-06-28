class GDistribute
extends GNumberType
{
    from;
    start;
    end;
    spread;
    bias;


    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_DISTRIBUTE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GDistribute(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from   ) copy.from    = this.from   .copy();
        if (this.start  ) copy.start   = this.start  .copy();
        if (this.end    ) copy.end     = this.end    .copy();
        if (this.spread ) copy.spread  = this.spread .copy();
        if (this.bias   ) copy.bias    = this.bias   .copy();

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
        const iteration = repeat ? repeat.iteration : this.iteration;


        let step = 
               repeat
            && this.options.enabled
            ? (end.toNumber() - start.toNumber()) / Math.max(1, repeat.total - (from.value == 1 ? 1 : 0))
            : 0;

            
        let startOffset;

             if (from  .value == 2) startOffset = step;
        else if (from  .value == 1
              && repeat
              && repeat.total == 1) startOffset = (end.toNumber() - start.toNumber()) / 2;
        else                        startOffset = 0;


        let f = iteration / (repeat.total - (from.value == 1 ? 1 : 0));

        switch(spread.value)
        {
            case 0:
                break;

            case 1:
            {
                const b = bias.toNumber() / 50;

                f = 
                    b >= 0
                    ? 1 - Math.pow(1-f, 1+b)
                    :     Math.pow(  f, 1-b);

                break;
            }
            case 2:
            {
                const b = bias.toNumber() / 25;

                     if (b >= 0 && f >= 0.5) f = 1 - Math.pow((1-f)*2, 1+b) / 2;
                else if (b >= 0 && f <  0.5) f = Math.pow(f*2, 1+b) / 2;
                else if (b < 0)              f = lerp3(0, -b/4, 1+b/4, 1, f);

                break;
            }
        }

        
        this.value = new NumberValue(
            startOffset + start.toNumber() + (end.toNumber() - start.toNumber()) * f, //step * iteration + startOffset,
            Math.max(start.decimals, end.decimals));

            
        this.updateValues =
        [
            ['from',   from  ],
            ['start',  start ],
            ['end',    end   ],
            ['spread', spread],
            ['bias',   bias  ]
        ];


        this.validate();

        return this;
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.from  ) this.from  .invalidateInputs(from);
        if (this.start ) this.start .invalidateInputs(from);
        if (this.end   ) this.end   .invalidateInputs(from);
        if (this.spread) this.spread.invalidateInputs(from);
        if (this.bias  ) this.bias  .invalidateInputs(from);
    }
}
