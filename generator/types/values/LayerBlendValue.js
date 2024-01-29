class LayerBlendValue
extends GValue
{
    opacity;
    blend;



    constructor(opacity, blend)
    {
        super(LAYER_BLEND_VALUE);

        this.opacity = opacity.copy();
        this.blend   = blend  .copy();
    }


    
    copy()
    {
        const copy = new LayerBlendValue(this.opacity, this.blend);

        copy.copyBase(this);

        return copy;
    }



    equals(layer)
    {
        return this.opacity.equals(layer.opacity)
            && this.blend  .equals(layer.blend  );
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.opacity.toString()
            + ' ' + this.blend  .toString();
    }



    toPreviewString()
    {
        return      this.opacity.toPreviewString()
            + ' ' + this.blend  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.opacity.toDisplayString()
            + ' ' + this.blend  .toDisplayString();
    }



    hasInitValue()
    {
        return this.opacity.hasInitValue()
            && this.blend  .hasInitValue();
    }



    isValid()
    {
        return this.opacity && this.opacity.isValid()
            && this.blend   && this.blend  .isValid();
    }



    getNaN()
    {
        return LayerBlendValue.NaN.copy();
    }



    static NaN = Object.freeze(new LayerBlendValue(NumberValue.NaN, NumberValue.NaN));
}



function parseLayerBlendValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [LayerBlendValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const opacity = parseNumberValue(str[i]); i += opacity[1];
    const blend   = parseNumberValue(str[i]); i += blend  [1];


    const layer = new LayerBlendValue(
        opacity[0],
        blend  [0]);

        
    return [layer, i - iStart];
}
