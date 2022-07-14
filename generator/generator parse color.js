function genParseColor(parse)
{
    parse.pos++; // COLOR
 
    const nodeId = parse.req[parse.pos++];
    /*const active =*/ genParseActive(parse);

  
    let col = new GColor();
    let indices;
    
    if (parse.req[parse.pos] == COLOR)
    {
        col     = genParse(parse); // not genParseColor() because genParse() handles stack overflow
        indices = parse.req[parse.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(4).keys()];


    for (const i of indices)
    {
        switch (i)
        {
        case 0: col.space = Math.min(Math.max(0, genParse(parse)), OpColorSpaces.length-1); break;
        case 1: col.c1    = genParse(parse); break;
        case 2: col.c2    = genParse(parse); break;
        case 3: col.c3    = genParse(parse); break;
        }
    }


    genPushUpdateParamValue(parse, nodeId, 0, col.space);
    genPushUpdateParamValue(parse, nodeId, 1, col.c1   );
    genPushUpdateParamValue(parse, nodeId, 2, col.c2   );
    genPushUpdateParamValue(parse, nodeId, 3, col.c3   );


    return col;
}
