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
        return !isNaN(this.color  )
            && !isNaN(this.opacity);
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
            ?         this.color   .toString()
              + ' ' + this.opacity .toString()
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

    const stop = str.split(' ');

    return new GColorFillValue(
        new GColorValue(
            parseInt(stop[0]),
            parseGNumberValue(stop[1]),
            parseGNumberValue(stop[2]),
            parseGNumberValue(stop[3])),
        parseGNumberValue(stop[4]));
}