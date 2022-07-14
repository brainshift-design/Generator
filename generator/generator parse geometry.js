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
    parse.pos++; // RECTANGLE
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let rect = new GRectangle();
    let indices;
    
    if (parse.req[parse.pos] == RECTANGLE)
    {
        rect    = genParse(parse); // not genParseRectangle() because genParse() handles stack overflow
        indices = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(6).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: rect.x      = genParse(parse); break;
        case 1: rect.y      = genParse(parse); break;
        case 2: rect.width  = genParse(parse); break;
        case 3: rect.height = genParse(parse); break;
        case 4: rect.angle  = genParse(parse); break;
        case 5: rect.round  = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, rect.x     );
    genPushUpdateParamValue(parse, nodeId, 1, rect.y     );
    genPushUpdateParamValue(parse, nodeId, 2, rect.width );
    genPushUpdateParamValue(parse, nodeId, 3, rect.height);
    genPushUpdateParamValue(parse, nodeId, 4, rect.angle );
    genPushUpdateParamValue(parse, nodeId, 5, rect.round );


    if (   active
        && rect.valid)
    {
        genPushUpdateObject(
            parse,
            nodeId,
            { 
                nodeId: nodeId,          
                type:   RECTANGLE,
                id:     0,
                x:      rect.x     .value,
                y:      rect.y     .value,
                width:  rect.width .value,
                height: rect.height.value,
                angle:  rect.angle .value,
                round:  Math.max(0, rect.round.value)
            });
    }


    return rect;
}



function genParseLine(parse)
{
    parse.pos++; // LINE
 
    const nodeId = parse.req[parse.pos++];
    const active = genParseActive(parse);

  
    let line = new GLine();
    let indices;
    
    if (parse.req[parse.pos] == LINE)
    {
        line = genParse(parse); // not genParseLine() because genParse() handles stack overflow
        indices  = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(5).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: line.x     = genParse(parse); break;
        case 1: line.y     = genParse(parse); break;
        case 2: line.width = genParse(parse); break;
        //case 3: line.height = genParse(parse); break;
        case 3: line.angle = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, line.x    );
    genPushUpdateParamValue(parse, nodeId, 1, line.y    );
    genPushUpdateParamValue(parse, nodeId, 2, line.width);
    //genPushUpdateParamValue(parse, nodeId, 3, line.height);
    genPushUpdateParamValue(parse, nodeId, 3, line.angle);


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
    let indices;
    
    if (parse.req[parse.pos] == ELLIPSE)
    {
        elllipse = genParse(parse); // not genParseEllipse() because genParse() handles stack overflow
        indices  = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(5).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: elllipse.x      = genParse(parse); break;
        case 1: elllipse.y      = genParse(parse); break;
        case 2: elllipse.width  = genParse(parse); break;
        case 3: elllipse.height = genParse(parse); break;
        case 4: elllipse.angle  = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, elllipse.x     );
    genPushUpdateParamValue(parse, nodeId, 1, elllipse.y     );
    genPushUpdateParamValue(parse, nodeId, 2, elllipse.width );
    genPushUpdateParamValue(parse, nodeId, 3, elllipse.height);
    genPushUpdateParamValue(parse, nodeId, 4, elllipse.angle );


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
    let indices;
    
    if (parse.req[parse.pos] == POLYGON)
    {
        poly    = genParse(parse); // not genParsePolygon() because genParse() handles stack overflow
        indices = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(7).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: poly.x       = genParse(parse); break;
        case 1: poly.y       = genParse(parse); break;
        case 2: poly.width   = genParse(parse); break;
        case 3: poly.height  = genParse(parse); break;
        case 4: poly.angle   = genParse(parse); break;
        case 5: poly.round   = genParse(parse); break;
        case 6: poly.corners = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, poly.x      );
    genPushUpdateParamValue(parse, nodeId, 1, poly.y      );
    genPushUpdateParamValue(parse, nodeId, 2, poly.width  );
    genPushUpdateParamValue(parse, nodeId, 3, poly.height );
    genPushUpdateParamValue(parse, nodeId, 4, poly.angle  );
    genPushUpdateParamValue(parse, nodeId, 5, poly.round  );
    genPushUpdateParamValue(parse, nodeId, 6, poly.corners);


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
    let indices;
    
    if (parse.req[parse.pos] == STAR)
    {
        star    = genParse(parse); // not genParseStar() because genParse() handles stack overflow
        indices = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(8).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: star.x      = genParse(parse); break;
        case 1: star.y      = genParse(parse); break;
        case 2: star.width  = genParse(parse); break;
        case 3: star.height = genParse(parse); break;
        case 4: star.angle  = genParse(parse); break;
        case 5: star.round  = genParse(parse); break;
        case 6: star.points = genParse(parse); break;
        case 7: star.convex = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, star.x     );
    genPushUpdateParamValue(parse, nodeId, 1, star.y     );
    genPushUpdateParamValue(parse, nodeId, 2, star.width );
    genPushUpdateParamValue(parse, nodeId, 3, star.height);
    genPushUpdateParamValue(parse, nodeId, 4, star.angle );
    genPushUpdateParamValue(parse, nodeId, 5, star.round );
    genPushUpdateParamValue(parse, nodeId, 6, star.points);
    genPushUpdateParamValue(parse, nodeId, 7, star.convex);


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