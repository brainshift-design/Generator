class ColorFillValue
extends GType
{
    color;
    opacity;



    constructor(color   = ColorValue .NaN, 
                opacity = NumberValue.NaN)
    {
        super(COLOR_FILL_VALUE);

        this.color   = color  .copy();
        this.opacity = opacity.copy();

        this.result  = null;
        this.valid   = true;
    }


    
    static create(r, g, b, opacity)
    {
        console.assert(
            typeof opacity == 'number',
            'opacity must be a number');

        return new ColorFillValue(
            ColorValue.create(1, r, g, b),
            new NumberValue(opacity));
    }



    static createFromRgb(rgb, opacity)
    {
        console.assert(
            typeof opacity == 'number',
            'opacity must be a number');

        return new ColorFillValue(
            ColorValue.createFromRgb(rgb),
            new NumberValue(opacity));
    }



    copy()
    {
        return new ColorFillValue(
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



    static NaN = Object.freeze(new ColorFillValue(
        ColorValue .NaN,
        NumberValue.NaN));



    static default = Object.freeze(ColorFillValue.create(217, 217, 217, 100));
}



function parseColorFillValue(str, i = -1)
{
    if (   i <  0 && str    == INVALID
        || i >= 0 && str[i] == INVALID)
        return [ColorFillValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const r = parseNumberValue(str[i]); i += r[1];
    const g = parseNumberValue(str[i]); i += g[1];
    const b = parseNumberValue(str[i]); i += b[1];

    const color   = new ColorValue(new NumberValue(1), r[0], g[0], b[0]);
    const opacity = parseNumberValue(str[i]); i += opacity[1];

    
    return [
        new ColorFillValue(color, opacity[0]),
        i - iStart ];
}