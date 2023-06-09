class StarValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    round;
    points;
    convex;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                round  = new NumberValue(0), 
                points = new NumberValue(0),
                convex = new NumberValue(0))
    {
        super(STAR_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.round  = round;
        this.points = points;
        this.convex = convex;
    }



    copy()
    {
        const copy = new StarValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.round .copy(), 
            this.points.copy(),
            this.convex.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(star)
    {
        return star
            && this.x     .equals(star.x     )
            && this.y     .equals(star.y     )
            && this.width .equals(star.width )
            && this.height.equals(star.height)
            && this.round .equals(star.round )
            && this.points.equals(star.points)
            && this.convex.equals(star.convex);
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.round .isValid()
            && this.points.isValid()
            && this.convex.isValid();
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
        NumberValue.NaN);
}



function parseStarValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [StarValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const width  = parseNumberValue(str[i]); i += width [1];
    const height = parseNumberValue(str[i]); i += height[1];
    const round  = parseNumberValue(str[i]); i += round [1];
    const points = parseNumberValue(str[i]); i += points[1];
    const convex = parseNumberValue(str[i]); i += convex[1];


    const star = new StarValue(
        '', // set node ID elsewhere
        x     [0],
        y     [0],
        width [0],
        height[0],
        round [0],
        points[0],
        convex[0]);


    i = parseShapeBaseValue(str, i, star);

    
    return [star, i - iStart];
}
