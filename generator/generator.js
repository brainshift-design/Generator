var lastUpdateNodeId  = NULL;
var lastUpdateParamId = NULL;
var lastUpdateValues  = [];
var lastUpdateObjects = [];
var lastUpdateStyles  = [];



function genRequest(request)
{
    const actionId = parseInt(request[0]);
    const set      = parseInt(request[1]);

    const includeLxxColorSpaces = (set >> 0) & 1 != 0;
    const logRequests           = (set >> 1) & 1 != 0;


    const updateNodeId  = request[2];
    const updateParamId = request[3];


    const parse = new Parse(
        request, 
        4,
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
        if (   node instanceof GObjectBase
            && node.options.active)
        {
            node.objects.forEach(o => genPushUpdateObject(parse, o));
            node.styles .forEach(s => genPushUpdateStyle (parse, s));
        }
    }


    genUpdateValuesAndObjects(
        actionId,
        parse.updateNodeId,
        parse.updateParamId,
        parse.updateValues,
        parse.updateObjects,
        parse.updateStyles);
}



function genPushUpdateValue(parse, nodeId, paramId, value, forceUpdate = false)
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
            type:    value.type, // needed to correctly parse NAN_CHAR
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



function genPushUpdateStyle(parse, style)
{
    pushUniqueExcept(
        parse.updateStyles,
        style,
        o => o.nodeId == style.nodeId);
}



function clearLastUpdate()
{
    lastUpdateNodeId  = NULL;
    lastUpdateParamId = NULL;

    lastUpdateValues  = [];
    lastUpdateObjects = [];
    lastUpdateStyles  = [];
}



function genUpdateValuesAndObjects(actionId, updateNodeId, updateParamId, updateValues, updateObjects, updateStyles)
{
    //console.log('1 updateStyles =', [...updateStyles]);

    if (   isEmpty(updateValues )
        && isEmpty(updateObjects)
        && isEmpty(updateStyles ))
    {
        updateNodeId  = lastUpdateNodeId;
        updateParamId = lastUpdateParamId;
        updateValues  = lastUpdateValues;
        updateObjects = lastUpdateObjects;
        updateStyles  = lastUpdateStyles;

        clearLastUpdate();
    }
    else if (genFigMessagePosted)
    {
        lastUpdateNodeId  = updateNodeId;
        lastUpdateParamId = updateParamId;
        lastUpdateValues  = updateValues;
        lastUpdateObjects = updateObjects;
        lastUpdateStyles  = updateStyles;

        return;
    }

    //console.log('2 updateStyles =', [...updateStyles]);

    const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


    // send value updates in chunks

    const approxNodeChunkSize = 20;
    const objChunkSize        = 100;
    const styleChunkSize      = 20;

    
    let n  = 0; // node
    let o  = 0; // object
    let s  = 0; // style

    let nc = 0; // node cunk count
    let oc = 0; // object chunk count
    let sc = 0; // style chunk count


    let nodeValChunk   = [],
        objChunk       = [],
        styleChunk     = [];

    let nodeValChunkId = 0;
        

    while (   n < nodeIds      .length
           || o < updateObjects.length
           || s < updateStyles .length)
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


        if (s < updateStyles.length)
        {
            styleChunk.push(updateStyles[s]);
            s++, sc++;
        }


        if (   nc >= approxNodeChunkSize
            || oc == objChunkSize
            || sc == styleChunkSize)
        {
            genQueueChunk(
                actionId,
                updateNodeId,
                updateParamId,
                nodeValChunkId++,
                nodeValChunk,
                objChunk,
                styleChunk);

            nodeValChunk = [];  nc = 0;
            objChunk     = [];  oc = 0;
            styleChunk   = [];  sc = 0;
        }
    }


    if (   nodeValChunk.length > 0
        || objChunk    .length > 0
        || styleChunk  .length > 0)
    {
        genQueueChunk(
            actionId,
            updateNodeId,
            updateParamId,
            nodeValChunkId++,
            nodeValChunk,
            objChunk,
            styleChunk);
    }
}



function genQueueChunk(actionId, updateNodeId, updateParamId, nodeValChunkId, nodeValChunk, objChunk, styleChunk)
{
    genQueueMessageToUI({
        cmd:          'uiUpdateValuesAndObjects',
        actionId:      actionId,
        updateNodeId:  updateNodeId,
        updateParamId: updateParamId,
        chunkId:       nodeValChunkId,
        values:        [...nodeValChunk].map(v => v ? v.toString() : NAN_CHAR),
        objects:       [...objChunk],
        styles:        [...styleChunk]
    });

    if (   objChunk  .length > 0
        || styleChunk.length > 0)
        genFigMessagePosted = true;
}