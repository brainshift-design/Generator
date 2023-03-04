function genParseCustom(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const custom = new GCustom(nodeId, options);


    // let nInputs = -1;
    
    // if (!ignore)
    // {
    //     nInputs = parseInt(parse.move());
    //     console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    // }


    if (parse.settings.logRequests) 
        logReq(custom, parse, ignore);//, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, custom);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    // if (nInputs == 1)
    //     cache.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, custom);
    return custom;
}



function genParseCustomInputs(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const custIn = new GCustomInputs(nodeId, options);


    // let nInputs = -1;
    
    // if (!ignore)
    // {
    //     nInputs = parseInt(parse.move());
    //     console.assert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    // }


    if (parse.settings.logRequests) 
        logReq(custIn, parse, ignore);//, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, custIn);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    // if (nInputs == 1)
    //     cache.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, custIn);
    return custIn;
}
