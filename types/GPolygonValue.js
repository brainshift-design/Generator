class GPolygonValue
extends GType
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor(x       = new GNumberValue(0), 
                y       = new GNumberValue(0), 
                width   = new GNumberValue(0), 
                height  = new GNumberValue(0), 
                angle   = new GNumberValue(0), 
                round   = new GNumberValue(0), 
                corners = new GNumberValue(0))
    {
        super(POLYGON_VALUE);

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.angle   = angle;
        this.round   = round;
        this.corners = corners;

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GPolygonValue(
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
        return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.x      .toString()
              + ' ' + this.y      .toString()
              + ' ' + this.width  .toString()
              + ' ' + this.height .toString()
              + ' ' + this.angle  .toString()
              + ' ' + this.round  .toString()
              + ' ' + this.corners.toString()
            : INVALID;
    }



    static NaN = new GPolygonValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGPolygonValue(str)
{
    if (str == INVALID)
        return GPolygonValue.NaN;

    const rect = str.split(' ');

    return new GPolygonValue(
        new GNumberValue(parseGNumberValue(rect[0])),
        new GNumberValue(parseGNumberValue(rect[1])),
        new GNumberValue(parseGNumberValue(rect[2])),
        new GNumberValue(parseGNumberValue(rect[3])),
        new GNumberValue(parseGNumberValue(rect[4])),
        new GNumberValue(parseGNumberValue(rect[5])),
        new GNumberValue(parseGNumberValue(rect[6])));
}
