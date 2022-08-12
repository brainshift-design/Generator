class GColorFillValue
extends GType
{
    color;
    opacity;



    constructor(color   = GColorValue .NaN,
                opacity = GNumberValue.NaN)
    {
        super(COLOR_FILL_VALUE);

        this.color   = color;
        this.opacity = opacity;

        this.result  = this;
        this.valid   = true;
    }


    
    static create(space, c1, c2, c3, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(space, c1, c2, c3),
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



    equals(col)
    {
        return this.color  .equals(col.color  )
            && this.opacity.equals(col.opacity);
    }



    eval(parse)
    {
        return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.color  .toString()
              + ' ' + this.opacity.toString()
            : INVALID;
    }



    static NaN = new GColorFillValue(
        GColorValue .NaN,
        GNumberValue.NaN);



    static default = GColorFillValue.create(1, 217, 217, 217, 100);
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