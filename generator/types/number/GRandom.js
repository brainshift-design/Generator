class GRandom
extends GOperator
{
    seed;
    min;
    max;
    unique;

    random       = null;
    randomUnique = null;

    lastValue1   = -1;
    lastValue2   = -1;
    randomOffset =  0;

    loopId       = NULL;



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
        if (this.unique) copy.unique = this.unique.copy();

        if (this.random) copy.random = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const seed   = (await this.seed  .eval(parse)).toValue();
        const min    = (await this.min   .eval(parse)).toValue();
        const max    = (await this.max   .eval(parse)).toValue();
        const unique = (await this.unique.eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
        {
            this.random       = new Random(seed.value);
            this.randomUnique = new Random(seed.value+1);
        }


        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;


        this.value = new NumberValue(
            min.value + this.random.get(iteration + this.randomOffset) * (max.value - min.value), 
            Math.max(min.decimals, max.decimals));


        const _unique = unique.value/100;
        

        if (max.value - min.value >= 1)
        {
            while (this.value.toNumber() == this.lastValue1
                && this.randomUnique.get(iteration) < _unique)
                this.value = new NumberValue(
                    min.value + this.random.get(iteration + ++this.randomOffset) * (max.value - min.value),
                    Math.max(min.decimals, max.decimals));
        }

        if (max.value - min.value >= 2)
        {
            while ((   this.value.toNumber() == this.lastValue1
                    || this.value.toNumber() == this.lastValue2)
                && this.randomUnique.get(iteration) < Math.max(_unique - 1))
                this.value = new NumberValue(
                    min.value + this.random.get(iteration + ++this.randomOffset) * (max.value - min.value),
                    Math.max(min.decimals, max.decimals));
        }        


        this.lastValue2 = this.lastValue1;
        this.lastValue1 = this.value.toNumber();


        this.updateValues =
        [
            ['seed',   seed  ],
            ['min',    min   ],
            ['max',    max   ],
            ['unique', unique]
        ];
        

        this.validate();

        return this;
    }



    pushUpdateValues(parse)
    {
        super.pushUpdateValues(parse);

        if (this.seed  ) this.seed  .pushUpdateValues(parse);
        if (this.min   ) this.min   .pushUpdateValues(parse);
        if (this.max   ) this.max   .pushUpdateValues(parse);
        if (this.unique) this.unique.pushUpdateValues(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.seed  ) this.seed  .invalidateInputs(from);
        if (this.min   ) this.min   .invalidateInputs(from);
        if (this.max   ) this.max   .invalidateInputs(from);
        if (this.unique) this.unique.invalidateInputs(from);
    }
}
