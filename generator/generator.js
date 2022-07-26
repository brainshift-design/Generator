var lastUpdateNodeId  = '';
var lastUpdateParamId = '';
var lastUpdateValues  = [];
var lastUpdateObjects = [];



function genRequest(req, settings)
{
    //console.log('req =', req);

    const updateNodeId  = req[0];
    const updateParamId = req[1];


    const parse = new Parse(req, updateNodeId, updateParamId, settings);


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    if (settings.logRequests)
        logRequest(parse);


    const tree = parse.parsedNodes.filter(n => n.topLevel);

    for (const node of tree)
        node.eval(parse);


    // console.log('parse.updateValues = ', parse.updateValues);

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
        //console.log(nodeId+'.'+paramId);
        
        parse.updateValues.push({
            nodeId:  nodeId,
            paramId: paramId,
            type:    value.type, // needed to correctly parse '?'
            value:   value});
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
    lastUpdateNodeId  = '';
    lastUpdateParamId = '';
    lastUpdateValues  = [];
    lastUpdateObjects = [];
}



function genUpdateValuesAndObjects(updateNodeId, updateParamId, updateValues, updateObjects)
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
            valChunk.push(
                nodeIds[n],
                counts [n]);

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
        values:        [...valChunk].map(v => v ? v.toString() : '?'),
        objects:       [...objChunk]
    });

    genFigMessagePosted = true;
}