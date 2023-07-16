class VectorRegionValue
extends GValue
{
    nodeId;

    loops;  
    winding;
    props;  


    constructor(nodeId,
                loops   = new ListValue(), 
                winding = new NumberValue(0),
                props   = new ListValue())
    {
        super(VECTOR_REGION_VALUE);

        this.nodeId = nodeId;

        this.loops   = loops;  
        this.winding = winding;
        this.props   = props;  
    }



    copy()
    {
        const copy = new VectorRegionValue(
            this.nodeId,
            this.loops  .copy(), 
            this.winding.copy(), 
            this.props  .copy());

        return copy;
    }



    equals(region)
    {
        return region
            && this.loops  .equals(region.loops  )
            && this.winding.equals(region.winding)
            && this.props  .equals(region.props  );
    }



    // static create(nodeId, loops, winding, props)
    // {
    //     return new VectorRegionValue(
    //         nodeId,
    //         loops,
    //         new NumberValue(winding),
    //         props);
    // }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.loops  .hasInitValue()
            && this.winding.hasInitValue()
            && this.props  .hasInitValue();
    }



    isValid()
    {
        return this.loops  .isValid()
            && this.winding.isValid()
            && this.props  .isValid();
    }



    toString()
    {
        return      this.loops  .toString()
            + ' ' + this.winding.toString()
            + ' ' + this.props  .toString();
    }



    toDisplayString()
    {
        return      this.loops  .toDisplayString()
            + ' ' + this.winding.toDisplayString()
            + ' ' + this.props  .toDisplayString();
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



    static NaN = Object.freeze(new VectorRegionValue(
        '',
        new ListValue(), 
        NumberValue.NaN, 
        new ListValue()));
}



function parseVectorRegionValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorRegionValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const loops   = parseListValue  (str, i); i += loops  [1];
    const winding = parseNumberValue(str[i]); i += winding[1];
    const props   = parseListValue  (str, i); i += props  [1];


    const region = new VectorRegionValue(
        '', // set node ID elsewhere
        loops  [0],
        winding[0],
        props  [0]);


    return [region, i - iStart];
}
