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
    {
        console.log(
            '%c%s', 
            'background: #60aa60; color: #fff', 
            JSON.stringify(req)
                .replaceAll('""', '\'\'')
                .replaceAll('"', '')
                .replaceAll('[', '')
                .replaceAll(']', '')
                .replaceAll(',', ' '));
    }


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

         if (next == NUMBER_VALUE) return genNumValue (req, parse);
    else if (next == NUMBER      ) return genNumber   (req, parse);
    else if (next == NUMBER_ADD  ) return genNumberAdd(req, parse);

    else if (next == RECTANGLE   ) return genRectangle(req, parse);
    

    parse.so++;
    return null;
}



function genNumValue(req, parse)
{
    parse.pos++;

    return parseDec(req[parse.pos++]);
}



function genNumber(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const decimal = genParseRequest(req, parse);

    parse.updateValues.push(
        nodeId, 0,           // param
        decimal.toString()); // value

    return decimal;
}



function genNumberAdd(req, parse)
{
    parse.pos++;

    const nodeId  = req[parse.pos++];
    const nValues = req[parse.pos++];

    let result = 0;
    let maxDec = 0;

    for (let i = 0; i < nValues; i++)
    {
        const num = genParseRequest(req, parse);

        result += num.num;
        maxDec = Math.max(maxDec, num.dec);
    }

    const decimal = new Decimal(result, maxDec);

    parse.updateValues.push(
        nodeId, 0,           // param
        decimal.toString()); // value
    
    return decimal;
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