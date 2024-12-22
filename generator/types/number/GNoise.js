class GNoise
extends GOperator
{
    static { GNode.types[NUMBER_NOISE] = this; }



    seed        = null;
    iteration   = null;
    min         = null;
    max         = null;
    scale       = null;
    interpolate = null;
    offset      = null;
    evolve      = null;
    detail      = null;
    
    randoms     = [];
    offsets     = [];
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_NOISE, nodeId, options);
    }
    
    
    
    reset()
    {
        super.reset();
        
        this.seed          = null;
        this.iteration     = null;
        this.min           = null;
        this.max           = null;
        this.scale         = null;
        this.interpolate   = null;
        this.offset        = null;
        this.evolve        = null;
        this.detail        = null;
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
        if (this.evolve     ) copy.evolve      = this.evolve     .copy();
        if (this.interpolate) copy.interpolate = this.interpolate.copy();
        if (this.detail     ) copy.detail      = this.detail     .copy();

        if (this.randoms    ) copy.randoms     = this.randoms.map(r => r.copy());
        if (this.offsets    ) copy.offsets     = this.offsets.slice();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const seed        = await evalNumberValue(this.seed,        parse);
        const iteration   = await evalNumberValue(this.iteration,   parse);
        const min         = await evalNumberValue(this.min,         parse);
        const max         = await evalNumberValue(this.max,         parse);
        const scale       = await evalNumberValue(this.scale,       parse);
        const offset      = await evalNumberValue(this.offset,      parse);
        const evolve      = await evalNumberValue(this.evolve,      parse);
        const interpolate = await evalNumberValue(this.interpolate, parse);
        const detail      = await evalNumberValue(this.detail,      parse);
    

        if (   this.options.enabled
            && seed
            && iteration
            && min
            && max
            && scale
            && offset
            && evolve
            && interpolate
            && detail)
        {
            const _detail = Math.max(1, Math.ceil(detail.value));


            if (  !this.randoms
                || this.randoms.length < _detail)
            {
                const randoms = new Array(_detail);

                for (let c = 0; c < this.randoms.length; c++)
                    randoms[c] = this.randoms[c];
                

                let _seed = seed.value;

                for (let c = this.randoms.length; c < _detail; c++)
                {
                    randoms[c] = new Random2(_seed);
                    _seed = seed.value;
                }


                this.randoms = randoms;


                this.updateOffsets(this.randoms[0].width * _detail);
            }


            let   size  = 1;
            let   power = 1;
            
            const avg   = (min.value + max.value) / 2;
            let   r;

            
            if (iteration.isValid())
                this.currentIteration = Math.round(iteration.value);
                

            if (   this.options.enabled
                && scale  && scale .isValid()
                && offset && offset.isValid()
                && evolve && evolve.isValid())
            {
                scale.decimals = Math.min(scale.decimals, 4);
                
                r = avg;
                
                if (this.currentIteration >= 0)
                {
                    for (let c = 0; c < _detail; c++)
                    {
                        const i  = Math.max(0, this.currentIteration / (Math.max(0.000001, scale.value) * size) + offset.value);
                        const i0 = Math.floor(i);
                        const i1 = Math.ceil (i);
                        

                        this.updateOffsets((i1 + 1) * _detail);//this.randoms[0].width * _detail

                        const o0 = this.offsets[i0];
                        const o1 = this.offsets[i1];
                        let   _o;

                        switch (interpolate.value)
                        {
                            case 0: _o = o0;                                                 break;
                            case 1: _o = lerp(o0, o1, i-i0);                                 break;
                            case 2: _o = (o0 + (o1 - o0) * (-Math.cos((i-i0)*Tau/2) + 1)/2); break;
                        }

                        
                        const j   = evolve.value + _o;
                        const j0  = Math.floor(j);
                        const j1  = Math.ceil (j);


                        const r00 = this.randoms[c].get(i0, j0);
                        const r10 = this.randoms[c].get(i1, j0);
                        const r01 = this.randoms[c].get(i0, j1);
                        const r11 = this.randoms[c].get(i1, j1);
            

                        let _r, _r0, _r1;
                        
                        switch (interpolate.value)
                        {
                            case 0: 
                                _r = r00;
                                break;

                            case 1: 
                                _r0 = lerp(r00, r10, i-i0);
                                _r1 = lerp(r01, r11, i-i0);
                                _r  = lerp(_r0, _r1, j-j0);
                                break;

                            case 2: 
                                _r0 = (r00 + (r10 - r00) * (-Math.cos((i-i0)*Tau/2) + 1)/2); 
                                _r1 = (r01 + (r11 - r01) * (-Math.cos((i-i0)*Tau/2) + 1)/2); 
                                _r  = (_r0 + (_r1 - _r0) * (-Math.cos((j-j0)*Tau/2) + 1)/2); 
                                break;
                        }


                        const clamp = 
                            detail.value - c < 1 
                            ? detail.value - c 
                            : 1;

                        r += 
                            - power *      (avg       - min.value) * clamp
                            + power * _r * (max.value - min.value) * clamp;
                        

                        size  /= 2;
                        power /= 2;

                        
                        this.updateOffsets(this.randoms[0].width * _detail);
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
        {
            this.value = NumberValue.NaN();
        }


        this.setUpdateValues(parse,
        [
            ['seed',        seed       ],
            ['iteration',   iteration  ],
            ['min',         min        ],
            ['max',         max        ],
            ['scale',       scale      ],
            ['offset',      offset     ],
            ['evolve',      evolve     ],
            ['interpolate', interpolate],
            ['detail',      detail     ]
        ]);
        

        this.validate();

        return this;
    }



    updateOffsets(newSize)
    {
        if (newSize < this.offsets.length) 
            return;

        this.offsets = new Array(newSize);
        const offsetRandom = new Random(0);

        for (let o = 0; o < newSize; o++)
            this.offsets[o] = offsetRandom.get(o);
    }



    toNewValue()
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
            && this.evolve      && this.evolve     .isValid()
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
        if (this.evolve     ) this.evolve     .pushValueUpdates(parse);
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
        if (this.evolve     ) this.evolve     .invalidateInputs(parse, from, force);
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
        if (this.evolve     ) this.evolve     .iterateLoop(parse);
        if (this.interpolate) this.interpolate.iterateLoop(parse);
        if (this.detail     ) this.detail     .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const noise = new GNoise(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(noise, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, noise);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        noise.seed        = genParse(parse);
        noise.iteration   = genParse(parse);
        noise.min         = genParse(parse);
        noise.max         = genParse(parse);
        noise.scale       = genParse(parse);
        noise.offset      = genParse(parse);
        noise.evolve      = genParse(parse);
        noise.interpolate = genParse(parse);
        noise.detail      = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, noise);
        return noise;
    }
}
