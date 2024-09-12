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
        super(PROBABILITY, nodeId, options);
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


        const input0    = await evalValue      (this.input0,    parse);
        const input1    = await evalValue      (this.input1,    parse);
        const seed      = await evalNumberValue(this.seed,      parse);
        const iteration = await evalNumberValue(this.iteration, parse);
        const chance    = await evalNumberValue(this.chance,    parse);
        const alternate = await evalNumberValue(this.alternate, parse);
    

        const _values = [];


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
                    && input1)
                {
                    if (   input0.isValid()
                        && input1.isValid())
                    {
                        this.value = 
                            ch < 0.5 
                                ? input0 
                                : input1;
                    }
                    else
                    {
                        this.value = 
                            ch < 0.5 
                                ? nanFromType(input0.type) 
                                : nanFromType(input1.type);
                    }

                    _values.push(input0, input1);
                }

                else if (input0)
                {
                    this.value = 
                           input0.isValid()
                        && ch < 0.5
                            ? input0
                            : nanFromType(input0.type);

                    _values.push(input0);
                }
                
                else if (input1)
                {
                    this.value = 
                           input1.isValid()
                        && ch >= 0.5
                            ? input1
                            : nanFromType(input1.type);

                    _values.push(input1);
                }
                
                else
                    this.value = new NumberValue(ch < 0.5 ? 0 : 1);
            }
            else
                this.value = new NullValue();
        }
        else
            this.value = new NullValue();


        const type =
               _values.length > 1
            && finalListTypeFromValues(_values) == LIST_VALUE
            ? new TextValue(ANY_VALUE)
            : this.outputType();


        this.setUpdateValues(parse,
        [
            ['type',      type     ],
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
