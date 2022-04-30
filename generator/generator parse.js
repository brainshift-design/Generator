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
    //console.log('REQ', req);
    
    const updateNodeId     = req[0];
    const updateParamIndex = req[1];


    const parse =         
    {
        pos:              2, 
        so:               0, 
        updateNodeId:     updateNodeId, 
        updateParamIndex: updateParamIndex,
        updateValues:     []
    };


    const stackOverflowProtect = 100;

    while (parse.pos < req.length 
        && parse.so  < stackOverflowProtect)
    {
        genParseRequest(req, parse);
        //console.log('parse', parse);
    }
    

    genUpdateValues(
        updateNodeId,
        updateParamIndex,
        parse.updateValues);
}



function genParseRequest(req, parse)
{
    const next = req[parse.pos];
    //console.log('next', next);

         if (next == NUMBER   ) return genNumber   (req, parse);
    else if (next == RECTANGLE) return genRectangle(req, parse);
    else if (strIsNum(next))    return genNumValue (req, parse);
    
    parse.so++;
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

    parse.updateValues.push(
        nodeId, 0,       // param
        val[0], val[1]); // value
    
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