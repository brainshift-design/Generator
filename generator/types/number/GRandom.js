class GRandom
extends GOperator
{
    static { GNode.types[NUMBER_RANDOM] = this; }



    seed         = null;
    iteration    = null;
    min          = null;
    max          = null;
    bias         = null;
    spread       = null;
    unique       = null;

    random       = null;
    randomUnique = null;

    lastValue1   = -1;
    lastValue2   = -1;
    uniqueOffset =  0;



    constructor(nodeId, options)
    {
        super(NUMBER_RANDOM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.seed      = null;
        this.iteration = null;
        this.min       = null;
        this.max       = null;
        this.bias      = null;
        this.spread    = null;
        this.unique    = null;
    }



    copy()
    {
        const copy = new GRandom(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed     ) copy.seed      = this.seed     .copy();
        if (this.iteration) copy.iteration = this.iteration.copy();
        if (this.min      ) copy.min       = this.min      .copy();
        if (this.max      ) copy.max       = this.max      .copy();
        if (this.bias     ) copy.bias      = this.bias     .copy();
        if (this.spread   ) copy.spread    = this.spread   .copy();
        if (this.unique   ) copy.unique    = this.unique   .copy();

        if (this.random   ) copy.random    = this.random   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const seed      = await evalNumberValue(this.seed,      parse);
        const iteration = await evalNumberValue(this.iteration, parse);
        const min       = await evalNumberValue(this.min,       parse);
        const max       = await evalNumberValue(this.max,       parse);
        const bias      = await evalNumberValue(this.bias,      parse);
        const spread    = await evalNumberValue(this.spread,    parse);
        const unique    = await evalNumberValue(this.unique,    parse);
    

        if (   this.options.enabled
            && iteration
            && seed
            && min
            && max
            && bias
            && spread
            && unique)
        {
            if (  !this.random
                || this.random.seed != seed.value)
            {
                this.random       = new Random(seed.value);
                this.randomUnique = new Random(seed.value+1);
            }


            if (iteration.isValid())
                this.currentIteration = Math.round(iteration.value);


            if (this.currentIteration >= 0)
            {
                let f  = this.random.get(this.currentIteration + this.uniqueOffset);

                f = getSpreadBias(f, bias.value, spread.value);
                f = min.value + f * (max.value - min.value);
                
                this.value = new NumberValue(f, Math.max(min.decimals, max.decimals));

                    
                const _unique = unique.value/100;
                

                if (max.value - min.value >= 1)
                {
                    while (this.value.toNumber() == this.lastValue1
                        && this.randomUnique.get(this.currentIteration) < _unique)
                        this.value = new NumberValue(
                            min.value + this.random.get(this.currentIteration + ++this.uniqueOffset) * (max.value - min.value),
                            Math.max(min.decimals, max.decimals));
                }

                if (max.value - min.value >= 2)
                {
                    while ((   this.value.toNumber() == this.lastValue1
                            || this.value.toNumber() == this.lastValue2)
                        && this.randomUnique.get(this.currentIteration) < Math.max(_unique - 1))
                        this.value = new NumberValue(
                            min.value + this.random.get(this.currentIteration + ++this.uniqueOffset) * (max.value - min.value),
                            Math.max(min.decimals, max.decimals));
                }        
            }
            else
                this.value = new NumberValue((min.value + max.value) / 2);
        }
        else
            this.value = NumberValue.NaN();


        // if (this.value.isValid())
        //     this.value.value = this.value.toNumber();

        this.lastValue2 = this.lastValue1;
        this.lastValue1 = this.value.toNumber();


        this.setUpdateValues(parse,
        [
            ['iteration', iteration],
            ['seed',      seed     ],
            ['min',       min      ],
            ['max',       max      ],
            ['bias',      bias     ],
            ['spread',    spread   ],
            ['unique',    unique   ]
        ]);
        

        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return this.seed      && this.seed     .isValid()
            && this.iteration && this.iteration.isValid()
            && this.min       && this.min      .isValid()
            && this.max       && this.max      .isValid()
            && this.bias      && this.bias     .isValid()
            && this.spread    && this.spread   .isValid()
            && this.unique    && this.unique   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed     ) this.seed     .pushValueUpdates(parse);
        if (this.iteration) this.iteration.pushValueUpdates(parse);
        if (this.min      ) this.min      .pushValueUpdates(parse);
        if (this.max      ) this.max      .pushValueUpdates(parse);
        if (this.bias     ) this.bias     .pushValueUpdates(parse);
        if (this.spread   ) this.spread   .pushValueUpdates(parse);
        if (this.unique   ) this.unique   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.seed     ) this.seed     .invalidateInputs(parse, from, force);
        if (this.iteration) this.iteration.invalidateInputs(parse, from, force);
        if (this.min      ) this.min      .invalidateInputs(parse, from, force);
        if (this.max      ) this.max      .invalidateInputs(parse, from, force);
        if (this.bias     ) this.bias     .invalidateInputs(parse, from, force);
        if (this.spread   ) this.spread   .invalidateInputs(parse, from, force);
        if (this.unique   ) this.unique   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed     ) this.seed     .iterateLoop(parse);
        if (this.iteration) this.iteration.iterateLoop(parse);
        if (this.min      ) this.min      .iterateLoop(parse);
        if (this.max      ) this.max      .iterateLoop(parse);
        if (this.bias     ) this.bias     .iterateLoop(parse);
        if (this.spread   ) this.spread   .iterateLoop(parse);
        if (this.unique   ) this.unique   .iterateLoop(parse);
    }



    initLoop(parse, nodeId)
    {
        super.initLoop(parse, nodeId);

        this.uniqueOffset = 0;
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.uniqueOffset = 0;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const rnd = new GRandom(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(rnd, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, rnd);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        rnd.seed      = genParse(parse);
        rnd.iteration = genParse(parse);
        rnd.min       = genParse(parse);
        rnd.max       = genParse(parse);
        rnd.bias      = genParse(parse);
        rnd.spread    = genParse(parse);
        rnd.unique    = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, rnd);
        return rnd;
    }
}
