class GLayerTexture
extends GOperator1
{
    static { GNode.types[LAYER_TEXTURE] = this; }



    size        = null;
    radius      = null;
    clipToShape = null;



    constructor(nodeId, options)
    {
        super(LAYER_TEXTURE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.size        = null;
        this.radius      = null;
        this.clipToShape = null;
    }



    copy()
    {
        const copy = new GLayerBlurProgressive(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.size       ) copy.size        = this.size       .copy();
        if (this.radius     ) copy.radius      = this.radius     .copy();
        if (this.clipToShape) copy.clipToShape = this.clipToShape.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input       = await evalLayerTextureValue(this.input,       parse);

        const size        = await evalNumberValue      (this.size,        parse);
        const radius      = await evalNumberValue      (this.radius,      parse);
        const clipToShape = await evalNumberValue      (this.clipToShape, parse);

        
        if (input)
        {
            this.value = new LayerTextureValue(
                size        ?? input.size,
                radius      ?? input.radius,
                clipToShape ?? input.clipToShape,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerTextureValue(
                size,
                radius,
                clipToShape,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['size',        this.value.size       ],
            ['radius',      this.value.radius     ],
            ['clipToShape', this.value.clipToShape]
        ]);
        

        if (!this.size       ) this.size        = this.value.size       .copy();
        if (!this.radius     ) this.radius      = this.value.radius     .copy();
        if (!this.clipToShape) this.clipToShape = this.value.clipToShape.copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new LayerTextureValue(
            this.size        ? this.size       .toNewValue() : this.input.size       .toNewValue(),
            this.radius      ? this.radius     .toNewValue() : this.input.radius     .toNewValue(),
            this.clipToShape ? this.clipToShape.toNewValue() : this.input.clipToShape.toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.size        && this.size       .isValid()
            && this.radius      && this.radius     .isValid()
            && this.clipToShape && this.clipToShape.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.size       ) this.size       .pushValueUpdates(parse);
        if (this.radius     ) this.radius     .pushValueUpdates(parse);
        if (this.clipToShape) this.clipToShape.pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.size       ) this.size       .invalidateInputs(parse, from, force);
        if (this.radius     ) this.radius     .invalidateInputs(parse, from, force);
        if (this.clipToShape) this.clipToShape.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.size       ) this.size       .iterateLoop(parse);
        if (this.radius     ) this.radius     .iterateLoop(parse);
        if (this.clipToShape) this.clipToShape.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const texture = new GLayerTexture(nodeId, options);
    
        texture.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(texture, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, texture);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            texture.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
            paramIds = ['size', 'radius', 'clipToShape'];
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'size':        texture.size        = genParse(parse); break;
            case 'radius':      texture.radius      = genParse(parse); break;
            case 'clipToShape': texture.clipToShape = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, texture);
        return texture;
    }
}