class GProbability
extends GOperator
{
    seed      = null;
    iteration = null;
    chance    = null;

    random    = null;



    constructor(nodeId, options)
    {
        super(NUMBER_PROBABILITY, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.seed      = null;
        this.iteration = null;
        this.chance    = null;
    }



    copy()
    {
        const copy = new GRandom(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed     ) copy.seed      = this.seed     .copy();
        if (this.iteration) copy.iteration = this.iteration.copy();
        if (this.chance   ) copy.chance    = this.chance   .copy();

        if (this.random) copy.random = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const seed      = this.seed      ? (await this.seed     .eval(parse)).toValue() : null;
        const iteration = this.iteration ? (await this.iteration.eval(parse)).toValue() : null;
        const chance    = this.chance    ? (await this.chance   .eval(parse)).toValue() : null;
    

        if (   this.options.enabled
            && seed
            && iteration
            && chance)
        {
            if (  !this.random
                || this.random.seed != seed.value)
                this.random = new Random(seed.value);


            if (iteration.isValid())
                this.currentIteration = Math.round(iteration.value);


            if (this.currentIteration >= 0)
            {
                const r = 
                    this.options.enabled
                    ? (this.random.get(this.currentIteration) > 1 - chance.value/100 ? 1 : 0)
                    : 0;

                this.value = new NumberValue(Math.round(r));
            }
            else
                this.value = new NumberValue(0);
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['seed',      seed     ],
            ['iteration', iteration],
            ['chance',    chance   ],
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
        return this.seed      && this.seed     .isValid()
            && this.iteration && this.iteration.isValid()
            && this.chance    && this.chance   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed     ) this.seed     .pushValueUpdates(parse);
        if (this.iteration) this.iteration.pushValueUpdates(parse);
        if (this.chance   ) this.chance   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.seed     ) this.seed     .invalidateInputs(parse, from, force);
        if (this.iteration) this.iteration.invalidateInputs(parse, from, force);
        if (this.chance   ) this.chance   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed     ) this.seed     .iterateLoop(parse);
        if (this.iteration) this.iteration.iterateLoop(parse);
        if (this.chance   ) this.chance   .iterateLoop(parse);
    }
}
