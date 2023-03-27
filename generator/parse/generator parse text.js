function genParseTextValue(parse)
{
    parse.pos++; // tag

    const val = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(TEXT_VALUE, val, parse);

    return parseTextValue(val)[0];
}



function genParseText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text = new GText(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReq(text, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    if (parse.next == TEXT_VALUE) text.value = genParse(parse);
    else                          text.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, text);
    return text;
}
