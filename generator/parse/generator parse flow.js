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



function genParseVariable(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const variable = new GVariable(nodeId, options);

    variable.existing = options.existing;


    if (parse.settings.logRequests) 
        logReq(variable, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, variable);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    const nParams = parseInt(parse.move());

    if (nParams == 1)
        variable.varValue = genParse(parse);

    
    parse.nTab--;

    
    variable.linked = variable.id != NULL;


    genParseNodeEnd(parse, variable);
    return variable;
}



function genParseVariableGroup(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const group = new GVariableGroup(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(group, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, group);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        group.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, group);
    return group;
}



function genParseListValue(parse)
{
    parse.pos++; // LIST_VALUE

    const list = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(LIST_VALUE, list, parse);

    return parseListValue(list)[0];
}



function genParseCombine(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cmb = new GCombine(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(cmb, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cmb);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nInputs; i++)
        cmb.inputs.push(genParse(parse));


    parse.nTab--;

        
    genParseNodeEnd(parse, cmb);
    return cmb;
}



function genParseListAsItem(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const listAsItem = new GListAsItem(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(listAsItem, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, listAsItem);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        listAsItem.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, listAsItem);
    return listAsItem;
}



function genParseExtract(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const extr = new GExtract(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(extr, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, extr);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        extr.input = genParse(parse);

    extr.indices = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, extr);
    return extr;
}



function genParseSetParam(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const set = new GSetParam(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(set, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, set);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        set.input0 = genParse(parse);
        set.input1 = genParse(parse);
        set.name   = genParse(parse);
    }
    else if (nInputs == 1)
    {
        set.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        set.name   = genParse(parse);
    }
    else if (nInputs == 0)
    {
        set.name   = genParse(parse);
    }

    
    parse.nTab--;


    genParseNodeEnd(parse, set);
    return set;
}



function genParseGetParam(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const extr = new GGetParam(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(extr, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, extr);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        extr.input = genParse(parse);

    extr.name = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, extr);
    return extr;
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



function genParseShiftList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const shift = new GShiftList(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(shift, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, shift);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        shift.input = genParse(parse);

    shift.offset = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, shift);
    return shift;
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



function genParseReorderList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const reorder = new GReorderList(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(reorder, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, reorder);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        reorder.input = genParse(parse);


    reorder.indices = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, reorder);
    return reorder;
}



function genParseSort(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sort = new GSort(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(sort, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, sort);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        sort.input = genParse(parse);


    const nConditions = parseInt(parse.move());

    if (nConditions == 1)
        sort.condition = genParse(parse);

        
    sort.reverse   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, sort);
    return sort;
}



function genParseFilter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const filter = new GFilter(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(filter, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, filter);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        filter.input = genParse(parse);

    filter.condition = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, filter);
    return filter;
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



function genParseList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const list = new GList(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(list, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, list);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        list.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, list);
    return list;
}



function genParseSelect(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sel = new GSelect(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(sel, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, sel);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nInputs; i++)
        sel.inputs.push(genParse(parse));

    sel.index = genParse(parse);


    parse.nTab--;

        
    genParseNodeEnd(parse, sel);
    return sel;
}



function genParseSelectFromList(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sel = new GSelectFromList(nodeId, options);
    

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


    const feedback = new GStart(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(feedback, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, feedback);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        feedback.input = genParse(parse);

    feedback.feedback = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, feedback);
    return feedback;
}



function genParseRepeat(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const repeat = new GRepeat(nodeId, options);


    repeat.activeAfter = parseInt(parse.move()) > 0;


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

    repeat. count   = genParse(parse);
    repeat._while   = genParse(parse);
  //repeat. iterate = genParse(parse);  // don't set target here
    repeat. loop    = genParse(parse);  // don't set target here


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


    timer.interval = genParse(parse);
    timer._while   = genParse(parse);
    timer. loop    = genParse(parse);  // don't set target here


    parse.nTab--;


    genParseNodeEnd(parse, timer);
    return timer;
}



function genParseValueName(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const name = new GValueName(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(name, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, name);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        name.input = genParse(parse);

    name.name = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, name);
    return name;
}



function genParseGetListValueNames(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const names = new GGetListValueNames(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(names, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, names);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        names.input = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, names);
    return names;
}



function genParseListValueNames(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const names = new GListValueNames(nodeId, options);


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
        logReq(names, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, names);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nInputs == 2)
    {
        names.input0 = genParse(parse);
        names.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
             if (valueIndex == 0) names.input0 = genParse(parse); 
        else if (valueIndex == 1) names.input1 = genParse(parse); 
    }

    parse.nTab--;


    genParseNodeEnd(parse, names);
    return names;
}



function genParseObjectName(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const name = new GObjectName(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(name, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, name);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        name.input = genParse(parse);

    name.name = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, name);
    return name;
}



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



function genParseCommentArrow(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cmnt = new GCommentArrow(nodeId, options);

    
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



function genParsePanel(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const panel = new GPanel(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReq(panel, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, panel);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    genParseNodeEnd(parse, panel);
    return panel;
}