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
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        paramIds = ['color', 'opacity'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'color':   fill.color   = genParse(parse); break;
        case 'opacity': fill.opacity = genParse(parse); break;
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
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        paramIds = ['fill', 'weight', 'fit', 'join', 'miter'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'fill':   stroke.fill   = genParse(parse); break;
        case 'weight': stroke.weight = genParse(parse); break;
        case 'fit':    stroke.fit    = genParse(parse); break;
        case 'join':   stroke.join   = genParse(parse); break;
        case 'miter':  stroke.miter  = genParse(parse); break;
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



function genParseColorStopValue(parse)
{
    parse.pos++; // COLOR_STOP_VALUE

    const stop = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(COLOR_STOP_VALUE, stop, parse);

    return parseColorStopValue(stop);
}



function genParseColorStop(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stop = new GColorStop(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(stop, parse, ignore);


    if (ignore)
    {
        genParseNodeEnd(parse, stop);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (   parse.next == COLOR_STOP
        || parse.next == COLOR_STOP_VALUE)
        stop.input = genParse(parse);


    stop.fill     = genParse(parse);
    stop.position = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, stop);
    return stop;
}



function genParseDropShadowValue(parse)
{
    parse.pos++; // DROP_SHADOW_VALUE

    const stroke = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(DROP_SHADOW_VALUE, stroke, parse);

    return parseDropShadowValue(stroke)[0];
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
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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



function genParseInnerShadow(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const shadow = new GInnerShadow(nodeId, options);

    shadow.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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



// function genParseColorStyleValue(parse)
// {
//     parse.pos++; // COLOR_STYLE_VALUE

//     const style = parse.move();

//     if (parse.settings.logRequests) 
//         logReqStyleValue(style, parse);

//     return parseColorStyleValue(style)[0];
// }



function genParseColorStyle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const style = new GColorStyle(nodeId, options);

    style.existing = options.existing;


    if (parse.settings.logRequests) 
        logReq(style, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, style);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    style.id    = parse.move();
    style.name  = options.nodeName;
    
    style.value = genParse(parse);

    
    parse.nTab--;

    
    style.linked = style.id != NULL;


    genParseNodeEnd(parse, style);
    return style;
}



//function genParseStyleParam(parse)
//{
    // const style = genParse(parse); 

    // if (STYLE_TYPES.includes(style.type))
    //     style.options.opacity = genParse(parse);

    // return style;
//}
