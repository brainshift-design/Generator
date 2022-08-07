class GStarValue
extends GType
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor(x      = new GNumberValue(0), 
                y      = new GNumberValue(0), 
                width  = new GNumberValue(0), 
                height = new GNumberValue(0), 
                angle  = new GNumberValue(0), 
                round  = new GNumberValue(0), 
                points = new GNumberValue(0),
                convex = new GNumberValue(0))
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

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GStarValue(
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
        return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.x     .toString()
              + ' ' + this.y     .toString()
              + ' ' + this.width .toString()
              + ' ' + this.height.toString()
              + ' ' + this.angle .toString()
              + ' ' + this.round .toString()
              + ' ' + this.points.toString()
              + ' ' + this.convex.toString()
            : INVALID;
    }



    static NaN = new GStarValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGStarValue(str)
{
    if (str == INVALID)
        return GStarValue.NaN;

    const rect = str.split(' ');

    return new GStarValue(
        new GNumberValue(parseGNumberValue(rect[0])),
        new GNumberValue(parseGNumberValue(rect[1])),
        new GNumberValue(parseGNumberValue(rect[2])),
        new GNumberValue(parseGNumberValue(rect[3])),
        new GNumberValue(parseGNumberValue(rect[4])),
        new GNumberValue(parseGNumberValue(rect[5])),
        new GNumberValue(parseGNumberValue(rect[6])),
        new GNumberValue(parseGNumberValue(rect[7])));
}
