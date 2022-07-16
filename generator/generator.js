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

        scope:             [], // current parse stack
        parsed:            [], // GTypes that must be evaluated to create the value updates

        updateValues: [],
        updateParams:      [],
        updateObjects:     []
    };

    
    const stackOverflowProtect = 100;

    while (   parse.pos < parse.req.length 
           && parse.so  < stackOverflowProtect)
        genParse(parse);
    

    genUpdateValuesAndObjects(parse);
}



function genPushUpdateParamValue(parse, nodeId, paramId, gvalue)
{
    const found = parse.updateValues.find(v => 
           v.nodeId     == nodeId 
        && v.paramId    == paramId
        && v.value.type == gvalue.type);

    if (!found) 
        parse.updateValues.push({
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



function genUpdateValuesAndObjects(parse)
{
    if (   parse.updateValues .length == 0
        && parse.updateObjects.length == 0)
    {
        //console.log('restoring');
        parse.updateNodeId  = lastUpdateNodeId;
        parse.updateParamId = lastUpdateParamId;
        parse.updateValues  = lastUpdateValues;
        parse.updateObjects = lastUpdateObjects;

        clearLastUpdate();
    }
    else if (genFigMessagePosted)
    {
        //console.log('saving');
        lastUpdateNodeId  = parse.updateNodeId;
        lastUpdateParamId = parse.updateParamId;
        lastUpdateValues  = parse.updateValues;
        lastUpdateObjects = parse.updateObjects;

        return;
    }


    for (const val of parse.parsed)
        val.eval();

    // TODO
    //     eval stage
    //     GParam() should eval its reference
    //     add valid tag, only eval invalid types

    // // replace params with values
    // for (let i = 0; i < updateValues.length; i++)
    // {
    //     if (updateValues[i].value.type == PARAM)
    //     {
    //         const val = updateValues.find(v => 
    //                v.nodeId  == updateValues[i].value.nodeId
    //             && v.paramId == updateValues[i].value.paramId);

    //         console.assert(val);
    //         updateValues[i].value = val.value;
    //     }
    // }


    const nodeIds = filterUnique(parse.updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => parse.updateValues.filter(v => v.nodeId == id).length);


    // send value updates in chunks

    const approxParamChunkSize = 20;
    const objChunkSize         = 100;
    
    let n  = 0, // node
        nc = 0; // chunk size

    let o  = 0, // object
        oc = 0; // chunk size

    let nodeChunk = [],
        objChunk  = [];


    while (   o < parse.updateObjects.length 
           || n < nodeIds.length)
    {
        if (o < parse.updateObjects.length)
        {
            objChunk.push(parse.updateObjects[o++]);
            oc++;
        }


        if (n < nodeIds.length)
        {
            nodeChunk.push(
                nodeIds[n],
                counts [n]);

            const values = parse.updateValues.filter(v => v.nodeId == nodeIds[n]);
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
                updateNodeId:  parse.updateNodeId, 
                updateParamId: parse.updateParamId, 
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
            updateNodeId:  parse.updateNodeId, 
            updateParamId: parse.updateParamId, 
            values:        [...nodeChunk].map(v => v.toString()),
            objects:       [...objChunk]
        });

        genFigMessagePosted = true;
    }
}