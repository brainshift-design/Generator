function genParseRectangle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rect = new GRectangle(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(rect, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (RECTANGLE_TYPES.includes(parse.next))
        rect.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':      rect.x      = genParse(parse); break;
        case 'y':      rect.y      = genParse(parse); break;
        case 'width':  rect.width  = genParse(parse); break;
        case 'height': rect.height = genParse(parse); break;
        case 'angle':  rect.angle  = genParse(parse); break;
        case 'round':  rect.round  = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, rect);
    return rect;
}



function genParseLine(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);

  
    const line = new GLine(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(line, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (LINE_TYPES.includes(parse.next))
        line.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':     line.x     = genParse(parse); break;
        case 'y':     line.y     = genParse(parse); break;
        case 'width': line.width = genParse(parse); break;
        case 'angle': line.angle = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, line);
    return line;
}



function genParseEllipse(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const ellipse = new GEllipse(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(ellipse, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, ellipse);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (ELLIPSE_TYPES.includes(parse.next))
        ellipse.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':      ellipse.x      = genParse(parse); break;
        case 'y':      ellipse.y      = genParse(parse); break;
        case 'width':  ellipse.width  = genParse(parse); break;
        case 'height': ellipse.height = genParse(parse); break;
        case 'angle':  ellipse.angle  = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, ellipse);
    return ellipse;
}



function genParsePolygon(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const poly = new GPolygon(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(poly, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, poly);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (POLYGON_TYPES.includes(parse.next))
        poly.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':       poly.x       = genParse(parse); break;
        case 'y':       poly.y       = genParse(parse); break;
        case 'width':   poly.width   = genParse(parse); break;
        case 'height':  poly.height  = genParse(parse); break;
        case 'angle':   poly.angle   = genParse(parse); break;
        case 'round':   poly.round   = genParse(parse); break;
        case 'corners': poly.corners = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, poly);
    return poly;
}



function genParseStar(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const star = new GStar(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(star, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, star);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (STAR_TYPES.includes(parse.next))
        star.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':      star.x      = genParse(parse); break;
        case 'y':      star.y      = genParse(parse); break;
        case 'width':  star.width  = genParse(parse); break;
        case 'height': star.height = genParse(parse); break;
        case 'angle':  star.angle  = genParse(parse); break;
        case 'round':  star.round  = genParse(parse); break;
        case 'points': star.points = genParse(parse); break;
        case 'convex': star.convex = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, star);
    return star;
}