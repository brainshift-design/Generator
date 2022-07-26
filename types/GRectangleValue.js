class GRectangleValue
extends GType
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(x      = new GNumberValue(0), 
                y      = new GNumberValue(0), 
                width  = new GNumberValue(0), 
                height = new GNumberValue(0), 
                angle  = new GNumberValue(0), 
                round  = new GNumberValue(0))
    {
        super(RECTANGLE_VALUE);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GRectangleValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy(), 
            this.round .copy());
    }



    isValid()
    {
        return !isNaN(this.x     )
            && !isNaN(this.y     )
            && !isNaN(this.width )
            && !isNaN(this.height)
            && !isNaN(this.angle )
            && !isNaN(this.round );
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
            : INVALID;
    }



    static NaN = new GRectangleValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGRectangleValue(str)
{
    if (str == INVALID)
        return GRectangleValue.NaN;

    const rect = str.split(' ');

    return new GRectangleValue(
        new GNumberValue(parseGNumberValue(rect[0])),
        new GNumberValue(parseGNumberValue(rect[1])),
        new GNumberValue(parseGNumberValue(rect[2])),
        new GNumberValue(parseGNumberValue(rect[3])),
        new GNumberValue(parseGNumberValue(rect[4])),
        new GNumberValue(parseGNumberValue(rect[5])));
}
