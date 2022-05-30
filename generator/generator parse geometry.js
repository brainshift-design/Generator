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


function genRectangle(parse)
{
    parse.pos++; // RECTANGLE
 
    const nodeId = parse.req[parse.pos++];
    const active = genActive(parse);

  
    let rect = new GRectangle();
    let indices;
    
    if (parse.req[parse.pos] == RECTANGLE)
    {
        rect    = genParseRequest(parse); // not genRectangle() because genParseRequest() handles stack overflow
        indices = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(6).keys()];

console.log(rect);
    for (const i of indices)
    {
        switch (i)
        {
        case 0: rect.x      = genParseRequest(parse); break;
        case 1: rect.y      = genParseRequest(parse); break;
        case 2: rect.width  = genParseRequest(parse); break;
        case 3: rect.height = genParseRequest(parse); break;
        case 4: rect.angle  = genParseRequest(parse); break;
        case 5: rect.round  = genParseRequest(parse); break;
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
        let firstObjId = parse.req[parse.pos++];
        if (firstObjId < 0) firstObjId = parse.nextObjectId;

        let found = parse.firstObjectIds.find(f => f.nodeId == nodeId);
        
        if (found) parse.nextObjectId = found.firstObjectId;
        else       parse.firstObjectIds.push({nodeId: nodeId, objId: firstObjId});

        genPostMessageToUI({
            cmd:   'uiSetFirstObjectId', 
            nodeId: nodeId,
            objId:  parse.nextObjectId});

        genPushUpdateObject(
            parse, 
            { 
                type:   RECTANGLE,
                id:     parse.nextObjectId++,
                nodeId: nodeId,
                x:      rect.x     .value,
                y:      rect.y     .value,
                width:  rect.width .value,
                height: rect.height.value,
                angle:  rect.angle .value,
                round:  Math.max(0, rect.round.value)
            },
            nodeId);
    }


    return rect;
}