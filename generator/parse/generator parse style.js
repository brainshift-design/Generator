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


    if (OBJECT_TYPES.includes(parse.next))
        fill.input = genParse(parse);
    // ||    parse.next == PARAM
    //    && FILL_TYPES.includes(parse.afterNext))


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
        fill.options.opacity = genParse(parse);

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


    if (OBJECT_TYPES.includes(parse.next))
        stroke.input = genParse(parse);
        //   parse.next == PARAM
        //   && STROKE_TYPES.includes(parse.afterNext))


    const nParamIds = genParseParamCount(parse);
       
    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.nTab++;
        parse.inParam = true;


        switch (paramId)
        {
        case 'fill':   stroke.fill   = genParseFillParam(parse); break;
        case 'weight': stroke.weight = genParse(parse);          break;
        case 'fit':    stroke.fit    = genParse(parse);          break;
        case 'join':   stroke.join   = genParse(parse);          break;
        case 'miter':  stroke.miter  = genParse(parse);          break;
        }


        parse.nTab--;
    }

    
    parse.inParam = false;
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
    style.linked   = options.linked;


    if (parse.settings.logRequests) 
        logReqColorStyle(style, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, style);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    style.value = genParse(parse);
   

    parse.nTab--;


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
