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
        req:               req,
        pos:               2, 
        so:                0,
        updateNodeId:      updateNodeId, 
        updateParamIndex:  updateParamIndex,
        updateParamValues: [],
        updateObjects:     [],
        nextObjectId:      0
    };

    
    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParseRequest(parse);
    

        genUpdateParamValues(updateNodeId, updateParamIndex, parse.updateParamValues);
        genUpdateObjects(parse.updateObjects);
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

    if (parse.req[parse.pos] == ACTIVE)
    {
        active = true;
        parse.pos++;
    }

    return active;
}



function genPushUpdateParamValue(parse, nodeId, paramIndex, value)
{
    const found = parse.updateParamValues.find(v => 
           v[0] == nodeId 
        && v[1] == paramIndex);

    if (!found)
        parse.updateParamValues.push([nodeId, paramIndex, value]);
    else
        console.assert(found[2] == value);
}



function genPushUpdateObject(parse, object)
{
    const found = parse.updateObjects.find(o => o.nodeId == nodeId);

    if (!found) parse.updateObjects.push(object);
    else        console.assert(found[2] == value);
}



function genUpdateParamValues(updateNodeId, updateParamIndex, updateValues)
{
    // send value updates in chunks

    const chunkSize = 20;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateValues.length)
    {
        chunk.push(
            updateValues[i][0],  // node id
            updateValues[i][1],  // param index
            updateValues[i][2]); // value

        if (++c == chunkSize)
        {
            genPostMessageToUI({ 
                cmd:    'uiUpdateParamValues',
                values: [updateNodeId, updateParamIndex, ...chunk]
            });

            chunk = [];
            c = 0;
        }

        i++;
    }

    if (chunk.length > 0)
    {
        genPostMessageToUI({ 
            cmd:    'uiUpdateParamValues',
            values: [updateNodeId, updateParamIndex, ...chunk]
        });
    }
}



function genUpdateObjects(updateObjects)
{
    // send objects in chunks

    const chunkSize = 20;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateObjects.length)
    {
        chunk.push(updateObjects[i]);

        if (++c == chunkSize)
        {
            genQueueMessageToFigma({ 
                cmd:     'figUpdateObjects',
                objects: [...chunk]
            });

            chunk = [];
            c = 0;
        }

        i++;
    }

    if (chunk.length > 0)
    {
        genQueueMessageToFigma({ 
            cmd:     'figUpdateObjects',
            objects: [...chunk]
        });
    }
}