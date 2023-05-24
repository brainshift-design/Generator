class FigmaObject
{
    type;
    
    nodeId     = '';
    uniqueId;
    
    objectId   = NULL;
    objectName = NULL;

    inputIndex = -1; // for unique object IDs

    xform;



    constructor(type, nodeId, objectId, objectName)
    {
        this.type       = type;
        this.nodeId     = nodeId;
        this.objectId   = objectId;
        this.objectName = objectName;
        this.uniqueId   = Math.round(Math.random() * 10000);
        this.final      = false;

        this.xform      = clone(identity);
    }



    copyBase(base)
    {
        this.inputIndex = base.inputIndex;
        this.uniqueId   = base.uniqueId;
        this.final      = base.final;
        
        this.xform      = clone(base.xform);
    }



    copy()
    {
        console.assert(false, 'invalid use of abstract class FigmaObject');
        return null;
    }



    createDefaultTransform(x, y, angle)
    {
        this.xform =
            [[Math.cos(angle), -Math.sin(angle), x],
             [Math.sin(angle),  Math.cos(angle), y],
             [0,                0,               1]];
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
        case BOOLEAN:     return FigmaBoolean   .prototype.copy.call(obj);
        case SHAPE_GROUP: return FigmaShapeGroup.prototype.copy.call(obj);
        case FRAME:       return FigmaFrame     .prototype.copy.call(obj);
    }

    console.assert(false, 'invalid Figma object type \'' + obj.type + '\'');
    return null;
}



function applyTransform(obj, cx, cy, xform)
{
    // add to object's "total" transformation

    obj.xform = mulm3m3(
        obj.xform,
        [[1, 0, cx],
         [0, 1, cy],
         [0, 0, 1 ]]);

    obj.xform = mulm3m3(obj.xform, xform);

    obj.xform = mulm3m3(
        obj.xform,
        [[1, 0, -cx],
         [0, 1, -cy],
         [0, 0,  1 ]]);


    // apply only this transformation to the position (only for points)

    const p = mulv2m3(
        point(obj.x, obj.y), 
        xform);

    obj.x = p.x;
    obj.y = p.y;
}