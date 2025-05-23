class GLayerBlend
extends GOperator
{
    static { GNode.types[LAYER_BLEND] = this; }



    opacity;
    blend;



    constructor(nodeId, options)
    {
        super(LAYER_BLEND, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.opacity = null;
        this.blend   = null;
    }



    copy()
    {
        const copy = new GLayerBlend(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.opacity) copy.opacity = this.opacity.copy();
        if (this.blend  ) copy.blend   = this.blend  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const opacity = await evalNumberValue(this.opacity, parse);
        const blend   = await evalNumberValue(this.blend,   parse);


        this.value = 
            this.options.enabled
            ? new LayerBlendValue(opacity, blend)
            : new LayerBlendValue(new NumberValue(100), new NumberValue(0));


        this.setUpdateValues(parse, 
        [
            ['opacity', opacity],
            ['blend',   blend  ]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return this.opacity && this.opacity.isValid()
            && this.blend   && this.blend  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.opacity) this.opacity.pushValueUpdates(parse);
        if (this.blend  ) this.blend  .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.opacity) this.opacity.invalidateInputs(parse, from, force);
        if (this.blend  ) this.blend  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.opacity) this.opacity.iterateLoop(parse);
        if (this.blend  ) this.blend  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const layer = new GLayerBlend(nodeId, options);


        if (parse.settings.logRequests) 
            logReq(layer, parse, ignore);


        if (ignore)
        {
            genParseNodeEnd(parse, layer);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        layer.opacity = genParse(parse);
        layer.blend   = genParse(parse);
        
        
        genParseNodeEnd(parse, layer);
        return layer;
    }
}