class LayerMaskValue
extends GValue
{
    visible;



    constructor(visible = true)
    {
        super(LAYER_MASK_VALUE);

        this.visible = visible;
    }


    
    copy()
    {
        const copy = new LayerMaskValue(this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(mask)
    {
        return this.visible === mask.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return 'mask';
    }



    toDisplayString()
    {
        return 'mask';
    }



    isValid()
    {
        return super.isValid();
    }



    getNaN()
    {
        return LayerMaskValue.NaN;
    }



    static NaN = Object.freeze(new LayerMaskValue(false));
}



function parseLayerMaskValue(str)
{
    const mask = 
        str == NAN_DISPLAY
        ? LayerMaskValue.NaN
        : new LayerMaskValue(true);

    return [mask, 1];
}
