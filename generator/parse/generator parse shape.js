function genParseRectangle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rect = new GRectangle(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(rect, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
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
        case 'props':  rect.props  = genParse(parse); break;
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


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(line, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
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
        case 'props': line.props = genParse(parse); break;
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


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(ellipse, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, ellipse);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
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
        case 'props':  ellipse.props  = genParse(parse); break;
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


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(poly, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, poly);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
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
        case 'props':   poly.props   = genParse(parse); break;
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


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(star, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, star);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
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
        case 'props':  star.props  = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, star);
    return star;
}



function genParseTextShape(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text = new GTextShape(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(text, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        text.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {       
        case 'text':          text.text          = genParse(parse); break;
        case 'x':             text.x             = genParse(parse); break;
        case 'y':             text.y             = genParse(parse); break;
        case 'width':         text.width         = genParse(parse); break;
        case 'height':        text.height        = genParse(parse); break;
        case 'angle':         text.angle         = genParse(parse); break;
        case 'font':          text.font          = genParse(parse); break;
        case 'style':         text.style         = genParse(parse); break;
        case 'size':          text.size          = genParse(parse); break;
        case 'props':         text.props         = genParse(parse); break;
        case 'alignH':        text.alignH        = genParse(parse); break;
        case 'alignV':        text.alignV        = genParse(parse); break;
        case 'lineHeight':    text.lineHeight    = genParse(parse); break;
        case 'letterSpacing': text.letterSpacing = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, text);
    return text;
}



function genParsePointValue(parse)
{
    parse.pos++; // POINT_VALUE

    const point = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(POINT_VALUE, point, parse);

    return parsePointValue(point)[0];
}



function genParsePoint(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const point = new GPoint(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(point, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, point);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        point.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x': point.x = genParse(parse); break;
        case 'y': point.y = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, point);
    return point;
}



function genParseVectorPathValue(parse)
{
    parse.pos++; // VECTOR_PATH_VALUE

    const path = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(VECTOR_PATH_VALUE, path, parse);

    return parseVectorPathValue(path)[0];
}



function genParseVectorPath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const path = new GVectorPath(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(path, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, path);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        path.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {       
        case 'points':  path.points  = genParse(parse); break;
        case 'closed':  path.closed  = genParse(parse); break;
        case 'degree':  path.degree  = genParse(parse); break;
        case 'winding': path.winding = genParse(parse); break;
        case 'round':   path.round   = genParse(parse); break;
        case 'props':   path.props   = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, path);
    return path;
}



function genParseShapeBoolean(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const bool = new GShapeBoolean(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(bool, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, bool);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        bool.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'children':  bool.children  = genParse(parse); break;
        case 'operation': bool.operation = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, bool);
    return bool;
}



function genParseShapeGroup(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const group = new GShapeGroup(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(group, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, group);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        group.inputs.push(genParse(parse));


    parse.nTab--;


    genParseNodeEnd(parse, group);
    return group;
}



function genParseFrame(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const frame = new GFrame(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(frame, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, frame);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        frame.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':        frame.x        = genParse(parse); break;
        case 'y':        frame.y        = genParse(parse); break;
        case 'width':    frame.width    = genParse(parse); break;
        case 'height':   frame.height   = genParse(parse); break;
        case 'angle':    frame.angle    = genParse(parse); break;
        case 'round':    frame.round    = genParse(parse); break;
        case 'children': frame.children = genParse(parse); break;
        case 'props':    frame.props    = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, frame);
    return frame;
}



function genParseMove(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const move = new GMove(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(move, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, move);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        move.input = genParse(parse);

    move.x = genParse(parse);
    move.y = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, move);
    return move;
}



function genParseRotate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rotate = new GRotate(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(rotate, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, rotate);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        rotate.input = genParse(parse);

    rotate.angle      = genParse(parse);
    rotate.centerX    = genParse(parse);
    rotate.centerY    = genParse(parse);
    rotate.showCenter = genParse(parse);

    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, rotate);
    return rotate;
}



function genParseScale(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const scale = new GScale(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(scale, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, scale);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        scale.input = genParse(parse);

    scale.scaleX     = genParse(parse);
    scale.scaleY     = genParse(parse);
    scale.centerX    = genParse(parse);
    scale.centerY    = genParse(parse);
    scale.showCenter = genParse(parse);

    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, scale);
    return scale;
}



function genParseSkew(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const skew = new GSkew(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(skew, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, skew);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        skew.input = genParse(parse);

    skew.skewX      = genParse(parse);
    skew.skewY      = genParse(parse);
    skew.centerX    = genParse(parse);
    skew.centerY    = genParse(parse);
    skew.showCenter = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, skew);
    return skew;
}