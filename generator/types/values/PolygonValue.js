class PolygonValue
extends GValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor(x       = new NumberValue(0), 
                y       = new NumberValue(0), 
                width   = new NumberValue(0), 
                height  = new NumberValue(0), 
                angle   = new NumberValue(0), 
                round   = new NumberValue(0), 
                corners = new NumberValue(0))
    {
        super(POLYGON_VALUE);

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.angle   = angle;
        this.round   = round;
        this.corners = corners;

        this.valid  = true;
    }



    copy()
    {
        return new PolygonValue(
            this.x      .copy(), 
            this.y      .copy(), 
            this.width  .copy(), 
            this.height .copy(), 
            this.angle  .copy(), 
            this.round  .copy(), 
            this.corners.copy());
    }



    isValid()
    {
        return !isNaN(this.x      )
            && !isNaN(this.y      )
            && !isNaN(this.width  )
            && !isNaN(this.height )
            && !isNaN(this.angle  )
            && !isNaN(this.round  )
            && !isNaN(this.corners);
    }



    eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.x      .toString()
            + ' ' + this.y      .toString()
            + ' ' + this.width  .toString()
            + ' ' + this.height .toString()
            + ' ' + this.angle  .toString()
            + ' ' + this.round  .toString()
            + ' ' + this.corners.toString();
    }



    static NaN = new PolygonValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parsePolygonValue(str)
{
    if (str == INVALID)
        return PolygonValue.NaN;

    const rect = str.split(' ');

    return new PolygonValue(
        new NumberValue(parseNumberValue(rect[0])),
        new NumberValue(parseNumberValue(rect[1])),
        new NumberValue(parseNumberValue(rect[2])),
        new NumberValue(parseNumberValue(rect[3])),
        new NumberValue(parseNumberValue(rect[4])),
        new NumberValue(parseNumberValue(rect[5])),
        new NumberValue(parseNumberValue(rect[6])));
}
