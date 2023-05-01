class FigmaObject
{
    type;
    
    nodeId = '';

    uniqueId;

    data = NULL;



    constructor(type, nodeId)
    {
        this.type     = type;
        this.nodeId   = nodeId;
        this.uniqueId = Math.round(Math.random() * 10000);
    }



    copyBase(base)
    {
        this.uniqueId         = base.uniqueId;

        this.data             = base.data;

        this.fills            = clone(base.fills);
        this.strokes          = clone(base.strokes);
    
        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
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
        case TEXTSHAPE: return FigmaText     .prototype.copy.call(obj);
    }

    console.assert(false, 'invalid Figma object type \'' + obj.type + '\'');
    return null;
}