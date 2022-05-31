function genParseNumValue(parse)
{
    parse.pos++; // N

    return parseGnum(parse.req[parse.pos++]);
}



function genParseNumberNodeId(parse)
{
    parse.pos++; // tag

    const nodeId = parse.req[parse.pos++];
    genParseActive(parse);

    return nodeId;
}



function genParseNumber(parse)
{
    const nodeId = genParseNumberNodeId(parse);

    const num = genParseRequest(parse);    
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberAdd(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    

    let result = 0;
    let maxDec = 0;

    for (let i = 0; i < nValues; i++)
    {
        const num = genParseRequest(parse);

        result += num.value;
        maxDec = Math.max(maxDec, num.decimals);
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberSubtract(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(parse);

            result -= num.value;
            maxDec = Math.max(maxDec, num.decimals);
        }
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberMultiply(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        result = 1;
        maxDec = 0;

        for (let i = 0; i < nValues; i++)
        {
            const num = genParseRequest(parse);

            result *= num.value;
            maxDec = Math.max(maxDec, num.decimals);
        }
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberDivide(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(parse);
            if (num.value == 0) { num.value = Number.NaN; break; }
            
            result /= num.value;
            maxDec = Math.max(maxDec, num.decimals);
        }
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberModulo(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(parse);

            if (num.value == 0) 
            { 
                result = Number.NaN; 
                maxDec = 0;
                break; 
            }

            result %= num.value;
            maxDec = Math.max(maxDec, num.decimals);
        }
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberExponent(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];

    
    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(parse);

            result = Math.pow(result, num.value);
            maxDec = Math.max(maxDec, num.decimals);
        }
    }


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genParseNumberInterpolate(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];


    let result, maxDec;

    if (nValues == 2)
    {
        const num0 = genParseRequest(parse);
        const num1 = genParseRequest(parse);
        const amt  = genParseRequest(parse);

        result = num0.value + amt.value * (num1.value - num0.value) / 100;
        maxDec = Math.max(num0.decimals, num1.decimals);
    }
    else if (nValues == 1)
    {
        const num = genParseRequest(parse);

        result = num.value;
        maxDec = num.decimals;
    }
    else if (nValues == 0)
    {
        result = 0;
        maxDec = 0;       
    }
    else 
        console.assert(false);


    const num = new GNumber(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}