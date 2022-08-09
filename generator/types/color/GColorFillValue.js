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
}



function parseGColorFillValue(str)
{
    if (str == INVALID)
        return GColorFillValue.NaN;

    const fill = str.split(' ');

    return new GColorFillValue(
        new GColorValue(
            parseGNumberValue(fill[0]),
            parseGNumberValue(fill[1]),
            parseGNumberValue(fill[2]),
            parseGNumberValue(fill[3])),
        parseGNumberValue(fill[4]));
}