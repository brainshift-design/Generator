// some parse functions return values
// some parse functions update values
// some parse functions update objects



function genParseRequest(req, parse = {pos:0, so:0})
{
    const stackOverflowProtect = 100;

    nextGenObjectId = 0;

    while (parse.pos < req.length 
        && parse.so  < stackOverflowProtect)
    {
        const next = req[parse.pos];
        //console.log('parse', next);

             if (next == NUMBER   )     genNumber   (req, parse);
        else if (next == RECTANGLE)     genRectangle(req, parse);
        else if (strIsNum(next)) return genNumValue (req, parse);
        else parse.so++;
    }
}



function genNumValue(req, parse)
{
    // values are always a value/decimals pair

    const val = parseFloat(req[parse.pos++]);

    parse.pos++; // decimals

    return val;
}



function genNumber(req, parse)
{
    parse.pos++;

    const nodeId = req[parse.pos++];
    const val    = genParseRequest(req, parse);

    genPostMessageToUi({ 
        cmd:    'uiUpdateValues',
        values: [{
            nodeId:     nodeId,
            paramIndex: 0, 
            value:      val }]
    });

    return val;
}



function genRectangle(req, parse)
{
    genPostMessageToUi({ 
        cmd:    'uiUpdateObjects',
        objects: [{
            type:   OBJ_RECT,
            id:     nextGenObjectId++,
            nodeId: req[i+1],
            x:      req[i+2],
            y:      req[i+3],
            width:  req[i+4],
            height: req[i+5],
            angle:  req[i+6],
            round:  req[i+7] }]
    });
}