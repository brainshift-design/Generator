function genParseNumValue(parse)
{
    parse.pos++; // N

    return parseGnum(parse.req[parse.pos++]);
}



function genParseNumber(parse)
{
    const nodeId = genParseNumberNodeId(parse);

    const num = genParse(parse);    
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
        const num = genParse(parse);

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
        let num = genParse(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParse(parse);

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
            const num = genParse(parse);

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
        let num = genParse(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParse(parse);

            if (num.value == 0) 
            { 
                result = Number.NaN; 
                maxDec = 0;
                break; 
            }
            
            maxDec = Math.max(maxDec, num.decimals);
            result = floorTo(result / num.value, maxDec);
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
        let num = genParse(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParse(parse);

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
        let num = genParse(parse);

        result = num.value;
        maxDec = num.decimals;

        for (let i = 1; i < nValues; i++)
        {
            num = genParse(parse);

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
        const num0 = genParse(parse);
        const num1 = genParse(parse);
        const amt  = genParse(parse);

        result = num0.value + amt.value * (num1.value - num0.value) / 100;
        maxDec = Math.max(num0.decimals, num1.decimals);
    }
    else if (nValues == 1)
    {
        const num = genParse(parse);

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