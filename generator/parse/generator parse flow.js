function genParseComment(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cmnt = new GComment(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReq(cmnt, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, cmnt);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    genParseNodeEnd(parse, cmnt);
    return cmnt;
}



function genParseNull(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const _null = new GNull(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(_null, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, _null);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        _null.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, _null);
    return _null;
}



function genParseListValue(parse)
{
    parse.pos++; // LIST_VALUE

    const list = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(LIST_VALUE, list, parse);

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
        logReq(list, parse, ignore, nInputs);


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



function genParseSublist(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sub = new GSublist(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
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



function genParseUnique(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const unique = new GUnique(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(unique, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, unique);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        unique.input = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, unique);
    return unique;
}



function genParseReverseList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const reverse = new GReverseList(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(reverse, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, reverse);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        reverse.input = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, reverse);
    return reverse;
}



function genParseColumn(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const column = new GColumn(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(column, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, column);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        column.input = genParse(parse);

    column.index = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, column);
    return column;
}



function genParseCell(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cell = new GCell(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cell, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cell);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        cell.input = genParse(parse);

    cell.column = genParse(parse);
    cell.row    = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, cell);
    return cell;
}



function genParseItems(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const items = new GItems(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(items, parse, ignore, nInputs);


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
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(sel, parse, ignore, nInputs);


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



function genParseListCount(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const count = new GListCount(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(count, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, count);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        count.input = genParse(parse);

    count.start = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, count);
    return count;
}



function genParseListContains(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cont = new GContains(nodeId, options);
   

    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cont, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cont);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        cont.input0 = genParse(parse);
        cont.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cont.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }
  
    
    parse.nTab--;


    genParseNodeEnd(parse, cont);
    return cont;
}



function genParseIfElse(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const ifElse = new GIfElse(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }


    const valueIndex = 
        nInputs == 1
        ? parseInt(parse.move())
        : -1;


    if (parse.settings.logRequests) 
        logReq(ifElse, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, ifElse);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nInputs == 2)
    {
        ifElse.input0    = genParse(parse);
        ifElse.input1    = genParse(parse);
        ifElse.condition = genParse(parse);
    }
    else if (nInputs == 1)
    {
             if (valueIndex == 0) ifElse.input0 = genParse(parse); 
        else if (valueIndex == 1) ifElse.input1 = genParse(parse); 

        ifElse.condition = genParse(parse);
    }
    else if (nInputs == 0)
    {
        ifElse.condition = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, ifElse);
    return ifElse;
}



function genParseStart(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const start = new GStart(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(start, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, start);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        start.input = genParse(parse);

    start.feedback = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, start);
    return start;
}



function genParseRepeat(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const repeat = new GRepeat(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(repeat, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, repeat);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        repeat.input = genParse(parse);

    repeat. count = genParse(parse);
    repeat._while = genParse(parse);
    repeat. loop  = genParse(parse);  // don't set target here


    parse.nTab--;


    genParseNodeEnd(parse, repeat);
    return repeat;
}



function genParseCache(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cache = new GCache(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(cache, parse, ignore, nInputs);


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



function genParseFreeze(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const freeze = new GFreeze(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(freeze, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, freeze);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        freeze.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, freeze);
    return freeze;
}



function genParseTimer(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const timer = new GTimer(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(timer, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, timer);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        timer.input = genParse(parse);


    timer.delay = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, timer);
    return timer;
}