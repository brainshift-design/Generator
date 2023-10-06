class GLayerBlend
extends GOperator
{
    opacity;
    blend;



    constructor(nodeId, options)
    {
        super(LAYER_BLEND, nodeId, options);
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
``

        const opacity = (await this.opacity.eval(parse)).toValue();
        const blend   = (await this.blend  .eval(parse)).toValue();


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



    toValue()
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
    
    
    
    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.opacity) this.opacity.invalidateInputs(parse, from);
        if (this.blend  ) this.blend  .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.opacity) this.opacity.iterateLoop(parse);
        if (this.blend  ) this.blend  .iterateLoop(parse);
    }
}