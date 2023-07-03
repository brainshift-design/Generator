function genParseGroupNode(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const group = new GGroupNode(nodeId, options);


    let nParams = -1;
    
    if (!ignore)
    {
        nParams = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(group, parse, ignore);//, nParams);


    if (ignore)
    {
        genParseNodeEnd(parse, group);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    //const nParams = parseInt(parse.move());

    for (let i = 0; i < nParams; i++)
    {
        group.paramIds.push(parse.move());
        group.params  .push(genParse(parse));
    }


    parse.nTab--;


    genParseNodeEnd(parse, group);
    return group;
}



function genParseGroupParam(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const param = new GGroupParam(nodeId, options);


    let nInputs  = -1;
    let nOutputs = -1;
    
    if (!ignore)
    {
        nInputs  = parseInt(parse.move());
        nOutputs = parseInt(parse.move());

        consoleAssert(nInputs  == 0 || nInputs  == 1,  'nInputs must be [0, 1]');
        consoleAssert(nOutputs == 0 || nOutputs == 1, 'nOutputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(param, parse, ignore);//, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, param);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
    {
        param.input    = genParse(parse);
        param.dataType = parse.move();
    }
    else if (nOutputs == 1)
        param.dataType = parse.move();


    parse.nTab--;


    genParseNodeEnd(parse, param);
    return param;
}
