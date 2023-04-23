class LineValue
extends ShapeValue
{
    x;
    y;
    width;
    angle;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                angle  = new NumberValue(0))
    {
        super(LINE_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;
    }



    copy()
    {
        const copy = new LineValue(
            this.x    .copy(), 
            this.y    .copy(), 
            this.width.copy(), 
            this.angle.copy());

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return !isNaN(this.x    )
            && !isNaN(this.y    )
            && !isNaN(this.width)
            && !isNaN(this.angle);
    }



    toValue()
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



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.angle .toDisplayString();
    }



    static NaN = new LineValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseLineValue(str)
{
    if (str == NAN_CHAE)
        return LineValue.NaN;

    const rect = str.split(' ');

    return new LineValue(
        new NumberValue(parseNumberValue(rect[0])),
        new NumberValue(parseNumberValue(rect[1])),
        new NumberValue(parseNumberValue(rect[2])),
        new NumberValue(parseNumberValue(rect[3])));
}
