class GNoise
extends GOperator
{
    seed;
    min;
    max;
    scale;
    interpolate;
    offset;
    detail;

    random = null;



    constructor(nodeId, options)
    {
        super(NUMBER_NOISE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNoise(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.seed       ) copy.seed        = this.seed       .copy();
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
        if (this.isCached())
            return this;


        const seed        = (await this.seed       .eval(parse)).toValue();
        const min         = (await this.min        .eval(parse)).toValue();
        const max         = (await this.max        .eval(parse)).toValue();
        const scale       = (await this.scale      .eval(parse)).toValue();
        const offset      = (await this.offset     .eval(parse)).toValue();
        const interpolate = (await this.interpolate.eval(parse)).toValue();
        const detail      = (await this.detail     .eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
            this.random = new Random(seed.value);

        
        let size  = 1;
        let power = 1;
        
        const avg = (min.value + max.value) / 2;
        let   r;

        
        if (   this.options.enabled
            && scale
            && offset)
        {
            r = avg;
            
            for (let c = 0; c < detail.value; c++)
            {
                const i = this.iteration / (scale.value * size) + offset.value;
                
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
        else
        {
            r = min.value;
        }


        this.value = new NumberValue(r, Math.max(min.decimals, max.decimals));


        this.setUpdateValues(parse,
        [
            ['seed',        seed       ],
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
        if (this.min        ) this.min        .pushValueUpdates(parse);
        if (this.max        ) this.max        .pushValueUpdates(parse);
        if (this.scale      ) this.scale      .pushValueUpdates(parse);
        if (this.offset     ) this.offset     .pushValueUpdates(parse);
        if (this.interpolate) this.interpolate.pushValueUpdates(parse);
        if (this.detail     ) this.detail     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.seed       ) this.seed       .invalidateInputs(parse, from);
        if (this.min        ) this.min        .invalidateInputs(parse, from);
        if (this.max        ) this.max        .invalidateInputs(parse, from);
        if (this.scale      ) this.scale      .invalidateInputs(parse, from);
        if (this.offset     ) this.offset     .invalidateInputs(parse, from);
        if (this.interpolate) this.interpolate.invalidateInputs(parse, from);
        if (this.detail     ) this.detail     .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.seed       ) this.seed       .iterateLoop(parse);
        if (this.min        ) this.min        .iterateLoop(parse);
        if (this.max        ) this.max        .iterateLoop(parse);
        if (this.scale      ) this.scale      .iterateLoop(parse);
        if (this.offset     ) this.offset     .iterateLoop(parse);
        if (this.interpolate) this.interpolate.iterateLoop(parse);
        if (this.detail     ) this.detail     .iterateLoop(parse);
    }
}
