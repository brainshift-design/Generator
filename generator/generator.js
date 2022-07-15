var lastUpdateNodeId  = '';
var lastUpdateParamId = '';
var lastUpdateValues  = [];
var lastUpdateObjects = [];



function genRequest(req, settings)
{
    const updateNodeId  = req[0];
    const updateParamId = req[1];


    if (settings.logRequests)
        logRequest(req, updateNodeId, updateParamId);
        

    const parse = 
    {
        req:               req,
        pos:               2, 
        so:                0,
        updateNodeId:      updateNodeId, 
        updateParamId:     updateParamId,
        updateParamValues: [],
        updateParams:      [],
        updateObjects:     []
    };

    
    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParse(parse);
    

    genUpdateParamValuesAndObjects(
        updateNodeId, 
        updateParamId, 
        parse.updateParamValues, 
        parse.updateObjects);
}



function genPushUpdateParamValue(parse, nodeId, paramId, gvalue)
{
    const found = parse.updateParamValues.find(v => 
           v.nodeId  == nodeId 
        && v.paramId == paramId);

    if (!found) 
        parse.updateParamValues.push({
            nodeId:  nodeId, 
            paramId: paramId, 
            value:   gvalue});

    //else console.assert(found.value == value);
}



function genPushUpdateObject(parse, nodeId, object)
{
    const found = parse.updateObjects.find(o => o.nodeId == nodeId);

    if (!found) parse.updateObjects.push(object);
    //else console.assert(found[2] == value);
}



function clearLastUpdate()
{
    lastUpdateNodeId  = '';
    lastUpdateParamId = -1;
    lastUpdateValues  = [];
    lastUpdateObjects = [];
}



function genUpdateParamValuesAndObjects(updateNodeId, updateParamId, updateValues, updateObjects)
{
    if (   updateValues .length == 0
        && updateObjects.length == 0)
    {
        //console.log('restoring');
        updateNodeId  = lastUpdateNodeId;
        updateParamId = lastUpdateParamId;
        updateValues  = lastUpdateValues;
        updateObjects = lastUpdateObjects;

        clearLastUpdate();
    }
    else if (genFigMessagePosted)
    {
        //console.log('saving');
        lastUpdateNodeId  = updateNodeId;
        lastUpdateParamId = updateParamId;
        lastUpdateValues  = updateValues;
        lastUpdateObjects = updateObjects;

        return;
    }


    for (let i = 0; i < updateValues.length; i++)
    {
        //console.log('updateValues[i].value', updateValues[i].value);
        if (updateValues[i].value.type == PARAM)
        {
            const val = updateValues.find(v => 
                   v.nodeId  == updateValues[i].nodeId
                && v.paramId == updateValues[i].paramId);

            console.assert(val);
            updateValues[i].value = val;
        }
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
            values.sort((a, b) => a.paramId - b.paramId);

            for (const v of values)
            {
                nodeChunk.push(v.paramId, v.value);
                nc++;
            }

            n++;
        }


        if (   oc == objChunkSize 
            || nc >= approxParamChunkSize)
        {
            genQueueMessageToUI({ 
                cmd:          'uiUpdateParamsAndObjects',
                updateNodeId:  updateNodeId, 
                updateParamId: updateParamId, 
                values:        [...nodeChunk].map(v => v.toString()),
                objects:       [...objChunk]
            });

            genFigMessagePosted = true;

            
            nodeChunk = [];  nc = 0;
            objChunk  = [];  oc = 0;
        }
    }


    if (   nodeChunk.length > 0
        ||  objChunk.length > 0)
    {
        genQueueMessageToUI({ 
            cmd:          'uiUpdateParamsAndObjects',
            updateNodeId:  updateNodeId, 
            updateParamId: updateParamId, 
            values:        [...nodeChunk].map(v => v.toString()),
            objects:       [...objChunk]
        });

        genFigMessagePosted = true;
    }
}