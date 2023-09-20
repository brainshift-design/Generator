function genParseFillValue(parse)
{
    parse.pos++; // FILL_VALUE

    const fill = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(FILL_VALUE, fill, parse);

    return parseFillValue(fill)[0];
}



function genParseFill(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const fill = new GFill(nodeId, options);

    fill.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(fill, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, fill);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        fill.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['color', 'opacity', 'blend'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'color':   fill.color   = genParse(parse); break;
        case 'opacity': fill.opacity = genParse(parse); break;
        case 'blend':   fill.blend   = genParse(parse); break;
        }
    }

    
    parse.nTab--;


    genParseNodeEnd(parse, fill);
    return fill;
}



function genParseFillParam(parse)
{
    const fill = genParse(parse); 

    if (COLOR_TYPES.includes(fill.type))
        fill.options.opacity = genParse(parse);

    return fill;
}



function genParseGradientValue(parse)
{
    parse.pos++; // GRADIENT_VALUE

    const grad = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(GRADIENT_VALUE, grad, parse);

    return parseGradientValue(grad)[0];
}



function genParseGradient(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const grad = new GGradient(nodeId, options);

    grad.hasInputs = options.hasInputs;


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(grad, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, grad);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        grad.inputs.push(genParse(parse));


    grad.gradType = genParse(parse); 
    grad.x        = genParse(parse); 
    grad.y        = genParse(parse); 
    grad.size     = genParse(parse); 
    grad.angle    = genParse(parse); 
    grad.aspect   = genParse(parse); 
    grad.skew     = genParse(parse); 
    grad.blend    = genParse(parse); 

    
    parse.nTab--;


    genParseNodeEnd(parse, grad);
    return grad;
}



// function genParseGradientParam(parse)
// {
//     const grd = genParse(parse); 

//     if (COLOR_TYPES.includes(grd.type))
//         grd.options.opacity = genParse(parse);

//     return grd;
// }



function genParseColorStopValue(parse)
{
    parse.pos++; // COLOR_STOP_VALUE

    const stop = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(COLOR_STOP_VALUE, stop, parse);

    return parseColorStopValue(stop)[0];
}



function genParseColorStop(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stop = new GColorStop(nodeId, options);

    stop.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(stop, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, stop);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        stop.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['fill', 'position'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'fill':     stop.fill     = genParse(parse); break;
        case 'position': stop.position = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, stop);
    return stop;
}



function genParseStrokeValue(parse)
{
    parse.pos++; // STROKE_VALUE

    const stroke = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(STROKE_VALUE, stroke, parse);

    return parseStrokeValue(stroke)[0];
}



function genParseStroke(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stroke = new GStroke(nodeId, options);

    stroke.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(stroke, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, stroke);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        stroke.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['fill', 'weight', 'fit', 'join', 'miter', 'cap', 'dashes'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'fill':   stroke._fills = genParse(parse); stroke.fills = stroke._fills; break;
        case 'weight': stroke.weight = genParse(parse); break;
        case 'fit':    stroke.fit    = genParse(parse); break;
        case 'join':   stroke.join   = genParse(parse); break;
        case 'miter':  stroke.miter  = genParse(parse); break;
        case 'cap':    stroke.cap    = genParse(parse); break;
        case 'dashes': stroke.dashes = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, stroke);
    return stroke;
}



function genParseStrokeParam(parse)
{
    const stroke = genParse(parse); 

    if (    FILL_TYPES.includes(stroke.type)
        || COLOR_TYPES.includes(stroke.type))
        stroke.data.weight = genParse(parse);

    return stroke;
}



function genParseDropShadowValue(parse)
{
    parse.pos++; // DROP_SHADOW_VALUE

    const shadow = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(DROP_SHADOW_VALUE, shadow, parse);

    return parseDropShadowValue(shadow)[0];
}



function genParseDropShadow(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const shadow = new GDropShadow(nodeId, options);

    shadow.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(shadow, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, shadow);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        shadow.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'blur', 'spread', 'fill', 'blend', 'behind'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':      shadow.x      = genParse(parse); break;
        case 'y':      shadow.y      = genParse(parse); break;
        case 'blur':   shadow.blur   = genParse(parse); break;
        case 'spread': shadow.spread = genParse(parse); break;
        case 'fill':   shadow.fill   = genParse(parse); break;
        case 'blend':  shadow.blend  = genParse(parse); break;
        case 'behind': shadow.behind = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, shadow);
    return shadow;
}



function genParseInnerShadowValue(parse)
{
    parse.pos++; // INNER_SHADOW_VALUE

    const shadow = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(INNER_SHADOW_VALUE, shadow, parse);

    return parseInnerShadowValue(shadow)[0];
}



function genParseInnerShadow(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const shadow = new GInnerShadow(nodeId, options);

    shadow.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(shadow, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, shadow);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        shadow.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'blur', 'spread', 'fill', 'blend'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':      shadow.x      = genParse(parse); break;
        case 'y':      shadow.y      = genParse(parse); break;
        case 'blur':   shadow.blur   = genParse(parse); break;
        case 'spread': shadow.spread = genParse(parse); break;
        case 'fill':   shadow.fill   = genParse(parse); break;
        case 'blend':  shadow.blend  = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, shadow);
    return shadow;
}



function genParseLayerBlurValue(parse)
{
    parse.pos++; // LAYER_BLUR_VALUE

    const blur = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(LAYER_BLUR_VALUE, blur, parse);

    return parseLayerBlurValue(blur)[0];
}



function genParseLayerBlur(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const blur = new GLayerBlur(nodeId, options);

    blur.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(blur, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, blur);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        blur.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['radius'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'radius': blur.radius = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, blur);
    return blur;
}



function genParseBackBlurValue(parse)
{
    parse.pos++; // BACK_BLUR_VALUE

    const blur = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(BACK_BLUR_VALUE, blur, parse);

    return parseBackBlurValue(blur)[0];
}



function genParseBackBlur(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const blur = new GBackBlur(nodeId, options);

    blur.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(blur, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, blur);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        blur.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['radius'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'radius': blur.radius = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, blur);
    return blur;
}



function genParseLayerMaskValue(parse)
{
    parse.pos++; // LAYER_MASK_VALUE

    const mask = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(LAYER_MASK_VALUE, mask, parse);

    return parseLayerMaskValue(mask)[0];
}



function genParseLayerMask(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const mask = new GLayerMask(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(mask, parse, ignore);


    if (ignore)
    {
        genParseNodeEnd(parse, mask);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    genParseNodeEnd(parse, mask);
    return mask;
}