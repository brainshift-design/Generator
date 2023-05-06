class GRandom
extends GNumberType
{
    seed;
    min;
    max;

    random = null;


    loopId = NULL;



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


        // input not used for evaluation

            
        const seed = (await this.seed.eval(parse)).toValue();
        const min  = (await this.min .eval(parse)).toValue();
        const max  = (await this.max .eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
            this.random = new Random(seed.value);


        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;

        
        this.value = new NumberValue(
            min.value + this.random.get(iteration) * (max.value - min.value),
            Math.max(min.decimals, max.decimals));


        this.updateValues =
        [
            ['seed', seed],
            ['min',  min ],
            ['max',  max ]
        ];
        

        this.validate();

        return this;
    }



    pushUpdateValues(parse)
    {
        super.pushUpdateValues(parse);

        if (this.seed) this.seed.pushUpdateValues(parse);
        if (this.min ) this.min .pushUpdateValues(parse);
        if (this.max ) this.max .pushUpdateValues(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.seed) this.seed.invalidate();
        if (this.min ) this.min .invalidate();
        if (this.max ) this.max .invalidate();
    }
}
