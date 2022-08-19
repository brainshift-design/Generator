class GColorFillValue
extends GType
{
    color;
    opacity;



    constructor(color   = GColorValue .NaN, 
                opacity = GNumberValue.NaN)
    {
        super(COLOR_FILL_VALUE);

        this.color   = color  .copy();
        this.opacity = opacity.copy();

        this.result  = null;
        this.valid   = true;
    }


    
    static create(r, g, b, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(1, r, g, b),
            new GNumberValue(opacity));
    }



    static createFromRgb(rgb, opacity)
    {
        return new GColorFillValue(
            GColorValue.createFromRgb(rgb),
            new GNumberValue(opacity));
    }



    copy()
    {
        return new GColorFillValue(
            this.color  .copy(),
            this.opacity.copy());
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }



    equals(fill)
    {
        return this.color  .equals(fill.color  )
            && this.opacity.equals(fill.opacity);
    }



    eval(parse)
    {
        return this;
    }



    toString()
    {
        const rgb = scaleColor(dataColor2rgb(this.color.toDataColor()), 'rgb');

        return this.isValid()
            ?         rgb[0].toString()
              + ' ' + rgb[1].toString()
              + ' ' + rgb[2].toString()
              + ' ' + this.opacity.toString()
            : INVALID;
    }



    toFigmaString()
    {
        return ['SOLID', this.toString()];
    }



    static NaN = Object.freeze(new GColorFillValue(
        GColorValue .NaN,
        GNumberValue.NaN));



    static default = Object.freeze(new GColorFillValue(
        GColorValue.create(1, 217, 217, 217),
        new GNumberValue(100)));
}



function parseGColorFillValue(str)
{
    if (str == INVALID)
        return [GColorFillValue.NaN, 1];

    const fill = str.split(' ');

    let i = 0;

    const r       = parseGNumberValue(fill[i]); i += r      [1];
    const g       = parseGNumberValue(fill[i]); i += g      [1];
    const b       = parseGNumberValue(fill[i]); i += b      [1];
    const opacity = parseGNumberValue(fill[i]); i += opacity[1];

    const color   = GColorValue.create(1, r[0], g[0], b[0])


    return [
        new GColorFillValue(color, opacity[0]),
        i ];

}