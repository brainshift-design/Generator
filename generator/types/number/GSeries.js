class GSeries
extends GNumberType
{
    start;
    step;

    current     = null;

    init        = false;

    repeatCount = 0;



    constructor(nodeId, options)
    {
        super(NUMBER_SERIES, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSeries(this.nodeId, this.options);

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


        //if (!this.valid)
        //{
            await this.start.eval(parse);
            await this.step .eval(parse);
        //}


        const start = this.start.toValue();
        const step  = this.step .toValue();
    

        if (  !this.current
            || this.repeatCount == 0)//!this.init)
        {
            this.current = start.copy();
            this.init = true;
        }
        

        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, step.decimals));

        this.current.value += step.value;


        genPushUpdateValue(parse, this.nodeId, 'start', start);
        genPushUpdateValue(parse, this.nodeId, 'step',  step );
        

        if (this.repeatCount > 0)
            this.repeatCount--;


        this.validate();

        return this;
    }



    // invalidateForward(parse)
    // {
    //     this.init  = false;
    //     this.valid = false;

    //     super.invalidateForward(parse);
    // }
}
