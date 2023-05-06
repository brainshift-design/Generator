class GDistribute
extends GNumberType
{
    from;
    start;
    end;


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

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const from  = (await this.from .eval(parse)).toValue();
        const start = (await this.start.eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;

        const step = 
            repeat
            ? (end.toNumber() - start.toNumber()) / Math.max(1, repeat.total - (from.value == 1 ? 1 : 0))
            : 0;

            
        this.value = new NumberValue(
            start.toNumber() + step * iteration + (from.value == 2 ? step : 0),
            Math.max(start.decimals, end.decimals));

            
        this.updateValues =
        [
            ['from',  from ],
            ['start', start],
            ['end',   end  ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from ) this.from .pushValueUpdates(parse);
        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.from ) this.from .invalidate();
        if (this.start) this.start.invalidate();
        if (this.end  ) this.end  .invalidate();
    }
}
