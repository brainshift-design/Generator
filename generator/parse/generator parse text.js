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



function genParseTextSubstring(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sub = new GTextSubstring(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(sub, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, sub);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        sub.input = genParse(parse);

    sub.start = genParse(parse);
    sub.end   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, sub);
    return sub;
}



function genParseTextReplace(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const replace = new GTextReplace(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(replace, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, replace);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        replace.input = genParse(parse);

    replace.what = genParse(parse);
    replace.with = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, replace);
    return replace;
}




function genParseTextJoin(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const join = new GTextJoin(nodeId, options);


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

    parse.nTab--;

        
    genParseNodeEnd(parse, join);
    return join;
}