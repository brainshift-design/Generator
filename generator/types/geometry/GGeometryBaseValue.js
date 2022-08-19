class GGeometryBaseValue
extends GType
{
    nodeId;

    fill;
    stroke;
    strokeWeight;
    strokeFit;
    strokeJoin;
    strokeMiter;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        this.fill         = GColorFillValue.default.copy();
        this.stroke       = GColorFillValue.NaN    .copy();
        this.strokeWeight = new GNumberValue(1);
        this.strokeFit    = new GNumberValue(0);
        this.strokeJoin   = new GNumberValue(0);
        this.strokeMiter  = new GNumberValue(28.96);
    }



    copyBase(base)
    {
        this.nodeId  = base.nodeId;

        this.fill         = base.fill        .copy();
        this.stroke       = base.stroke      .copy();
        this.strokeWeight = base.strokeWeight.copy();
        this.strokeFit    = base.strokeFit   .copy();
        this.strokeJoin   = base.strokeJoin  .copy();
        this.strokeMiter  = base.strokeMiter .copy();
    }



    isValid()
    {
        return this.fill.isValid()
            && (  !this.stroke.isValid()
                ||    this.strokeWeight.isValid()
                   && this.strokeFit   .isValid()
                   && this.strokeJoin  .isValid()
                   && this.strokeMiter .isValid());
    }



    toFigmaObject()
    {
        let strokeAlign, 
            strokeJoin;

        switch (this.strokeFit.value)
        {
            case 0: strokeAlign = 'INSIDE';  break;
            case 1: strokeAlign = 'CENTER';  break;
            case 2: strokeAlign = 'OUTSIDE'; break;
        }
        
        switch (this.strokeJoin.value)
        {
            case 0: strokeJoin = 'MITER'; break;
            case 1: strokeJoin = 'BEVEL'; break;
            case 2: strokeJoin = 'ROUND'; break;
        }

        return {
            nodeId:       this.nodeId,

            fills:        [this.fill  .toFigmaString()],
            strokes:      [this.stroke.toFigmaString()],
            strokeWeight: this.strokeWeight.value,
            strokeAlign:  strokeAlign,
            strokeJoin:   strokeJoin,
            strokeMiter:  Math.min(this.strokeMiter.value, 16)
        }
    }



    toString()
    {
        return         this.fill        .toString()
               + ' ' + this.stroke      .toString()
               + ' ' + this.strokeWeight.toString()
               + ' ' + this.strokeFit   .toString()
               + ' ' + this.strokeJoin  .toString()
               + ' ' + this.strokeMiter .toString();
    }
}



function parseGGeometryBaseValue(_str, i, obj)
{
    const fill         = parseGNumberValue(obj[i]); i += x     [1];
    const stroke       = parseGNumberValue(obj[i]); i += y     [1];
    const strokeWeight = parseGNumberValue(obj[i]); i += width [1];
    const strokeFit    = parseGNumberValue(obj[i]); i += height[1];
    const strokeJoin   = parseGNumberValue(obj[i]); i += angle [1];
    const strokeMiter  = parseGNumberValue(obj[i]); i += round [1];

    obj.fill         = fill        [0];
    obj.stroke       = stroke      [0];
    obj.strokeWeight = strokeWeight[0];
    obj.strokeFit    = strokeFit   [0];
    obj.strokeJoin   = strokeJoin  [0];
    obj.strokeMiter  = strokeMiter [0];

    return i;
}