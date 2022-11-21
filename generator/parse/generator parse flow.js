function genParseListValue(parse)
{
    parse.pos++; // LIST_VALUE

    const list = parse.move();

    if (parse.settings.logRequests) 
        logReqListValue(list, parse);

    return parseListValue(list)[0];
}



function genParseList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const list = new GList(nodeId, options);

    
    let nValues = 0;
    
    if (!ignore)
        nValues = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqList(list, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, list);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nValues; i++)
        list.inputs.push(genParse(parse));


    parse.nTab--;

        
    genParseNodeEnd(parse, list);
    return list;
}



function genParseItems(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const items = new GListItems(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReqListItems(items, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, items);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (LIST_TYPES.includes(parse.next))
        items.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, items);
    return items;
}
