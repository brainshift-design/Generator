var lastRequestId     = -1;
var lastUpdateNodeId  =  NULL;
var lastUpdateParamId =  NULL;
var lastUpdateValues  =  [];
var lastUpdateObjects =  [];
var lastUpdateStyles  =  [];



function initFonts(fonts, uniqueFontNames)
{
    figFonts           = fonts;
    figUniqueFontNames = uniqueFontNames;
}



function genRequest(request, save)
{
    const requestId       = parseInt(request[0]);
    const actionId        = parseInt(request[1]);
    const set             = parseInt(request[2]);
    const objectBatchSize = parseInt(request[3]);


    const settings =
    {
        showAllColorSpaces:  ((set >> 0) & 1) != 0,
        logRequests:         ((set >> 1) & 1) != 0,
        showTransformPoints: ((set >> 2) & 1) != 0,
        loadingNodes:        ((set >> 3) & 1) != 0,
        showTextTooltips:    ((set >> 4) & 1) != 0,
        showListTooltips:    ((set >> 5) & 1) != 0
    };


    const updateNodeId  = request[4];
    const updateParamId = request[5];

    const viewportZoom  = request[6];


    const parse = new Parse(
        request, 
        7,
        requestId,
        updateNodeId, 
        updateParamId, 
        viewportZoom,
        settings,
        save);


    const stackOverflowProtect = 100;

    while (   parse.pos < parse.request.length
           && parse.so  < stackOverflowProtect)
        genParse(parse);


    if (settings.logRequests)
        logRequest(parse);


    const paramNodes = parse.paramNodeIds
        .map(id => parse.parsedNodes.find(n => n.nodeId == id));
        //.filter(n => n !== undefined);


    const topLevelNodes = parse.parsedNodes
        .filter(n => 
                n.topLevel 
            && !paramNodes.find(_n => _n.nodeId == n.nodeId));

    const otherNodes = parse.parsedNodes.filter(n =>
               !paramNodes   .find(_n => _n.nodeId == n.nodeId)
            && !topLevelNodes.find(_n => _n.nodeId == n.nodeId));


    (async () =>
    {
        let stop = false;


        for (const nodes of [paramNodes, topLevelNodes])//, otherNodes])
        {
            for (const node of nodes)
            {
                if (await checkStop(parse.requestId)) { stop = true; break; }
                await node.eval(parse);
            }
        }


        if (    stop
            && !settings.loadingNodes)
            return;


        genQueueMessageToUi({cmd: 'uiEndGlobalProgress'});

       
        for (const nodes of [topLevelNodes, otherNodes])
            for (const node of nodes) 
                node.pushValueUpdates(parse);
        
        
        for (const node of parse.parsedNodes)
        {
            if (node.options.active === true)
            {
                if (   node.value
                    && node.value.objects)
                    node.value.objects.forEach(o => genPushUpdateObject(parse, o));

                if (node.colorStyle) 
                    genPushUpdateColorStyle(parse, node.colorStyle);
            }
        }


        for (const node of parse.parsedNodes)
        {
            if (   node.options.active === true
                && node.value)
            {
                for (const obj of node.value.objects)
                {
                    if (obj.showCenter)
                    {
                        genPushUpdateObject(
                            parse, 
                            createObjectCenter(node, obj));
                    }


                    if (    parse.settings.showTransformPoints
                        && !obj.isDeco
                        &&  obj.xp0
                        &&  obj.xp1
                        &&  obj.xp2)
                    {
                        const xp0 = clone(obj.xp0);
                        const xp1 = clone(obj.xp1);
                        const xp2 = clone(obj.xp2);
                        const xp3 = addv(xp2, subv(xp1, xp0));

                        genPushUpdateObject(
                            parse, 
                            createDecoPoly(
                                node.nodeId,
                                obj.objectId,
                                obj.objectName,
                                obj.sp0,
                                [xp0, xp2, xp3, xp1],
                                true,
                                '1, 2',
                                [12, 140, 233],
                                XFORM_SUFFIX,
                                false));
                    }
                }
            }
        }


        await genUpdateValuesAndObjects(
            parse.requestId,
            settings.loadingNodes,
            actionId,
            objectBatchSize,
            parse.updateNodeId,
            parse.updateParamId,
            parse.updateValues,
            parse.updateObjects,
            parse.updateStyles,
            save);
    })();
}



async function checkStop(requestId)
{
    const uiCurRequestId = await genGetValueFromUi('curRequestId');

    if (uiCurRequestId.value > requestId) 
    { 
        genQueueMessageToUi({cmd: 'uiEndGlobalProgress'});
        return true; 
    }

    return false
}



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
    lastUpdateNodeId  =  NULL;
    lastUpdateParamId =  NULL;

    lastUpdateValues  =  [];
    lastUpdateObjects =  [];
    lastUpdateStyles  =  [];
}



async function genUpdateValuesAndObjects(requestId, loadingNodes, actionId, objectBatchSize, updateNodeId, updateParamId, updateValues, updateObjects, updateStyles, save)
{
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

    const approxNodeChunkSize = 1000000;
    const objChunkSize        = 1000000;
    const styleChunkSize      = 1000000;

    
    let n  = 0; // node
    let o  = 0; // object
    let s  = 0; // style

    let nc = 0; // node chunk count
    let oc = 0; // object chunk count
    let sc = 0; // style chunk count


    let nodeValChunk   = [],
        objChunk       = [],
        styleChunk     = [];

    let nodeValChunkId = 0;

    let isFirstChunk   = true;
        

    genQueueMessageToUi(
    {
        cmd:      'uiInitGlobalProgress',
        requestId: requestId
    });


    let totalObjects = 0;
    updateObjects.forEach(o => totalObjects += o.getCount());

    
    while (   n < nodeIds      .length
           || o < updateObjects.length
           || s < updateStyles .length)
    {
        if (n < nodeIds.length)
        {
            nodeValChunk.push(nodeIds[n], counts[n]);

            const values = updateValues.filter(v => v.nodeId == nodeIds[n]);
            //values.sort((a, b) => a.paramId - b.paramId);

            for (const v of values)
                nodeValChunk.push(v.paramId, v.type, v.value);

            n++, nc++;
        }


        if (o < updateObjects.length)
        {
            objChunk.push(updateObjects[o].toData());
            o++, oc++;
        }


        if (s < updateStyles.length)
        {
            styleChunk.push(updateStyles[s].toData());
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
                objectBatchSize,
                totalObjects,
                nodeValChunkId++,
                nodeValChunk,
                objChunk,
                styleChunk,
                n,
                nodeIds.length,
                isFirstChunk,
                isLastChunk,
                save);

            nodeValChunk = [];  nc = 0;
            objChunk     = [];  oc = 0;
            styleChunk   = [];  sc = 0;

            isFirstChunk = false;
        }


        if (await checkStop(requestId)) 
            break;
    }


    const lastChunkNotEmpty =
           !isEmpty(nodeValChunk)
        || !isEmpty(objChunk    )
        || !isEmpty(styleChunk  );


    if (   lastChunkNotEmpty
        || loadingNodes
        ||    isEmpty(updateValues) 
           && isEmpty(updateObjects)
           && isEmpty(updateStyles))
    {
        genQueueChunk(
            requestId,
            actionId,
            updateNodeId,
            updateParamId,
            objectBatchSize,
            totalObjects,
            nodeValChunkId++,
            nodeValChunk,
            objChunk,
            styleChunk,
            nodeIds.length,
            nodeIds.length,
            false,
            true,
            save);
    }


    genQueueMessageToUi({
        cmd: 'uiForwardToFigma',
        msg: {cmd: 'figCommitUndo'}
    })
}



function genQueueChunk(requestId, actionId, updateNodeId, updateParamId, objectBatchSize, totalObjects, nodeValChunkId, nodeValChunk, objChunk, styleChunk, updatedNodes, totalNodes, isFirstChunk, isLastChunk, save)
{
    genQueueMessageToUi({
        cmd:            'uiUpdateValuesAndObjects',
        requestId:       requestId,
        actionId:        actionId,
        updateNodeId:    updateNodeId,
        updateParamId:   updateParamId,
        objectBatchSize: objectBatchSize,
        totalObjects:    totalObjects,
        chunkId:         nodeValChunkId,
        values:          [...nodeValChunk].map(v => v.toString()),
        objects:         [...objChunk    ],
        styles:          [...styleChunk  ],
        updatedNodes:    updatedNodes,
        totalNodes:      totalNodes,
        isFirstChunk:    isFirstChunk,
        isLastChunk:     isLastChunk,
        save:            save
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



function genUpdateNodeProgress(parse, nodeId, progress, updateGlobal = true)
{
    genQueueMessageToUi(
    {
        cmd:           'uiUpdateNodeProgress',
        nodeId:         nodeId,
        progress:       progress,
        globalProgress: parse.currentProgress / parse.totalProgress,
        updateGlobal:   updateGlobal
    });
}



function genEndNodeProgress(nodeId, endGlobal)
{
    genQueueMessageToUi(
    {
        cmd:      'uiEndNodeProgress',
        nodeId:    nodeId,
        endGlobal: endGlobal
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



async function genGetValueFromUi(key) 
{
    return new Promise((resolve, reject) => 
    {
        const timeout = 60000;

        genPostMessageToUi(
        {
            cmd: 'uiGetValueForGenerator',
            key:  key 
        });

        const timeoutId = setTimeout(() => 
            reject(new Error('Timeout: Result not received by Generator within the specified time')),
            timeout);

        function handleMessage(event) 
        {
            const msg = JSON.parse(event.data);

            if (msg.cmd === 'returnUiGetValueForGenerator') 
            {
                clearTimeout(timeoutId);

                resolve(
                { 
                    key:   msg.key, 
                    value: msg.value 
                });

                self.removeEventListener('message', handleMessage);
            }
        }

        self.addEventListener('message', handleMessage);
    });
}