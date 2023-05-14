class FigmaObject
{
    type;
    
    nodeId            = '';
    
    objectId          = NULL;
    objectName        = NULL;

    uniqueId;

    relativeTransform;



    constructor(type, nodeId, objectId, objectName)
    {
        this.type              = type;
        this.nodeId            = nodeId;
        this.objectId          = objectId;
        this.objectName        = objectName;
        this.uniqueId          = Math.round(Math.random() * 10000);

        this.relativeTransform = clone(identity);
    }



    copyBase(base)
    {
        this.uniqueId          = base.uniqueId;
        this.relativeTransform = clone(base.relativeTransform);
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
        case RECTANGLE:   return FigmaRectangle .prototype.copy.call(obj);
        case LINE:        return FigmaLine      .prototype.copy.call(obj);
        case ELLIPSE:     return FigmaEllipse   .prototype.copy.call(obj);
        case POLYGON:     return FigmaPolygon   .prototype.copy.call(obj);
        case STAR:        return FigmaStar      .prototype.copy.call(obj);
        case TEXTSHAPE:   return FigmaText      .prototype.copy.call(obj);
        case POINT:       return FigmaPoint     .prototype.copy.call(obj);
        case VECTOR_PATH: return FigmaVectorPath.prototype.copy.call(obj);
        case SHAPE_GROUP: return FigmaShapeGroup.prototype.copy.call(obj);
        case FRAME:       return FigmaFrame     .prototype.copy.call(obj);
    }

    console.assert(false, 'invalid Figma object type \'' + obj.type + '\'');
    return null;
}