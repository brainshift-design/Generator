function genParseNumValue(parse)
{
    parse.pos++; // N

    return parseGnumVal(parse.req[parse.pos++]);
}



function genParseNumber(parse)
{
    const nodeId = genParseNumberNodeId(parse);
    parse.scope.push(nodeId);

   
    const value = genParse(parse);
    const num   = new GNumber(nodeId, value);

    
    parse.scope.pop();
    if (parse.scope.length == 0) // only top level
        pushUnique(parse.tree, num)


    return num;
}



function genParseNumberAdd(parse)
{
    const nodeId = genParseNumberNodeId(parse);
    parse.scope.push(nodeId);


    const nValues = parse.req[parse.pos++];
    const add     = new GAdd(nodeId);

    for (let i = 0; i < nValues; i++)
        add.values.push(genParse(parse));

        
    parse.scope.pop();
    if (parse.scope.length == 0) // only top level
        pushUnique(parse.tree, add)


    return add;
}



function genParseNumberSubtract(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    
    const sub = new GSubtract(nodeId);

    for (let i = 0; i < nValues; i++)
        sub.values.push(genParse(parse));

    return sub;
}



function genParseNumberMultiply(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    
    const mul = new GMultiply(nodeId);

    for (let i = 0; i < nValues; i++)
        mul.values.push(genParse(parse));

    return mul;
}



function genParseNumberDivide(parse)
{
    const nodeId  = genParseNumberNodeId(parse);
    const nValues = parse.req[parse.pos++];
    
    const div = new GDivide(nodeId);

    for (let i = 0; i < nValues; i++)
        div.values.push(genParse(parse));

    return div;
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


    const num = new GNumberValue(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 'value', num);

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


    const num = new GNumberValue(result, maxDec);
    genPushUpdateParamValue(parse, nodeId, 'value', num);

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

        result = new GNumberValue(
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
        result = new GNumberValue(0);
    }


    console.assert(result);


    genPushUpdateParamValue(parse, nodeId, 'amount', amount);
    genPushUpdateParamValue(parse, nodeId, 'value', result);

    return result;
}