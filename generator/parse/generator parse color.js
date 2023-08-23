function genParseColorValue(parse)
{
    parse.pos++; // COLOR_VALUE

    const col = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(COLOR_VALUE, col, parse);

    return parseColorValue(col)[0];
}



function genParseColor(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const col = new GColor(nodeId, options);

    col.hasInputs = options.hasInputs;
    
  
    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(col, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, col);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    let paramIds;

    if (nInputs == 1)
    {
        col.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['space', 'convert', 'c1', 'c2', 'c3'];


    parse.inParam = false;
    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'space':   col.space   = genParse(parse);  break;
        case 'convert': col.convert = genParse(parse);  break;
        case 'c1':      col.c1      = genParse(parse);  break;
        case 'c2':      col.c2      = genParse(parse);  break;
        case 'c3':      col.c3      = genParse(parse);  break;
        }
    }
    

    parse.nTab--;


    genParseNodeEnd(parse, col);
    return col;
}



function genParseValidColor(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const valid = new GValidColor(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(valid, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, valid);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        valid.input = genParse(parse);


    valid.quality = genParse(parse);
    valid.value   = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, valid);
    return valid;
}



function genParseCorrectColor(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const corr = new GCorrectColor(nodeId, options);

    corr.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(corr, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, corr);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
        corr.input = genParse(parse);


    paramIds = parse.move().split(',');

    parse.inParam = false;
    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'order':    corr.order   = genParse(parse); break;
        case 'margin1':  corr.margin1 = genParse(parse); break;
        case 'margin2':  corr.margin2 = genParse(parse); break;
        case 'margin3':  corr.margin3 = genParse(parse); break;
        case 'value':    corr.value   = genParse(parse); break;
        }
    }
                

    parse.nTab--;


    genParseNodeEnd(parse, corr);
    return corr;
}



function genParseColorContrast(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cnt = new GColorContrast(nodeId, options);


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
        logReqColorContrast(cnt, nInputs, valueIndex, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, cnt);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nInputs == 2)
    {
        cnt.input0   = genParse(parse);
        cnt.input1   = genParse(parse);
        cnt.standard = genParse(parse);
    }
    else if (nInputs == 1)
    {
             if (valueIndex == 0) cnt.input0 = genParse(parse); 
        else if (valueIndex == 1) cnt.input1 = genParse(parse); 

        cnt.standard = genParse(parse);
    }
    else if (nInputs == 0)
    {
        cnt.standard = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, cnt);
    return cnt;
}



function genParseColorConvertP3(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const convert = new GConvertP3(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(convert, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, convert);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        convert.input = genParse(parse);


    convert.from = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, convert);
    return convert;
}



function genParseColorBlind(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cb = new GColorBlind(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(cb, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cb);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        cb.input = genParse(parse);

    cb.l = genParse(parse);
    cb.m = genParse(parse);
    cb.s = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, cb);
    return cb;
}



function genParseColorInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GColorInterpolate(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(lerp, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, lerp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        lerp.input0 = genParse(parse);
        lerp.input1 = genParse(parse);
    }

    else if (nInputs == 1)
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same

    else if (nInputs != 0)
        consoleError('nInputs must be [0, 2]');


    lerp.space  = genParse(parse);
    lerp.amount = genParse(parse);
    lerp.gamma  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}



function genParseColorBlend(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const blend = new GColorBlend(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(blend, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, blend);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        blend.input0 = genParse(parse);
        blend.input1 = genParse(parse);
    }

    else if (nInputs == 1)
        blend.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same

    else if (nInputs != 0)
        consoleError('nInputs must be [0, 2]');


    blend.mode    = genParse(parse);
    blend.opacity = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, blend);
    return blend;
}