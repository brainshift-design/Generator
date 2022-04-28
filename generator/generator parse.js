// some parse functions return values
// some parse functions update values
// some parse functions update objects



/* 
    the generation request format

    no-update param nodeId ('' if n/a)
    no-update paramIndex (0 if n/a)

    generation string
*/



function genRequest(req)
{
    console.log('REQ', req);
    
    const updateNodeId     = req[0];
    const updateParamIndex = req[1];

    genParseRequest(
        req, 
        {
            pos:              2, 
            so:               0, 
            updateNodeId:     updateNodeId, 
            updateParamIndex: updateParamIndex
        });
}



function genParseRequest(req, parse)
{
    const stackOverflowProtect = 100;

    nextGenObjectId = 0;

    while (parse.pos < req.length 
        && parse.so  < stackOverflowProtect)
    {
        const next = req[parse.pos];
        //console.log('next', next);

             if (next == NUMBER   ) return genNumber   (req, parse);
        else if (next == RECTANGLE) return genRectangle(req, parse);
        else if (strIsNum(next))    return genNumValue (req, parse);
        else parse.so++;
    }

    return null;
}



function genNumValue(req, parse)
{
    // numeric values are always a value/decimals pair

    const strVal = req[parse.pos++];

    const val = parseFloat(strVal);
    const dec = getDecimalCount(strVal);

    return [val, dec];
}



function genNumber(req, parse)
{
    parse.pos++;

    const nodeId = req[parse.pos++];
    const val    = genParseRequest(req, parse);


    if (   parse.updateNodeId     != nodeId
        && parse.updateParamIndex != 0)
    {
        genPostMessageToUi({ 
            cmd:    'uiUpdateValues',
            values: [nodeId, 0, val[0], val[1]] // values are sent in index,value pairs as part of the array
        });
    }

    
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