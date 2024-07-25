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



    static fromObject(obj)
    {
        return new VectorNetworkValue(
            obj.nodeId,
            new ListValue(obj.regions.map(r => VectorRegionValue.fromObject(obj.nodeId, r))));
    }



    copy()
    {
        const copy = new VectorNetworkValue(
            this.nodeId,
            this.regions.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(other)
    {
        return other
            && this.regions.equals(other.regions);
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



    toPreviewString()
    {
        return this.regions.toPreviewString();
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
        return '';//this.toPreviewString();
    }



    getNaN()
    {
        return VectorNetworkValue.NaN.copy();
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
        NULL, // set node ID elsewhere
        regions[0]);


    return [net, i - iStart];
}
