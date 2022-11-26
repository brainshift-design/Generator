class EllipseValue
extends ShapeBaseValue
{
    x;
    y;
    width;
    height;
    angle;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                angle  = new NumberValue(0))
    {
        super(ELLIPSE_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
    }



    copy()
    {
        const elps = new EllipseValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy());

        elps.copyBase(this);

        return elps;
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
        return this;
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.angle .toString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.angle .toDisplayString();
    }



    static NaN = new EllipseValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseEllipseValue(str)
{
    if (str == INVALID_VALUE)
        return EllipseValue.NaN;

    const rect = str.split(' ');

    return new EllipseValue(
        new NumberValue(parseNumberValue(rect[0])[0]),
        new NumberValue(parseNumberValue(rect[1])[0]),
        new NumberValue(parseNumberValue(rect[2])[0]),
        new NumberValue(parseNumberValue(rect[3])[0]),
        new NumberValue(parseNumberValue(rect[4])[0]));
}
