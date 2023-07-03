var lastRequestId      = -1;
var lastUpdateNodeId   =  NULL;
var lastUpdateParamId  =  NULL;
var lastUpdateValues   =  [];
var lastUpdateObjects  =  [];
var lastUpdateStyles   =  [];

//var stopGenerate       =  false;



function initFonts(fonts, uniqueFontNames)
{
    figFonts           = fonts;
    figUniqueFontNames = uniqueFontNames;
}



function genRequest(request)
{
    const requestId            = parseInt(request[0]);
    const actionId             = parseInt(request[1]);
    const set                  = parseInt(request[2]);

    const settings =
    {
        showAllColorSpaces:  (set >> 0) & 1 != 0,
        logRequests:         (set >> 1) & 1 != 0,
        showTransformPoints: (set >> 2) & 1 != 0
    };


    const updateNodeId         = request[3];
    const updateParamId        = request[4];

    const viewportZoom         = request[5];


    const parse = new Parse(
        request, 
        6,
        updateNodeId, 
        updateParamId, 
        viewportZoom,
        settings);


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.request.length
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    if (settings.logRequests)
        logRequest(parse);


    const    paramNodes = parse.paramNodeIds.map(id => parse.parsedNodes.find(n => n.nodeId == id));
    const topLevelNodes = parse.parsedNodes.filter(n => n.topLevel);

    (async () =>
    {
        for (const node of    paramNodes) await node.eval(parse);
        for (const node of topLevelNodes) await node.eval(parse);

        for (const node of topLevelNodes) node.pushValueUpdates(parse);

        
        for (const node of parse.parsedNodes)
        {
            if (node.options.active === true)
            {
                node.objects.forEach(o => genPushUpdateObject(parse, o));

                if (node.colorStyle) 
                    genPushUpdateColorStyle(parse, node.colorStyle);
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
    })();

    //stopGenerate = false;
}



// function genStopGenerate(msg)
// {
//     console.log('%cSTOP', 'color: white; background: #080;');
//     stopGenerate = true;
// }



function genPushUpdateValue(parse, nodeId, paramId, value)
{
    if (!value)
        return;
    
    
    removeFromArrayWhere(parse.updateValues, v =>
           v.nodeId     == nodeId
        && v.paramId    == paramId
        && v.value.type == value.type);

        
    parse.updateValues.push(
    {
        nodeId:  nodeId,
        paramId: paramId,
        type:    value.type, // needed to correctly parse NAN_DISPLAY
        value:   value.toJson()
    });
}



function genPushUpdateObject(parse, object)
{
    pushUniqueExcept(
        parse.updateObjects,
        object,
        o =>    o.nodeId   == object.nodeId
             && o.objectId == object.objectId);
}



function genPushUpdateColorStyle(parse, style)
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


    const nodeIds = filterUnique(updateValues.map(v => v.nodeId));
    const counts  = nodeIds.map(id => updateValues.filter(v => v.nodeId == id).length);


    // send updates in chunks

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
            objChunk.push(updateObjects[o].toJsonObject());
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
        values:        [...nodeValChunk].map(v => v.toString()),
        objects:       [...objChunk    ],
        styles:        [...styleChunk  ],
        updatedNodes:  updatedNodes,
        totalNodes:    totalNodes,
        isLastChunk:   isLastChunk
    });


    if (   !isEmpty(objChunk  )
        || !isEmpty(styleChunk))
        genFigMessagePosted = true;
}



function genInitNodeProgress(nodeId)
{
    genQueueMessageToUi(
    {
        cmd:   'uiInitNodeProgress',
        nodeId: nodeId
    });
}



function genUpdateNodeProgress(nodeId, progress)
{
    genQueueMessageToUi(
    {
        cmd:     'uiUpdateNodeProgress',
        nodeId:   nodeId,
        progress: progress
    });
}



                
async function genGetObjectSizeFromFigma(obj) 
{
    return new Promise((resolve, reject) => 
    {
        const timeout = 1000;

        genPostMessageToUi(
        {
            cmd: 'uiForwardToFigma',
            msg:  
            {
                cmd:   'figGetObjectSize',
                object: obj
            }
        });

        const timeoutId = setTimeout(() => 
            reject(new Error('Timeout: Result not received within the specified time')),
            timeout);

        function handleMessage(event) 
        {
            const msg = JSON.parse(event.data);

            if (msg.cmd === 'returnFigGetObjectSize') 
            {
                clearTimeout(timeoutId);
                
                const { objectId, width, height } = msg;
                resolve({ objectId, width, height });

                self.removeEventListener('message', handleMessage);
            }
        }

        self.addEventListener('message', handleMessage);
    });
}