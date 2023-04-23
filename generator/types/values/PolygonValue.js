class PolygonValue
extends ShapeValue
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
            this.nodeId,
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



    async eval(parse)
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
            && !isNaN(this.corners)
            && super.isValid();
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



function parsePolygonValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [PolygonValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x       = parseNumberValue(str[i]); i += x      [1];
    const y       = parseNumberValue(str[i]); i += y      [1];
    const width   = parseNumberValue(str[i]); i += width  [1];
    const height  = parseNumberValue(str[i]); i += height [1];
    const angle   = parseNumberValue(str[i]); i += angle  [1];
    const round   = parseNumberValue(str[i]); i += round  [1];
    const corners = parseNumberValue(str[i]); i += corners[1];


    const poly = new PolygonValue(
        '', // set node ID elsewhere
        x      [0],
        y      [0],
        width  [0],
        height [0],
        angle  [0],
        round  [0],
        corners[0]);


    i = parseShapeBaseValue(str, i, poly);

    
    return [poly, i - iStart];
}
