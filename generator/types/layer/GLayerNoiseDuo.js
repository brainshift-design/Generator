class GLayerNoiseDuo
extends GOperator1
{
    static { GNode.types[LAYER_NOISE_DUO] = this; }



    size    = null;
    density = null;
    fill1   = null;
    fill2   = null;
    blend   = null;



    constructor(nodeId, options)
    {
        super(LAYER_NOISE_DUO, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.size    = null;
        this.density = null;
        this.fill1   = null;
        this.fill2   = null;
        this.blend   = null;
    }



    copy()
    {
        const copy = new GLayerNoiseDuo(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.size   ) copy.size    = this.size   .copy();
        if (this.density) copy.density = this.density.copy();
        if (this.fill1  ) copy.fill1   = this.fill1  .copy();
        if (this.fill2  ) copy.fill2   = this.fill2  .copy();
        if (this.blend  ) copy.blend   = this.blend  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalLayerNoiseDuoValue(this.input,       parse);

        const size    = await evalNumberValue(this.size,    parse);
        const density = await evalNumberValue(this.density, parse);
        const fill1   = await evalFillValue  (this.fill1,   parse);
        const fill2   = await evalFillValue  (this.fill2,   parse);
        const blend   = await evalNumberValue(this.blend,   parse);

        
        if (input)
        {
            this.value = new LayerNoiseDuoValue(
                size    ?? input.size,
                density ?? input.density,
                fill1   ?? input.fill1,
                fill2   ?? input.fill2,
                blend   ?? input.blend,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerNoiseDuoValue(
                size,
                density,
                fill1,
                fill2,
                blend,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['size',    this.value.size   ],
            ['density', this.value.density],
            ['fill1',   this.value.fill1  ],
            ['fill2',   this.value.fill2  ],
            ['blend',   this.value.blend  ]
        ]);
        

        if (!this.size   ) this.size    = this.value.size   .copy();
        if (!this.density) this.density = this.value.density.copy();
        if (!this.fill1  ) this.fill1   = this.value.fill1  .copy();
        if (!this.fill2  ) this.fill2   = this.value.fill2  .copy();
        if (!this.blend  ) this.blend   = this.value.blend  .copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new LayerNoiseDuoValue(
            this.size    ? this.size   .toNewValue() : this.input.size   .toNewValue(),
            this.density ? this.density.toNewValue() : this.input.density.toNewValue(),
            this.fill1   ? this.fill1  .toNewValue() : this.input.fill1  .toNewValue(),
            this.fill2   ? this.fill2  .toNewValue() : this.input.fill2  .toNewValue(),
            this.blend   ? this.blend  .toNewValue() : this.input.blend  .toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.size    && this.size   .isValid()
            && this.density && this.density.isValid()
            && this.fill1   && this.fill1  .isValid()
            && this.fill2   && this.fill2  .isValid()
            && this.blend   && this.blend  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.size   ) this.size   .pushValueUpdates(parse);
        if (this.density) this.density.pushValueUpdates(parse);
        if (this.fill1  ) this.fill1  .pushValueUpdates(parse);
        if (this.fill2  ) this.fill2  .pushValueUpdates(parse);
        if (this.blend  ) this.blend  .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.size   ) this.size   .invalidateInputs(parse, from, force);
        if (this.density) this.density.invalidateInputs(parse, from, force);
        if (this.fill1  ) this.fill1  .invalidateInputs(parse, from, force);
        if (this.fill2  ) this.fill2  .invalidateInputs(parse, from, force);
        if (this.blend  ) this.blend  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.size   ) this.size   .iterateLoop(parse);
        if (this.density) this.density.iterateLoop(parse);
        if (this.fill1  ) this.fill1  .iterateLoop(parse);
        if (this.fill2  ) this.fill2  .iterateLoop(parse);
        if (this.blend  ) this.blend  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const noise = new GLayerNoiseDuo(nodeId, options);
    
        noise.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(noise, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, noise);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            noise.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['size', 'density', 'fill1', 'fill2', 'blend'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'size':    noise.size    = genParse(parse); break;
            case 'density': noise.density = genParse(parse); break;
            case 'fill1':   noise.fill1   = genParse(parse); break;
            case 'fill2':   noise.fill2   = genParse(parse); break;
            case 'blend':   noise.blend   = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, noise);
        return noise;
    }
} 