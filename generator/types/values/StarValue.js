class StarValue
extends GValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor(x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                angle  = new NumberValue(0), 
                round  = new NumberValue(0), 
                points = new NumberValue(0),
                convex = new NumberValue(0))
    {
        super(STAR_VALUE);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
        this.points = points;
        this.convex = convex;

        this.valid  = true;
    }



    copy()
    {
        return new StarValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy(), 
            this.round .copy(), 
            this.points.copy(),
            this.convex.copy());
    }



    isValid()
    {
        return !isNaN(this.x     )
            && !isNaN(this.y     )
            && !isNaN(this.width )
            && !isNaN(this.height)
            && !isNaN(this.angle )
            && !isNaN(this.round )
            && !isNaN(this.points)
            && !isNaN(this.convex);
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
            + ' ' + this.height.toString()
            + ' ' + this.angle .toString()
            + ' ' + this.round .toString()
            + ' ' + this.points.toString()
            + ' ' + this.convex.toString();
    }



    static NaN = new StarValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseStarValue(str)
{
    if (str == INVALID)
        return StarValue.NaN;

    const rect = str.split(' ');

    return new StarValue(
        new NumberValue(parseNumberValue(rect[0])),
        new NumberValue(parseNumberValue(rect[1])),
        new NumberValue(parseNumberValue(rect[2])),
        new NumberValue(parseNumberValue(rect[3])),
        new NumberValue(parseNumberValue(rect[4])),
        new NumberValue(parseNumberValue(rect[5])),
        new NumberValue(parseNumberValue(rect[6])),
        new NumberValue(parseNumberValue(rect[7])));
}
