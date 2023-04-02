class GRandom
extends GNumberType
{
    seed;
    min;
    max;

    random = null;



    constructor(nodeId, options)
    {
        super(NUMBER_RANDOM, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRandom(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed  ) copy.seed   = this.seed  .copy();
        if (this.min   ) copy.min    = this.min   .copy();
        if (this.max   ) copy.max    = this.max   .copy();

        if (this.random) copy.random = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const seed = (await this.seed.eval(parse)).toValue();
        const min  = (await this.min .eval(parse)).toValue();
        const max  = (await this.max .eval(parse)).toValue();
    

        if (!this.valid)
            this.random = new Random(seed.value);

        
        this.value = new NumberValue(
            min.value + this.random.next() * (max.value - min.value),
            Math.max(min.decimals, max.decimals));


        if (!this.valid)
        {
            genPushUpdateValue(parse, this.nodeId, 'seed', seed);
            genPushUpdateValue(parse, this.nodeId, 'min',  min );
            genPushUpdateValue(parse, this.nodeId, 'max',  max );
        }
        

        this.validate();

        return this;
    }
}
