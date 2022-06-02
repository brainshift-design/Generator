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
        rect    = genParse(parse); // not genRectangle() because genParse() handles stack overflow
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


    genPushUpdateParamValue(parse, nodeId, 0, rect.x     .toString());
    genPushUpdateParamValue(parse, nodeId, 1, rect.y     .toString());
    genPushUpdateParamValue(parse, nodeId, 2, rect.width .toString());
    genPushUpdateParamValue(parse, nodeId, 3, rect.height.toString());
    genPushUpdateParamValue(parse, nodeId, 4, rect.angle .toString());
    genPushUpdateParamValue(parse, nodeId, 5, rect.round .toString());


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