class StarValue
extends ShapeBaseValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                angle  = new NumberValue(0), 
                round  = new NumberValue(0), 
                points = new NumberValue(0),
                convex = new NumberValue(0))
    {
        super(STAR_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
        this.points = points;
        this.convex = convex;
    }



    copy()
    {
        const star = new StarValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy(), 
            this.round .copy(), 
            this.points.copy(),
            this.convex.copy());

        star.copyBase(this);

        return star;
    }



    eval(parse)
    {
        return this;
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


    
    toValue()
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



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.angle .toDisplayString()
            + ' ' + this.round .toDisplayString()
            + ' ' + this.points.toDisplayString()
            + ' ' + this.convex.toDisplayString();
    }



    static NaN = new StarValue(
        '',
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

    const star = str.split(' ');

    return new StarValue(
        new NumberValue(parseNumberValue(star[0])),
        new NumberValue(parseNumberValue(star[1])),
        new NumberValue(parseNumberValue(star[2])),
        new NumberValue(parseNumberValue(star[3])),
        new NumberValue(parseNumberValue(star[4])),
        new NumberValue(parseNumberValue(star[5])),
        new NumberValue(parseNumberValue(star[6])),
        new NumberValue(parseNumberValue(star[7])));
}
