class GeometryBaseValue
extends GType
{
    nodeId;

    fill;
    stroke;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        this.fill         = FillValue.default.copy();
        this.stroke       = StrokeValue.NaN  .copy();
    }



    copyBase(base)
    {
        this.nodeId  = base.nodeId;

        this.fill         = base.fill        .copy();
        this.stroke       = base.stroke      .copy();
    }



    isValid()
    {
        return this.fill  .isValid()
           && !this.stroke.isValid();
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
            nodeId:  this.nodeId,

            fills:   [this.fill  .toFigmaString()],
            strokes: [this.stroke.toFigmaString()],
        }
    }



    toString()
    {
        return      this.fill  .toString()
            + ' ' + this.stroke.toString();
    }
}



function parseGeometryBaseValue(str, i, obj)
{
    const fill   = parseFillValue  (str, i); i += fill  [1];
    const stroke = parseStrokeValue(str, i); i += stroke[1];

    obj.fill   = fill  [0];
    obj.stroke = stroke[0];

    return i;
}