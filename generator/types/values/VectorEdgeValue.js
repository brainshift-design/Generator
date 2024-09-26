class VectorEdgeValue
extends GValue
{
    nodeId;

    start;
    end;
    startTangent;
    endTangent;



    constructor(nodeId,
                start, 
                end,
                startTangent = PointValue.create(nodeId, 0, 0),
                endTangent   = PointValue.create(nodeId, 0, 0))
    {
        super(VECTOR_EDGE_VALUE);

        this.nodeId = nodeId;

        this.start        = start       .copy();       
        this.end          = end         .copy();         
        this.startTangent = startTangent.copy();
        this.endTangent   = endTangent  .copy();  
    }



    copy()
    {
        const copy = new VectorEdgeValue(
            this.nodeId,
            this.start       .copy(), 
            this.end         .copy(), 
            this.startTangent.copy(), 
            this.endTangent  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(edge)
    {
        return edge
            && this.start       .equals(edge.start       )
            && this.end         .equals(edge.end         )
            && this.startTangent.equals(edge.startTangent)
            && this.  endTangent.equals(edge.  endTangent);
    }



    static create(nodeId, start, end, startTangent, endTangent)
    {
        return new VectorEdgeValue(
            nodeId,
            start,
            end,
            PointValue.create(nodeId, startTangent.x, startTangent.y),
            PointValue.create(nodeId,   endTangent.x,   endTangent.y));
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.start       .hasInitValue()
            && this.end         .hasInitValue()
            && this.startTangent.hasInitValue()
            && this.endTangent  .hasInitValue();
    }



    isValid()
    {
        return this.start       .isValid()
            && this.end         .isValid()
            && this.startTangent.isValid()
            && this.endTangent  .isValid();
    }



    toString()
    {
        return      this.start       .toString()
            + ' ' + this.end         .toString()
            + ' ' + this.startTangent.toString()
            + ' ' + this.endTangent  .toString();
    }



    toPreviewString()
    {
        return      this.start       .toString()
            + ' ' + this.end         .toString()
            + ' ' + this.startTangent.toString()
            + ' ' + this.endTangent  .toString();
    }



    toDisplayString()
    {
        return      this.start       .toDisplayString()
            + ' ' + this.end         .toDisplayString()
            + ' ' + this.startTangent.toDisplayString()
            + ' ' + this.endTangent  .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    toJsCode(gen)
    {
        return '';//this.toPreviewString();
    }



    static NaN()
    {
        return new VectorEdgeValue(
            '',
            VectorVertexValue.NaN(), 
            VectorVertexValue.NaN(), 
            PointValue.NaN(), 
            PointValue.NaN());
    }
}



function parseVectorEdgeValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorEdgeValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const start        = parseVectorVertexValue(str, i); i += start       [1];
    const end          = parseVectorVertexValue(str, i); i += end         [1];
    const startTangent = parsePointValue       (str, i); i += startTangent[1];
    const endTangent   = parsePointValue       (str, i); i +=   endTangent[1];


    const edge = new VectorEdgeValue(
        '', // set node ID elsewhere
        start       [0],
        end         [0],
        startTangent[0],
          endTangent[0]);


    return [edge, i - iStart];
}
