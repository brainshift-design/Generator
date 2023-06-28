class GRandom
extends GNumberType
{
    seed;
    min;
    max;
    scale;
    offset;
    detail;

    random = null;


    loopId = NULL;



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
        if (this.scale ) copy.scale  = this.scale .copy();
        if (this.offset) copy.offset = this.offset.copy();
        if (this.detail) copy.detail = this.detail.copy();

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
        const scale  = (await this.scale .eval(parse)).toValue();
        const offset = (await this.offset.eval(parse)).toValue();
        const detail = (await this.detail.eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
            this.random = new Random(seed.value);


        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;

        
        this.value = new NumberValue(
            min.value + (this.options.enabled ? this.random.get(iteration) * (max.value - min.value) : 0),
            Math.max(min.decimals, max.decimals));


        this.updateValues =
        [
            ['seed',   seed  ],
            ['min',    min   ],
            ['max',    max   ],
            ['scale',  scale ],
            ['offset', offset],
            ['detail', detail]
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
        if (this.scale ) this.scale .pushUpdateValues(parse);
        if (this.offset) this.offset.pushUpdateValues(parse);
        if (this.detail) this.detail.pushUpdateValues(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.seed  ) this.seed  .invalidateInputs(from);
        if (this.min   ) this.min   .invalidateInputs(from);
        if (this.max   ) this.max   .invalidateInputs(from);
        if (this.scale ) this.scale .invalidateInputs(from);
        if (this.offset) this.offset.invalidateInputs(from);
        if (this.detail) this.detail.invalidateInputs(from);
    }
}
