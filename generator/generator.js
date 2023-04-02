var lastRequestId      = -1;
var lastUpdateNodeId   =  NULL;
var lastUpdateParamId  =  NULL;
var lastUpdateValues   =  [];
var lastUpdateObjects  =  [];
var lastUpdateStyles   =  [];

//var stopGenerate       =  false;



function genRequest(request)
{
    const requestId             = parseInt(request[0]);
    const actionId              = parseInt(request[1]);
    const set                   = parseInt(request[2]);

    const showAllColorSpaces = (set >> 0) & 1 != 0;
    const logRequests           = (set >> 1) & 1 != 0;


    const updateNodeId          = request[3];
    const updateParamId         = request[4];


    const parse = new Parse(
        request, 
        5,
        updateNodeId, 
        updateParamId, 
        showAllColorSpaces,
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
            if (!!node.style) genPushUpdateStyle(parse, node.style);
        }
    }


    genUpdateValuesAndObjects(
        requestId,
        actionId,
        parse.updateNodeId,
        parse.updateParamId,
        parse.updateValues,
        parse.updateObjects,
        parse.updateStyles);


    //stopGenerate = false;
}



// function genStopGenerate(msg)
// {
//     console.log('%cSTOP', 'color: white; background: #080;');
//     stopGenerate = true;
// }



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
            type:    value.type, // needed to correctly parse NAN_DISPLAY
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
    lastRequestId     = -1;
    lastUpdateNodeId  =  NULL;
    lastUpdateParamId =  NULL;

    lastUpdateValues  =  [];
    lastUpdateObjects =  [];
    lastUpdateStyles  =  [];
}



function genUpdateValuesAndObjects(requestId, actionId, updateNodeId, updateParamId, updateValues, updateObjects, updateStyles)
{
    if (   isEmpty(updateValues )
        && isEmpty(updateObjects)
        && isEmpty(updateStyles ))
    {
        requestId     = lastRequestId;
        updateNodeId  = lastUpdateNodeId;
        updateParamId = lastUpdateParamId;
        
        updateValues  = lastUpdateValues;
        updateObjects = lastUpdateObjects;
        updateStyles  = lastUpdateStyles;

        clearLastUpdate();
    }
    else if (genFigMessagePosted)
    {
        lastRequestId     = requestId;
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


    let nodeValChunk    = [],
        objChunk        = [],
        styleChunk      = [];

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


        const chunkNotEmpty =
               nc >= approxNodeChunkSize
            || oc == objChunkSize
            || sc == styleChunkSize;


        if (chunkNotEmpty)
        {
            const isLastChunk =    
                   n >= nodeIds      .length
                && o >= updateObjects.length
                && s >= updateStyles .length
                && (   !isEmpty(nodeValChunk)
                    || !isEmpty(objChunk    )
                    || !isEmpty(styleChunk  ));

            genQueueChunk(
                requestId,
                actionId,
                updateNodeId,
                updateParamId,
                nodeValChunkId++,
                nodeValChunk,
                objChunk,
                styleChunk,
                n,
                nodeIds.length,
                isLastChunk);

            nodeValChunk = [];  nc = 0;
            objChunk     = [];  oc = 0;
            styleChunk   = [];  sc = 0;
        }
    }


    const lastChunkNotEmpty =
           !isEmpty(nodeValChunk)
        || !isEmpty(objChunk    )
        || !isEmpty(styleChunk  );


    if (lastChunkNotEmpty)
    {
        genQueueChunk(
            requestId,
            actionId,
            updateNodeId,
            updateParamId,
            nodeValChunkId++,
            nodeValChunk,
            objChunk,
            styleChunk,
            nodeIds.length,
            nodeIds.length,
            true);
    }


    genQueueMessageToUi({
        cmd: 'uiForwardToFigma',
        msg: {cmd: 'figCommitUndo'}
    })
}



function genQueueChunk(requestId, actionId, updateNodeId, updateParamId, nodeValChunkId, nodeValChunk, objChunk, styleChunk, updatedNodes, totalNodes, isLastChunk)
{
    genQueueMessageToUi({
        cmd:          'uiUpdateValuesAndObjects',
        requestId:     requestId,
        actionId:      actionId,
        updateNodeId:  updateNodeId,
        updateParamId: updateParamId,
        chunkId:       nodeValChunkId,
        values:        [...nodeValChunk].map(v => v ? v.toString() : NAN_DISPLAY),
        objects:       [...objChunk],
        styles:        [...styleChunk],
        updatedNodes:  updatedNodes,
        totalNodes:    totalNodes,
        isLastChunk:   isLastChunk
    });

    if (   !isEmpty(objChunk  )
        || !isEmpty(styleChunk))
        genFigMessagePosted = true;
}