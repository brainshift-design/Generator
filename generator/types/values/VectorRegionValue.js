class VectorRegionValue
extends ShapeValue
{
    loops;  
    winding;

    fills = [];



    constructor(nodeId,
                loops   = new ListValue(), 
                winding = new NumberValue(0))
    {
        super(VECTOR_REGION_VALUE, nodeId);

        this.loops   = loops;  
        this.winding = winding;
    }



    copy()
    {
        const copy = new VectorRegionValue(
            this.nodeId,
            this.loops  .copy(), 
            this.winding.copy());

        copy.fills = clone(this.fills);
        
        copy.copyBase(this);

        return copy;
    }



    equals(region)
    {
        return region
            && this.loops  .equals(region.loops  )
            && this.winding.equals(region.winding);
    }



    // static create(nodeId, loops, winding, props)
    // {
    //     return new VectorRegionValue(
    //         nodeId,
    //         loops,
    //         new NumberValue(winding));
    // }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return this.loops  .hasInitValue()
            && this.winding.hasInitValue();
    }



    isValid()
    {
        return this.loops  .isValid()
            && this.winding.isValid();
    }



    toString()
    {
        return      this.loops  .toString()
            + ' ' + this.winding.toString();
    }



    toDisplayString()
    {
        return      this.loops  .toDisplayString()
            + ' ' + this.winding.toDisplayString();
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
        ListValue  .NaN, 
        NumberValue.NaN));
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


    const region = new VectorRegionValue(
        '', // set node ID elsewhere
        loops  [0],
        winding[0]);


    i = parseShapeBaseValue(str, i, region);


    return [region, i - iStart];
}
