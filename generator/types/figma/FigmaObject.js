class FigmaObject
{
    type;
    
    nodeId     = '';
    uniqueId;
    
    objectId   = NULL;
    objectName = NULL;

    inputIndex = -1; // for unique object IDs

    
    xform;

    xp0; //  xp0 ------- xp1 
    xp1; //   |
    xp2; //  xp2



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

        this.xp0        = base.xp0;
        this.xp1        = base.xp1;
        this.xp2        = base.xp2;
    }



    copy()
    {
        console.assert(false, 'invalid use of abstract class FigmaObject');
        return null;
    }



    createDefaultTransform(x, y, w, h, a)
    {
        this.xform =
            [[Math.cos(a), -Math.sin(a), x],
             [Math.sin(a),  Math.cos(a), y],
             [0,            0,           1]];

        this.xp0 = mulv2m3(point(x,     y    ), this.xform);
        this.xp1 = mulv2m3(point(x + w, y    ), this.xform);
        this.xp2 = mulv2m3(point(x,     y + h), this.xform);
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
    const xToOrigin = 
        [[1, 0, cx],
         [0, 1, cy],
         [0, 0, 1 ]];

    const xToPoint = 
        [[1, 0, -cx],
         [0, 1, -cy],
         [0, 0,  1 ]];


    // add to object's "total" transformation

    obj.xform = mulm3m3(obj.xform, xToOrigin);
    obj.xp0   = mulv2m3(obj.xp0,   xToOrigin);
    obj.xp1   = mulv2m3(obj.xp1,   xToOrigin);
    obj.xp2   = mulv2m3(obj.xp2,   xToOrigin);


    obj.xform = mulm3m3(obj.xform, xform);
    obj.xp0   = mulv2m3(obj.xp0,   xform);
    obj.xp1   = mulv2m3(obj.xp1,   xform);
    obj.xp2   = mulv2m3(obj.xp2,   xform);


    obj.xform = mulm3m3(obj.xform, xToPoint);
    obj.xp0   = mulv2m3(obj.xp0,   xToPoint);
    obj.xp1   = mulv2m3(obj.xp1,   xToPoint);
    obj.xp2   = mulv2m3(obj.xp2,   xToPoint);


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