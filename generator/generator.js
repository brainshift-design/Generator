function genRequest(req, settings)
{
    const updateNodeId     = req[0];
    const updateParamIndex = req[1];


    if (settings.logRequests)
        logRequest(req, updateNodeId, updateParamIndex);


    const parse = 
    {
        req:               req,
        pos:               2, 
        so:                0,
        updateNodeId:      updateNodeId, 
        updateParamIndex:  updateParamIndex,
        updateParamValues: [],
        updateObjects:     []
    };

    
    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParse(parse);
    

    genUpdateObjects    (updateNodeId, updateParamIndex, parse.updateObjects    );
    genUpdateParamValues(updateNodeId, updateParamIndex, parse.updateParamValues);
}



function genPushUpdateParamValue(parse, nodeId, paramIndex, value)
{
    const found = parse.updateParamValues.find(v => 
           v.nodeId     == nodeId 
        && v.paramIndex == paramIndex);

    if (!found) 
        parse.updateParamValues.push({
            nodeId:     nodeId, 
            paramIndex: paramIndex, 
            value:      value});

    //else console.assert(found.value == value);
}



function genPushUpdateObject(parse, nodeId, object)
{
    const found = parse.updateObjects.find(o => o.nodeId == nodeId);

    if (!found) parse.updateObjects.push(object);
    //else        console.assert(found[2] == value);
}



function genUpdateParamValues(updateNodeId, updateParamIndex, updateValues)
{
    const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


    // send value updates in chunks

    const approxChunkSize = 20;
    
    let n = 0, // node
        c = 0; // chunk size

    let chunk = [];


    while (n < nodeIds.length)
    {
        chunk.push(
            nodeIds[n],
            counts [n]);

        const values = updateValues.filter(v => v.nodeId == nodeIds[n]);

        values.sort((a, b) => a.paramIndex - b.paramIndex);

        for (const v of values)
        {
            chunk.push(v.paramIndex, v.value);
            c++;
        }

        if (c >= approxChunkSize)
        {
            genPostMessageToUI({ 
                cmd:    'uiUpdateParamValues',
                values: [updateNodeId, updateParamIndex, ...chunk]
            });

            chunk = [];
            c = 0;
        }

        n++;
    }

    if (chunk.length > 0)
    {
        genPostMessageToUI({ 
            cmd:    'uiUpdateParamValues',
            values: [updateNodeId, updateParamIndex, ...chunk]
        });
    }
}



function genUpdateObjects(updateNodeId, updateParamIndex, updateObjects)
{
    // send objects in chunks

    const chunkSize = 1000;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateObjects.length)
    {
        chunk.push(updateObjects[i]);

        if (++c == chunkSize)
        {
            genQueueMessageToFigma({ 
                cmd:             'figUpdateObjects',
                updateNodeId:     updateNodeId,
                updateParamIndex: updateParamIndex,
                objects:          [...chunk]
            });

            chunk = [];
            c     = 0;
        }

        i++;
    }

    if (chunk.length > 0)
    {
        genQueueMessageToFigma({ 
            cmd:             'figUpdateObjects',
            updateNodeId:     updateNodeId,
            updateParamIndex: updateParamIndex,
            objects:          [...chunk]
        });
    }
}