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

        this.space  = space;
        this.c1     = c1;
        this.c2     = c2;
        this.c3     = c3;

        this.result = this;
        this.valid  = true;
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



    eval(parse)
    {
        return this.result = this.copy();
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
              + ' ' + this.c1.toString()
              + ' ' + this.c2.toString()
              + ' ' + this.c3.toString()
            : '?';
    }



    static NaN = new GColorValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGColorValue(str)
{
    if (str == '?')
        return GColorValue.NaN;

    const col = str.split(' ');

    return new GColorValue(
        new GNumberValue(parseInt(col[0])),
        new GNumberValue(parseGNumberValue(col[1])),
        new GNumberValue(parseGNumberValue(col[2])),
        new GNumberValue(parseGNumberValue(col[3])));
}
