class PointValue
extends GValue
{
    nodeId;

    x;
    y;



    constructor(nodeId,
                x = new NumberValue(0), 
                y = new NumberValue(0))
    {
        super(POINT_VALUE);

        this.nodeId = nodeId;

        this.x      = x;
        this.y      = y;
    }



    copy()
    {
        const copy = new PointValue(
            this.nodeId,
            this.x.copy(), 
            this.y.copy());

        return copy;
    }



    equals(p)
    {
        return p
            && this.x.equals(p.x)
            && this.y.equals(p.y);
    }



    static create(nodeId, x, y)
    {
        return new PointValue(
            nodeId,
            new NumberValue(x),
            new NumberValue(y));
    }



    static fromPoint(nodeId, p)
    {
        return new PointValue(
            nodeId,
            new NumberValue(p.x),
            new NumberValue(p.y));
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return this.x.isValid()
            && this.y.isValid();
    }



    toString()
    {
        return      this.x.toString()
            + ' ' + this.y.toString();
    }



    toDisplayString()
    {
        return      this.x.toDisplayString()
            + ' ' + this.y.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    toPoint()
    {
        return point(
            this.x.toNumber(),
            this.y.toNumber());
    }



    toJsCode(gen)
    {
        return '';//this.toSimpleString();
    }



    getNaN()
    {
        return PointValue.NaN;
    }



    static NaN = Object.freeze(new PointValue(
        '',
        NumberValue.NaN, 
        NumberValue.NaN));
}



function parsePointValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [PointValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x = parseNumberValue(str[i]); i += x[1];
    const y = parseNumberValue(str[i]); i += y[1];


    const rect = new PointValue(
        '', // set node ID elsewhere
        x[0],
        y[0]);


    return [rect, i - iStart];
}
