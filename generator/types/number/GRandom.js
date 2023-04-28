class GRandom
extends GNumberType
{
    seed;
    min;
    max;

    random = null;


    init         = false;

    repeaNodetId = NULL;



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
    

        if (!this.init)
        {
            this.random = new Random(seed.value);
            this.init   = true;
        }

        
        this.value = new NumberValue(
            min.value + this.random.next() * (max.value - min.value),
            Math.max(min.decimals, max.decimals));


        if (  !parse.repeats.find(r => r.nodeId == this.repeatNodeId)
            || parse.repeats.at(-1).nodeId == this.repeatNodeId)
        {
            if (!isEmpty(parse.repeats))
            {
                const repeat = parse.repeats.at(-1);

                if (repeat.iteration == repeat.total-1)
                {
                    console.assert(
                        parse.repeats.at(-1).nodeId == this.repeatNodeId, 
                        'nested repeat error');

                    parse.repeats.pop();
                }
            }
        }


        genPushUpdateValue(parse, this.nodeId, 'seed',  seed);
        genPushUpdateValue(parse, this.nodeId, 'min',   min );
        genPushUpdateValue(parse, this.nodeId, 'max',   max );
        

        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.seed) this.seed.invalidate();
        if (this.min ) this.min .invalidate();
        if (this.max ) this.max .invalidate();
    }
}
