function genParseRectangle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rect = new GRectangle(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(line, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, line);
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'position': ellipse.position = genParse(parse); break;
        case 'x':        ellipse.x        = genParse(parse); break;
        case 'y':        ellipse.y        = genParse(parse); break;
        case 'width':    ellipse.width    = genParse(parse); break;
        case 'height':   ellipse.height   = genParse(parse); break;
        case 'round':    ellipse.round    = genParse(parse); break;
        case 'start':    ellipse.start    = genParse(parse); break;
        case 'sweep':    ellipse.sweep    = genParse(parse); break;
        case 'inner':    ellipse.inner    = genParse(parse); break;
        case 'props':    ellipse.props    = genParse(parse); break;
        }
    }
    
    
    ellipse.innerAbsolute  = parseInt(parse.move()) > 0;
    ellipse.sweepInDegrees = parseInt(parse.move()) > 0;


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, ellipse);
    return ellipse;
}



function genParseTrapeze(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const trapeze = new GTrapeze(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(trapeze, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, trapeze);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        trapeze.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'x':      trapeze.x      = genParse(parse); break;
        case 'y':      trapeze.y      = genParse(parse); break;
        case 'width':  trapeze.width  = genParse(parse); break;
        case 'height': trapeze.height = genParse(parse); break;
        case 'round':  trapeze.round  = genParse(parse); break;
        case 'bias':   trapeze.bias   = genParse(parse); break;
        case 'props':  trapeze.props  = genParse(parse); break;
        }
    }
    
    
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, trapeze);
    return trapeze;
}



function genParsePolygon(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const poly = new GPolygon(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'position': poly.position = genParse(parse); break;
        case 'x':        poly.x        = genParse(parse); break;
        case 'y':        poly.y        = genParse(parse); break;
        case 'width':    poly.width    = genParse(parse); break;
        case 'height':   poly.height   = genParse(parse); break;
        case 'round':    poly.round    = genParse(parse); break;
        case 'corners':  poly.corners  = genParse(parse); break;
        case 'props':    poly.props    = genParse(parse); break;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'position': star.position = genParse(parse); break;
        case 'x':        star.x        = genParse(parse); break;
        case 'y':        star.y        = genParse(parse); break;
        case 'width':    star.width    = genParse(parse); break;
        case 'height':   star.height   = genParse(parse); break;
        case 'round':    star.round    = genParse(parse); break;
        case 'points':   star.points   = genParse(parse); break;
        case 'convex':   star.convex   = genParse(parse); break;
        case 'props':    star.props    = genParse(parse); break;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'font':          text.font          = genParse(parse); break;
        case 'size':          text.size          = genParse(parse); break;
        case 'style':         text.style         = genParse(parse); break;
        case 'props':         text.props         = genParse(parse); break;
        case 'alignX':        text.alignX        = genParse(parse); break;
        case 'alignY':        text.alignY        = genParse(parse); break;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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



function genParsePointCorner(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const corner = new GPointCorner(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(corner, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, corner);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        corner.input = genParse(parse);

    corner.smooth = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, corner);
    return corner;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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



function genParsePathLength(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const len = new GPathLength(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(len, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, len);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        len.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, len);
    return len;
}



function genParseJoinPaths(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const join = new GJoinPaths(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(join, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, join);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        join.inputs.push(genParse(parse));


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {       
        case 'closed':  join.closed  = genParse(parse); break;
        case 'degree':  join.degree  = genParse(parse); break;
        case 'winding': join.winding = genParse(parse); break;
        case 'round':   join.round   = genParse(parse); break;
        case 'props':   join.props   = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, join);
    return join;
}



function genParseReorientPaths(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const reorient = new GReorientPaths(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(reorient, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, reorient);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        reorient.inputs.push(genParse(parse));


    reorient.reverse = genParse(parse);
    
        
    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, reorient);
    return reorient;
}



function genParseVectorVertexValue(parse)
{
    parse.pos++; // VECTOR_POINT_VALUE

    const point = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(VECTOR_VERTEX_VALUE, point, parse);

    return parseVectorVertexValue(point)[0];
}



function genParseVectorVertex(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const point = new GVectorVertex(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'x':     point.x     = genParse(parse); break;
        case 'y':     point.y     = genParse(parse); break;
        case 'join':  point.join  = genParse(parse); break;
        case 'cap':   point.cap   = genParse(parse); break;
        case 'round': point.round = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, point);
    return point;
}



function genParseVectorEdgeValue(parse)
{
    parse.pos++; // VECTOR_EDGE_VALUE

    const edge = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(VECTOR_EDGE_VALUE, edge, parse);

    return parseVectorEdgeValue(edge)[0];
}



function genParseVectorEdge(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const edge = new GVectorEdge(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(edge, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, edge);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        edge.input0 = genParse(parse);
        edge.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        edge.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }


    edge.startTangent = genParse(parse);
    edge.  endTangent = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, edge);
    return edge;
}



function genParseVectorRegionValue(parse)
{
    parse.pos++; // VECTOR_REGION_VALUE

    const region = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(VECTOR_REGION_VALUE, region, parse);

    return parseVectorRegionValue(region)[0];
}



function genParseVectorRegion(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const region = new GVectorRegion(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(region, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, region);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        region.inputs.push(genParse(parse));


    region.winding = genParse(parse);
    region.props   = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, region);
    return region;
}



function genParseVectorNetworkValue(parse)
{
    parse.pos++; // VECTOR_NETWORKO_VALUE

    const region = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(VECTOR_NETWORK_VALUE, region, parse);

    return parseVectorNetworkValue(region)[0];
}



function genParseVectorNetwork(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const network = new GVectorNetwork(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(network, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, network);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        network.inputs.push(genParse(parse));

    network.props = genParse(parse);


    parse.nTab--;



    genParseNodeEnd(parse, network);
    return network;
}



function genParseShapeBoolean(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const bool = new GShapeBoolean(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'props':     bool.props     = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, bool);
    return bool;
}



function genParseArcPath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const arc = new GArcPath(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(arc, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, arc);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        arc.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'position': arc.position = genParse(parse); break;
        case 'x':        arc.x        = genParse(parse); break;
        case 'y':        arc.y        = genParse(parse); break;
        case 'width':    arc.width    = genParse(parse); break;
        case 'height':   arc.height   = genParse(parse); break;
        case 'start':    arc.start    = genParse(parse); break;
        case 'sweep':    arc.sweep    = genParse(parse); break;
        case 'props':    arc.props    = genParse(parse); break;
        }
    }
    
    
    arc.sweepInDegrees = parseInt(parse.move()) > 0;


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, arc);
    return arc;
}



function genParseWavePath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const wave = new GWavePath(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(wave, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, wave);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        wave.input = genParse(parse);


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'shape':     wave.shape     = genParse(parse); break;
        case 'x':         wave.x         = genParse(parse); break;
        case 'y':         wave.y         = genParse(parse); break;
        case 'width':     wave.width     = genParse(parse); break;
        case 'amplitude': wave.amplitude = genParse(parse); break;
        case 'frequency': wave.frequency = genParse(parse); break;
        case 'offset':    wave.offset    = genParse(parse); break;
        case 'alignX':    wave.alignX    = genParse(parse); break;
        case 'alignY':    wave.alignY    = genParse(parse); break;
        case 'props':     wave.props     = genParse(parse); break;
        }
    }
    
    
    wave.useWavelength  = parseInt(parse.move()) > 0;
    wave.offsetAbsolute = parseInt(parse.move()) > 0;


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, wave);
    return wave;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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
        case 'children': frame.children = genParse(parse); break;
        case 'position': frame.position = genParse(parse); break;
        case 'x':        frame.x        = genParse(parse); break;
        case 'y':        frame.y        = genParse(parse); break;
        case 'width':    frame.width    = genParse(parse); break;
        case 'height':   frame.height   = genParse(parse); break;
        case 'round':    frame.round    = genParse(parse); break;
        case 'clip':     frame.clip     = genParse(parse); break;
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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

    move.moveType    = genParse(parse);
    move.x           = genParse(parse);
    move.y           = genParse(parse);
    move.affectSpace = genParse(parse);
    move.showCenter  = genParse(parse);


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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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

    rotate.angle       = genParse(parse);
    rotate.showCenter  = genParse(parse);
    rotate.affectSpace = genParse(parse);

    
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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

    scale.scaleX        = genParse(parse);
    scale.scaleY        = genParse(parse);
    scale.affectCorners = genParse(parse);
    scale.affectStyle   = genParse(parse);
    scale.showCenter    = genParse(parse);
    scale.affectSpace   = genParse(parse);

    
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
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
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

    skew.skewX       = genParse(parse);
    skew.skewY       = genParse(parse);
    skew.showCenter  = genParse(parse);
    skew.affectSpace = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, skew);
    return skew;
}



function genParseCenter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const center = new GSetCenter(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(center, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, center);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        center.input = genParse(parse);

    center.centerX    = genParse(parse);
    center.centerY    = genParse(parse);
    center.units      = genParse(parse);
    center.showCenter = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, center);
    return center;
}



function genParseResetTransform(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const reset = new GResetTransform(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(reset, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, reset);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        reset.input = genParse(parse);

    reset.showCenter = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, reset);
    return reset;
}



function genParseMeasureVector(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const measure = new GMeasureVector(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(measure, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, measure);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 1)
        measure.input = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same


        
    parse.nTab--;


    genParseNodeEnd(parse, measure);
    return measure;
}



function genParsePointAngle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const angle = new GPointAngle(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(angle, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, angle);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        angle.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, angle);
    return angle;
}



function genParseVector(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const vector = new GVector(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(vector, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, vector);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 2)
    {
        vector.input0 = genParse(parse);
        vector.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        vector.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }


    vector.transform  = genParse(parse);
    vector.showCenter = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, vector);
    return vector;
}



function genParseCircleCenter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const center = new GCircleCenter(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 3, 'nInputs must be [0, 3]');
    }

    
    if (parse.settings.logRequests) 
        logReq(center, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, center);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 3)
    {
        center.input0 = genParse(parse);
        center.input1 = genParse(parse);
        center.input2 = genParse(parse);
    }
    else if (nInputs == 2)
    {
        center.input0 = genParse(parse);
        center.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        center.input0 = genParse(parse);
    }


    parse.nTab--;


    genParseNodeEnd(parse, center);
    return center;
}



function genParseArcFromPoints(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const arc = new GArcFromPoints(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 3, 'nInputs must be [0, 3]');
    }

    
    if (parse.settings.logRequests) 
        logReq(arc, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, arc);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 3)
    {
        arc.input0 = genParse(parse);
        arc.input1 = genParse(parse);
        arc.input2 = genParse(parse);
    }
    else if (nInputs == 2)
    {
        arc.input0 = genParse(parse);
        arc.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        arc.input0 = genParse(parse);
    }


    const nParamIds = genParseParamCount(parse);

    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {       
        case 'props':   arc.props   = genParse(parse); break;
        }
    }


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, arc);
    return arc;
}



function genParseIntersectLines(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const inter = new GIntersectLines(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 4, 'nInputs must be [0, 4]');
    }

    
    if (parse.settings.logRequests) 
        logReq(inter, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, inter);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 4)
    {
        inter.input0 = genParse(parse);
        inter.input1 = genParse(parse);
        inter.input2 = genParse(parse);
        inter.input3 = genParse(parse);
    }
    else if (nInputs == 3)
    {
        inter.input0 = genParse(parse);
        inter.input1 = genParse(parse);
        inter.input2 = genParse(parse);
    }
    else if (nInputs == 2)
    {
        inter.input0 = genParse(parse);
        inter.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        inter.input0 = genParse(parse);
    }


    inter.segment = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, inter);
    return inter;
}



function genParseInterpolatePoint(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GInterpolatePoint(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(lerp, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, lerp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        lerp.input0 = genParse(parse);
        lerp.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }


    lerp.amount     = genParse(parse);
    lerp.transform  = genParse(parse);
    lerp.showCenter = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}



function genParsePointAlongPath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const pap = new GPointAlongPath(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(pap, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, pap);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        pap.input = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same


    pap.position   = genParse(parse);
    pap.distance   = genParse(parse);
    pap.offset     = genParse(parse);
    pap.transform  = genParse(parse);
    pap.showCenter = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, pap);
    return pap;
}



function genParseClosestPointOnPath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cpop = new GClosestPointOnPath(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cpop, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cpop);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        cpop.input0 = genParse(parse);
        cpop.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cpop.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }


    cpop.constrain  = genParse(parse);
    cpop.transform  = genParse(parse);
    cpop.showCenter = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, cpop);
    return cpop;
}



function genParseReversePath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const reverse = new GReversePath(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(reverse, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, reverse);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        reverse.input = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, reverse);
    return reverse;
}



function genParseBlendPath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const blend = new GBlendPath(nodeId, options);
   

    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(blend, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, blend);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nInputs; i++)
        blend.inputs.push(genParse(parse));


    blend.amount = genParse(parse);
    blend.degree = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, blend);
    return blend;
}



function genParsePlace(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const place = new GPlace(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(place, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, place);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        place.input = genParse(parse);

    place.position   = genParse(parse);
    place.transform  = genParse(parse);
    place.showCenter = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, place);
    return place;
}



function genParseShapeApply(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const apply = new GApply(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(apply, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, apply);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        apply.input = genParse(parse);

    apply.props   = genParse(parse);
    apply.replace = genParse(parse);


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, apply);
    return apply;
}



function genParseRender(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const render = new GRender(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(render, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, render);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        render.inputs.push(genParse(parse));

    render.retain   = genParse(parse);
    render.finalize = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, render);
    return render;
}



function genParseExport(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const _export = new GExport(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(_export, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, _export);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        _export.inputs.push(genParse(parse));

    _export.scale    = genParse(parse);
    _export.format   = genParse(parse);
 // _export.contents = genParse(parse);
 // _export.crop     = genParse(parse);
    _export.suffix   = genParse(parse);
    _export.profile  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, _export);
    return _export;
}