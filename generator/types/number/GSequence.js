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
            this.init = true;
        }
        

        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, step.decimals));

        
        if (!parse.repeats.find(r => r.nodeId == this.repeatNodeId))
            this.current.value += step.value;

        else if (  !isEmpty(parse.repeats)
                && parse.repeats.at(-1).nodeId == this.repeatNodeId)
        {
            this.current.value += step.value;

            const repeat = parse.repeats.at(-1);

            if (repeat.iteration == repeat.total-1)
            {
                console.assert(
                    parse.repeats.at(-1).nodeId == this.repeatNodeId, 
                    'nested repeat error');

                parse.repeats.pop();
            }
        }


        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'start', start);
            genPushUpdateValue(parse, this.nodeId, 'step',  step );
        }


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.start) this.start.invalidate();
        if (this.step ) this.step .invalidate();
    }
}
