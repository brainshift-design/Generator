class GSequence
extends GOperator
{
    start;
    step;


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
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;

        
        this.value = new NumberValue(
            start.toNumber() + (this.options.enabled ? step.toNumber() * iteration : 0),
            Math.max(start.decimals, step.decimals));


        // if (  !repeat
        //     || repeat.iteration == repeat.total-1)
        // {
            this.updateValues =
            [
                ['start', start],
                ['step',  step ]
            ];
        // }
        

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
        if (this.step ) this.step .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.step ) this.step .invalidateInputs(from);
    }
}
