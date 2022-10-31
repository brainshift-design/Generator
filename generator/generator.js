var lastUpdateNodeId  = NULL;
var lastUpdateParamId = NULL;
var lastUpdateValues  = [];
var lastUpdateObjects = [];


function genRequest(request)
{
    // console.log('genRequest()');
    // console.trace();


    const set = parseInt(request[0]);

    const includeLxxColorSpaces = (set >> 0) & 1 != 0;
    const logRequests           = (set >> 1) & 1 != 0;


    const updateNodeId  = request[1];
    const updateParamId = request[2];


    const parse = new Parse(
        request, 
        updateNodeId, 
        updateParamId, 
        includeLxxColorSpaces,
        logRequests);


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.request.length
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    if (logRequests)
        logRequest(parse);


    const    paramNodes = parse.paramNodeIds.map(id => parse.parsedNodes.find(n => n.nodeId == id));
    const topLevelNodes = parse.parsedNodes.filter(n => n.topLevel);

    for (const node of    paramNodes) node.eval(parse);
    for (const node of topLevelNodes) node.eval(parse);


    for (const node of parse.parsedNodes)
    {
        if (   node instanceof GShapeBase
            && node.options.active)
            node.objects.forEach(o => genPushUpdateObject(parse, o));
    }


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



function genPushUpdateObject(parse, object)
{
    pushUniqueExcept(
        parse.updateObjects,
        object,
        o => o.nodeId == object.nodeId);
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

    if (   isEmpty(updateValues )
        && isEmpty(updateObjects))
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
        // console.log('saving');
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

    
    let n  = 0;
    let o  = 0; // object

    let nc = 0; // node cunk count
    let oc = 0; // objectchunk counts


    let nodeValChunk   = [],
        objChunk       = [];

    let nodeValChunkId = 0;
        

    while (   n < nodeIds.length
           || o < updateObjects.length)
    {
        if (n < nodeIds.length)
        {
            nodeValChunk.push(nodeIds[n], counts[n]);

            const values = updateValues.filter(v => v.nodeId == nodeIds[n]);
            values.sort((a, b) => a.paramId - b.paramId);

            for (const v of values)
                nodeValChunk.push(v.paramId, v.type, v.value);

            n++, nc++;
        }


        if (o < updateObjects.length)
        {
            objChunk.push(updateObjects[o]);
            o++, oc++;
        }


        if (   nc >= approxNodeChunkSize
            || oc == objChunkSize)
        {
            genQueueChunk(
                updateNodeId,
                updateParamId,
                nodeValChunkId++,
                nodeValChunk,
                objChunk);

            nodeValChunk = [];  nc = 0;
            objChunk     = [];  oc = 0;
        }
    }


    if (   nodeValChunk.length > 0
        || objChunk.length > 0)
    {
        genQueueChunk(
            updateNodeId,
            updateParamId,
            nodeValChunkId++,
            nodeValChunk,
            objChunk);
    }
}



function genQueueChunk(updateNodeId, updateParamId, nodeValChunkId, nodeValChunk, objChunk)
{
    genQueueMessageToUI({
        cmd:          'uiUpdateValuesAndObjects',
        updateNodeId:  updateNodeId,
        updateParamId: updateParamId,
        chunkId:       nodeValChunkId,
        values:        [...nodeValChunk].map(v => v ? v.toString() : INVALID),
        objects:       [...objChunk]
    });

    if (objChunk.length > 0)
        genFigMessagePosted = true;
}