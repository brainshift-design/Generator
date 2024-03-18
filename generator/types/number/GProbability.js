class GProbability
extends GOperator2
{
    seed      = null;
    iteration = null;
    chance    = null;
    alternate = null;

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
        this.alternate = null;
    }



    copy()
    {
        const copy = new GRandom(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed     ) copy.seed      = this.seed     .copy();
        if (this.iteration) copy.iteration = this.iteration.copy();
        if (this.chance   ) copy.chance    = this.chance   .copy();
        if (this.alternate) copy.alternate = this.alternate.copy();

        if (this.random) copy.random = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0    = this.input0    ? (await this.input0   .eval(parse)).toValue() : null;
        const input1    = this.input1    ? (await this.input1   .eval(parse)).toValue() : null;
        
        const seed      = this.seed      ? (await this.seed     .eval(parse)).toValue() : null;
        const iteration = this.iteration ? (await this.iteration.eval(parse)).toValue() : null;
        const chance    = this.chance    ? (await this.chance   .eval(parse)).toValue() : null;
        const alternate = this.alternate ? (await this.alternate.eval(parse)).toValue() : null;
    

        if (   seed
            && iteration
            && chance
            && alternate)
        {
            if (  !this.random
                || this.random.seed != seed.value)
                this.random = new Random(seed.value);


            if (iteration.isValid())
                this.currentIteration = Math.round(iteration.value);


            if (this.currentIteration >= 0)
            {
                const calt  = this.currentIteration % 2 == 0 ? 0 : 1;

                let   cval  = chance.value/100;
                      cval += alternate.value/100 * (calt - cval);

                const ch    = this.random.get(this.currentIteration) > cval ? 0 : 1;

                
                if (   input0 
                    || input1)
                {
                    if (   input0 && input0.isValid()
                        && input1 && input1.isValid())
                        this.value = new NumberValue(ch < 0.5 ? input0.value : input1.value);
                    else
                        this.value = NumberValue.NaN.copy();
                }
                else
                    this.value = new NumberValue(ch < 0.5 ? 0 : 1);
            }
            else
                this.value = NumberValue.NaN.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['seed',      seed     ],
            ['iteration', iteration],
            ['chance',    chance   ],
            ['alternate', alternate]
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
            && this.chance    && this.chance   .isValid()
            && this.alternate && this.alternate.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed     ) this.seed     .pushValueUpdates(parse);
        if (this.iteration) this.iteration.pushValueUpdates(parse);
        if (this.chance   ) this.chance   .pushValueUpdates(parse);
        if (this.alternate) this.alternate.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.seed     ) this.seed     .invalidateInputs(parse, from, force);
        if (this.iteration) this.iteration.invalidateInputs(parse, from, force);
        if (this.chance   ) this.chance   .invalidateInputs(parse, from, force);
        if (this.alternate) this.alternate.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed     ) this.seed     .iterateLoop(parse);
        if (this.iteration) this.iteration.iterateLoop(parse);
        if (this.chance   ) this.chance   .iterateLoop(parse);
        if (this.alternate) this.alternate.iterateLoop(parse);
    }
}
