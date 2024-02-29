class GNoise
extends GOperator
{
    seed        = null;
    iteration   = null;
    min         = null;
    max         = null;
    scale       = null;
    interpolate = null;
    offset      = null;
    detail      = null;
    
    random = null;
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_NOISE, nodeId, options);
    }
    
    
    
    reset()
    {
        super.reset();
        
        this.seed        = null;
        this.iteration   = null;
        this.min         = null;
        this.max         = null;
        this.scale       = null;
        this.interpolate = null;
        this.offset      = null;
        this.detail      = null;
    }



    copy()
    {
        const copy = new GNoise(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed       ) copy.seed        = this.seed       .copy();
        if (this.iteration  ) copy.iteration   = this.iteration  .copy();
        if (this.min        ) copy.min         = this.min        .copy();
        if (this.max        ) copy.max         = this.max        .copy();
        if (this.scale      ) copy.scale       = this.scale      .copy();
        if (this.offset     ) copy.offset      = this.offset     .copy();
        if (this.interpolate) copy.interpolate = this.interpolate.copy();
        if (this.detail     ) copy.detail      = this.detail     .copy();

        if (this.random     ) copy.random      = this.random     .copy();

        return copy;
    }



    async eval(parse)
    {
        // const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        // const iteration = repeat ? repeat.currentIteration : 0;


        if (this.isCached())
            return this;


        const seed        = this.seed        ? (await this.seed       .eval(parse)).toValue() : null;
        const iteration   = this.iteration   ? (await this.iteration  .eval(parse)).toValue() : null;
        const min         = this.min         ? (await this.min        .eval(parse)).toValue() : null;
        const max         = this.max         ? (await this.max        .eval(parse)).toValue() : null;
        const scale       = this.scale       ? (await this.scale      .eval(parse)).toValue() : null;
        const offset      = this.offset      ? (await this.offset     .eval(parse)).toValue() : null;
        const interpolate = this.interpolate ? (await this.interpolate.eval(parse)).toValue() : null;
        const detail      = this.detail      ? (await this.detail     .eval(parse)).toValue() : null;
    

        if (   this.options.enabled
            && seed
            && iteration
            && min
            && max
            && scale
            && offset
            && interpolate
            && detail)
        {
            if (  !this.random
                || this.random.seed != seed.value)
                this.random = new Random(seed.value);


            let size  = 1;
            let power = 1;
            
            const avg = (min.value + max.value) / 2;
            let   r;

            
            if (iteration.isValid())
                this.currentIteration = Math.round(iteration.value);

                
            if (   this.options.enabled
                && scale
                && offset)
            {
                r = avg;
                
                if (this.currentIteration >= 0)
                {
                    for (let c = 0; c < detail.value; c++)
                    {
                        const i  = this.currentIteration / (Math.max(0.000001, scale.value) * size) + offset.value;
                        
                        const i0 = Math.floor(i);
                        const i1 = Math.ceil (i);

                        const r0 = this.random.get(i0);
                        const r1 = this.random.get(i1);


                        let _r;
                        
                        switch (interpolate.value)
                        {
                            case 0: _r = power * r0;                                                 break;
                            case 1: _r = power * lerp(r0, r1, i-i0);                                 break;
                            case 2: _r = power * (r0 + (r1 - r0) * (-Math.cos((i-i0)*Tau/2) + 1)/2); break;
                        }

                        r += 
                            - power * (avg       - min.value)
                            + _r    * (max.value - min.value);


                        size  /= 2;
                        power /= 2;
                    }
                }
            }
            else
            {
                r = min.value;
            }


            this.value = new NumberValue(r, Math.max(min.decimals, max.decimals));
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['seed',        seed       ],
            ['iteration',   iteration  ],
            ['min',         min        ],
            ['max',         max        ],
            ['scale',       scale      ],
            ['offset',      offset     ],
            ['interpolate', interpolate],
            ['detail',      detail     ]
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
        return this.seed        && this.seed       .isValid()
            && this.iteration   && this.iteration  .isValid()
            && this.min         && this.min        .isValid()
            && this.max         && this.max        .isValid()
            && this.scale       && this.scale      .isValid()
            && this.offset      && this.offset     .isValid()
            && this.interpolate && this.interpolate.isValid()
            && this.detail      && this.detail     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.seed       ) this.seed       .pushValueUpdates(parse);
        if (this.iteration  ) this.iteration  .pushValueUpdates(parse);
        if (this.min        ) this.min        .pushValueUpdates(parse);
        if (this.max        ) this.max        .pushValueUpdates(parse);
        if (this.scale      ) this.scale      .pushValueUpdates(parse);
        if (this.offset     ) this.offset     .pushValueUpdates(parse);
        if (this.interpolate) this.interpolate.pushValueUpdates(parse);
        if (this.detail     ) this.detail     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.seed       ) this.seed       .invalidateInputs(parse, from, force);
        if (this.iteration  ) this.iteration  .invalidateInputs(parse, from, force);
        if (this.min        ) this.min        .invalidateInputs(parse, from, force);
        if (this.max        ) this.max        .invalidateInputs(parse, from, force);
        if (this.scale      ) this.scale      .invalidateInputs(parse, from, force);
        if (this.offset     ) this.offset     .invalidateInputs(parse, from, force);
        if (this.interpolate) this.interpolate.invalidateInputs(parse, from, force);
        if (this.detail     ) this.detail     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed       ) this.seed       .iterateLoop(parse);
        if (this.iteration  ) this.iteration  .iterateLoop(parse);
        if (this.min        ) this.min        .iterateLoop(parse);
        if (this.max        ) this.max        .iterateLoop(parse);
        if (this.scale      ) this.scale      .iterateLoop(parse);
        if (this.offset     ) this.offset     .iterateLoop(parse);
        if (this.interpolate) this.interpolate.iterateLoop(parse);
        if (this.detail     ) this.detail     .iterateLoop(parse);
    }
}
