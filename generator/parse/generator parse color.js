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
        case 'space':   col.space        = genParse(parse);  break;
        case 'convert': col.convert      = genParse(parse);  break;
        case 'c1':      col._c1 = col.c1 = genParse(parse);  break;
        case 'c2':      col._c2 = col.c2 = genParse(parse);  break;
        case 'c3':      col._c3 = col.c3 = genParse(parse);  break;
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


    valid.method = genParse(parse);
    valid.value  = genParse(parse);


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
        case 'order':  corr._order = corr.order = genParse(parse);  break;
        case 'c1':     corr._c1    = corr.c1    = genParse(parse);  break;
        case 'c2':     corr._c2    = corr.c2    = genParse(parse);  break;
        case 'c3':     corr._c3    = corr.c3    = genParse(parse);  break;
        case 'value':  corr.value               = genParse(parse);  break;
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
    }
    else if (nInputs == 1)
    {
             if (valueIndex == 0) cnt.input0 = genParse(parse); 
        else if (valueIndex == 1) cnt.input1 = genParse(parse); 
    }
  

    cnt.standard = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, cnt);
    return cnt;
}



function genParseColorDeltaE(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const deltaE = new GColorDeltaE(nodeId, options);


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
        logReqColorContrast(deltaE, nInputs, valueIndex, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, deltaE);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        deltaE.input0 = genParse(parse);
        deltaE.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
             if (valueIndex == 0) deltaE.input0 = genParse(parse); 
        else if (valueIndex == 1) deltaE.input1 = genParse(parse); 
    }
  

    parse.nTab--;


    genParseNodeEnd(parse, deltaE);
    return deltaE;
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



function genParseColorScheme(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const scheme = new GColorScheme(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(scheme, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, scheme);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        scheme.input = genParse(parse);


    scheme.schemeType = genParse(parse);
    scheme.space      = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, scheme);
    return scheme;
}



function genParseColorInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GColorInterpolate(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());

    
    if (parse.settings.logRequests) 
        logReq(lerp, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, lerp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    parse.nTab++;

    for (let i = 0; i < nInputs; i++)
        lerp.inputs.push(genParse(parse));


    lerp.space  = genParse(parse);
    lerp.gamma  = genParse(parse);
    lerp.amount = genParse(parse);
    lerp.degree = genParse(parse);


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


    blend.mode   = genParse(parse);
    blend.amount = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, blend);
    return blend;
}



function genParseGradientValue(parse)
{
    parse.pos++; // GRADIENT_VALUE

    const grad = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(GRADIENT_VALUE, grad, parse);

    return parseGradientValue(grad)[0];
}



function genParseGradient(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const grad = new GGradient(nodeId, options);

    grad.hasInputs = options.hasInputs;


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(grad, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, grad);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        grad.inputs.push(genParse(parse));


    const nParamIds = genParseParamCount(parse);


    for (let i = 0; i < nParamIds; i++)
    {
        const paramId = genParseParamId(parse);

        parse.inParam = true;

        switch (paramId)
        {
        case 'gradType': grad.gradType = genParse(parse); break;
        case 'position': grad.position = genParse(parse); break;
        case 'x':        grad.x        = genParse(parse); break;
        case 'y':        grad.y        = genParse(parse); break;
        case 'size':     grad.size     = genParse(parse); break;
        case 'angle':    grad.angle    = genParse(parse); break;
        case 'aspect':   grad.aspect   = genParse(parse); break;
        case 'skew':     grad.skew     = genParse(parse); break;
        case 'blend':    grad.blend    = genParse(parse); break;
        }
    }

    // grad.gradType   = genParse(parse); 
    // grad.position   = genParse(parse); 
    // grad.x          = genParse(parse); 
    // grad.y          = genParse(parse); 
    // grad.size       = genParse(parse); 
    // grad.angle      = genParse(parse); 
    // grad.aspect     = genParse(parse); 
    // grad.skew       = genParse(parse); 
    // grad.blend      = genParse(parse);

    
    grad.diagAspect = parseInt(parse.move()) > 0;


    parse.inParam = false;
    parse.nTab--;


    genParseNodeEnd(parse, grad);
    return grad;
}



// function genParseGradientParam(parse)
// {
//     const grd = genParse(parse); 

//     if (COLOR_TYPES.includes(grd.type))
//         grd.options.opacity = genParse(parse);

//     return grd;
// }



function genParseColorStopValue(parse)
{
    parse.pos++; // COLOR_STOP_VALUE

    const stop = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(COLOR_STOP_VALUE, stop, parse);

    return parseColorStopValue(stop)[0];
}



function genParseColorStop(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const stop = new GColorStop(nodeId, options);

    stop.hasInputs = options.hasInputs;


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(stop, parse, ignore, nInputs);


    if (ignore)
    {
        genParseNodeEnd(parse, stop);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    let paramIds;

    if (nInputs == 1)
    {
        stop.input = genParse(parse);
        paramIds = parse.move().split(',');
    }
    else
        paramIds = ['fill', 'position'];


    parse.inParam = false;

    for (const id of paramIds)
    {
        switch (id)
        {
        case 'fill':     stop.fill     = genParse(parse); break;
        case 'position': stop.position = genParse(parse); break;
        }
    }
    
    
    parse.nTab--;


    genParseNodeEnd(parse, stop);
    return stop;
}