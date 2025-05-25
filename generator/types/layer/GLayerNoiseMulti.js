class GLayerNoiseMulti
extends GOperator1
{
    static { GNode.types[LAYER_NOISE_MULTI] = this; }



    size    = null;
    density = null;
    opacity = null;
    blend   = null;



    constructor(nodeId, options)
    {
        super(LAYER_NOISE_MULTI, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.size    = null;
        this.density = null;
        this.opacity = null;
        this.blend   = null;
    }



    copy()
    {
        const copy = new GLayerNoiseMulti(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.size   ) copy.size    = this.size   .copy();
        if (this.density) copy.density = this.density.copy();
        if (this.opacity) copy.opacity = this.opacity.copy();
        if (this.blend  ) copy.blend   = this.blend  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalLayerNoiseMultiValue(this.input,       parse);

        const size    = await evalNumberValue(this.size,    parse);
        const density = await evalNumberValue(this.density, parse);
        const opacity = await evalNumberValue(this.opacity, parse);
        const blend   = await evalNumberValue(this.blend,   parse);

        
        if (input)
        {
            this.value = new LayerNoiseMultiValue(
                size    ?? input.size,
                density ?? input.density,
                opacity ?? input.opacity,
                blend   ?? input.blend,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerNoiseMultiValue(
                size,
                density,
                opacity,
                blend,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['size',    this.value.size   ],
            ['density', this.value.density],
            ['opacity', this.value.opacity],
            ['blend',   this.value.blend  ]
        ]);
        

        if (!this.size   ) this.size    = this.value.size   .copy();
        if (!this.density) this.density = this.value.density.copy();
        if (!this.opacity) this.opacity = this.value.opacity.copy();
        if (!this.blend  ) this.blend   = this.value.blend  .copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new LayerNoiseMultiValue(
            this.size    ? this.size   .toNewValue() : this.input.size   .toNewValue(),
            this.density ? this.density.toNewValue() : this.input.density.toNewValue(),
            this.opacity ? this.opacity.toNewValue() : this.input.opacity.toNewValue(),
            this.blend   ? this.blend  .toNewValue() : this.input.blend  .toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.size    && this.size   .isValid()
            && this.density && this.density.isValid()
            && this.opacity && this.opacity.isValid()
            && this.blend   && this.blend  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.size   ) this.size   .pushValueUpdates(parse);
        if (this.density) this.density.pushValueUpdates(parse);
        if (this.opacity) this.opacity.pushValueUpdates(parse);
        if (this.blend  ) this.blend  .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.size   ) this.size   .invalidateInputs(parse, from, force);
        if (this.density) this.density.invalidateInputs(parse, from, force);
        if (this.opacity) this.opacity.invalidateInputs(parse, from, force);
        if (this.blend  ) this.blend  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.size   ) this.size   .iterateLoop(parse);
        if (this.density) this.density.iterateLoop(parse);
        if (this.opacity) this.opacity.iterateLoop(parse);
        if (this.blend  ) this.blend  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const noise = new GLayerNoiseMulti(nodeId, options);
    
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
            paramIds = ['size', 'density', 'opacity', 'blend'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'size':    noise.size    = genParse(parse); break;
            case 'density': noise.density = genParse(parse); break;
            case 'opacity': noise.opacity = genParse(parse); break;
            case 'blend':   noise.blend   = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, noise);
        return noise;
    }
} 