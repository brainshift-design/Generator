function genParseGroupNode(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const group = new GGroupNode(nodeId, options);


    // let nInputs = -1;
    
    // if (!ignore)
    // {
    //     nInputs = parseInt(parse.move());
    //     console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    // }


    if (parse.settings.logRequests) 
        logReq(group, parse, ignore);//, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, group);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    // if (nInputs == 1)
    //     cache.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, group);
    return group;
}



function genParseGroupParam(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const param = new GGroupParam(nodeId, options);


    // let nInputs = -1;
    
    // if (!ignore)
    // {
    //     nInputs = parseInt(parse.move());
    //     console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    // }


    if (parse.settings.logRequests) 
        logReq(param, parse, ignore);//, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, param);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    // if (nInputs == 1)
    //     cache.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, param);
    return param;
}
