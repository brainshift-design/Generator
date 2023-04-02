class ColorStopValue
extends GValue
{
    fill;
    position;



    constructor(fill     = FillValue.NaN,
                position = NumberValue   .NaN)
    {
        super(COLOR_STOP_VALUE);

        this.fill     = fill;
        this.position = position;

        this.valid    = true;
    }


    
    copy()
    {
        const copy = new ColorStopValue(
            this.fill    .copy(),
            this.position.copy());

        copy.copyBase(this);

        return copy;
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



    async eval(parse)
    {
        return this;
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
    if (str == NAN_DISPLAY)
        return ColorStopValue.NaN;

    const stop = str.split(' ');

    return new ColorStopValue(
        parseFillValue(str)[0],
        parseNumberValue(stop[5])[0]);
}