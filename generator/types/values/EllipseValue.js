class EllipseValue
extends GValue
{
    x;
    y;
    width;
    height;
    angle;



    constructor(x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                angle  = new NumberValue(0))
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
        return new EllipseValue(
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
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.angle .toString();
    }



    static NaN = new EllipseValue(
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseEllipseValue(str)
{
    if (str == INVALID)
        return EllipseValue.NaN;

    const rect = str.split(' ');

    return new EllipseValue(
        new NumberValue(parseNumberValue(rect[0])[0]),
        new NumberValue(parseNumberValue(rect[1])[0]),
        new NumberValue(parseNumberValue(rect[2])[0]),
        new NumberValue(parseNumberValue(rect[3])[0]),
        new NumberValue(parseNumberValue(rect[4])[0]));
}
