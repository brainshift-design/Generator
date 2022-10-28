class ColorValue
extends GValue
{
    space;
    c1;
    c2;
    c3;



    constructor(space = NumberValue.NaN, 
                c1    = NumberValue.NaN, 
                c2    = NumberValue.NaN, 
                c3    = NumberValue.NaN)
    {
        super(COLOR_VALUE);

        this.space  = space.copy();
        this.c1     = c1   .copy();
        this.c2     = c2   .copy();
        this.c3     = c3   .copy();

        this.valid  = true;
    }



    static create(space, c1, c2, c3)
    {
        console.assert(typeof space == 'number', 'ColorValue.create() space must be a number');
        console.assert(typeof c1    == 'number', 'ColorValue.create() c1 must be a number');
        console.assert(typeof c2    == 'number', 'ColorValue.create() c2 must be a number');
        console.assert(typeof c3    == 'number', 'ColorValue.create() c3 must be a number');

        return new ColorValue(
            new NumberValue(space),
            new NumberValue(c1   ),
            new NumberValue(c2   ),
            new NumberValue(c3   ));
    }



    static fromRgb(rgb)
    {
        return ColorValue.create(1, rgb[0], rgb[1], rgb[2]);
    }



    copy()
    {
        const color = new ColorValue(
            this.space.copy(), 
            this.c1   .copy(), 
            this.c2   .copy(), 
            this.c3   .copy());

        color.copyBaseData(this);

        return color;
    }



    isValid()
    {
        return this.space.isValid()
            && this.c1   .isValid()
            && this.c2   .isValid()
            && this.c3   .isValid();
    }



    equals(col)
    {
        return col
            && this.space.equals(col.space)
            && this.c1   .equals(col.c1   )
            && this.c2   .equals(col.c2   )
            && this.c3   .equals(col.c3   );
    }



    eval(parse)
    {

    }



    toDataColor()
    {
        if (!this.isValid())
            return dataColor_NaN;

        return makeDataColor(
            this.space,
            this.c1,
            this.c2,
            this.c3);
    }



    toRgb()
    {
        return dataColor2rgb(this.toDataColor());
    }



    toString()
    {
        return      this.space.toString()
            + ' ' + this.c1   .toString()
            + ' ' + this.c2   .toString()
            + ' ' + this.c3   .toString();
    }



    toRgbString()
    {
        if (!this.isValid())
            return INVALID;

        const rgb = this.toRgb();

        return      rgb[0].toString()
            + ' ' + rgb[1].toString()
            + ' ' + rgb[2].toString();
    }



    toDisplayString()
    {
        return      this.space.toDisplayString()
            + ' ' + this.c1   .toDisplayString()
            + ' ' + this.c2   .toDisplayString()
            + ' ' + this.c3   .toDisplayString();
    }



    static NaN = Object.freeze(new ColorValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN));
}



function parseColorValue(str, i = -1)
{
    // if (   i <  0 && str    == INVALID
    //     || i >= 0 && str[i] == INVALID)
    //     return [ColorValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }
        

    const iStart = i;

    const space = parseNumberValue(str[i]); i += space[1];
    const c1    = parseNumberValue(str[i]); i += c1   [1];
    const c2    = parseNumberValue(str[i]); i += c2   [1];
    const c3    = parseNumberValue(str[i]); i += c3   [1];


    return [
        new ColorValue(space[0], c1[0], c2[0], c3[0]), 
        i - iStart];
}