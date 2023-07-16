class VectorVertexValue
extends GValue
{
    nodeId;

    x;
    y;
    join;
    cap;
    round;



    constructor(nodeId,
                x     = new NumberValue(0), 
                y     = new NumberValue(0),
                join  = new NumberValue(0),
                cap   = new NumberValue(0),
                round = new NumberValue(0))
    {
        super(VECTOR_VERTEX_VALUE);

        this.nodeId = nodeId;

        this.x     = x;
        this.y     = y;
        this.join  = join;
        this.cap   = cap;
        this.round = round;
    }



    copy()
    {
        const copy = new VectorVertexValue(
            this.nodeId,
            this.x    .copy(), 
            this.y    .copy(), 
            this.join .copy(), 
            this.cap  .copy(), 
            this.round.copy());

        return copy;
    }



    equals(p)
    {
        return p
            && this.x    .equals(p.x    )
            && this.y    .equals(p.y    )
            && this.join .equals(p.join )
            && this.cap  .equals(p.cap  )
            && this.round.equals(p.round);
    }



    static create(nodeId, x, y)
    {
        return new VectorVertexValue(
            nodeId,
            new NumberValue(x    ),
            new NumberValue(y    ),
            new NumberValue(join ),
            new NumberValue(cap  ),
            new NumberValue(round));
    }



    static fromPoint(nodeId, p)
    {
        return new VectorVertexValue(
            nodeId,
            new NumberValue(p.x),
            new NumberValue(p.y),
            new NumberValue(0),
            new NumberValue(0),
            new NumberValue(0));
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.x    .hasInitValue()
            && this.y    .hasInitValue()
            && this.join .hasInitValue()
            && this.cap  .hasInitValue()
            && this.round.hasInitValue();
    }



    isValid()
    {
        return this.x    .isValid()
            && this.y    .isValid()
            && this.join .isValid()
            && this.cap  .isValid()
            && this.round.isValid();
    }



    toString()
    {
        return      this.x    .toString()
            + ' ' + this.y    .toString()
            + ' ' + this.join .toString()
            + ' ' + this.cap  .toString()
            + ' ' + this.round.toString();
    }



    toDisplayString()
    {
        return      this.x    .toDisplayString()
            + ' ' + this.y    .toDisplayString()
            + ' ' + this.join .toDisplayString()
            + ' ' + this.cap  .toDisplayString()
            + ' ' + this.round.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    toPoint()
    {
        return point(
            this.x    .value,
            this.y    .value,
            this.join .value,
            this.cap  .value,
            this.round.value);
    }



    toJsCode(gen)
    {
        return '';//this.toSimpleString();
    }



    getNaN()
    {
        return VectorVertexValue.NaN;
    }



    static NaN = Object.freeze(new VectorVertexValue(
        '',
        NumberValue.NaN, 
        NumberValue.NaN, 
        NumberValue.NaN, 
        NumberValue.NaN, 
        NumberValue.NaN));
}



function parseVectorVertexValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorVertexValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x     = parseNumberValue(str[i]); i += x    [1];
    const y     = parseNumberValue(str[i]); i += y    [1];
    const join  = parseNumberValue(str[i]); i += join [1];
    const cap   = parseNumberValue(str[i]); i += cap  [1];
    const round = parseNumberValue(str[i]); i += round[1];


    const point = new VectorVertexValue(
        '', // set node ID elsewhere
        x    [0],
        y    [0],
        join [0],
        cap  [0],
        round[0]);


    return [point, i - iStart];
}
