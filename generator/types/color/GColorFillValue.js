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

        this.result  = this;
        this.valid   = true;
    }


    
    static create(space, c1, c2, c3, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(space, c1, c2, c3),
            new GNumberValue(opacity));
    }



    static createFromRgb(rgb, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(1, rgb[0], rgb[1], rgb[2]),
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
        return this;//return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.color  .toString()
              + ' ' + this.opacity.toString()
            : INVALID;
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
        return GColorFillValue.NaN;

    const fill = str.split(' ');

    return new GColorFillValue(
        parseGColorValue(str),
        parseGNumberValue(fill[4]));
}