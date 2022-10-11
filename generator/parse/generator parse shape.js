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


    if (  RECTANGLE_TYPES.includes(parse.next)
        || PROPERTY_TYPES.includes(parse.next))
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

  
    let line = new GLine(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(line, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;
    
    if (   parse.next == LINE_VALUE
        || parse.next == LINE)
    {
        line.input = genParse(parse); // not genParseLine() because genParse() handles stack overflow
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'angle'];


    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':     line.x     = genParse(parse); break;
        case 'y':     line.y     = genParse(parse); break;
        case 'width': line.width = genParse(parse); break;
        case 'angle': line.angle = genParse(parse); break;
        }
    }


    parse.nTab--;


    genParseNodeEnd(parse, line);
    return line;
}



function genParseEllipse(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const elps = new GEllipse(nodeId, options);


    if (parse.settings.logRequests) 
        logReqShape(elps, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, elps);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (   parse.next == ELLIPSE_VALUE
        || parse.next == ELLIPSE)
    {
        elps.input = genParse(parse); // not genParseEllipse() because genParse() handles stack overflow
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'height', 'angle'];


    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':      elps.x      = genParse(parse); break;
        case 'y':      elps.y      = genParse(parse); break;
        case 'width':  elps.width  = genParse(parse); break;
        case 'height': elps.height = genParse(parse); break;
        case 'angle':  elps.angle  = genParse(parse); break;
        }
    }


    parse.nTab--;


    genParseNodeEnd(parse, elps);
    return elps;
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


    let paramIds;

    if (   parse.next == POLYGON_VALUE
        || parse.next == POLYGON)
    {
        poly.input = genParse(parse); // not genParsePolygon() because genParse() handles stack overflow
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'height', 'angle', 'round', 'corners'];


    for (const id of paramIds)
    {
        switch (id)
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


    let paramIds;

    if (   parse.next == STAR_VALUE
        || parse.next == STAR)
    {
        star.input = genParse(parse); // not genParseStar() because genParse() handles stack overflow
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'height', 'angle', 'round', 'points', 'convex'];


    for (const id of paramIds)
    {
        switch (id)
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


    parse.nTab--;


    genParseNodeEnd(parse, star);
    return star;
}