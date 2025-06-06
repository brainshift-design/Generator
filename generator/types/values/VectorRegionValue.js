class VectorRegionValue
extends ShapeValue
{
    static { GNode.types[VECTOR_REGION_VALUE] = this; }



    loops;  
    winding;

    fills = [];



    constructor(nodeId,
                loops   = new ListValue(), 
                winding = new NumberValue(0))
    {
        super(VECTOR_REGION_VALUE, nodeId, 'vectorRegion');

        this.loops   = loops;  
        this.winding = winding;
    }



    static fromObject(obj)
    {
        return new VectorRegionValue(
            obj.nodeId,
            new ListValue(),  //obj.regions.map(r => VectorRegionValue.fromPoint(obj.nodeId, p))), 
            new ListValue()); //obj.regions.map(r => VectorRegionValue.fromPoint(obj.nodeId, p))));
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



    toPreviewString()
    {
        return      this.loops  .toPreviewString()
            + ' ' + this.winding.toPreviewString();
    }



    toDisplayString()
    {
        return      this.loops  .toDisplayString()
            + ' ' + this.winding.toDisplayString();
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
        return new VectorRegionValue(
            '',
            ListValue  .NaN(), 
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // VECTOR_REGION_VALUE
    
        const region = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(VECTOR_REGION_VALUE, region, parse);
    
        return VectorRegionValue.parse(region)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [VectorRegionValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const loops   = ListValue.parse  (str, i); i += loops  [1];
        const winding = NumberValue.parse(str[i]); i += winding[1];


        const region = new VectorRegionValue(
            '', // set node ID elsewhere
            loops  [0],
            winding[0]);


        i = ShapeValue.parse(str, i, region);


        return [region, i - iStart];
    }
}