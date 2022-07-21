function genParseColor(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const col = new GColor(nodeId, active);

  
    if (parse.logRequests) 
        logReqColor(col, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, col);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    let paramIds;

    if (parse.next == COLOR)
    {
        col.input = genParse(parse);
        paramIds  = parse.move().split(',');
    }
    else
        paramIds = ['space', 'c1', 'c2', 'c3'];

    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'space': col.space = genParse(parse); break;
        case 'c1':    col.c1    = genParse(parse); break;
        case 'c2':    col.c2    = genParse(parse); break;
        case 'c3':    col.c3    = genParse(parse); break;
        }
    }


    parse.nTab--;


    genParseNodeEnd(parse, col);
    return col;
}
