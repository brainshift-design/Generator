class ColorStopValue
extends GType
{
    fill;
    position;



    constructor(fill     = FillValue.NaN,
                position = NumberValue   .NaN)
    {
        super(COLOR_STOP_VALUE);

        this.fill     = fill;
        this.position = position;

        this.result   = this;
        this.valid    = true;
    }


    
    copy()
    {
        return new ColorStopValue(
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
        return      this.fill    .toString()
            + ' ' + this.position.toString();
    }



    static NaN = new ColorStopValue(
        FillValue.NaN,
        NumberValue.NaN);
}



function parseColorStopValue(str)
{
    if (str == INVALID)
        return ColorStopValue.NaN;

    const stop = str.split(' ');

    return new ColorStopValue(
        parseFillValue(str)[0],
        parseNumberValue(stop[5])[0]);
}