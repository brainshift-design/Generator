class LineValue
extends ShapeValue
{
    x;
    y;
    width;
    angle;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                angle  = new NumberValue(0))
    {
        super(LINE_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;
    }



    copy()
    {
        const copy = new LineValue(
            this.nodeId,
            this.x    .copy(), 
            this.y    .copy(), 
            this.width.copy(), 
            this.angle.copy());

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return !isNaN(this.x    )
            && !isNaN(this.y    )
            && !isNaN(this.width)
            && !isNaN(this.angle)
            && super.isValid();
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
            + ' ' + this.angle .toString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.angle .toDisplayString();
    }



    static NaN = new LineValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseLineValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [LineValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x     = parseNumberValue(str[i]); i += x    [1];
    const y     = parseNumberValue(str[i]); i += y    [1];
    const width = parseNumberValue(str[i]); i += width[1];
    const angle = parseNumberValue(str[i]); i += angle[1];


    const line = new LineValue(
        '', // set node ID elsewhere
        x    [0],
        y    [0],
        width[0],
        angle[0]);


    i = parseShapeBaseValue(str, i, line);

    
    return [line, i - iStart];
}
