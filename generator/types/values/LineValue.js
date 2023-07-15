class LineValue
extends ShapeValue
{
    x;
    y;
    width;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0))
    {
        super(LINE_VALUE, nodeId);

        this.x     = x;
        this.y     = y;
        this.width = width;
    }



    copy()
    {
        const copy = new LineValue(
            this.nodeId,
            this.x    .copy(), 
            this.y    .copy(), 
            this.width.copy())

        copy.copyBase(this);

        return copy;
    }



    equals(line)
    {
        return line
            && this.x    .equals(line.x    )
            && this.y    .equals(line.y    )
            && this.width.equals(line.width);
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.x     .hasInitValue()
            && this.y     .hasInitValue()
            && this.width .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.x    .isValid()
            && this.y    .isValid()
            && this.width.isValid();
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.x    .toString()
            + ' ' + this.y    .toString()
            + ' ' + this.width.toString();
    }



    toDisplayString()
    {
        return      this.x    .toDisplayString()
            + ' ' + this.y    .toDisplayString()
            + ' ' + this.width.toDisplayString();
    }



    static NaN = new LineValue(
        '',
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


    const line = new LineValue(
        '', // set node ID elsewhere
        x    [0],
        y    [0],
        width[0]);


    i = parseShapeBaseValue(str, i, line);

    
    return [line, i - iStart];
}
