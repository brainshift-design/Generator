class GWave
extends GOperator
{
    static { nodeTypes[NUMBER_WAVE] = this; }



    shape     = null;
    base      = null;
    amplitude = null;
    frequency = null;
    offset    = null;
    bias      = null;
    
    useWavelength;
    offsetAbsolute;



    constructor(nodeId, options)
    {
        super(NUMBER_WAVE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.shape     = null;
        this.base      = null;
        this.amplitude = null;
        this.frequency = null;
        this.offset    = null;
        this.bias      = null;
    }



    copy()
    {
        const copy = new GWave(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.shape    ) copy.shape     = this.shape    .copy();
        if (this.base     ) copy.base      = this.base     .copy();
        if (this.amplitude) copy.amplitude = this.amplitude.copy();
        if (this.frequency) copy.frequency = this.frequency.copy();
        if (this.offset   ) copy.offset    = this.offset   .copy();
        if (this.bias     ) copy.bias      = this.bias     .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        const shape  = await evalNumberValue(this.shape,     parse);
        const base   = await evalNumberValue(this.base,      parse);
        const amp    = await evalNumberValue(this.amplitude, parse);
        let   freq   = await evalNumberValue(this.frequency, parse);
        const offset = await evalNumberValue(this.offset,    parse);
        const bias   = await evalNumberValue(this.bias,      parse);
    

        const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
        const iteration = repeat ? repeat.currentIteration : 0;

 
        if (this.options.enabled)
        {
            let t;
            
            
            if (   repeat
                && shape
                && freq
                && offset)
            {
                const _freq =
                    this.useWavelength
                    ? repeat.total / nozero(freq.value)
                    : freq.value;

                let _offset =
                    this.offsetAbsolute
                    ? offset.value/repeat.total
                    : (offset.value/100)/_freq;

                if (shape.value == 3)
                    _offset -= 0.25;

                t = (iteration/repeat.total - _offset) * _freq;

                while (t < 0) t++;
                while (t > 1) t--;

                switch (shape.value)
                {
                    case 0: t = (t%1) < 0.5 ? 1 : -1;      break; // square
                    case 1: t = (1 - (t%1)*2);             break; // saw
                    case 2: t = ((t%1)*2 - 1);             break; // back saw
                    case 3: t = 1 - 2*Math.abs(2*(t%1)-1); break; // triangle
                    case 4: t = Math.sin(t * Tau);         break; // sine
                }
            }
            else 
                t = 0;

            
            if (bias)
            {
                const b = bias.value / 100;

                if (b >= 0) t = t / (1+b) + b/2;
                else        t = t / (1-b) + b/2;
            }


            if (amp ) t = t * amp .value;
            if (base) t = t + base.value;


            this.value = new NumberValue(
                t, 
                Math.max(
                    base  .decimals, 
                    amp   .decimals, 
                    freq  .decimals, 
                    offset.decimals, 
                    bias  .decimals));
        }
        else
            this.value = base.copy();
        

        this.setUpdateValues(parse,
        [
            ['shape',     shape ],
            ['base',      base  ],
            ['amplitude', amp   ],
            ['frequency', freq  ],
            ['offset',    offset],
            ['bias',      bias  ]
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
        return this.shape     && this.shape    .isValid()
            && this.base      && this.base     .isValid()
            && this.amplitude && this.amplitude.isValid()
            && this.frequency && this.frequency.isValid()
            && this.offset    && this.offset   .isValid()
            && this.bias      && this.bias     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.shape    ) this.shape    .pushValueUpdates(parse);
        if (this.base     ) this.base     .pushValueUpdates(parse);
        if (this.amplitude) this.amplitude.pushValueUpdates(parse);
        if (this.frequency) this.frequency.pushValueUpdates(parse);
        if (this.offset   ) this.offset   .pushValueUpdates(parse);
        if (this.bias     ) this.bias     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.shape    ) this.shape    .invalidateInputs(parse, from, force);
        if (this.base     ) this.base     .invalidateInputs(parse, from, force);
        if (this.amplitude) this.amplitude.invalidateInputs(parse, from, force);
        if (this.frequency) this.frequency.invalidateInputs(parse, from, force);
        if (this.offset   ) this.offset   .invalidateInputs(parse, from, force);
        if (this.bias     ) this.bias     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.shape    ) this.shape    .iterateLoop(parse);
        if (this.base     ) this.base     .iterateLoop(parse);
        if (this.amplitude) this.amplitude.iterateLoop(parse);
        if (this.frequency) this.frequency.iterateLoop(parse);
        if (this.offset   ) this.offset   .iterateLoop(parse);
        if (this.bias     ) this.bias     .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const wave = new GWave(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(wave, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, wave);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        wave.shape     = genParse(parse);
        wave.base      = genParse(parse);
        wave.amplitude = genParse(parse);
        wave.frequency = genParse(parse);
        wave.offset    = genParse(parse);
        wave.bias      = genParse(parse);
    
    
        wave.useWavelength  = parseInt(parse.move()) > 0;
        wave.offsetAbsolute = parseInt(parse.move()) > 0;
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, wave);
        return wave;
    }
}
