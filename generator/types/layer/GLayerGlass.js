class GLayerGlass
extends GOperator1
{
    static { GNode.types[LAYER_GLASS] = this; }



    intensity  = null;
    angle      = null;
    refraction = null;
    depth      = null;
    dispersion = null;
    radius     = null;



    constructor(nodeId, options)
    {
        super(LAYER_GLASS, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.intensity  = null;
        this.angle      = null;
        this.refraction = null;
        this.depth      = null;
        this.dispersion = null;
        this.radius     = null;
    }



    copy()
    {
        const copy = new GLayerBlurProgressive(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.intensity ) copy.intensity  = this.intensity .copy();
        if (this.angle     ) copy.angle      = this.angle     .copy();
        if (this.refraction) copy.refraction = this.refraction.copy();
        if (this.depth     ) copy.depth      = this.depth     .copy();
        if (this.dispersion) copy.dispersion = this.dispersion.copy();
        if (this.radius    ) copy.radius     = this.radius    .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input      = await evalLayerGlassValue  (this.input,      parse);

        const intensity  = await evalNumberValue      (this.intensity,  parse);
        const angle      = await evalNumberValue      (this.angle,      parse);
        const refraction = await evalNumberValue      (this.refraction, parse);
        const depth      = await evalNumberValue      (this.depth,      parse);
        const dispersion = await evalNumberValue      (this.dispersion, parse);
        const radius     = await evalNumberValue      (this.radius,     parse);

        
        if (input)
        {
            this.value = new LayerGlassValue(
                intensity  ?? input.intensity,
                angle      ?? input.angle,
                refraction ?? input.refraction,
                depth      ?? input.depth,
                dispersion ?? input.dispersion,
                radius     ?? input.radius,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerGlassValue(
                intensity,
                angle,
                refraction,
                depth,
                dispersion,
                radius,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['intensity',  this.value.intensity ],
            ['angle',      this.value.angle     ],
            ['refraction', this.value.refraction],
            ['depth',      this.value.depth     ],
            ['dispersion', this.value.dispersion],
            ['radius',     this.value.radius    ]
        ]);
        

        if (!this.intensity ) this.intensity  = this.value.intensity .copy();
        if (!this.angle     ) this.angle      = this.value.angle     .copy();
        if (!this.refraction) this.refraction = this.value.refraction.copy();
        if (!this.depth     ) this.depth      = this.value.depth     .copy();
        if (!this.dispersion) this.dispersion = this.value.dispersion.copy();
        if (!this.radius    ) this.radius     = this.value.radius    .copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new LayerGlassValue(
            this.intensity  ? this.intensity .toNewValue() : this.input.intensity .toNewValue(),
            this.angle      ? this.angle     .toNewValue() : this.input.angle     .toNewValue(),
            this.refraction ? this.refraction.toNewValue() : this.input.refraction.toNewValue(),
            this.depth      ? this.depth     .toNewValue() : this.input.depth     .toNewValue(),
            this.dispersion ? this.dispersion.toNewValue() : this.input.dispersion.toNewValue(),
            this.radius     ? this.radius    .toNewValue() : this.input.radius    .toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.intensity  && this.intensity .isValid()
            && this.angle      && this.angle     .isValid()
            && this.refraction && this.refraction.isValid()
            && this.depth      && this.depth     .isValid()
            && this.dispersion && this.dispersion.isValid()
            && this.radius     && this.radius    .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.intensity ) this.intensity .pushValueUpdates(parse);
        if (this.angle     ) this.angle     .pushValueUpdates(parse);
        if (this.refraction) this.refraction.pushValueUpdates(parse);
        if (this.depth     ) this.depth     .pushValueUpdates(parse);
        if (this.dispersion) this.dispersion.pushValueUpdates(parse);
        if (this.radius    ) this.radius    .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.intensity ) this.intensity .invalidateInputs(parse, from, force);
        if (this.angle     ) this.angle     .invalidateInputs(parse, from, force);
        if (this.refraction) this.refraction.invalidateInputs(parse, from, force);
        if (this.depth     ) this.depth     .invalidateInputs(parse, from, force);
        if (this.dispersion) this.dispersion.invalidateInputs(parse, from, force);
        if (this.radius    ) this.radius    .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.intensity ) this.intensity .iterateLoop(parse);
        if (this.angle     ) this.angle     .iterateLoop(parse);
        if (this.refraction) this.refraction.iterateLoop(parse);
        if (this.depth     ) this.depth     .iterateLoop(parse);
        if (this.dispersion) this.dispersion.iterateLoop(parse);
        if (this.radius    ) this.radius    .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const glass = new GLayerGlass(nodeId, options);
    
        glass.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(glass, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, glass);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            glass.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['intensity', 'angle', 'refraction', 'depth', 'dispersion', 'radius'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'intensity':  glass.intensity  = genParse(parse); break;
            case 'angle':      glass.angle      = genParse(parse); break;
            case 'refraction': glass.refraction = genParse(parse); break;
            case 'depth':      glass.depth      = genParse(parse); break;
            case 'dispersion': glass.dispersion = genParse(parse); break;
            case 'radius':     glass.radius     = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, glass);
        return glass;
    }
}