function genParseNumValue(parse)
{
    parse.pos++; // N

    return parseGnum(parse.req[parse.pos++]);
}



function genParseNumber(parse)
{
    const nodeId = genParseNumberNodeId(parse);

    const num = genParse(parse);    
    genPushUpdateParamValue(parse, nodeId, 'value', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

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
    genPushUpdateParamValue(parse, nodeId, 'result', num);

    return num;
}



function genParseNumberInterpolate(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];


    let result, amount;

    if (nValues == 2)
    {
        const num0 = genParse(parse);
        const num1 = genParse(parse);
        amount     = genParse(parse);

        const maxDec = Math.max(num0.decimals, num1.decimals);

        result = new GNumber(
            maxDec == 0
            ? num0.value + Math.floor(amount.value * (num1.value - num0.value) / 100)
            : num0.value + amount.value * (num1.value - num0.value) / 100,
            maxDec);
    }
    else if (nValues == 1)
    {
        result = genParse(parse);
        amount = genParse(parse);

        result = num;
    }
    else if (nValues == 0)
    {
        amount = genParse(parse);
        result = new GNumber(0);
    }


    console.assert(result);


    genPushUpdateParamValue(parse, nodeId, 'amount', amount);
    genPushUpdateParamValue(parse, nodeId, 'result', result);

    return result;
}