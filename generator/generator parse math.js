function genNumValue(req, parse)
{
    parse.pos++;

    return parseDec(req[parse.pos++]);
}



function genNumber(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const decimal = genParseRequest(req, parse);    
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberAdd(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];
    

    let result = 0;
    let maxDec = 0;

    for (let i = 0; i < nValues; i++)
    {
        const num = genParseRequest(req, parse);

        result += num.num;
        maxDec = Math.max(maxDec, num.dec);
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberSubtract(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(req, parse);

        result = num.num;
        maxDec = num.dec;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(req, parse);

            result -= num.num;
            maxDec = Math.max(maxDec, num.dec);
        }
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberMultiply(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];
    

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
            const num = genParseRequest(req, parse);

            result *= num.num;
            maxDec = Math.max(maxDec, num.dec);
        }
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberDivide(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(req, parse);

        result = num.num;
        maxDec = num.dec;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(req, parse);
            if (num.num == 0) { num.num = Number.NaN; break; }
            
            result /= num.num;
            maxDec = Math.max(maxDec, num.dec);
        }
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberModulo(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];
    

    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(req, parse);

        result = num.num;
        maxDec = num.dec;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(req, parse);

            if (num.num == 0) 
            { 
                result = Number.NaN; 
                maxDec = 0;
                break; 
            }

            result %= num.num;
            maxDec = Math.max(maxDec, num.dec);
        }
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberExponent(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];

    
    let result, maxDec;

    if (nValues == 0)
    {
        result = 0;
        maxDec = 0;
    }
    else
    {
        let num = genParseRequest(req, parse);

        result = num.num;
        maxDec = num.dec;

        for (let i = 1; i < nValues; i++)
        {
            num = genParseRequest(req, parse);

            result = Math.pow(result, num.num);
            maxDec = Math.max(maxDec, num.dec);
        }
    }


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}



function genNumberInterpolate(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];


    let result, maxDec;

    if (nValues == 2)
    {
        const num0 = genParseRequest(req, parse);
        const num1 = genParseRequest(req, parse);
        const amt  = genParseRequest(req, parse);

        result = num0.num + amt.num * (num1.num - num0.num) / 100;
        maxDec = Math.max(num0.dec, num1.dec);
    }
    else if (nValues == 1)
    {
        const num = genParseRequest(req, parse);

        result = num.num;
        maxDec = num.dec;

    }
    else if (nValues == 0)
    {
        result = 0;
        maxDec = 0;       
    }
    else 
        console.assert(false);


    const decimal = new Decimal(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 0, decimal.toString());

    return decimal;
}