class VectorEdgeValue
extends GValue
{
    nodeId;

    start;
    startTangent;
    end;
    endTangent;



    constructor(nodeId,
                start        = new NumberValue(0), 
                startTangent = new PointValue (nodeId, 0, 0),
                end          = new NumberValue(0),
                endTangent   = new PointValue (nodeId, 0, 0))
    {
        super(VECTOR_EDGE_VALUE);

        this.nodeId = nodeId;

        this.start        = start;       
        this.startTangent = startTangent;
        this.end          = end;         
        this.endTangent   = endTangent;  
    }



    copy()
    {
        const copy = new VectorEdgeValue(
            this.nodeId,
            this.start       .copy(), 
            this.startTangent.copy(), 
            this.end         .copy(), 
            this.endTangent  .copy());

        return copy;
    }



    equals(edge)
    {
        return edge
            && this.start       .equals(edge.start       )
            && this.startTangent.equals(edge.startTangent)
            && this.end         .equals(edge.end         )
            && this.endTangent  .equals(edge.endTangent  );
    }



    static create(nodeId, start, startTangent, end, endTangent)
    {
        return new VectorEdgeValue(
            nodeId,
            new NumberValue(start),
            new PointValue (nodeId, startTangent.x, startTangent.y),
            new NumberValue(end),
            new PointValue (nodeId, endTangent.x, endTangent.y));
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.start       .hasInitValue()
            && this.startTangent.hasInitValue()
            && this.end         .hasInitValue()
            && this.endTangent  .hasInitValue();
    }



    isValid()
    {
        return this.start       .isValid()
            && this.startTangent.isValid()
            && this.end         .isValid()
            && this.endTangent  .isValid();
    }



    toString()
    {
        return      this.start       .toString()
            + ' ' + this.startTangent.toString()
            + ' ' + this.end         .toString()
            + ' ' + this.endTangent  .toString();
    }



    toDisplayString()
    {
        return      this.start       .toDisplayString()
            + ' ' + this.startTangent.toDisplayString()
            + ' ' + this.end         .toDisplayString()
            + ' ' + this.endTangent  .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    toJsCode(gen)
    {
        return '';//this.toSimpleString();
    }



    getNaN()
    {
        return VectorEdgeValue.NaN;
    }



    static NaN = Object.freeze(new VectorEdgeValue(
        '',
        NumberValue.NaN, 
        PointValue .NaN, 
        NumberValue.NaN, 
        PointValue .NaN));
}



function parseVectorEdgeValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorEdgeValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const start        = parseNumberValue(str[i]); i += start       [1];
    const startTangent = parsePointValue (str, i); i += startTangent[1];
    const end          = parseNumberValue(str[i]); i += end         [1];
    const endTangent   = parsePointValue (str, i); i += endTangent  [1];


    const edge = new VectorEdgeValue(
        '', // set node ID elsewhere
        start       [0],
        startTangent[0],
        end         [0],
        endTangent  [0]);


    return [edge, i - iStart];
}
