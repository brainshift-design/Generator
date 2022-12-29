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

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqList(list, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, list);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nInputs; i++)
        list.inputs.push(genParse(parse));


    parse.nTab--;

        
    genParseNodeEnd(parse, list);
    return list;
}



function genParseItems(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const items = new GItems(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqItems(items, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, items);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        items.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, items);
    return items;
}



function genParseSelect(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sel = new GSelect(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqSelect(sel, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, sel);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        sel.input = genParse(parse);

    sel.index = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, sel);
    return sel;
}



function genParsePass(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const pass = new GPass(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqPass(pass, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, pass);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        pass.input = genParse(parse);

    pass.condition = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, pass);
    return pass;
}



function genParseStart(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rep = new GStart(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqCache(rep, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rep);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        rep.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, rep);
    return rep;
}



function genParseRepeat(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rep = new GRepeat(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqRepeat(rep, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rep);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        rep.input = genParse(parse);

    rep.count = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, rep);
    return rep;
}



function genParseCache(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cache = new GCache(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqCache(cache, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, cache);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        cache.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, cache);
    return cache;
}



function genParseCopy(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const copy = new GCopy(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReqCopy(copy, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, copy);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        copy.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, copy);
    return copy;
}