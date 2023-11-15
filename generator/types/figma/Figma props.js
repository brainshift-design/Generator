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
        BlendModes[Math.min(Math.max(0, Math.round(prop.blend.value)), BlendModes.length-1)][2]]);
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


    const isLinear   = prop.gradType.value == 0;

    let   x   =        prop.x     .toNumber() / 100;
    let   y   =        prop.y     .toNumber() / 100;
    const a   =        prop.angle .toNumber()/360*Tau;
    let   s   = nozero(prop.size  .toNumber() / 100);
    let   asp = nozero(prop.aspect.toNumber() / 100);
    let   sk  =        prop.skew  .toNumber() / 100;


    if (!isLinear)
    {
        x   -= s/2 * Math.cos(a);
        y   -= s/2 * Math.sin(a);

        // s   *= 2;

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
    
    obj.strokeMiterLimit = prop.miter .toValue().value;
}



function addRoundCornersProp(obj, prop)
{
    obj.effects.push([
        'ROUND_CORNERS', 
        prop.tl.toNumber(),
        prop.tr.toNumber(),
        prop.bl.toNumber(),
        prop.br.toNumber(),
        prop.visible ]);
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



function addLayerBlendProp(obj, prop)
{
    obj.opacity = Math.min(Math.max(0, prop.opacity.toNumber() / 100), 1);
    obj.blend   = BlendModes[prop.blend.value][2];
}



function addMaskProp(obj, mask)
{
    obj.maskType = mask.maskType.value + 1;
}
