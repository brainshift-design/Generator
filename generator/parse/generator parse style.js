// function genParseColorStyleValue(parse)
// {
//     parse.pos++; // COLOR_STYLE_VALUE

//     const style = parse.move();

//     if (parse.settings.logRequests) 
//         logReqStyleValue(style, parse);

//     return parseColorStyleValue(style)[0];
// }



function genParseColorStyle(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const style = new GColorStyle(nodeId, options);

    style.existing = options.existing;


    if (parse.settings.logRequests) 
        logReq(style, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, style);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    style.id    = parse.move();
    style.name  = options.nodeName;
    
    style.value = genParse(parse);

    
    parse.nTab--;

    
    style.linked = style.id != NULL;


    genParseNodeEnd(parse, style);
    return style;
}



//function genParseStyleParam(parse)
//{
    // const style = genParse(parse); 

    // if (STYLE_TYPES.includes(style.type))
    //     style.options.opacity = genParse(parse);

    // return style;
//}
