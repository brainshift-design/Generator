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
    const parse =         
    {
        req:                req,
        pos:                2, 
        so:                 0,
        updateNodeId:       updateNodeId, 
        updateParamIndex:   updateParamIndex,
        updateParamValues:  []
    };


    if (settings.logRequests)
        logRequest(parse.req);


    const updateNodeId     = parse.req[0];
    const updateParamIndex = parse.req[1];


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParseRequest(parse);
    

    genUpdateParamValues(updateNodeId, updateParamIndex, parse.updateParamValues);
}



function genParseRequest(parse)
{
    const next = parse.req[parse.pos];
        //console.log('next', next);

         if (next == NUMBER_VALUE      ) return genNumValue         (parse);
    else if (next == NUMBER            ) return genNumber           (parse);
    else if (next == NUMBER_ADD        ) return genNumberAdd        (parse);
    else if (next == NUMBER_SUBTRACT   ) return genNumberSubtract   (parse);
    else if (next == NUMBER_MULTIPLY   ) return genNumberMultiply   (parse);
    else if (next == NUMBER_DIVIDE     ) return genNumberDivide     (parse);
    else if (next == NUMBER_MODULO     ) return genNumberModulo     (parse);
    else if (next == NUMBER_EXPONENT   ) return genNumberExponent   (parse);
    else if (next == NUMBER_INTERPOLATE) return genNumberInterpolate(parse);

    else if (next == RECTANGLE         ) return genRectangle        (parse);

    parse.so++;
    return null;
}



function genActive(parse)
{
    let active = false;

    if (parse.req[parse] == ACTIVE)
    {
        active = true;
        parse.pos++;
    }

    return active;
}