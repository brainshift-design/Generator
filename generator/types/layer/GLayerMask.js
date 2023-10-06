class GLayerMask
extends GOperator
{
    maskType;



    constructor(nodeId, options)
    {
        super(LAYER_MASK, nodeId, options);
    }



    copy()
    {
        const copy = new GLayerMask(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.maskType) copy.maskType = this.maskType.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const maskType = (await this.maskType.eval(parse)).toValue();


        this.value = new LayerMaskValue(maskType, this.options.enabled);


        this.setUpdateValues(parse, 
        [
            ['maskType', maskType]
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
        return this.maskType && this.maskType.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.maskType) this.maskType.pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.maskType) this.maskType.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.maskType) this.maskType.iterateLoop(parse);
    }
}