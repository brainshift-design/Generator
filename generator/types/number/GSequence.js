class GSequence
extends GOperator
{
    start;
    end;
    step;

    current;

    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_SEQUENCE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSequence(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start  ) copy.start   = this.start  .copy();
        if (this.end    ) copy.end     = this.end    .copy();
        if (this.step   ) copy.step    = this.step   .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const start = (await this.start.eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();
        const step  = (await this.step .eval(parse)).toValue();
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;


        if (   start
            && end
            && step)
        {
            const value = start.toNumber() + (this.options.enabled ? step.toNumber() * iteration : 0);

            if (value < end.toNumber())
            {
                this.value = new NumberValue(
                    start.toNumber() + (this.options.enabled ? step.toNumber() * iteration : 0),
                    Math.max(start.decimals, step.decimals));
            }
            else
                this.value = NumberValue.NaN.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['start', start],
            ['end',   end  ],
            ['step',  step ]
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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
        if (this.step ) this.step .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.end  ) this.end  .invalidateInputs(from);
        if (this.step ) this.step .invalidateInputs(from);
    }
}
