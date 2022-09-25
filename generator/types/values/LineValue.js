class LineValue
extends GValue
{
    x;
    y;
    width;
    angle;



    constructor(x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                angle  = new NumberValue(0))
    {
        super(LINE_VALUE);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;

        this.valid  = true;
    }



    copy()
    {
        return new LineValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.angle .copy());
    }



    isValid()
    {
        return !isNaN(this.x    )
            && !isNaN(this.y    )
            && !isNaN(this.width)
            && !isNaN(this.angle);
    }



    eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.angle .toString();
    }



    static NaN = new LineValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseLineValue(str)
{
    if (str == INVALID)
        return LineValue.NaN;

    const rect = str.split(' ');

    return new LineValue(
        new NumberValue(parseNumberValue(rect[0])),
        new NumberValue(parseNumberValue(rect[1])),
        new NumberValue(parseNumberValue(rect[2])),
        new NumberValue(parseNumberValue(rect[3])));
}
