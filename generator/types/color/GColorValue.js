class GColorValue
extends GType
{
    space;
    c1;
    c2;
    c3;



    constructor(space = GNumberValue.NaN, 
                c1    = GNumberValue.NaN, 
                c2    = GNumberValue.NaN, 
                c3    = GNumberValue.NaN)
    {
        super(COLOR_VALUE);

        this.space  = space.copy();
        this.c1     = c1   .copy();
        this.c2     = c2   .copy();
        this.c3     = c3   .copy();

        this.result = null;
        this.valid  = true;
    }



    static create(space, c1, c2, c3)
    {
        return new GColorValue(
            new GNumberValue(space),
            new GNumberValue(c1),
            new GNumberValue(c2),
            new GNumberValue(c3));
    }



    static createFromRgb(rgb)
    {
        return GColorValue.create(1, rgb[0], rgb[1], rgb[2]);
    }



    copy()
    {
        return new GColorValue(
            this.space.copy(), 
            this.c1   .copy(), 
            this.c2   .copy(), 
            this.c3   .copy());
    }



    isValid()
    {
        return !isNaN(this.space)
            && !isNaN(this.c1)
            && !isNaN(this.c2)
            && !isNaN(this.c3);
    }



    equals(col)
    {
        return this.space.equals(col.space)
            && this.c1   .equals(col.c1   )
            && this.c2   .equals(col.c2   )
            && this.c3   .equals(col.c3   );
    }



    eval(parse)
    {
        return this;
    }



    toDataColor()
    {
        if (!this.isValid())
            return dataColor_NaN;

        const space = colorSpace(this.space.value);

        return [
            space, 
            getNormalColorValue(this.c1.value, space, 0), 
            getNormalColorValue(this.c2.value, space, 1), 
            getNormalColorValue(this.c3.value, space, 2) ]; 
    }



    toString()
    {
        return this.isValid()
            ?         this.space.toString()
              + ' ' + this.c1   .toString()
              + ' ' + this.c2   .toString()
              + ' ' + this.c3   .toString()
            : INVALID;
    }



    toRgbString()
    {
        if (!this.isValid())
            return INVALID;

        const rgb = dataColor2rgb(this.toDataColor());

        return      rgb[0].toString()
            + ' ' + rgb[1].toString()
            + ' ' + rgb[2].toString();
    }



    static NaN = Object.freeze(new GColorValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN));
}



function parseGColorValue(str)
{
    if (str == INVALID)
        return [GColorValue.NaN, 1];

    const col = str.split(' ');

    let i = 0;

    const space = parseGNumberValue(col[i]); i += space[1];
    const c1    = parseGNumberValue(col[i]); i += c1   [1];
    const c2    = parseGNumberValue(col[i]); i += c2   [1];
    const c3    = parseGNumberValue(col[i]); i += c3   [1];


    return [
        new GColorValue(space[0], c1[0], c2[0], c3[0]), 
        i ];
}