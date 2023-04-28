class FigmaObject
{
    type;
    nodeId = '';


    constructor(type, nodeId)
    {
        this.type   = type;
        this.nodeId = nodeId;
    }



    copyBase(base)
    {
        this.fills            = clone(base.fills);
        this.stroks           = clone(base.strokes);
    
        this.strokeWeight     = base.strokeWeight;
        this.strokeFit        = base.strokeFit;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }



    copy()
    {
        console.assert(false, 'invalid use of abstract class FigmaObject');
        return null;
    }
}



function copyFigmaObject(obj)
{
    switch (obj.type)
    {
        case RECTANGLE: return FigmaRectangle.prototype.copy.call(obj);
        case LINE:      return FigmaLine     .prototype.copy.call(obj);
        case ELLIPSE:   return FigmaEllipse  .prototype.copy.call(obj);
        case POLYGON:   return FigmaPolygon  .prototype.copy.call(obj);
        case STAR:      return FigmaStar     .prototype.copy.call(obj);
    }

    console.assert(false, 'invalid Figma object type \'' + obj.type + '\'');
    return null;
}