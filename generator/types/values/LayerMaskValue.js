class LayerMaskValue
extends GValue
{
    visible;
    maskType;



    constructor(maskType, visible = true)
    {
        super(LAYER_MASK_VALUE);

        this.visible  = visible;
        this.maskType = maskType.copy();
    }


    
    copy()
    {
        const copy = new LayerMaskValue(this.maskType, this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(mask)
    {
        return this.visible === mask.visible
            && this.maskType.equals(mask.maskType);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return 'mask';
    }



    toPreviewString()
    {
        return 'mask';
    }



    toDisplayString()
    {
        return 'mask';
    }



    isValid()
    {
        return this.maskType.isValid();
    }



    getNaN()
    {
        return LayerMaskValue.NaN.copy();
    }



    static NaN = Object.freeze(new LayerMaskValue(NumberValue.NaN, false));
}



function parseLayerMaskValue(str)
{
    const mask = 
        str == NAN_DISPLAY
        ? LayerMaskValue.NaN
        : new LayerMaskValue(new NumberValue(parseInt(str)), true);

    return [mask, 1];
}
