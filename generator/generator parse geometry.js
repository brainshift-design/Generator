/*
    RECT 
    id
    N 0 
    N 0 
    N 100 
    N 100
    N 0
    N 0

    RECT 
    id
    RECT 
    ...
    0,3,4  // overriding param index list
    N 0
    N 100
    N 0
*/


function genParseRectangle(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const rect = new GRectangle(nodeId, active);


    if (parse.logRequests) 
        logReqRectangle(rect, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rect);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (   parse.next == RECTANGLE_VALUE
        || parse.next == RECTANGLE)
    {
        rect.input = genParse(parse); // not genParseRectangle() because genParse() handles stack overflow
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'height', 'angle', 'round'];

    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':      rect.x      = genParse(parse); break;
        case 'y':      rect.y      = genParse(parse); break;
        case 'width':  rect.width  = genParse(parse); break;
        case 'height': rect.height = genParse(parse); break;
        case 'angle':  rect.angle  = genParse(parse); break;
        case 'round':  rect.round  = genParse(parse); break;
        }
    }


    parse.nTab--;


    genParseNodeEnd(parse, rect);
    return rect;
}



function genParseLine(parse)
{
    parse.pos++; // LINE
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let line = new GLine();
    let paramIds;
    
    if (parse.next == LINE)
    {
        line = genParse(parse); // not genParseLine() because genParse() handles stack overflow
        paramIds  = parse.req[parse.pos++].split(',');
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
        //case 'height': line.height = genParse(parse); break;
        case 'angle': line.angle = genParse(parse); break;
        }
    }


    genPushUpdateValue(parse, nodeId, 'x',     line.x    );
    genPushUpdateValue(parse, nodeId, 'y',     line.y    );
    genPushUpdateValue(parse, nodeId, 'width', line.width);
    //genPushUpdateValue(parse, nodeId, 'height', line.height);
    genPushUpdateValue(parse, nodeId, 'angle', line.angle);


    if (   active
        && line.valid)
    {
        genPushUpdateObject(
            parse,
            nodeId,
            { 
                nodeId: nodeId,          
                type:   LINE,
                id:     0,
                x:      line.x     .value,
                y:      line.y     .value,
                width:  line.width .value,
                //height: line.height.value,
                angle:  line.angle .value
            });
    }


    return line;
}



function genParseEllipse(parse)
{
    parse.pos++; // ELLIPSE
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let elllipse = new GEllipse();
    let paramIds;
    
    if (parse.next == ELLIPSE)
    {
        elllipse = genParse(parse); // not genParseEllipse() because genParse() handles stack overflow
        paramIds  = parse.req[parse.pos++].split(',');
    }
    else
        paramIds = ['x', 'y', 'width', 'height', 'angle'];


    for (const id of paramIds)
    {
        switch (id)
        {
        case 'x':      elllipse.x      = genParse(parse); break;
        case 'y':      elllipse.y      = genParse(parse); break;
        case 'width':  elllipse.width  = genParse(parse); break;
        case 'height': elllipse.height = genParse(parse); break;
        case 'angle':  elllipse.angle  = genParse(parse); break;
        }
    }


    genPushUpdateValue(parse, nodeId, 'x',      elllipse.x     );
    genPushUpdateValue(parse, nodeId, 'y',      elllipse.y     );
    genPushUpdateValue(parse, nodeId, 'width',  elllipse.width );
    genPushUpdateValue(parse, nodeId, 'height', elllipse.height);
    genPushUpdateValue(parse, nodeId, 'angle',  elllipse.angle );


    if (   active
        && elllipse.valid)
    {
        genPushUpdateObject(
            parse,
            nodeId,
            { 
                nodeId: nodeId,          
                type:   ELLIPSE,
                id:     0,
                x:      elllipse.x     .value,
                y:      elllipse.y     .value,
                width:  elllipse.width .value,
                height: elllipse.height.value,
                angle:  elllipse.angle .value
            });
    }


    return elllipse;
}



function genParsePolygon(parse)
{
    parse.pos++; // POLYGON
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let poly = new GPolygon();
    let paramIds;
    
    if (parse.next == POLYGON)
    {
        poly     = genParse(parse); // not genParsePolygon() because genParse() handles stack overflow
        paramIds = parse.req[parse.pos++].split(',');
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


    genPushUpdateValue(parse, nodeId, 'x',       poly.x      );
    genPushUpdateValue(parse, nodeId, 'y',       poly.y      );
    genPushUpdateValue(parse, nodeId, 'width',   poly.width  );
    genPushUpdateValue(parse, nodeId, 'height',  poly.height );
    genPushUpdateValue(parse, nodeId, 'angle',   poly.angle  );
    genPushUpdateValue(parse, nodeId, 'round',   poly.round  );
    genPushUpdateValue(parse, nodeId, 'corners', poly.corners);


    if (   active
        && poly.valid)
    {
        genPushUpdateObject(
            parse,
            nodeId,
            { 
                nodeId:  nodeId,          
                type:    POLYGON,
                id:      0,
                x:       poly.x     .value,
                y:       poly.y     .value,
                width:   poly.width .value,
                height:  poly.height.value,
                angle:   poly.angle .value,
                round:   Math.max(0, poly.round.value),
                corners: Math.max(3, poly.corners.value)
            });
    }


    return poly;
}



function genParseStar(parse)
{
    parse.pos++; // STAR
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let star = new GStar();
    let paramIds;
    
    if (parse.next == STAR)
    {
        star     = genParse(parse); // not genParseStar() because genParse() handles stack overflow
        paramIds = parse.req[parse.pos++].split(',');
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


    genPushUpdateValue(parse, nodeId, 'x',      star.x     );
    genPushUpdateValue(parse, nodeId, 'y',      star.y     );
    genPushUpdateValue(parse, nodeId, 'width',  star.width );
    genPushUpdateValue(parse, nodeId, 'height', star.height);
    genPushUpdateValue(parse, nodeId, 'angle',  star.angle );
    genPushUpdateValue(parse, nodeId, 'round',  star.round );
    genPushUpdateValue(parse, nodeId, 'points', star.points);
    genPushUpdateValue(parse, nodeId, 'convex', star.convex);


    if (   active
        && star.valid)
    {
        genPushUpdateObject(
            parse,
            nodeId,
            { 
                nodeId: nodeId,          
                type:   STAR,
                id:     0,
                x:      star.x     .value,
                y:      star.y     .value,
                width:  star.width .value,
                height: star.height.value,
                angle:  star.angle .value,
                round:  Math.max(0, star.round.value),
                points: Math.max(3, star.points.value),
                convex: star.convex.value
            });
    }


    return star;
}