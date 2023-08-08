function genParseNumValue(parse)
{
    parse.pos++; // N

    const val = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(NUMBER_VALUE, val, parse);

    return val.indexOf(',') >= 0
         ? parseNumberValue      (val)[0]
         : parseSimpleNumberValue(val)[0];
}



function genParseNumber(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const num = new GNumber(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReq(num, parse, ignore);


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



function genParseConstant(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const _const = new GConstant(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(_const, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, _const);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    _const.constant = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, _const);
    return _const;
}



function genParseDateTime(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const dateTime = new GDateTime(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(dateTime, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, dateTime);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    dateTime.seconds   = genParse(parse);
    dateTime.minutes   = genParse(parse);
    dateTime.hours     = genParse(parse);
    dateTime.dayOfWeek = genParse(parse);
    dateTime.date      = genParse(parse);
    dateTime.month     = genParse(parse);
    dateTime.year      = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, dateTime);
    return dateTime;
}



function genParseSign(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sign = new GSign(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(sign, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, sign);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        sign.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, sign);
    return sign;
}



function genParseAbsolute(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const abs = new GAbsolute(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(abs, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, abs);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        abs.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, abs);
    return abs;
}



function genParseRound(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const round = new GRound(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(round, parse, ignore, nInputs);


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



function genParseMinMax(parse)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const minmax = new GMinMax(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(minmax, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, minmax);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nInputs; i++)
        minmax.inputs.push(genParse(parse));


    minmax.operation = genParse(parse);


    parse.nTab--;

        
    genParseNodeEnd(parse, minmax);
    return minmax;
}



function genParseLimits(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const limits = new GLimits(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(limits, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, limits);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        limits.input = genParse(parse);

    limits.min = genParse(parse);
    limits.max = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, limits);
    return limits;
}



function genParseMath(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const math = newNode(nodeId, options);

    
    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(math, parse, ignore, nInputs);


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



function genParseSimpleMath(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const smath = new GSimpleMath(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(smath, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, smath);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        smath.input = genParse(parse);

    smath.operation = genParse(parse);
    smath.operand   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, smath);
    return smath;
}



function genParseArithmetic(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const arith = newNode(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(arith, parse, ignore, nInputs);


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



function genParseDefine(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const define = new GDefine(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(define, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, define);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    for (let i = 0; i < nInputs; i++)
        define.inputs.push(genParse(parse));


    parse.nTab--;


    genParseNodeEnd(parse, define);
    return define;
}



function genParseRange(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const dist = new GRange(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(dist, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, dist);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    dist.from   = genParse(parse);
    dist.start  = genParse(parse);
    dist.end    = genParse(parse);
    dist.spread = genParse(parse);
    dist.bias   = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, dist);
    return dist;
}



function genParseSequence(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const seq = new GSequence(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(seq, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, seq);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    seq.start = genParse(parse);
    seq.step  = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, seq);
    return seq;
}



function genParseRandom(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const rnd = new GRandom(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(rnd, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, rnd);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    rnd.seed        = genParse(parse);
    rnd.min         = genParse(parse);
    rnd.max         = genParse(parse);
    rnd.unique      = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, rnd);
    return rnd;
}



function genParseNoise(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const noise = new GNoise(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(noise, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, noise);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    noise.seed        = genParse(parse);
    noise.min         = genParse(parse);
    noise.max         = genParse(parse);
    noise.scale       = genParse(parse);
    noise.offset      = genParse(parse);
    noise.interpolate = genParse(parse);
    noise.detail      = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, noise);
    return noise;
}



function genParseProbability(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const prob = new GProbability(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(prob, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, prob);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    prob.seed   = genParse(parse);
    prob.chance = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, prob);
    return prob;
}



function genParseAccumulate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const accum = new GAccumulate(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(accum, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, accum);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        accum.input = genParse(parse);

    accum.when = genParse(parse);

        
    parse.nTab--;


    genParseNodeEnd(parse, accum);
    return accum;
}



function genParseInterpolate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const lerp = new GInterpolate(nodeId, options);


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
        logReq(bool, parse, ignore, nInputs);


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
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cond, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cond);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        cond.input = genParse(parse);
  
    
    cond.operation = genParse(parse);
    cond.operand   = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, cond);
    return cond;
}



function genParseConditionBase(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const cond = newNode(nodeId, options);


    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests)
        logReq(cond, parse, ignore, nInputs); 


    if (ignore) 
    {
        genParseNodeEnd(parse, cond);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nInputs == 2)
    {
        cond.input0 = genParse(parse);
        cond.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cond.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }

    parse.nTab--;


    genParseNodeEnd(parse, cond);
    return cond;
}



function genParseTrigonometric(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const trig = new GTrig(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(trig, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, trig);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        trig.input = genParse(parse);

    trig.function = genParse(parse);

    parse.nTab--;


    genParseNodeEnd(parse, trig);
    return trig;
}



function genParseTrigBase(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const trig = newNode(nodeId, options);


    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests)
        logReq(trig, parse, ignore, nInputs); 


    if (ignore) 
    {
        genParseNodeEnd(parse, trig);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        trig.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, trig);
    return trig;
}



function genParseSolve(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const solve = new GSolve(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(solve, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, solve);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        solve.input = genParse(parse);

    solve.current = genParse(parse);
    solve.target  = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, solve);
    return solve;
}



function genParseAnimate(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const anim = new GAnimate(nodeId, options);


    if (parse.settings.logRequests) 
        logReq(anim, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, anim);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    anim.from   = genParse(parse);
    anim.to     = genParse(parse);
    anim.curve  = genParse(parse);
    anim.repeat = genParse(parse);
    anim.length = genParse(parse);
    anim.time   = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, anim);
    return anim;
}
