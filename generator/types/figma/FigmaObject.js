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


    //cp  = null; // pivot

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

        this.createDefaultSpace();

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

        //this.cp           = base.cp;
    
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



    createDefaultSpace()
    {
        //this.cp  = point(0, 0);
        this.sp0 = point(0, 0);
        this.sp1 = point(1, 0);
        this.sp2 = point(0, 1);
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
        this.xp0 = new FigmaPoint(this.nodeId, this.objectId+'.0', this.objectName+' ^ 0', x,     y,     true, false, true);
        this.xp1 = new FigmaPoint(this.nodeId, this.objectId+'.1', this.objectName+' ^ 1', x + w, y,     true, false, true);
        this.xp2 = new FigmaPoint(this.nodeId, this.objectId+'.2', this.objectName+' ^ 2', x,     y + h, true, false, true);

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

            this.applySpaceTransform(xform, space, affectSpace);
        }
        else if (this.type == VECTOR_PATH)
        {
            this.applyObjectTransform(xform, space);
            this.applySpaceTransform(xform, space, affectSpace);
        }
        else if (this.type == SHAPE_GROUP)
        {
            for (const obj of this.children)
            {
                obj.applyObjectTransform(xform, space);
                obj.applySpaceTransform (xform, space, affectSpace);
            }                
        }
        else
        {
            this.applyObjectTransform(xform, space);
            this.applySpaceTransform (xform, space, affectSpace);
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



    applySpaceTransform(xform, space, affectSpace)
    {
        if (!affectSpace)
            return;


        // xform = inversem3(xform);


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



function addColorProp(obj, prop)
{
    const rgb = scaleRgb(prop.toRgb());

    obj.fills.push([
        'SOLID', 
        rgb[0], 
        rgb[1], 
        rgb[2], 
        255   ]);
}



function addFillProp(obj, prop, target = obj.fills)
{
    const rgb = scaleRgb(prop.color.toRgb());

    target.push([
        'SOLID', 
        rgb[0], 
        rgb[1], 
        rgb[2], 
        prop.opacity.toValue().toNumber(),
        BlendModes[prop.blend.value][2]]);
}



function addGradientProp(obj, prop, target = obj.fills)                
{
    const gradient = 
    [
        '', // type
        [], // transform
        []  // stops
    ];


    switch(prop.gradType.value)
    {
        case 0: gradient[0] = 'GRADIENT_LINEAR';  break;
        case 1: gradient[0] = 'GRADIENT_RADIAL';  break;
        case 2: gradient[0] = 'GRADIENT_ANGULAR'; break;
        case 3: gradient[0] = 'GRADIENT_DIAMOND'; break;
    }


    const isLinear = prop.gradType.value == 0;


    let   x   =        prop.x     .toNumber() / 100;
    let   y   =        prop.y     .toNumber() / 100;
    const a   =        prop.angle .toNumber()/360*Tau;
    let   s   = nozero(prop.size  .toNumber() / 100);
    let   asp = nozero(prop.aspect.toNumber() / 100);
    let   sk  =        prop.skew  .toNumber() / 100;


    if (!isLinear)
    {
        x   -= s * Math.cos(a);
        y   -= s * Math.sin(a);

        s   *= 2;

        asp /= 2;
    }

    
    const p0 = point(x, y);
    const p1 = addv(p0, vector(a, s));
    
    const p2 = addv(
        addv(p0, vector(a + Tau/4, s * asp)),
        mulvs(unitv(subv(p1, p0)), distance(p0, p1) * sk));


    const identityHandles = 
        [[0,   1,   0],
         [0.5, 0.5, 1],
         [1,   1,   1]];


    let xform = [
        [p0.x, p1.x, p2.x],
        [p0.y, p1.y, p2.y],
        [1,    1,    1   ]];


    xform = mulm3m3(identityHandles, inversem3(xform));


    gradient[1] = [
        xform[0],
        xform[1] ];
        

    const stops = validateColorStops(prop.stops.items);
    
    setColorStopPositions(stops);


    for (let j = 0; j < stops.length; j++)
    {
        const stop = stops[j];
        const rgba = stop.fill.toRgba();

        gradient[2].push([
            rgba[0], 
            rgba[1], 
            rgba[2], 
            rgba[3],
            stop.position.toNumber() / 100]);
    }


    gradient[3] = BlendModes[prop.blend.value][2];    


    target.push(gradient);
}



function validateColorStops(_stops)
{
    const stops = [];


    for (let i = 0; i < _stops.length; i++)
    {
        const stop = _stops[i];

        if (stop.type == COLOR_VALUE)
        {
            // if (isNaN(stop.toRgb()[0]))
            //     console.log('stop =', stop);
            stops.push(new ColorStopValue(
                FillValue.fromRgb(scaleRgb(stop.toRgb()), 100),
                NumberValue.NaN));
        }

        else if (stop.type == FILL_VALUE)
            stops.push(new ColorStopValue(
                stop,
                NumberValue.NaN));

        else if (stop.type == LIST_VALUE)
            stops.push(...validateColorStops(stop.items));

        else
            stops.push(stop);
    }


    return stops;
}



function setColorStopPositions(stops)
{
    if (    stops.length > 0
        && !stops[0].position.isValid()) 
        stops[0].position = new NumberValue(0);

    if (    stops.length > 1
        && !stops.at(-1).position.isValid()) 
        stops.at(-1).position = new NumberValue(100);
    

    if (stops.length > 2)
    {
        for (let i = 1; i < stops.length-1; i++)
        {
            const stop = stops[i];

            if (!stop.position.isValid())
            {
                let prevValid = i-1;
                let nextValid = i+1;

                while ( prevValid > 0
                    && !stops[prevValid].position.isValid()) 
                    prevValid--;

                while ( nextValid < stops.length-1
                    && !stops[nextValid].position.isValid()) 
                    nextValid++;
                        
                const pv = stops[prevValid].position.toNumber();
                const nv = stops[nextValid].position.toNumber();

               stop.position = new NumberValue((pv + (nv - pv) * ((i - prevValid) / (nextValid - prevValid)))); 
            }
        }
    }
}



function addStrokeProp(obj, prop)
{
    for (const fill of prop.fills.items)
    {
        if (fill.type ==     FILL_VALUE) addFillProp    (obj, fill, obj.strokes);
        if (fill.type == GRADIENT_VALUE) addGradientProp(obj, fill, obj.strokes);
    }


    obj.strokeWeight = prop.weight.toValue().toNumber();

    switch (prop.fit.toValue().value)
    {
        case 0: obj.strokeAlign = 'INSIDE';  break;
        case 1: obj.strokeAlign = 'CENTER';  break;
        case 2: obj.strokeAlign = 'OUTSIDE'; break;
    }

    switch (prop.join.toValue().value)
    {
        case 0: obj.strokeJoin = 'MITER'; break;
        case 1: obj.strokeJoin = 'BEVEL'; break;
        case 2: obj.strokeJoin = 'ROUND'; break;
    }

    switch (prop.cap.toValue().value)
    {
        case 0: obj.strokeCap = 'NONE';   break;
        case 1: obj.strokeCap = 'SQUARE'; break;
        case 2: obj.strokeCap = 'ROUND';  break;
    }

    obj.strokeDashes     = prop.dashes.toValue().value;
    
    obj.strokeMiterLimit = prop.miter.toValue().value;
}



function addDropShadowProp(obj, prop)
{
    const rgba = prop.fill.toRgba();

    obj.effects.push([
        'DROP_SHADOW', 
        rgba[0],
        rgba[1],
        rgba[2],
        rgba[3],
        prop.x     .toNumber(),
        prop.y     .toNumber(),
        prop.blur  .toNumber(),
        prop.spread.toNumber(),
        BlendModes[prop.blend.value][2],
        prop.behind.value > 0,
        prop.visible ]);
}



function addInnerShadowProp(obj, prop)
{
    const rgba = prop.fill.toRgba();

    obj.effects.push([
        'INNER_SHADOW', 
        rgba[0],
        rgba[1],
        rgba[2],
        rgba[3],
        prop.x     .toNumber(),
        prop.y     .toNumber(),
        prop.blur  .toNumber(),
        prop.spread.toNumber(),
        BlendModes[prop.blend.value][2],
        prop.visible ]);
}



function addLayerBlurProp(obj, prop)
{
    obj.effects.push([
        'LAYER_BLUR', 
        prop.radius.toNumber(),
        prop.visible ]);
}



function addBackBlurProp(obj, prop)
{
    obj.effects.push([
        'BACKGROUND_BLUR', 
        prop.radius.toNumber(),
        prop.visible ]);
}



function addMaskProp(obj)
{
    obj.isMask = true;
}
