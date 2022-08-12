class GColorStopValue
extends GType
{
    fill;
    position;



    constructor(fill     = GColorValue.NaN,
                position = GNumberValue   .NaN)
    {
        super(COLOR_STOP_VALUE);

        this.fill     = fill;
        this.position = position;

        this.result   = this;
        this.valid    = true;
    }


    
    copy()
    {
        return new GColorStopValue(
            this.fill    .copy(),
            this.position.copy());
    }



    isValid()
    {
        return this.fill    .isValid()
            && this.position.isValid();
    }



    equals(col)
    {
        return this.fill    .equals(col.color   )
            && this.position.equals(col.position);
    }



    eval(parse)
    {
        return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.fill    .toString()
              + ' ' + this.position.toString()
            : INVALID;
    }



    static NaN = new GColorStopValue(
        GColorFillValue.NaN,
        GNumberValue   .NaN);
}



function parseGColorStopValue(str)
{
    if (str == INVALID)
        return GColorStopValue.NaN;

    const stop = str.split(' ');

    return new GColorStopValue(
        parseGColorFillValue(str),
        parseGNumberValue(stop[5]));
}