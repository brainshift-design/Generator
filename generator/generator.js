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
        req:           req,
        
        pos:           2, 
        so:            0,
        
        updateNodeId:  updateNodeId, 
        updateParamId: updateParamId,

        scope:         [], // current parse stack
        tree:          [], // must be evaluated to create the value updates

        updateParams:  [],
        updateValues:  [],
        updateObjects: []
    };

    
    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    for (const val of parse.tree)
        val.eval(parse);


    genUpdateValuesAndObjects(
        parse.updateNodeId,
        parse.updateParamId,
        parse.updateValues,
        parse.updateObjects);
}



function genPushUpdateParamValue(parse, nodeId, paramId, gval)
{
    const found = parse.updateValues.find(v => 
           v.nodeId     == nodeId 
        && v.paramId    == paramId
        && v.value.type == gval.type);

    if (!found) 
        parse.updateValues.push({
            nodeId:  nodeId, 
            paramId: paramId, 
            value:   gval});

    //else console.assert(found.value == value);
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