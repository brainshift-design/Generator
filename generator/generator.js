var lastUpdateNodeId  = NULL;
var lastUpdateParamId = NULL;
var lastUpdateValues  = [];
var lastUpdateObjects = [];

var settings_logRequests;



function genRequest(request)
{
    settings_logRequests = request[0] == LOG;


    const updateNodeId  = request[1];
    const updateParamId = request[2];


    const parse = new Parse(
        request, 
        updateNodeId, 
        updateParamId, 
        settings);


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.request.length
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    if (settings_logRequests)
        logRequest(parse);


    const    paramNodes = parse.paramNodeIds.map(id => parse.parsedNodes.find(n => n.nodeId == id));
    const topLevelNodes = parse.parsedNodes.filter(n => n.topLevel);

    for (const node of    paramNodes) node.eval(parse);
    for (const node of topLevelNodes) node.eval(parse);


    genUpdateValuesAndObjects(
        parse.updateNodeId,
        parse.updateParamId,
        parse.updateValues,
        parse.updateObjects);
}



function genPushUpdateValue(parse, nodeId, paramId, value)
{
    const found = parse.updateValues.find(v =>
           v.nodeId     == nodeId
        && v.paramId    == paramId
        && v.value.type == value.type);

    if (!found)
    {
        parse.updateValues.push(
        {
            nodeId:  nodeId,
            paramId: paramId,
            type:    value.type, // needed to correctly parse INVALID
            value:   value
        });
    }
}



function genPushUpdateObject(parse, nodeId, object)
{
    pushUniqueExcept(
        parse.updateObjects,
        object,
        o => o.nodeId == nodeId);
}



function clearLastUpdate()
{
    lastUpdateNodeId  = NULL;
    lastUpdateParamId = NULL;
    lastUpdateValues  = [];
    lastUpdateObjects = [];
}



function genUpdateValuesAndObjects(updateNodeId, updateParamId, updateValues, updateObjects)
{
    //console.log('genUpdateValuesAndObjects()');
    //console.log('updateValues =', updateValues);

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


    const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


    // send value updates in chunks

    const approxNodeChunkSize = 20;
    const objChunkSize        = 100;

    let n  = 0, // node
        vc = 0; // chunk count

    let o  = 0, // object
        oc = 0; // chunk count

    let valChunk = [],
        objChunk = [];

    let chunkId  = 0;
        
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
            valChunk.push(nodeIds[n], counts[n]);

            const values = updateValues.filter(v => v.nodeId == nodeIds[n]);
            values.sort((a, b) => a.paramId - b.paramId);

            for (const v of values)
            {
                valChunk.push(v.paramId, v.type, v.value);
                vc++;
            }

            n++;
        }


        if (   oc == objChunkSize
            || vc >= approxNodeChunkSize)
        {
            genQueueChunk(
                updateNodeId,
                updateParamId,
                chunkId++,
                valChunk,
                objChunk);

            valChunk = [];  vc = 0;
            objChunk = [];  oc = 0;
        }
    }


    if (   valChunk.length > 0
        || objChunk.length > 0)
    {
        genQueueChunk(
            updateNodeId,
            updateParamId,
            chunkId++,
            valChunk,
            objChunk);
    }
}



function genQueueChunk(updateNodeId, updateParamId, chunkId, valChunk, objChunk)
{
    genQueueMessageToUI({
        cmd:          'uiUpdateValuesAndObjects',
        updateNodeId:  updateNodeId,
        updateParamId: updateParamId,
        chunkId:       chunkId,
        values:        [...valChunk].map(v => v ? v.toString() : INVALID),
        objects:       [...objChunk]
    });

    genFigMessagePosted = true;
}