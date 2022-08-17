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



    constructor(type = GEOMETRY_VALUE, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        this.fill         = GColorFillValue.default;
        this.stroke       = GColorFillValue.NaN;
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
        return this.fill        .isValid()
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
            nodeId:           this.nodeId,

            fills:            [this.fill  ],
            strokes:          [this.stroke],
            strokeWeight:     this.strokeWeight.value,
            strokeAlign:      strokeAlign,
            strokeJoin:       strokeJoin,
            strokeMiterLimit: Math.min(this.strokeMiter.value, 16)
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