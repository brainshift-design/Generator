class ColorStopValue
extends GValue
{
    fill;
    position;



    constructor(fill     = FillValue.NaN, 
                position = new NumberValue(1))
    {
        if (fill.type != FILL_VALUE)
            consoleError('fill.type is ' + fill.type + ', must be FILL_VALUE');


        super(COLOR_STOP_VALUE);

        this.fill     = fill    .copy();
        this.position = position.copy();

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



    equals(stop)
    {
        return stop
            && this.fill    .equals(stop.fill    )
            && this.position.equals(stop.position);
    }



    async eval(parse)
    {
        return this;
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.fill    .toString()
            + ' ' + this.position.toString();
    }



    toPreviewString()
    {
        return      this.fill    .toPreviewString()
            + ' ' + this.position.toPreviewString();
    }



    toDisplayString()
    {
        return      this.fill    .toDisplayString()
            + ' ' + this.position.toDisplayString();
    }



    getNaN()
    {
        return ColorStopValue.NaN.copy();
    }



    static NaN = Object.freeze(new ColorStopValue(
        FillValue  .NaN,
        NumberValue.NaN));
}



function parseColorStopValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [ColorStopValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const fill     = parseFillValue  (str, i); i += fill    [1];
    const position = parseNumberValue(str[i]); i += position[1];


    return [
        new ColorStopValue(fill[0], position[0]),
        i - iStart ];
}