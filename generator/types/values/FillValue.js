class FillValue
extends GValue
{
    color;
    opacity;



    constructor(color   = ColorValue .NaN, 
                opacity = new NumberValue(100))
    {
        super(FILL_VALUE);

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

        return new FillValue(
            ColorValue.create(1, r, g, b),
            new NumberValue(opacity));
    }



    static fromRgb(rgb, opacity)
    {
        console.assert(
            typeof opacity == 'number',
            'opacity must be a number');

        return new FillValue(
            ColorValue.fromRgb(rgb),
            new NumberValue(opacity));
    }



    copy()
    {
        const fill = new FillValue(
            this.color  .copy(),
            this.opacity.copy());

        fill.copyBaseData(this);

        return fill;
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }



    equals(fill)
    {
        return fill
            && this.color  .equals(fill.color  )
            && this.opacity.equals(fill.opacity);
    }



    eval(parse)
    {
        return this;
    }



    toRgba()
    {
        return [
            ...this.color.toRgb(),
            this.opacity.value / 100 ];
    }



    toFigma()
    {
        return [['SOLID', this.toString()]];
    }



    toValue()
    {
        return this;
    }



    toString()
    {
        const rgb = scaleRgb(this.color.toRgb());

        return        new NumberValue(rgb[0]).toString()
              + ' ' + new NumberValue(rgb[1]).toString()
              + ' ' + new NumberValue(rgb[2]).toString()
              + ' ' + this.opacity           .toString();
    }



    toDisplayString()
    {
        const rgb = scaleRgb(this.color.toRgb());

        return        new NumberValue(rgb[0]).toDisplayString()
              + ' ' + new NumberValue(rgb[1]).toDisplayString()
              + ' ' + new NumberValue(rgb[2]).toDisplayString()
              + ' ' + this.opacity           .toDisplayString();
    }



    static NaN = Object.freeze(new FillValue(
        ColorValue .NaN,
        NumberValue.NaN));



    static default = Object.freeze(FillValue.create(217, 217, 217, 100));
}



function parseFillValue(str, i = -1)
{
    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const r = parseNumberValue(str[i]); i += r[1];
    const g = parseNumberValue(str[i]); i += g[1];
    const b = parseNumberValue(str[i]); i += b[1];
    const a = parseNumberValue(str[i]); i += a[1];

    const color = new ColorValue(new NumberValue(1), r[0], g[0], b[0]);

    
    return [
        new FillValue(color, a[0]),
        i - iStart ];
}






function evalFillValue(value, parse)
{
    const fill = value.eval(parse).copy();

         if ( FILL_TYPES.includes(fill.type)) return fill;
    else if (COLOR_TYPES.includes(fill.type)) return new FillValue(fill, value.data.opacity);

    else console.assert(false, 'fill must have type');
}