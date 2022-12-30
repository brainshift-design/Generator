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
        const series = new GSeries(this.nodeId, this.options);

        series.copyBase(this);

        if (this.start  ) series.start   = this.start  .copy();
        if (this.step   ) series.step    = this.step   .copy();

        if (this.current) series.current = this.current.copy();

        return series;
    }



    eval(parse)
    {
        //logString('GSeries.eval()');

        if (!this.valid)
        {
            this.start.eval(parse);
            this.step .eval(parse);
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
