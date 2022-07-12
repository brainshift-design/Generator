var lastUpdateNodeId     = '';
var lastUpdateParamIndex = -1;
var lastUpdateValues     = [];
var lastUpdateObjects    = [];



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
    

    genUpdateParamValuesAndObjects(
        updateNodeId, 
        updateParamIndex, 
        parse.updateParamValues, 
        parse.updateObjects);
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



function clearLastUpdate()
{
    lastUpdateNodeId     = '';
    lastUpdateParamIndex = -1;
    lastUpdateValues     = [];
    lastUpdateObjects    = [];
}



function genUpdateParamValuesAndObjects(updateNodeId, updateParamIndex, updateValues, updateObjects)
{
    if (   updateValues .length == 0
        && updateObjects.length == 0)
    {
        //console.log('restoring');
        updateNodeId     = lastUpdateNodeId;
        updateParamIndex = lastUpdateParamIndex;
        updateValues     = lastUpdateValues;
        updateObjects    = lastUpdateObjects;

        clearLastUpdate();
    }
    else if (genFigMessagePosted)
    {
        //console.log('saving');
        lastUpdateNodeId     = updateNodeId;
        lastUpdateParamIndex = updateParamIndex;
        lastUpdateValues     = updateValues;
        lastUpdateObjects    = updateObjects;

        return;
    }


    const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


    // send value updates in chunks

    const approxParamChunkSize = 20;
    const objChunkSize         = 100;
    
    let n  = 0, // node
        nc = 0; // chunk size

    let o  = 0, // object
        oc = 0; // chunk size

    let nodeChunk = [],
        objChunk  = [];


    while (   o < updateObjects.length 
           || n < nodeIds.length)
    {
        if (o < updateObjects.length)
        {
            objChunk.push(updateObjects[o++]);
            oc++;
        }


        if (n < nodeIds.length)
        {
            nodeChunk.push(
                nodeIds[n],
                counts [n]);

            const values = updateValues.filter(v => v.nodeId == nodeIds[n]);
            values.sort((a, b) => a.paramIndex - b.paramIndex);

            for (const v of values)
            {
                nodeChunk.push(v.paramIndex, v.value);
                nc++;
            }

            n++;
        }


        if (   oc == objChunkSize 
            || nc >= approxParamChunkSize)
        {
            genQueueMessageToUI({ 
                cmd:             'uiUpdateParamsAndObjects',
                updateNodeId:     updateNodeId, 
                updateParamIndex: updateParamIndex, 
                values:           [...nodeChunk],
                objects:          [...objChunk]
            });

            nodeChunk = [];  nc = 0;
            objChunk  = [];  oc = 0;
        }
    }


    if (   nodeChunk.length > 0
        ||  objChunk.length > 0)
    {
        genQueueMessageToUI({ 
            cmd:             'uiUpdateParamsAndObjects',
            updateNodeId:     updateNodeId, 
            updateParamIndex: updateParamIndex, 
            values:           [...nodeChunk],
            objects:          [...objChunk]
        });
    }


    genFigMessagePosted = true;
}



// function genUpdateParamValues(updateNodeId, updateParamIndex, updateValues)
// {
//     const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
//     const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


//     // send value updates in chunks

//     const approxParamChunkSize = 20;
    
//     let n  = 0, // node
//         nc = 0; // chunk size

//     let chunk = [];


//     while (n < nodeIds.length)
//     {
//         chunk.push(
//             nodeIds[n],
//             counts [n]);

//         const values = updateValues.filter(v => v.nodeId == nodeIds[n]);

//         values.sort((a, b) => a.paramIndex - b.paramIndex);

//         for (const v of values)
//         {
//             chunk.push(v.paramIndex, v.value);
//             nc++;
//         }

//         if (nc >= approxParamChunkSize)
//         {
//             genPostMessageToUI({ 
//                 cmd:    'uiUpdateParams',
//                 values: [updateNodeId, updateParamIndex, ...chunk]
//             });

//             chunk = [];
//             nc = 0;
//         }

//         n++;
//     }

//     if (chunk.length > 0)
//     {
//         genPostMessageToUI({ 
//             cmd:    'uiUpdateParams',
//             values: [updateNodeId, updateParamIndex, ...chunk]
//         });
//     }
// }



// function genUpdateObjects(updateNodeId, updateParamIndex, updateObjects)
// {
//     // send objects in chunks

//     const chunkSize = 100;
    
//     let o  = 0, 
//         oc = 0;
    
//     let chunk = [];
    
//     while (o < updateObjects.length)
//     {
//         chunk.push(updateObjects[o]);

//         if (++oc == chunkSize)
//         {
//             genQueueMessageToFigma({ 
//                 cmd:             'figUpdateObjects',
//                 updateNodeId:     updateNodeId,
//                 updateParamIndex: updateParamIndex,
//                 objects:          [...chunk]
//             });

//             chunk = [];
//             oc     = 0;
//         }

//         o++;
//     }

//     if (chunk.length > 0)
//     {
//         genQueueMessageToFigma({ 
//             cmd:             'figUpdateObjects',
//             updateNodeId:     updateNodeId,
//             updateParamIndex: updateParamIndex,
//             objects:          [...chunk]
//         });
//     }
// }