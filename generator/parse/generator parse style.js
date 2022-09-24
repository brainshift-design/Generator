function genParseFillValue(parse)
{
    parse.pos++; // FILL_VALUE

    const fill = parse.move();

    if (parse.settings.logRequests) 
        logReqFillValue(fill, parse);

    return parseFillValue(fill)[0];
}



function genParseFill(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const fill = new GFill(nodeId, options);


    if (parse.settings.logRequests) 
        logReqFill(fill, parse);


    if (ignore)
    {
        genParseNodeEnd(parse, fill);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (   parse.next == FILL
        || parse.next == FILL_VALUE
        || SHAPE_TYPES.includes(parse.next))
        fill.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.nTab++;
        parse.inParam = true;

        
        switch (paramId)
        {
        case 'color'  : fill.color   = genParse(parse); break;
        case 'opacity': fill.opacity = genParse(parse); break;
        }

        parse.nTab--;
    }

    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, fill);
    return fill;
}



function genParseFillParam(parse)
{
    const fill = genParse(parse); 

    if (COLOR_TYPES.includes(fill.type))
        fill.data.opacity = genParse(parse);

    return fill;
}



function genParseStrokeValue(parse)
{
    parse.pos++; // STROKE_VALUE

    const stroke = parse.move();

    if (parse.settings.logRequests) 
        logReqStrokeValue(stroke, parse);

    return parseStrokeValue(stroke)[0];
}



function genParseStroke(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stroke = new GStroke(nodeId, options);


    if (parse.settings.logRequests) 
        logReqStroke(stroke, parse);


    if (ignore)
    {
        genParseNodeEnd(parse, stroke);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (   STROKE_TYPES.includes(parse.next)
        ||    parse.next == PARAM
           && STROKE_TYPES.includes(parse.afterNext))
    {
        stroke.input = genParse(parse);
        paramIds     = parse.move().split(',');
    }
    else
        paramIds = ['fill', 'weight', 'fit', 'join', 'miter'];

        
    for (const id of paramIds)
    {
        parse.inParam = false;

        switch (id)
        {
        case 'fill':   stroke.fill   = genParseFillParam(parse); break;
        case 'weight': stroke.weight = genParse(parse);          break;
        case 'fit':    stroke.fit    = genParse(parse);          break;
        case 'join':   stroke.join   = genParse(parse);          break;
        case 'miter':  stroke.miter  = genParse(parse);          break;
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
        logReqColorStopValue(stop, parse);

    return parseColorStopValue(stop);
}



function genParseColorStop(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stop = new GColorStop(nodeId, options);


    if (parse.settings.logRequests) 
        logReqColorStop(stop, parse);


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