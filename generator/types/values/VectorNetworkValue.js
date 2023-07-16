class VectorNetworkValue
extends GValue
{
    nodeId;

    points; 
    edges;  
    regions;


    constructor(nodeId,
                points  = new ListValue(), 
                edges   = new ListValue(),
                regions = new ListValue())
    {
        super(VECTOR_NETWORK_VALUE);

        this.nodeId = nodeId;

        this.points  = points;  
        this.edges   = edges;
        this.regions = regions; 
    }



    copy()
    {
        const copy = new VectorNetworkValue(
            this.nodeId,
            this.points .copy(), 
            this.edges  .copy(), 
            this.regions.copy());

        return copy;
    }



    equals(region)
    {
        return region
            && this.points .equals(region.points )
            && this.edges  .equals(region.edges  )
            && this.regions.equals(region.regions);
    }



    static create(nodeId, points, edges, regions)
    {
        return new VectorNetworkValue(
            nodeId,
            new ListValue(points ),
            new ListValue(edges  ),
            new ListValue(regions));
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.points .hasInitValue()
            && this.edges  .hasInitValue()
            && this.regions.hasInitValue();
    }



    isValid()
    {
        return this.points .isValid()
            && this.edges  .isValid()
            && this.regions.isValid();
    }



    toString()
    {
        return      this.points .toString()
            + ' ' + this.edges  .toString()
            + ' ' + this.regions.toString();
    }



    toDisplayString()
    {
        return      this.points .toDisplayString()
            + ' ' + this.edges  .toDisplayString()
            + ' ' + this.regions.toDisplayString();
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
        return VectorNetworkValue.NaN;
    }



    static NaN = Object.freeze(new VectorNetworkValue(
        '',
        new ListValue(), 
        new ListValue(), 
        new ListValue()));
}



function parseVectorNetworkValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorNetworkValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const points  = parseListValue(str, i); i += points [1];
    const edges   = parseListValue(str, i); i += edges  [1];
    const regions = parseListValue(str, i); i += regions[1];


    const net = new VectorNetworkValue(
        '', // set node ID elsewhere
        points [0],
        edges  [0],
        regions[0]);


    return [net, i - iStart];
}
