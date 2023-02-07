class PolygonValue
extends ShapeBaseValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor(nodeId,
                x       = new NumberValue(0), 
                y       = new NumberValue(0), 
                width   = new NumberValue(0), 
                height  = new NumberValue(0), 
                angle   = new NumberValue(0), 
                round   = new NumberValue(0), 
                corners = new NumberValue(0))
    {
        super(POLYGON_VALUE, nodeId);

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.angle   = angle;
        this.round   = round;
        this.corners = corners;
    }



    copy()
    {
        const copy = new PolygonValue(
            this.x      .copy(), 
            this.y      .copy(), 
            this.width  .copy(), 
            this.height .copy(), 
            this.angle  .copy(), 
            this.round  .copy(), 
            this.corners.copy());
    
        copy.copyBase(this);

        return copy;
    }



    eval(parse)
    {
        return this;
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



    toValue()
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



    toDisplayString()
    {
        return      this.x      .toDisplayString()
            + ' ' + this.y      .toDisplayString()
            + ' ' + this.width  .toDisplayString()
            + ' ' + this.height .toDisplayString()
            + ' ' + this.angle  .toDisplayString()
            + ' ' + this.round  .toDisplayString()
            + ' ' + this.corners.toDisplayString();
    }



    static NaN = new PolygonValue(
        '',
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
    if (str == NAN_CHAR)
        return PolygonValue.NaN;

    const poly = str.split(' ');

    return new PolygonValue(
        '',
        new NumberValue(parseNumberValue(poly[0])),
        new NumberValue(parseNumberValue(poly[1])),
        new NumberValue(parseNumberValue(poly[2])),
        new NumberValue(parseNumberValue(poly[3])),
        new NumberValue(parseNumberValue(poly[4])),
        new NumberValue(parseNumberValue(poly[5])),
        new NumberValue(parseNumberValue(poly[6])));
}
