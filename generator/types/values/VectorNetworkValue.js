class VectorNetworkValue
extends GValue
{
    static { GNode.types[VECTOR_NETWORK_VALUE] = this; }



    nodeId;

    regions;



    constructor(nodeId,
                regions = new ListValue())
    {
        super(VECTOR_NETWORK_VALUE, 'vectorNetwork');

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



    toNewValue()
    {
        return this.copy();
    }



    toJsCode(gen)
    {
        return '';//this.toPreviewString();
    }



    static NaN()
    {
        return new VectorNetworkValue(
            '',
            ListValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // VECTOR_NETWORKO_VALUE
    
        const region = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(VECTOR_NETWORK_VALUE, region, parse);
    
        return VectorNetworkValue.parse(region)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [VectorNetworkValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const regions = ListValue.parse(str, i); i += regions[1];


        const net = new VectorNetworkValue(
            '', // set node ID elsewhere
            regions[0]);


        return [net, i - iStart];
    }
}