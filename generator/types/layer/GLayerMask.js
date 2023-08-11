class GLayerMask
extends GOperator
{
    constructor(nodeId, options)
    {
        super(LAYER_MASK, nodeId, options);
    }



    copy()
    {
        const copy = new GLayerMask(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        this.value = new LayerMaskValue(this.options.enabled);


        this.setUpdateValues(parse, [['', NullValue]]);


        this.validate();

        return this;
    }



    toValue()
    {
        return new LayerMaskValue(this.options.enabled);
    }



    isValid()
    {
        return true;
    }
}