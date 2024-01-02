class GProbability
extends GOperator
{
    seed   = null;
    chance = null;

    random = null;



    constructor(nodeId, options)
    {
        super(NUMBER_PROBABILITY, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.seed   = null;
        this.chance = null;
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


        const r = 
            this.options.enabled
            ? (this.random.get(this.iteration) > 1 - chance.value/100 ? 1 : 0)
            : 0;


        this.value = new NumberValue(Math.round(r));


        this.setUpdateValues(parse,
        [
            ['seed',   seed  ],
            ['chance', chance],
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
        return this.seed   && this.seed  .isValid()
            && this.chance && this.chance.isValid()
            && this.max    && this.max   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed  ) this.seed  .pushValueUpdates(parse);
        if (this.chance) this.chance.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.seed  ) this.seed  .invalidateInputs(parse, from, force);
        if (this.chance) this.chance.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed  ) this.seed  .iterateLoop(parse);
        if (this.chance) this.chance.iterateLoop(parse);
    }
}
