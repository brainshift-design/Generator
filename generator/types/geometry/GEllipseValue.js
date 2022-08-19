class GEllipseValue
extends GType
{
    x;
    y;
    width;
    height;
    angle;



    constructor(x      = new GNumberValue(0), 
                y      = new GNumberValue(0), 
                width  = new GNumberValue(0), 
                height = new GNumberValue(0), 
                angle  = new GNumberValue(0))
    {
        super(ELLIPSE_VALUE);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GEllipseValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy());
    }



    isValid()
    {
        return !isNaN(this.x     )
            && !isNaN(this.y     )
            && !isNaN(this.width )
            && !isNaN(this.height)
            && !isNaN(this.angle );
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
            : INVALID;
    }



    static NaN = new GEllipseValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGEllipseValue(str)
{
    if (str == INVALID)
        return GEllipseValue.NaN;

    const rect = str.split(' ');

    return new GEllipseValue(
        new GNumberValue(parseGNumberValue(rect[0])[0]),
        new GNumberValue(parseGNumberValue(rect[1])[0]),
        new GNumberValue(parseGNumberValue(rect[2])[0]),
        new GNumberValue(parseGNumberValue(rect[3])[0]),
        new GNumberValue(parseGNumberValue(rect[4])[0]));
}
