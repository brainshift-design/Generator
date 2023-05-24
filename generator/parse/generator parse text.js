function genParseTextValue(parse)
{
    parse.pos++; // tag

    const val = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(TEXT_VALUE, val, parse);

    return parseTextValue(decodeURIComponent(val))[0];
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



function genParseTextLength(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const len = new GTextLength(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(len, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, len);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        len.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, len);
    return len;
}



function genParseTextTrim(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const trim = new GTextTrim(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(trim, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, trim);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        trim.input = genParse(parse);

    trim.start = genParse(parse);
    trim.end   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, trim);
    return trim;
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


    join.with = genParse(parse);

    
    parse.nTab--;

        
    genParseNodeEnd(parse, join);
    return join;
}



function genParseTextCharacter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const char = new GTextCharacter(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(char, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, char);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        char.input = genParse(parse);

    char.code = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, char);
    return char;
}



function genParseNumberToText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const num2text = new GNumberToText(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(num2text, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, num2text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        num2text.input = genParse(parse);

    num2text.number = genParse(parse);
    num2text.format = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, num2text);
    return num2text;
}



function genParseTextCSV(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const csv = new GTextCSV(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(csv, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, csv);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        csv.input = genParse(parse);

    csv.separator = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, csv);
    return csv;
}



function genParseTextFetch(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const fetch = new GTextFetch(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(fetch, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, fetch);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        fetch.input = genParse(parse);

    fetch.request = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, fetch);
    return fetch;
}