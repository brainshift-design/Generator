function genNumValue(parse)
{
    parse.pos++; // N

    return parseGnum(parse.req[parse.pos++]);
}



function genNumber(parse)
{
    parse.pos++; // NUMBER

    const nodeId = parse.req[parse.pos++];
    const num    = genParseRequest(parse);    
    genPushUpdateParamValue(parse, nodeId, 0, num.toString());

    return num;
}



function genNumberAdd(parse)
{
    parse.pos++; // NUMBER_ADD

    const nodeId  = parse.req[parse.pos++];
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



function genNumberSubtract(parse)
{
    parse.pos++; // NUMBER_SUBTRACT

    const nodeId  = parse.req[parse.pos++];
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



function genNumberMultiply(parse)
{
    parse.pos++; // NUMBER_MULTIPLY

    const nodeId  = parse.req[parse.pos++];
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



function genNumberDivide(parse)
{
    parse.pos++; // NUMBER_DIVIDE

    const nodeId  = parse.req[parse.pos++];
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



function genNumberModulo(parse)
{
    parse.pos++; // NUMBER_MODULO

    const nodeId  = parse.req[parse.pos++];
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



function genNumberExponent(parse)
{
    parse.pos++; // NUMBER_EXPONENT

    const nodeId  = parse.req[parse.pos++];
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



function genNumberInterpolate(parse)
{
    parse.pos++; // NUMBER_INTERPOLATE

    const nodeId  = parse.req[parse.pos++];
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