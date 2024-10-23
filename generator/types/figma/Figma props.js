function addProp(obj, prop)
{
         if (prop.type ==         COLOR_VALUE)  addColorProp       (obj, prop);
    else if (prop.type ==          FILL_VALUE)  addFillProp        (obj, prop);
    else if (prop.type ==      GRADIENT_VALUE)  addGradientProp    (obj, prop);
    else if (prop.type ==        STROKE_VALUE)  addStrokeProp      (obj, prop);
    else if (prop.type ==  STROKE_SIDES_VALUE)  addStrokeSidesProp (obj, prop);
    else if (prop.type == ROUND_CORNERS_VALUE)  addRoundCornersProp(obj, prop);
    else if (prop.type ==   DROP_SHADOW_VALUE)  addDropShadowProp  (obj, prop);
    else if (prop.type ==  INNER_SHADOW_VALUE)  addInnerShadowProp (obj, prop);
    else if (prop.type ==    LAYER_BLUR_VALUE)  addLayerBlurProp   (obj, prop);
    else if (prop.type ==     BACK_BLUR_VALUE)  addBackBlurProp    (obj, prop);
    else if (prop.type ==   LAYER_BLEND_VALUE)  addLayerBlendProp  (obj, prop);
    else if (prop.type ==    LAYER_MASK_VALUE)  addMaskProp        (obj, prop);
}



function addColorProp(obj, prop)
{
    const rgb = scaleRgb(prop.toRgb());

    if (obj.type == SHAPE_GROUP)
    {
        for (const _obj of obj.children)
            addProp(_obj, prop);
    }
    else
    {
        obj.fills.push([
            'SOLID', 
            rgb[0], 
            rgb[1], 
            rgb[2], 
            255 ]);
    }
}



function addFillProp(obj, prop, target = obj.fills)
{
    if (prop.color.type != COLOR_VALUE)
        return;


    const rgb = scaleRgb(prop.color.toRgb());

    if (obj.type == SHAPE_GROUP)
    {
        for (const _obj of obj.children)
            addProp(_obj, prop);
    }
    else
    {
        target.push([
            'SOLID', 
            rgb[0], 
            rgb[1], 
            rgb[2], 
            prop.opacity.toNewValue().value,//.toNumber(),
            BlendModes[Math.min(Math.max(0, Math.round(prop.blend.value)), BlendModes.length-1)][2]]);
    }
}



function addGradientProp(obj, prop, target = obj.fills)                
{
    const gradient = 
    [
        '', // type
        [], // transform points
        [], // stops
        '', // blend mode
        0   // flags 0 = flipX
            //       1 = flipY
    ];


    switch(prop.gradType.value)
    {
        case 0: gradient[0] = 'GRADIENT_LINEAR';  break;
        case 1: gradient[0] = 'GRADIENT_RADIAL';  break;
        case 2: gradient[0] = 'GRADIENT_ANGULAR'; break;
        case 3: gradient[0] = 'GRADIENT_DIAMOND'; break;
    }

    
    let   x        =        prop.x     .value / 100;
    let   y        =        prop.y     .value / 100;
    let   s        = nozero(prop.size  .value / 100);
    let   a        =        prop.angle .value / 360*Tau;
    let   asp      = nozero(prop.aspect.value / 100);
    const diag     =        prop.diagAspect;
    let   sk       =        prop.skew  .value / 100;

    
    const pos      = prop.position.value;
    const isLinear = prop.gradType.value == 0;
    
    const bounds   = obj.getBounds();

    // bounds.w = Math.max(1, bounds.w); // this is necessary
    // bounds.h = Math.max(1, bounds.h); // for proportionality


    if (pos > 0)
    {
        if (   pos == 1
            || pos == 2)
        {
            x = x / 100 * bounds.width;
            y = y / 100 * bounds.height;
        }
        

        x = x * 100 / nozero(bounds.width );
        y = y * 100 / nozero(bounds.height);


        if (pos == 4)
        {
            x = x - bounds.x / nozero(bounds.width );
            y = y - bounds.y / nozero(bounds.height);
            
            s *= 100 / nozero(bounds.width);
        }
    }


    let   p0 = point(x, y);
    let   p1 = addv(p0, vector(a, diag === true ? s : s * nozero(asp)));
    let   p2 = addv(p0, vector(a + Tau/4, s));


    const a1 = anglev2(p0, p1);
    const a2 = anglev2(p0, p2);

    if (diag === true)
    {
        p1 = addv(p1, vector(a1 - Tau/8, (asp-1) * Math.sqrt(sqr(distv(p0, p1))/2)));
        p2 = addv(p2, vector(a2 + Tau/8, (asp-1) * Math.sqrt(sqr(distv(p0, p2))/2)));

        p1 = addv(p1, vector(a2 + Tau/8, s * sk * Math.sqrt(2)/2));
        p2 = addv(p2, vector(a2 + Tau/8, s * sk * Math.sqrt(2)/2));
    }
    else
    {
        p2 = subv(p2, vector(a1, s * sk));
    }


    if (pos > 0)
    {
        if (   pos == 1
            || pos == 3
            || pos == 4)
        {
            const aspect = bounds.width / nozero(bounds.height);

            p1.y = p0.y + (p1.y - p0.y) * aspect;
            p2.y = p0.y + (p2.y - p0.y) * aspect;
        }
        else if (pos == 2)
        {
            const aspect = bounds.height / nozero(bounds.width);
            
            p1.x = p0.x + (p1.x - p0.x) * aspect;
            p2.x = p0.x + (p2.x - p0.x) * aspect;
        }
    }


    if (!isLinear)
    {
        const dv = subv(p0, p1);

        p0 = addv(p0, dv);
        p2 = addv(p2, dv);
    }


    // handles outside range

    if (prop.stops.items.some(i => 
               i
            && (   i.position.value < 0 
                || i.position.value > 100)))
    {
        let minPos = prop.stops.items.reduce((min, stop) => Math.min(min, stop.position.value), Number.MAX_SAFE_INTEGER);
        let maxPos = prop.stops.items.reduce((max, stop) => Math.max(max, stop.position.value), Number.MIN_SAFE_INTEGER);


        if (!isLinear)
            minPos = Math.max(0, minPos);


        const dpos  = Math.min(minPos, 0) / 100;
        const dsize = Math.max(100, 100 + Math.max(0, maxPos - 100) - Math.min(minPos, 0)) / 100;

        const dv    = subv(p0, p1);


        console.log('1 p0 =', p0.x + ', ' + p0.y);
        p0 = addv(p0, mulvs(dv, Math.max(0, -dpos)));
        p1 = addv(p1, mulvs(dv, Math.max(0, -dpos)));
        p2 = addv(p2, mulvs(dv, Math.max(0, -dpos)));
        console.log('2 p0 =', p0.x + ', ' + p0.y);

        if (prop.gradType.value != 2) // not angular
        {
            p1 = subv(p0, mulvs(dv, dsize));
            p2 = addv(p0, mulvs(subv(p2, p0), dsize));
        }


        const positions = prop.stops.items.map(s => s.position.value/100);
        
        const pos0      = minPos/100;
        const pos1      = maxPos/100;

        
        if (positions.some(p => p < 0))
        {
            for (let i = 0; i < positions.length; i++)
                prop.stops.items[i].position.value = (positions[i] - pos0) / dsize * 100;
        }
        
        if (positions.some(p => p > 1))
        {
            for (let i = 0; i < positions.length; i++)
                prop.stops.items[i].position.value = (1 - (pos1 - positions[i]) / dsize) * 100;
        }
    }


    gradient[1] = [p0, p1, p2];    


    const stops = prop.stops.items;

    for (let j = 0; j < stops.length; j++)
    {
        const stop = stops[j];

        if (stop.fill)
        {
            const rgba = stop.fill.toRgba();

            gradient[2].push([
                rgba[0], 
                rgba[1], 
                rgba[2], 
                rgba[3],
                stop.position.value / 100]);
        }
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
            stops.push(new ColorStopValue(
                FillValue.fromRgb(scaleRgb(stop.toRgb()), 100),
                NumberValue.NaN()));
        }

        else if (stop.type == FILL_VALUE)
            stops.push(new ColorStopValue(
                stop,
                NumberValue.NaN()));

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
        && (!stops.at(-1).position.isValid())) 
        stops.at(-1).position = new NumberValue(100);
    

    if (stops.length > 2)
    {
        for (let i = 1; i < stops.length-1; i++)
        {
            const stop = stops[i];

            if (   !stop
                || !stop.position
                || !stop.position.isValid())
            {
                let prevValid = i-1;
                let nextValid = i+1;

                while ( prevValid > 0
                    && !stops[prevValid].position.isValid()) 
                    prevValid--;

                while ( nextValid < stops.length-1
                    && !stops[nextValid].position.isValid()) 
                    nextValid++;
                        
                const pv = stops[prevValid].position.value;
                const nv = stops[nextValid].position.value;

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


    if (obj.type == SHAPE_GROUP)
    {
        for (const _obj of obj.children)
            addProp(_obj, prop);
    }
    else
    {
        obj.strokeWeight = prop.weight.toNewValue().value;//.toNumber();

        switch (prop.fit.toNewValue().value)
        {
            case 0: obj.strokeAlign = 'INSIDE';  break;
            case 1: obj.strokeAlign = 'CENTER';  break;
            case 2: obj.strokeAlign = 'OUTSIDE'; break;
        }

        switch (prop.join.toNewValue().value)
        {
            case 0: obj.strokeJoin = 'MITER'; break;
            case 1: obj.strokeJoin = 'BEVEL'; break;
            case 2: obj.strokeJoin = 'ROUND'; break;
        }

        switch (prop.cap.toNewValue().value)
        {
            case 0: obj.strokeCap = 'NONE';   break;
            case 1: obj.strokeCap = 'SQUARE'; break;
            case 2: obj.strokeCap = 'ROUND';  break;
        }

        obj.strokeDashes     = prop.dashes.toNewValue().value.trim();
        
        obj.strokeMiterLimit = prop.miter .toNewValue().value;
    }
}



function addStrokeSidesProp(obj, prop)
{
    if (obj.type == SHAPE_GROUP)
    {
        for (const _obj of obj.children)
            addProp(_obj, prop);
    }
    else
    {
        obj.effects.push([
           'STROKE_SIDES', 
            prop.top   .value,
            prop.left  .value,
            prop.right .value,
            prop.bottom.value,
            prop.visible ]);
    }
}



function addRoundCornersProp(obj, prop)
{
    if (obj.type == SHAPE_GROUP)
    {
        for (const _obj of obj.children)
            addProp(_obj, prop);
    }
    else
    {
        obj.effects.push([
           'ROUND_CORNERS', 
            prop.tl.value,
            prop.tr.value,
            prop.bl.value,
            prop.br.value,
            prop.visible ]);
    }
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
        prop.x     .value, //toNumber(),
        prop.y     .value, //toNumber(),
        prop.blur  .value, //toNumber(),
        prop.spread.value, //toNumber(),
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
        prop.x     .value, //toNumber(),
        prop.y     .value, //toNumber(),
        prop.blur  .value, //toNumber(),
        prop.spread.value, //toNumber(),
        BlendModes[prop.blend.value][2],
        prop.visible ]);
}



function addLayerBlurProp(obj, prop)
{
    obj.effects.push([
        'LAYER_BLUR', 
        prop.radius.value, //toNumber(),
        prop.visible ]);
}



function addBackBlurProp(obj, prop)
{
    obj.effects.push([
        'BACKGROUND_BLUR', 
        prop.radius.value, //toNumber(),
        prop.visible ]);
}



function addLayerBlendProp(obj, prop)
{
    obj.opacity = Math.min(Math.max(0, prop.opacity.value /*toNumber()*/ / 100), 1);
    obj.blend   = BlendModes[prop.blend.value][2];
}



function addMaskProp(obj, mask)
{
    obj.maskType = mask.maskType.value + 1;
}
