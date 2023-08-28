class GSequence
extends GOperator
{
    start;
    step;
    end;

    current;



    constructor(nodeId, options)
    {
        super(NUMBER_SEQUENCE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSequence(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start  ) copy.start   = this.start  .copy();
        if (this.step   ) copy.step    = this.step   .copy();
        if (this.end    ) copy.end     = this.end    .copy();

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
    

        if (   start
            && end
            && step)
        {
            const value = start.value + (this.options.enabled ? step.value * this.iteration : 0);

            // console.log('sequence');

            if (!end.isValid())
                this.value = new NumberValue(value, Math.max(start.decimals, step.decimals));

            else if (end.isValid()   
                     && (   step.value == 0
                         || step.value >  0 && start.value < end.value
                                            &&       value < end.value
                         || step.value <  0 && start.value > end.value
                                            &&       value > end.value))
            {
                this.value = new NumberValue(
                    start.value + (this.options.enabled ? step.value * this.iteration : 0),
                    Math.max(start.decimals, step.decimals));
            }

            else
                this.value = NumberValue.NaN.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        // if (this.nodeId == 'sequence3')
        //     console.log('this.value =', this.value);


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
            && this.step  && this.step .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.step ) this.step .pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.start) this.start.invalidateInputs(parse, from);
        if (this.end  ) this.end  .invalidateInputs(parse, from);
        if (this.step ) this.step .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
        if (this.step ) this.step .iterateLoop(parse);
        if (this.end  ) this.end  .iterateLoop(parse);
    }
}
