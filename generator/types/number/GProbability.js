class GProbability
extends GOperator
{
    seed;
    chance;

    random = null;


    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_PROBABILITY, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRandom(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed  ) copy.seed   = this.seed  .copy();
        if (this.chance) copy.chance = this.chance.copy();

        if (this.random) copy.random = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const seed   = (await this.seed  .eval(parse)).toValue();
        const chance = (await this.chance.eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
            this.random = new Random(seed.value);


        
        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;


        const r = 
            this.options.enabled
            ? (this.random.get(iteration) > 1 - chance.value/100 ? 1 : 0)
            : 0;


        this.value = new NumberValue(Math.round(r));


        this.setUpdateValues(parse,
        [
            ['seed', seed  ],
            ['min',  chance],
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
        return this.seed  .isValid()
            && this.chance.isValid()
            && this.max   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed  ) this.seed  .pushValueUpdates(parse);
        if (this.chance) this.chance.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.seed  ) this.seed  .invalidateInputs(from);
        if (this.chance) this.chance.invalidateInputs(from);
    }
}
