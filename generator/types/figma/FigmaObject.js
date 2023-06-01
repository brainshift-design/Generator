class FigmaObject
{
    type;
    
    nodeId     = '';
    uniqueId;
    
    objectId   = NULL;
    objectName = NULL;

    inputIndex = -1; // for unique object IDs


    xform;

    xc  = null;
    xp0 = null; //  xp0 ------- xp1 
    xp1 = null; //   |     xc
    xp2 = null; //  xp2

    cp0 = null; //  cp0 ------- cp1 
    cp1 = null; //   |
    cp2 = null; //  cp2



    constructor(type, nodeId, objectId, objectName)
    {
        this.type       = type;
        this.nodeId     = nodeId;
        this.objectId   = objectId;
        this.objectName = objectName;
        this.uniqueId   = Math.round(Math.random() * 10000);
        this.final      = false;

        this.xform      = clone(identity);

        this.cp0        = point(0, 0);
        this.cp1        = point(1, 0);
        this.cp2        = point(0, 1);
    }



    copyBase(base)
    {
        this.inputIndex = base.inputIndex;
        this.uniqueId   = base.uniqueId;
        this.final      = base.final;
        
        this.xform      = clone(base.xform);

        //this.xc         = !!base.xc  ? base.xc .copy() : null;
        this.xp0        = !!base.xp0 ? base.xp0.copy() : null;
        this.xp1        = !!base.xp1 ? base.xp1.copy() : null;
        this.xp2        = !!base.xp2 ? base.xp2.copy() : null;

        this.cp0        = base.cp0;
        this.cp1        = base.cp1;
        this.cp2        = base.cp2;
    }



    copy()
    {
        console.assert(false, 'invalid use of abstract class FigmaObject');
        return null;
    }



    createDefaultTransform(x, y, a = 0)
    {
        this.xform =
            [[Math.cos(a), -Math.sin(a), x],
             [Math.sin(a),  Math.cos(a), y],
             [0,            0,           1]];
    }



    createTransformPoints(parse, x, y, w, h)
    {
        this.xp0 = new FigmaPoint(this.nodeId, this.objectId+'.0', this.objectName+' ^ 0', x,     y,     true);
        this.xp1 = new FigmaPoint(this.nodeId, this.objectId+'.1', this.objectName+' ^ 1', x + w, y,     true);
        this.xp2 = new FigmaPoint(this.nodeId, this.objectId+'.2', this.objectName+' ^ 2', x,     y + h, true);

        this.xp0.createDefaultTransform(x,     y    );
        this.xp1.createDefaultTransform(x + w, y    );
        this.xp2.createDefaultTransform(x,     y + h);

        return parse.settings.showTransformPoints
            ? [this.xp0, this.xp1, this.xp2]
            : [];
    }



    getTransform()
    {
        let vr = point(this.cp1.x - this.cp0.x, this.cp1.y - this.cp0.y);
        let vb = point(this.cp2.x - this.cp0.x, this.cp2.y - this.cp0.y);
    
    
        let sx = nozero(vr.x);
        let sy = nozero(vb.y);
    
        let kx = -vr.y;
        let ky = -vb.x;
        
        let dx = -this.cp0.x;
        let dy = -this.cp0.y;
    
    
        let xform = mulm3m3(
            [[sx, ky, 0],
             [kx, sy, 0],
             [0,  0,  1]],
            createTransform(dx, dy));
    
        xform = inversem3(xform);
        
    
        return xform;
    }
    
    

    applyTransform(xform, affectSpace = false)
    {
        const coords = this.getTransform();


        if (this.type == POINT)
        {
            const p = transformPoint(point(this.x, this.y), xform, coords);

            this.x = p.x;
            this.y = p.y;
        }
        else
        {
            //const xc  = transformPoint(point(this.xc .x, this.xc .y), xform, coords);
            const xp0 = transformPoint(point(this.xp0.x, this.xp0.y), xform, coords);
            const xp1 = transformPoint(point(this.xp1.x, this.xp1.y), xform, coords);
            const xp2 = transformPoint(point(this.xp2.x, this.xp2.y), xform, coords);


            //this.xc .x = xc .x;
            //this.xc .y = xc .y;

            this.xp0.x = xp0.x;
            this.xp0.y = xp0.y;

            this.xp1.x = xp1.x;
            this.xp1.y = xp1.y;

            this.xp2.x = xp2.x;
            this.xp2.y = xp2.y;
        }


        if (affectSpace)
        {
            this.cp0 = mulv2m3(this.cp0, inversem3(coords));
            this.cp0 = mulv2m3(this.cp0, xform);
            this.cp0 = mulv2m3(this.cp0, coords);

            this.cp1 = mulv2m3(this.cp1, inversem3(coords));
            this.cp1 = mulv2m3(this.cp1, xform);
            this.cp1 = mulv2m3(this.cp1, coords);

            this.cp2 = mulv2m3(this.cp2, inversem3(coords));
            this.cp2 = mulv2m3(this.cp2, xform);
            this.cp2 = mulv2m3(this.cp2, coords);
        }
    }
}



function transformPoint(p, xform, coords)
{
    p = mulv2m3(p, inversem3(coords));
    p = mulv2m3(p, xform);
    p = mulv2m3(p, coords);

    return p;
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