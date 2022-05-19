// some parse functions return values
// some parse functions update values
// some parse functions update objects



/* 
    the generation request format

    no-update param nodeId ('' if n/a)
    no-update paramIndex (0 if n/a)

    generation string
*/



function genRequest(req, settings)
{
    if (settings.logRequests)
        logRequest(req);


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


         if (next == NUMBER_VALUE   ) return genNumValue      (req, parse);
    else if (next == NUMBER         ) return genNumber        (req, parse);
    else if (next == NUMBER_ADD     ) return genNumberAdd     (req, parse);
    else if (next == NUMBER_SUBTRACT) return genNumberSubtract(req, parse);
    else if (next == NUMBER_MULTIPLY) return genNumberMultiply(req, parse);
    else if (next == NUMBER_DIVIDE  ) return genNumberDivide  (req, parse);
    else if (next == NUMBER_MODULO  ) return genNumberModulo  (req, parse);
    else if (next == NUMBER_EXPONENT) return genNumberExponent(req, parse);

    else if (next == RECTANGLE   ) return genRectangle(req, parse);


    parse.so++;
    return null;
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