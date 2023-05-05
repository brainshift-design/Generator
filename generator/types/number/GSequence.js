class GSequence
extends GNumberType
{
    start;
    step;

    current      = null;


    init         = false;
    
    repeaNodetId = NULL;



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
    

        if (!this.init)
        {
            this.current = start.copy();
            this.init    = true;
        }
        

        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, step.decimals));

        
        this.updateValues =
        [
            ['start', start],
            ['step',  step ]
        ];


        if (!parse.repeats.find(r => r.nodeId == this.repeatNodeId))
            this.current.value += step.toNumber();

        else if (  !isEmpty(parse.repeats)
                && parse.repeats.at(-1).nodeId == this.repeatNodeId)
            this.current.value += step.toNumber();


        // if (   parse.repeats.length == 1
        //     && parse.repeats[0].iteration == parse.repeats[0].repeat.total-1)
        // {
        //     if (   this.repeatNodeId != NULL
        //         && parse.repeats[0].nodeId != this.repeatNodeId)
        //         console.warn('Generator: Invalid nested repeat on \'' + this.nodeId + '\'');

        //     //parse.repeats.pop();
        // }


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.step ) this.step .pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.start) this.start.invalidate();
        if (this.step ) this.step .invalidate();
    }
}
