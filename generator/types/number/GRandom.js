class GRandom
extends GNumberType
{
    seed;
    min;
    max;

    random;



    constructor(nodeId, options)
    {
        super(NUMBER_RANDOM, nodeId, options);
    }


    
    copy()
    {
        const rnd = new GRandom(this.nodeId, this.options);

        rnd.copyBase(this);

        if (this.seed  ) rnd.seed   = this.seed.copy();
        if (this.min   ) rnd.min    = this.min .copy();
        if (this.max   ) rnd.max    = this.max .copy();

        if (this.random) rnd.random = this.random.copy();

        return rnd;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.seed = this.seed.eval(parse).copy();
            this.min  = this.min .eval(parse).copy();
            this.max  = this.max .eval(parse).copy();
        }


        const seed = this.seed.toValue();
        const min  = this.min .toValue();
        const max  = this.max .toValue();
    

        if (!this.valid)
            this.random = new Random(seed.value);
        

        this.value = new NumberValue(this.random.next(),
            //min.value + this.random.next() * (max.value - min.value),
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
