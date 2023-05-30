class FigmaObject
{
    type;
    
    nodeId     = '';
    uniqueId;
    
    objectId   = NULL;
    objectName = NULL;

    inputIndex = -1; // for unique object IDs

    
    xform;

    xp0 = null; //  xp0 ------- xp1 
    xp1 = null; //   |
    xp2 = null; //  xp2



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
        this.xp0        = !!base.xp0 ? base.xp0.copy() : null;
        this.xp1        = !!base.xp1 ? base.xp1.copy() : null;
        this.xp2        = !!base.xp2 ? base.xp2.copy() : null;
    }



    copy()
    {
        console.assert(false, 'invalid use of abstract class FigmaObject');
        return null;
    }



    createDefaultTransform(x, y, w, h, a = 0)
    {
        this.xform =
            [[Math.cos(a), -Math.sin(a), x],
             [Math.sin(a),  Math.cos(a), y],
             [0,            0,           1]];
    }



    applyTransform(xform)
    {
        if (this.type == POINT)
        {
            const p = mulv2m3(
                point(
                    this.x, 
                    this.y), 
                xform);

            this.x = p.x;
            this.y = p.y;
        }
        else
        {
            const xp0  = mulv2m3(point(this.xp0.x, this.xp0.y), xform);
            const xp1  = mulv2m3(point(this.xp1.x, this.xp1.y), xform);
            const xp2  = mulv2m3(point(this.xp2.x, this.xp2.y), xform);


            this.xp0.x = xp0.x;
            this.xp0.y = xp0.y;

            this.xp1.x = xp1.x;
            this.xp1.y = xp1.y;

            this.xp2.x = xp2.x;
            this.xp2.y = xp2.y;
        }
    }



    createTransformPoints(parse, x, y, w, h, _a)
    {
        this.xp0 = new FigmaPoint(this.nodeId, this.objectId+'.xp0', this.objectName+' ^ 0', x,     y,   );
        this.xp1 = new FigmaPoint(this.nodeId, this.objectId+'.xp1', this.objectName+' ^ 1', x + w, y,   );
        this.xp2 = new FigmaPoint(this.nodeId, this.objectId+'.xp2', this.objectName+' ^ 2', x,     y + h);

        this.xp0.createDefaultTransform(x,     y,     0, 0, _a);
        this.xp1.createDefaultTransform(x + w, y,     0, 0, _a);
        this.xp2.createDefaultTransform(x,     y + h, 0, 0, _a);

        return parse.settings.showTransformPoints
             ? [this.xp0, this.xp1, this.xp2]
             : [];
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