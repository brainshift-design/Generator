function genParseNumValue(parse)
{
    parse.pos++; // N

    return parseGNumberValue(parse.move());
}



function genParseNumber(parse)
{
    const [nodeId, active] = genParseNodeStart(parse);
    const num = new GNumber(nodeId, active);
    
    
    num.input = genParse(parse);


    genParseNodeEnd(parse, num);
    return num;
}



function genParseArithmetic(parse, newNode)
{
    const [nodeId, active] = genParseNodeStart(parse);
    const node = newNode(nodeId, active);


    const nValues = parse.move();

    for (let i = 0; i < nValues; i++)
        node.inputs.push(genParse(parse));

        
    genParseNodeEnd(parse, node);
    return node;
}



function genParseNumberSubtract(parse)
{
    const nodeId  = genParseNodeId(parse);
    const nValues = parse.move();
    
    const sub = new GSubtract(nodeId);

    for (let i = 0; i < nValues; i++)
        sub.values.push(genParse(parse));

    return sub;
}



function genParseNumberMultiply(parse)
{
    const nodeId  = genParseNodeId(parse);
    const nValues = parse.move();
    
    const mul = new GMultiply(nodeId);

    for (let i = 0; i < nValues; i++)
        mul.values.push(genParse(parse));

    return mul;
}



function genParseNumberDivide(parse)
{
    const nodeId  = genParseNodeId(parse);
    const nValues = parse.move();
    
    const div = new GDivide(nodeId);

    for (let i = 0; i < nValues; i++)
        div.values.push(genParse(parse));

    return div;
}



function genParseNumberModulo(parse)
{
    const nodeId  = genParseNodeId(parse);
    const nValues = parse.move();
    

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
    const nodeId  = genParseNodeId(parse);
    const nValues = parse.move();

    
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
    const [nodeId, active] = genParseNodeStart(parse);
    const inter = new GInterpolate(nodeId, active);


    const nValues = parse.move();

    if (nValues == 2)
    {
        inter.input0 = genParse(parse);
        inter.input1 = genParse(parse);
        inter.amount = genParse(parse);
    }
    else if (nValues == 1)
    {
        inter.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        inter.amount = genParse(parse);
    }
    else if (nValues == 0)
    {
        inter.amount = genParse(parse);
    }


    genParseNodeEnd(parse, inter);
    return inter;
}