class GColorStopValue
extends GType
{
    color;
    opacity;
    position;



    constructor(color    = GColorValue .NaN,
                opacity  = GNumberValue.NaN,
                position = GNumberValue.NaN)
    {
        super(COLOR_STOP_VALUE);

        this.color    = color;
        this.opacity  = opacity;
        this.position = position;

        this.result   = this;
        this.valid    = true;
    }


    
    copy()
    {
        return new GColorStopValue(
            this.color   .copy(),
            this.opacity .copy(),
            this.position.copy());
    }



    isValid()
    {
        return !isNaN(this.color   )
            && !isNaN(this.opacity )
            && !isNaN(this.position);
    }



    equals(col)
    {
        return this.color   .equals(col.color   )
            && this.opacity .equals(col.opacity )
            && this.position.equals(col.position);
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
              + ' ' + this.position.toString()
            : INVALID;
    }



    static NaN = new GColorStopValue(
        GColorValue .NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGColorStopValue(str)
{
    if (str == INVALID)
        return GColorStopValue.NaN;

    const stop = str.split(' ');

    return new GColorStopValue(
        new GColorValue(
            parseInt(stop[0]),
            parseGNumberValue(stop[1]),
            parseGNumberValue(stop[2]),
            parseGNumberValue(stop[3])),
        parseGNumberValue(stop[4]),
        parseGNumberValue(stop[5]));
}