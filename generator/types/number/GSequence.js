class GSequence
extends GOperator
{
    start;
    end;
    step;

    current;

    iteration = 0;
    loopId    = NULL;



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
        const step  = (await this.step .eval(parse)).toValue();
        const end   = (await this.end  .eval(parse)).toValue();
    

        const iteration = this.iteration++;


        if (   start
            && end
            && step)
        {
            const value = start.toNumber() + (this.options.enabled ? step.toNumber() * iteration : 0);

            if (!end.isValid())
                this.value = new NumberValue(value, Math.max(start.decimals, step.decimals));

            else if (end.isValid()   
                     && (   step.toNumber() == 0
                         || step.toNumber() >  0 && start.toNumber() < end.toNumber()
                                                 && value < end.toNumber()
                         || step.toNumber() <  0 && start.toNumber() > end.toNumber()
                                                 && value > end.toNumber()))
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
            ['step',  step ],
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
        return this.start && this.start.isValid()
            && this.step  && this.step .isValid()
            && (!this.end || this.end.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.step ) this.step .pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.end  ) this.end  .invalidateInputs(from);
        if (this.step ) this.step .invalidateInputs(from);
    }



    invalidateLoop(parse, nodeId)
    {
        super.invalidateLoop(parse, nodeId);

        this.iteration = 0;
    }
}
