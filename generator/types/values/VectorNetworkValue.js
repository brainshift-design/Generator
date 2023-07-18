class VectorNetworkValue
extends GValue
{
    nodeId;

    regions;



    constructor(nodeId,
                regions = new ListValue())
    {
        super(VECTOR_NETWORK_VALUE);

        this.nodeId  = nodeId;

        this.regions = regions; 
    }



    copy()
    {
        const copy = new VectorNetworkValue(
            this.nodeId,
            this.regions.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(region)
    {
        return region
            && this.regions.equals(region.regions);
    }



    static create(nodeId, regions)
    {
        return new VectorNetworkValue(
            nodeId,
            regions);
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.regions.hasInitValue();
    }



    isValid()
    {
        return this.regions.isValid();
    }



    toString()
    {
        return this.regions.toString();
    }



    toDisplayString()
    {
        return this.regions.toDisplayString();
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
        ListValue.NaN));
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

    const regions = parseListValue(str, i); i += regions[1];


    const net = new VectorNetworkValue(
        '', // set node ID elsewhere
        regions[0]);


    return [net, i - iStart];
}
