class GSeries
extends GNumberType
{
    start;
    step;

    current;



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
        //logString('GSeries.eval()');

        if (!this.valid)
        {
            await this.start.eval(parse);
            await this.step .eval(parse);
        }


        const start = this.start.toValue();
        const step  = this.step .toValue();
    

        if (!this.valid)
            this.current = start.copy();

        
        this.value = new NumberValue(
            this.current.value,
            Math.max(start.decimals, step.decimals));

        this.current.value += step.value;


        //if (!this.valid)
        //{
            genPushUpdateValue(parse, this.nodeId, 'start', start);
            genPushUpdateValue(parse, this.nodeId, 'step',  step );
        //}
        

        this.validate();

        return this;
    }
}
