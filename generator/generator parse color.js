function genParseColorValue(parse)
{
    parse.pos++; // COLOR_VALUE

    const col = parse.move();

    if (parse.logRequests)
        logReqColorValue(col, parse);

    return parseGColorValue(col);
}



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

    if (   COLOR_TYPES.includes(parse.next)
        ||    parse.next == PARAM
           && COLOR_TYPES.includes(parse.afterNext))
    {
        col.input = genParse(parse);
        paramIds  = parse.move().split(',');
    }
    else
        paramIds = ['space', 'convert', 'c1', 'c2', 'c3'];

    
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
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const lerp = new GColorInterpolate(nodeId, active);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2);
    }

    
    if (parse.logRequests) 
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
        console.assert(false);


    lerp.space  = genParse(parse);
    lerp.amount = genParse(parse);
    lerp.gamma  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}



function genParseColorContrast(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const cnt = new GColorContrast(nodeId, active);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2);
    }


    const valueIndex = 
        nValues == 1
        ? parseInt(parse.move())
        : -1;

    
    if (parse.logRequests) 
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
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const cb = new GColorBlind(nodeId, active);


    if (parse.logRequests) 
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



function genParseColorValidate(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const val = new GColorValidate(nodeId, active);


    if (parse.logRequests) 
        logReqColorValidate(val, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, val);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (COLOR_TYPES.includes(parse.next))
        val.input = genParse(parse);

    val.order   = genParse(parse);

    val.margin1 = genParse(parse);
    val.margin2 = genParse(parse);
    val.margin3 = genParse(parse);

    parse.nTab--;


    genParseNodeEnd(parse, val);
    return val;
}



function genParseColorFillValue(parse)
{
    parse.pos++; // COLOR_FILL_VALUE

    const fill = parse.move();

    if (parse.logRequests)
        logReqColorFillValue(fill, parse);

    return parseGColorFillValue(fill);
}



function genParseColorFill(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const fill = new GColorFill(nodeId, active);


    if (parse.logRequests) 
        logReqColorFill(fill, parse);


    if (ignore)
    {
        genParseNodeEnd(parse, fill);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (   parse.next == COLOR_FILL
        || parse.next == COLOR_FILL_VALUE)
    {
        fill.input = genParse(parse);
        paramIds   = parse.move().split(',');
    }
    else
        paramIds = ['color', 'opacity'];

    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'color':   fill.color   = genParse(parse); break;
        case 'opacity': fill.opacity = genParse(parse); break;
        }
    }

    
    parse.nTab--;


    genParseNodeEnd(parse, fill);
    return fill;
}



function genParseColorStopValue(parse)
{
    parse.pos++; // COLOR_STOP_VALUE

    const stop = parse.move();

    if (parse.logRequests)
        logReqColorStopValue(stop, parse);

    return parseGColorStopValue(stop);
}



function genParseColorStop(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const stop = new GColorStop(nodeId, active);


    if (parse.logRequests) 
        logReqColorStop(stop, parse);


    if (ignore)
    {
        genParseNodeEnd(parse, stop);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (   parse.next == COLOR_STOP
        || parse.next == COLOR_STOP_VALUE)
        stop.input = genParse(parse);


    stop.fill     = genParse(parse);
    stop.position = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, stop);
    return stop;
}