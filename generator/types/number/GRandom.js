class GRandom
extends GNumberType
{
    seed;
    min;
    max;
    scale;
    interpolate;
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

        if (this.seed       ) copy.seed        = this.seed       .copy();
        if (this.min        ) copy.min         = this.min        .copy();
        if (this.max        ) copy.max         = this.max        .copy();
        if (this.scale      ) copy.scale       = this.scale      .copy();
        if (this.interpolate) copy.interpolate = this.interpolate.copy();
        if (this.offset     ) copy.offset      = this.offset     .copy();
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
        const interpolate = (await this.interpolate.eval(parse)).toValue();
        const offset      = (await this.offset     .eval(parse)).toValue();
        const detail      = (await this.detail     .eval(parse)).toValue();
    

        if (  !this.random
            || this.random.seed != seed.value)
            this.random = new Random(seed.value);


        
        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.iteration : this.iteration;


        
        let   size  = 1;
        let   power = 1;
        
        
        const avg   = (min.value + max.value) / 2;
        let   r;

        
        if (this.options.enabled)
        {
            r = avg;
            
            for (let c = 0; c < detail.value; c++)
            {
                const i = iteration / (scale.toNumber() * size) + offset.toNumber();
                
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
            r = min.avlue;
        }


        this.value = new NumberValue(r, Math.max(min.decimals, max.decimals));


        this.updateValues =
        [
            ['seed',        seed       ],
            ['min',         min        ],
            ['max',         max        ],
            ['scale',       scale      ],
            ['interpolate', interpolate],
            ['offset',      offset     ],
            ['detail',      detail     ]
        ];
        

        this.validate();

        return this;
    }



    pushUpdateValues(parse)
    {
        super.pushUpdateValues(parse);

        if (this.seed       ) this.seed       .pushUpdateValues(parse);
        if (this.min        ) this.min        .pushUpdateValues(parse);
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
        if (this.min        ) this.min        .invalidateInputs(from);
        if (this.max        ) this.max        .invalidateInputs(from);
        if (this.scale      ) this.scale      .invalidateInputs(from);
        if (this.interpolate) this.interpolate.invalidateInputs(from);
        if (this.offset     ) this.offset     .invalidateInputs(from);
        if (this.detail     ) this.detail     .invalidateInputs(from);
    }
}
