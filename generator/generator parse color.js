function genParseColor(parse)
{
    parse.pos++; // COLOR
 
    const nodeId = parse.move();
    /*const active =*/ genParseActive(parse);

  
    let col = new GColor();
    let paramIds;
    
    if (parse.next == COLOR)
    {
        col     = genParse(parse); // not genParseColor() because genParse() handles stack overflow
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['space', 'c1', 'c2', 'c3'];


    for (const id of paramIds)
    {
        switch (id)
        {
        case 'space': col.space = Math.min(Math.max(0, genParse(parse)), OpColorSpaces.length-1); break;
        case 'c1':    col.c1    = genParse(parse); break;
        case 'c2':    col.c2    = genParse(parse); break;
        case 'c3':    col.c3    = genParse(parse); break;
        }
    }


    genPushUpdateValue(parse, nodeId, 'space', col.space);
    genPushUpdateValue(parse, nodeId, 'c1',    col.c1   );
    genPushUpdateValue(parse, nodeId, 'c2',    col.c2   );
    genPushUpdateValue(parse, nodeId, 'c3',    col.c3   );


    return col;
}
