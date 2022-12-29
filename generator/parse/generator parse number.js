function genParseNumValue(parse)
{
    parse.pos++; // N

    const val = parse.move();

    if (parse.settings.logRequests) 
        logReqNumberValue(val, parse);

    return val.indexOf(',') >= 0
         ? parseNumberValue      (val)[0]
         : parseSimpleNumberValue(val)[0];
}



function genParseNumber(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const num = new GNumber(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReqNumber(num, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, num);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    if (parse.next == NUMBER_VALUE) num.value = genParse(parse);
    else                            num.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, num);
    return num;
}



function genParseRound(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const round = new GRound(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReqRound(round, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, round);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        round.input = genParse(parse);

    round.type     = genParse(parse);
    round.decimals = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, round);
    return round;
}



function genParseLimits(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lim = new GLimits(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReqLimits(lim, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, lim);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        lim.input = genParse(parse);

    lim.min = genParse(parse);
    lim.max = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, lim);
    return lim;
}



function genParseMath(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const math = newNode(nodeId, options);

    
    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be 0 or 1');
    }


    if (parse.settings.logRequests) 
        logReqMath(math, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, math);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        math.input = genParse(parse);

    math.operation = genParse(parse);
    math.operand   = genParse(parse);


    parse.nTab--;

        
    genParseNodeEnd(parse, math);
    return math;
}



function genParseArithmetic(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const arith = newNode(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be 0 or 1');
    }


    if (parse.settings.logRequests) 
        logReqArithmetic(arith, type, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, arith);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nInputs == 1)
        arith.input = genParse(parse);

    arith.operand = genParse(parse);

    
    parse.nTab--;

        
    genParseNodeEnd(parse, arith);
    return arith;
}



function genParseVarMath(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const math = newNode(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqMath(math, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, math);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nInputs; i++)
        math.inputs.push(genParse(parse));


    math.operation = genParse(parse);


    parse.nTab--;

        
    genParseNodeEnd(parse, math);
    return math;
}



function genParseVarArithmetic(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const arith = newNode(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqArithmetic(arith, type, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, arith);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nInputs; i++)
        arith.inputs.push(genParse(parse));

    parse.nTab--;

        
    genParseNodeEnd(parse, arith);
    return arith;
}



function genParseSeries(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const series = new GSeries(nodeId, options);


    if (parse.settings.logRequests) 
        logReqSeries(series, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, series);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    series.start = genParse(parse);
    series.step  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, series);
    return series;
}



function genParseRandom(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rnd = new GRandom(nodeId, options);


    if (parse.settings.logRequests) 
        logReqRandom(rnd, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, rnd);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    rnd.seed = genParse(parse);
    rnd.min  = genParse(parse);
    rnd.max  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, rnd);
    return rnd;
}



function genParseInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GInterpolate(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReqInterpolate(lerp, nInputs, parse);


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
        lerp.amount = genParse(parse);
    }
    else if (nInputs == 1)
    {
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        lerp.amount = genParse(parse);
    }
    else if (nInputs == 0)
    {
        lerp.amount = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}



function genParseBoolean(parse)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const bool = new GBoolean(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqBoolean(bool, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, bool);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nInputs; i++)
        bool.inputs.push(genParse(parse));


    bool.operation = genParse(parse);


    parse.nTab--;

        
    genParseNodeEnd(parse, bool);
    return bool;
}



function genParseCondition(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cond = new GCondition(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        console.assert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReqCondition(cond, nInputs, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, cond);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nInputs == 2)
    {
        cond.input0    = genParse(parse);
        cond.input1    = genParse(parse);
        cond.operation = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cond.input0    = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        cond.operation = genParse(parse);
    }
    else if (nInputs == 0)
    {
        cond.operation = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, cond);
    return cond;
}