function genParseList(parse)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const list = new GList(nodeId, options);

    
    let nValues = 0;
    
    if (!ignore)
        nValues = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReqList(list, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, list);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    for (let i = 0; i < nValues; i++)
        list.inputs.push(genParse(parse));


    parse.nTab--;

        
    genParseNodeEnd(parse, list);
    return list;
}



