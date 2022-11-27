function genParseColorValue(parse)
{
    parse.pos++; // COLOR_VALUE

    const col = parse.move();

    if (parse.settings.logRequests) 
        logReqColorValue(col, parse);

    return parseColorValue(col)[0];
}



function genParseColor(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const col = new GColor(nodeId, options);

  
    if (parse.settings.logRequests) 
        logReqColor(col, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, col);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    let paramIds;

    if (   COLOR_TYPES.includes(parse.next)
        ||    parse.next == PARAM
           && COLOR_TYPES.includes(parse.afterNext))
    {
        col.input = genParse(parse);
        paramIds  = parse.move().split(',');
    }
    else
        paramIds = ['space', 'convert', 'c1', 'c2', 'c3'];

    
    parse.inParam = false;
    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'space':   col.space   = genParse(parse); break;
        case 'convert': col.convert = genParse(parse); break;
        case 'c1':      col.c1      = genParse(parse); break;
        case 'c2':      col.c2      = genParse(parse); break;
        case 'c3':      col.c3      = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, col);
    return col;
}



function genParseColorInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GColorInterpolate(nodeId, options);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2, 'nValues must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReqColorInterpolate(lerp, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, lerp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nValues == 2)
    {
        lerp.input0 = genParse(parse);
        lerp.input1 = genParse(parse);
    }

    else if (nValues == 1)
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same

    else if (nValues != 0)
        console.assert(false, 'nValues must be [0, 2]');


    lerp.space  = genParse(parse);
    lerp.amount = genParse(parse);
    lerp.gamma  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}



function genParseColorContrast(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cnt = new GColorContrast(nodeId, options);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2, 'nValues must be [0, 2]');
    }


    const valueIndex = 
        nValues == 1
        ? parseInt(parse.move())
        : -1;

    
        if (parse.settings.logRequests) 
        logReqColorContrast(cnt, nValues, valueIndex, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, cnt);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nValues == 2)
    {
        cnt.input0   = genParse(parse);
        cnt.input1   = genParse(parse);
        cnt.standard = genParse(parse);
    }
    else if (nValues == 1)
    {
             if (valueIndex == 0) cnt.input0 = genParse(parse); 
        else if (valueIndex == 1) cnt.input1 = genParse(parse); 

        cnt.standard = genParse(parse);
    }
    else if (nValues == 0)
    {
        cnt.standard = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, cnt);
    return cnt;
}



function genParseColorBlind(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cb = new GColorBlind(nodeId, options);


    if (parse.settings.logRequests) 
        logReqColorBlind(cb, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, cb);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (COLOR_TYPES.includes(parse.next))
        cb.input = genParse(parse);

    cb.l = genParse(parse);
    cb.m = genParse(parse);
    cb.s = genParse(parse);

    parse.nTab--;


    genParseNodeEnd(parse, cb);
    return cb;
}



function genParseColorCorrect(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const val = new GColorCorrect(nodeId, options);


    if (parse.settings.logRequests) 
        logReqColorCorrect(val, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, val);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (COLOR_TYPES.includes(parse.next))
        val.input = genParse(parse);

    if (parse.next != UNKNOWN_CHAR) val.order   = genParse(parse); else { val.order   = null; parse.move(); }
    if (parse.next != UNKNOWN_CHAR) val.margin1 = genParse(parse); else { val.margin1 = null; parse.move(); }
    if (parse.next != UNKNOWN_CHAR) val.margin2 = genParse(parse); else { val.margin2 = null; parse.move(); }
    if (parse.next != UNKNOWN_CHAR) val.margin3 = genParse(parse); else { val.margin3 = null; parse.move(); }

    parse.nTab--;


    genParseNodeEnd(parse, val);
    return val;
}