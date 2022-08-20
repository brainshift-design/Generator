function genParseNumValue(parse)
{
    parse.pos++; // N

    const val = parse.move();

    if (parse.logRequests)
        logReqNumberValue(val, parse);

    return parseNumberValue(val)[0];
}



function genParseNumber(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const num = new GNumber(nodeId, active);

    
    if (parse.logRequests) 
        logReqNumber(num, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, num);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (parse.next == NUMBER_VALUE) num.value = genParse(parse);
    else                            num.input = genParse(parse);

    parse.nTab--;


    genParseNodeEnd(parse, num);
    return num;
}



function genParseLimits(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const lim = new GLimits(nodeId, active);
   

    let nValues = -1;
    
    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues == 0 || nValues == 1, 'nValues must be [0, 1]');
    }

    
    if (parse.logRequests) 
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



function genParseArithmetic(parse, newNode)
{
    const [type, nodeId, active, ignore] = genParseNodeStart(parse);


    const arith = newNode(nodeId, active);


    let nValues = 0;
    
    if (!ignore)
        nValues = parse.move();


    if (parse.logRequests) 
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
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const lerp = new GInterpolate(nodeId, active);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2, 'nValues must be [0, 2]');
    }

    
    if (parse.logRequests) 
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