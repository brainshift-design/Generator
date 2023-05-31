class EllipseValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    //angle;
    from;
    to;
    inner;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                //angle  = new NumberValue(0),
                from   = new NumberValue(0),
                to     = new NumberValue(0),
                inner  = new NumberValue(0))
    {
        super(ELLIPSE_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        //this.angle  = angle;
        this.from   = from;
        this.to     = to;
        this.inner  = inner;
    }



    copy()
    {
        const copy = new EllipseValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            //this.angle .copy(),
            this.from  .copy(),
            this.to    .copy(),
            this.inner .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(ellipse)
    {
        return ellipse
            && this.x     .equals(ellipse.x     )
            && this.y     .equals(ellipse.y     )
            && this.width .equals(ellipse.width )
            && this.height.equals(ellipse.height)
            //&& this.angle .equals(ellipse.angle )
            && this.from  .equals(ellipse.from  )
            && this.to    .equals(ellipse.to    )
            && this.inner .equals(ellipse.inner );
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
            //&& this.angle .isValid()
            && this.from  .isValid()
            && this.to    .isValid()
            && this.inner .isValid();
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
            //+ ' ' + this.angle .toString()
            + ' ' + this.from  .toString()
            + ' ' + this.to    .toString()
            + ' ' + this.inner .toString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            //+ ' ' + this.angle .toDisplayString()
            + ' ' + this.from  .toDisplayString()
            + ' ' + this.to    .toDisplayString()
            + ' ' + this.inner .toDisplayString();
    }



    static NaN = new EllipseValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        //NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseEllipseValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [EllipseValue.NaN, 1];


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
    //const angle  = parseNumberValue(str[i]); i += angle [1];
    const from   = parseNumberValue(str[i]); i += from  [1];
    const to     = parseNumberValue(str[i]); i += to    [1];
    const inner  = parseNumberValue(str[i]); i += inner [1];


    const ellipse = new EllipseValue(
        '', // set node ID elsewhere
        x     [0],
        y     [0],
        width [0],
        height[0],
        //angle [0],
        from  [0],
        to    [0],
        inner [0]);


    i = parseShapeBaseValue(str, i, ellipse);

    
    return [ellipse, i - iStart];
}
