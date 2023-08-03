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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed       ) this.seed       .pushValueUpdates(parse);
        if (this.chance     ) this.chance     .pushValueUpdates(parse);
        if (this.max        ) this.max        .pushValueUpdates(parse);
        if (this.scale      ) this.scale      .pushValueUpdates(parse);
        if (this.interpolate) this.interpolate.pushValueUpdates(parse);
        if (this.offset     ) this.offset     .pushValueUpdates(parse);
        if (this.detail     ) this.detail     .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.seed       ) this.seed       .invalidateInputs(from);
        if (this.chance     ) this.chance     .invalidateInputs(from);
        if (this.max        ) this.max        .invalidateInputs(from);
        if (this.scale      ) this.scale      .invalidateInputs(from);
        if (this.interpolate) this.interpolate.invalidateInputs(from);
        if (this.offset     ) this.offset     .invalidateInputs(from);
        if (this.detail     ) this.detail     .invalidateInputs(from);
    }
}
