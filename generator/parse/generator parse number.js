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



function genParseLimits(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lim = new GLimits(nodeId, options);
   

    let nValues = -1;
    
    if (!ignore)
    {
        nValues = parseInt(parse.move());
        console.assert(nValues == 0 || nValues == 1, 'nValues must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReqLimits(lim, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, lim);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nValues == 1)
        lim.input = genParse(parse);

    lim.min = genParse(parse);
    lim.max = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, lim);
    return lim;
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



function genParseMath(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const math = newNode(nodeId, options);

    
    let nValues = -1;
    
    if (!ignore)
    {
        nValues = parseInt(parse.move());
        console.assert(nValues == 0 || nValues == 1, 'nValues must be 0 or 1');
    }


    if (parse.settings.logRequests) 
        logReqMath(math, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, math);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nValues == 1)
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


    let nValues = -1;
    
    if (!ignore)
    {
        nValues = parseInt(parse.move());
        console.assert(nValues == 0 || nValues == 1, 'nValues must be 0 or 1');
    }


    if (parse.settings.logRequests) 
        logReqArithmetic(arith, type, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, arith);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    if (nValues == 1)
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

    
    let nValues = 0;
    
    if (!ignore)
        nValues = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqMath(math, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, math);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nValues; i++)
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


    let nValues = 0;
    
    if (!ignore)
        nValues = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqArithmetic(arith, type, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, arith);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nValues; i++)
        arith.inputs.push(genParse(parse));

    parse.nTab--;

        
    genParseNodeEnd(parse, arith);
    return arith;
}



function genParseInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GInterpolate(nodeId, options);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2, 'nValues must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReqInterpolate(lerp, nValues, parse);


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
        lerp.amount = genParse(parse);
    }
    else if (nValues == 1)
    {
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        lerp.amount = genParse(parse);
    }
    else if (nValues == 0)
    {
        lerp.amount = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}