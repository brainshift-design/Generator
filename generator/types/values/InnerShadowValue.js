class InnerShadowValue
extends GValue
{
    x;
    y;
    blur;
    spread;
    fill;
    blend;
    visible;



    constructor(x       = new NumberValue(0), 
                y       = new NumberValue(0), 
                blur    = new NumberValue(0), 
                spread  = new NumberValue(0), 
                fill    = FillValue.NaN(),
                blend   = new NumberValue(0),
                visible = true)
    {
        super(INNER_SHADOW_VALUE);

        this.x       = x;
        this.y       = y;
        this.blur    = blur;
        this.spread  = spread;
        this.fill    = fill;
        this.blend   = blend;
        this.visible = visible;
    }


    
    // static create(x, y, blur, spread, fill, blend)
    // {
    //     return new FillValue(
    //         new Number,
    //         new NumberValue(opacity));
    // }



    copy()
    {
        const copy = new InnerShadowValue(
            this.x     .copy(),
            this.y     .copy(),
            this.blur  .copy(),
            this.spread.copy(),
            this.fill  .copy(),
            this.blend .copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(shadow)
    {
        return this.x     .equals(shadow.x     )
            && this.y     .equals(shadow.y     )
            && this.blur  .equals(shadow.blur  )
            && this.spread.equals(shadow.spread)
            && this.fill  .equals(shadow.fill  )
            && this.blend .equals(shadow.blend )
            && this.visible === shadow.visible;
    }



    async eval(parse)
    {
        return this;
    }



    // toRgba()
    // {
    //     return [
    //         ...this.color.toRgb(),
    //         this.opacity.value / 100 ];
    // }



    // toFigma()
    // {
    //     return [['SOLID', this.toString()]];
    // }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.blur  .toString()
            + ' ' + this.spread.toString()
            + ' ' + this.fill  .toString()
            + ' ' + this.blend .toString();
    }



    toPreviewString()
    {
        return      this.x     .toPreviewString()
            + ' ' + this.y     .toPreviewString()
            + ' ' + this.blur  .toPreviewString()
            + ' ' + this.spread.toPreviewString()
            + ' ' + this.fill  .toPreviewString()
            + ' ' + this.blend .toPreviewString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.blur  .toDisplayString()
            + ' ' + this.spread.toDisplayString()
            + ' ' + this.fill  .toDisplayString()
            + ' ' + this.blend .toDisplayString();
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.blur  .isValid()
            && this.spread.isValid()
            && this.fill  .isValid()
            && this.blend .isValid();
    }



    static NaN()
    {
        return new InnerShadowValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            FillValue  .NaN(),
            NumberValue.NaN(),
            false);
    }



    // static default = Object.freeze(InnerShadowValue.create(217, 217, 217, 100));
}



function parseInnerShadowValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [InnerShadowValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const blur   = parseNumberValue(str[i]); i += blur  [1];
    const spread = parseNumberValue(str[i]); i += spread[1];
    const fill   = parseFillValue  (str, i); i += fill  [1];
    const blend  = parseNumberValue(str[i]); i += blend [1];


    const shadow = new InnerShadowValue(
        x     [0],
        y     [0],
        blur  [0],
        spread[0],
        fill  [0],
        blend [0]);


    return [shadow, i - iStart];
}
