class FigmaObject
{
    type;
    
    nodeId     = '';
    
    objectId   = NULL;
    objectName = NULL;

    inputIndex = -1; // for unique object IDs

    retain     = 0;
    feedback   = false;


    xform;

    xp0 = null; //  xp0 ------- xp1 
    xp1 = null; //   |     
    xp2 = null; //  xp2


    sp0 = null; //  sp0 ------- sp1 
    sp1 = null; //   |
    sp2 = null; //  sp2


    scaleCorners;
    scaleStyle;



    constructor(type, nodeId, objectId, objectName)
    {
        this.type         = type;
        this.nodeId       = nodeId;
        this.objectId     = objectId;
        this.objectName   = objectName;

        this.xform        = clone(identity);

        this.scaleCorners = 1;
        this.scaleStyle   = 1;
    }



    copyBase(base)
    {
        this.inputIndex   = base.inputIndex;
        
        this.feedback     = base.feedback;
        this.retain       = base.retain;
        
        this.xform        = clone(base.xform);

        this.xp0          = !!base.xp0 ? base.xp0.copy() : null;
        this.xp1          = !!base.xp1 ? base.xp1.copy() : null;
        this.xp2          = !!base.xp2 ? base.xp2.copy() : null;

        this.sp0          = base.sp0;
        this.sp1          = base.sp1;
        this.sp2          = base.sp2;

        this.scaleCorners = base.scaleCorners;
        this.scaleStyle   = base.scaleStyle;
    }



    copy()
    {
        consoleError('invalid use of abstract class FigmaObject');
        return null;
    }



    createDefaultSpace(cx = 0, cy = 0)
    {
        this.sp0 = point(cx,   cy  );
        this.sp1 = point(cx+1, cy  );
        this.sp2 = point(cx,   cy+1);
    }



    createDefaultTransform(x, y, a = 0)
    {
        this.xform =
            [[Math.cos(a), -Math.sin(a), x],
             [Math.sin(a),  Math.cos(a), y],
             [0,            0,           1]];
    }



    createDefaultTransformPoints(parse, x, y, w, h)
    {
        this.xp0 = new FigmaPoint(this.nodeId, this.objectId+'.0', this.objectName+' ^ 0', x,     y,     true, false, true);
        this.xp1 = new FigmaPoint(this.nodeId, this.objectId+'.1', this.objectName+' ^ 1', x + w, y,     true, false, true);
        this.xp2 = new FigmaPoint(this.nodeId, this.objectId+'.2', this.objectName+' ^ 2', x,     y + h, true, false, true);

        w = Math.sign(w) * Math.max(0.000001, Math.abs(w));
        h = Math.sign(h) * Math.max(0.000001, Math.abs(h));

        this.xp0.createDefaultTransform(x,     y    );
        this.xp1.createDefaultTransform(x + w, y    );
        this.xp2.createDefaultTransform(x,     y + h);

        return parse
            && parse.settings.showTransformPoints
            ? [this.xp0, this.xp1, this.xp2]
            : [];
    }



    createSpaceTransform()
    {
        let vr = point(this.sp1.x - this.sp0.x, this.sp1.y - this.sp0.y);
        let vb = point(this.sp2.x - this.sp0.x, this.sp2.y - this.sp0.y);
    
    
        let sx = nozero(vr.x);
        let sy = nozero(vb.y);
    
        let kx = vr.y;
        let ky = vb.x;
        
        let dx = this.sp0.x;
        let dy = this.sp0.y;
    
    
        let xform = mulm3m3(
            createTransform(dx, dy),
            [[sx, ky, 0],
             [kx, sy, 0],
             [0,  0,  1]]);//,
//            createTransform(dx, dy));
    
        //xform = inversem3(xform);
        
    
        return xform;
    }
    
    

    applyTransform(xform, affectSpace)
    {
        const space = this.createSpaceTransform();


        if (this.type == POINT)
        {
            const p = transformPoint(point(this.x, this.y), xform, space);

            this.x = p.x;
            this.y = p.y;

            if (affectSpace)
                this.applySpaceTransform(xform, space);
        }
        else if (this.type == VECTOR_PATH)
        {
            this.updatePoints(xform, space);

            if (affectSpace)
                this.applySpaceTransform(xform, space);
        }
        else if (this.type == SHAPE_GROUP)
        {
            for (const obj of this.children)
            {
                obj.applyObjectTransform(xform, space);

                if (affectSpace)
                    obj.applySpaceTransform(xform, space);
            }                
        }
        else
        {
            this.applyObjectTransform(xform, space);

            if (affectSpace)
                this.applySpaceTransform(xform, space);
        }
    }



    applyObjectTransform(xform, space)
    {
        const xp0 = transformPoint(point(this.xp0.x, this.xp0.y), xform, space);
        const xp1 = transformPoint(point(this.xp1.x, this.xp1.y), xform, space);
        const xp2 = transformPoint(point(this.xp2.x, this.xp2.y), xform, space);

        this.xp0.x = xp0.x;
        this.xp0.y = xp0.y;

        this.xp1.x = xp1.x;
        this.xp1.y = xp1.y;

        this.xp2.x = xp2.x;
        this.xp2.y = xp2.y;
    }



    applySpaceTransform(xform, space)
    {
        const sp0 = transformPoint(point(this.sp0.x, this.sp0.y), xform, space);
        const sp1 = transformPoint(point(this.sp1.x, this.sp1.y), xform, space);
        const sp2 = transformPoint(point(this.sp2.x, this.sp2.y), xform, space);

        this.sp0.x = sp0.x;
        this.sp0.y = sp0.y;

        this.sp1.x = sp1.x;
        this.sp1.y = sp1.y;

        this.sp2.x = sp2.x;
        this.sp2.y = sp2.y;
    }



    toJsonObject()
    {
        return {
            type:       this.type,
            nodeId:     this.nodeId,

            objectId:   this.objectId,
            objectName: this.objectName,
            
            feedback:   this.feedback,

            xp0:        this.xp0 ? point(this.xp0.x, this.xp0.y) : null,
            xp1:        this.xp1 ? point(this.xp1.x, this.xp1.y) : null,
            xp2:        this.xp2 ? point(this.xp2.x, this.xp2.y) : null
        };
    }



    toData()
    {
        return [
        /* 0 */ this.type,
        /* 1 */ this.nodeId,

        /* 2 */ this.objectId,
        /* 3 */ this.objectName,
            
        /* 4 */ this.feedback,
        /* 5 */ this.retain,
        
        /* 6 */ this.xp0 ? point(this.xp0.x, this.xp0.y) : null,
        /* 7 */ this.xp1 ? point(this.xp1.x, this.xp1.y) : null,
        /* 8 */ this.xp2 ? point(this.xp2.x, this.xp2.y) : null,

        /* 9 */ 0 // for future use
        ];
    }
}



function transformPoint(p, xform, space)
{
    p = mulv2m3(p, inversem3(space));
    p = mulv2m3(p, xform);
    p = mulv2m3(p, space);

    return p;
}



function copyFigmaObject(obj)
{
    switch (obj.type)
    {
        case RECTANGLE:   return FigmaRectangle .prototype.copy.call(obj);
        case LINE:        return FigmaLine      .prototype.copy.call(obj);
        case ELLIPSE:     return FigmaEllipse   .prototype.copy.call(obj);
        case TRAPEZE:     return FigmaTrapeze   .prototype.copy.call(obj);
        case POLYGON:     return FigmaPolygon   .prototype.copy.call(obj);
        case STAR:        return FigmaStar      .prototype.copy.call(obj);
        case TEXT_SHAPE:  return FigmaText      .prototype.copy.call(obj);
        case POINT:       return FigmaPoint     .prototype.copy.call(obj);
        case VECTOR_PATH: return FigmaVectorPath.prototype.copy.call(obj);
        case BOOLEAN:     return FigmaBoolean   .prototype.copy.call(obj);
        case SHAPE_GROUP: return FigmaShapeGroup.prototype.copy.call(obj);
        case FRAME:       return FigmaFrame     .prototype.copy.call(obj);
    }

    consoleError('invalid Figma object type \'' + obj.type + '\'');
    return null;
}



function getObjBounds(objects)
{
    let bounds = Rect.NaN;


    for (const obj of objects)
    {
        if (obj.type == VECTOR_PATH)
        {
            switch (obj.degree)
            {
                case 0:
                    for (const p of obj.pathPoints)
                        bounds = expandRect_(bounds, p);

                    break;

                case 1:
                    for (let i = 0; i < obj.pathPoints.length-2; i += 2)
                    {
                        bounds = expandRect(
                            bounds, 
                            bounds2(
                                obj.pathPoints[i  ], 
                                obj.pathPoints[i+1],
                                obj.pathPoints[i+2]));
                    }
                    break;

                case 2:
                case 3:
                case 4:
                case 5:
                    for (let i = 0; i < obj.pathPoints.length-3; i += 3)
                    {
                        bounds = expandRect(
                            bounds, 
                            bounds3(
                                obj.pathPoints[i  ], 
                                obj.pathPoints[i+1],
                                obj.pathPoints[i+2],
                                obj.pathPoints[i+3]));
                    }
                    break;

                default:
                    console.error('invalid curve degree');
            }
        }

        else if (obj.type == VECTOR_NETWORK)
        {
            for (let i = 0; i < obj.edges.length; i++)
            {
                bounds = expandRect(
                    bounds, 
                    bounds3(
                        obj.edges[i].start.toPoint(), 
                        obj.edges[i].start.toPoint(),
                        obj.edges[i].end  .toPoint(),
                        obj.edges[i].end  .toPoint()));
            }
        }

        else if (obj.type == POINT)
             //&& !obj.isDeco)
            bounds = expandRect_(bounds, point(obj.x, obj.y));

        else
        {
            const dp = subv(obj.xp1, obj.xp0);

            bounds = expandRect_(bounds, obj.xp0);
            bounds = expandRect_(bounds, obj.xp1);
            bounds = expandRect_(bounds, obj.xp2);
            bounds = expandRect_(bounds, addv(obj.xp2, dp));
        }

        // else if (obj.type == LINE)
        //     bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, 0));

        // else
        //     bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, obj.height));
    }


    return bounds;
}



function addObjectCenter(node, obj, zoom)
{
    const length = 10;
    
    const sp0 =      obj.sp0;
    const sp1 = addv(obj.sp0, mulvs(      subv(obj.sp1, obj.sp0),      length));
    const sp2 = addv(obj.sp0, mulvs(mulvs(subv(obj.sp2, obj.sp0), -1), length));    

    const x = createFigmaLine(node, sp0, sp1, [12, 140, 233], CENTER_SEPARATOR + 'X');
    const y = createFigmaLine(node, sp0, sp2, [12, 140, 233], CENTER_SEPARATOR + 'Y');

    node.value.objects.push(x);
    node.value.objects.push(y);
}



function createFigmaLine(node, p0, p1, color, suffix)
{
    const line = new FigmaVectorPath(
        node.nodeId,
        node.nodeId   + suffix,
        node.nodeName + suffix,
        [PointValue.fromPoint(node.nodeId, p0), 
         PointValue.fromPoint(node.nodeId, p1)],
        0, 0, 0, 0);


    line.strokes.push([
        'SOLID', 
        color[0], 
        color[1], 
        color[2], 
        100, 
        'NORMAL']);

    line.strokeWeight = 1;
    line.strokeAlign  = 'CENTER';
    line.strokeJoin   = 'MITER';
    line.strokeCap    = 'NONE';
    line.isDeco       = true;


    line.createDefaultTransform(p0.x, p0.y);


    return line;
}



function getValidObjects(input)
{
    return input 
        && input.value
        ? input.value.objects
            .filter(o => 
                   o.isDeco  === false
                || o.isXform === true)
            .map(o => o.copy()) 
        : [];
}