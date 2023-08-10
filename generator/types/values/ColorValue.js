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
        consoleAssert(typeof space == 'number', 'ColorValue.create() space must be a number');
        consoleAssert(typeof c1    == 'number', 'ColorValue.create() c1 must be a number');
        consoleAssert(typeof c2    == 'number', 'ColorValue.create() c2 must be a number');
        consoleAssert(typeof c3    == 'number', 'ColorValue.create() c3 must be a number');

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



    static fromDataColor(_color, spaceIndex = -1)
    {
        if (spaceIndex < 0)
            spaceIndex = colorSpaceIndex (_color[0]);

        const space  = colorSpace(spaceIndex);
        const factor = colorSpaceFactor(space);

        return ColorValue.create(
            spaceIndex,
            _color[1] * factor[0],
            _color[2] * factor[1],
            _color[3] * factor[2]);
    }



    copy()
    {
        const copy = new ColorValue(
            this.space.copy(), 
            this.c1   .copy(), 
            this.c2   .copy(), 
            this.c3   .copy());

        copy.copyBase(this);

        return copy;
    }



    hasInitValue()
    {
        return this.space.hasInitValue()
            && this.c1   .hasInitValue()
            && this.c2   .hasInitValue()
            && this.c3   .hasInitValue();
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



    async eval(parse)
    {
        return this;
    }



    toDataColor()
    {
        if (!this.isValid())
            return dataColor_NaN;

        const space = this.space.copy();

        space.value = Math.round(Math.min(Math.max(0, space.value), ColorSpaces.length-1));

        return makeDataColor(
            space,
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



    toSimpleString()
    {
        return      this.space.toSimpleString()
            + ' ' + this.c1   .toSimpleString()
            + ' ' + this.c2   .toSimpleString()
            + ' ' + this.c3   .toSimpleString();
    }



    toDisplayString()
    {
        return      this.space.toDisplayString()
            + ' ' + this.c1   .toDisplayString()
            + ' ' + this.c2   .toDisplayString()
            + ' ' + this.c3   .toDisplayString();
    }



    toSimpleString()
    {
        if (!this.isValid())
            return UNKNOWN_DISPLAY;

        const rgb = this.toRgb();

        return '#' + rgb2hex(rgb);
    }



    toRgbString()
    {
        if (!this.isValid())
            return UNKNOWN_DISPLAY;

        const rgb = this.toRgb();

        return      rgb[0].toString()
            + ' ' + rgb[1].toString()
            + ' ' + rgb[2].toString();
    }



    getNaN()
    {
        return ColorValue.NaN;
    }



    static NaN = Object.freeze(new ColorValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN));
}



function parseColorValue(str, i = -1)
{
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
        i - iStart ];
}