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



function genParseMinMax(parse)
{
    const [nodeId, active] = genParseNodeStart(parse);
    const minmax = new GMinMax(nodeId, active);
    
    
    const nValues = parse.move();
    console.assert(nValues == 0 || nValues == 1);

    if (nValues == 1)
        minmax.input = genParse(parse);

    minmax.min = genParse(parse);
    minmax.max = genParse(parse);
    

    genParseNodeEnd(parse, minmax);
    return minmax;
}



function genParseArithmetic(parse, newNode)
{
    const [nodeId, active] = genParseNodeStart(parse);
    const arith = newNode(nodeId, active);


    const nValues = parse.move();

    for (let i = 0; i < nValues; i++)
        arith.inputs.push(genParse(parse));

        
    genParseNodeEnd(parse, arith);
    return arith;
}



function genParseInterpolate(parse)
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