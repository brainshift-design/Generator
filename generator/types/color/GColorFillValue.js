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


    
    static create(space, c1, c2, c3, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(space, c1, c2, c3),
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
        return this.isValid()
            ?         this.color  .toString()
              + ' ' + this.opacity.toString()
            : INVALID;
    }



    toFigmaString()
    {
        return [COLOR, this.toString()];
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