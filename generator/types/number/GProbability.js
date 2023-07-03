class GProbability
extends GNumberType
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


        this.value = new NumberValue(r);


        this.updateValues =
        [
            ['seed', seed  ],
            ['min',  chance],
        ];
        

        this.validate();

        return this;
    }



    pushUpdateValues(parse)
    {
        super.pushUpdateValues(parse);

        if (this.seed       ) this.seed       .pushUpdateValues(parse);
        if (this.chance        ) this.chance        .pushUpdateValues(parse);
        if (this.max        ) this.max        .pushUpdateValues(parse);
        if (this.scale      ) this.scale      .pushUpdateValues(parse);
        if (this.interpolate) this.interpolate.pushUpdateValues(parse);
        if (this.offset     ) this.offset     .pushUpdateValues(parse);
        if (this.detail     ) this.detail     .pushUpdateValues(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.seed       ) this.seed       .invalidateInputs(from);
        if (this.chance        ) this.chance        .invalidateInputs(from);
        if (this.max        ) this.max        .invalidateInputs(from);
        if (this.scale      ) this.scale      .invalidateInputs(from);
        if (this.interpolate) this.interpolate.invalidateInputs(from);
        if (this.offset     ) this.offset     .invalidateInputs(from);
        if (this.detail     ) this.detail     .invalidateInputs(from);
    }
}
