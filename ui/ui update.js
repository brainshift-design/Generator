var totalObjectCount    = 0;
var objectTotalCount    = 0;
var totalObjectProgress = 1;

var objectProgressTimer = null;



function uiUpdateValuesAndObjects(requestId, actionId, updateNodeId, updateParamId, objectBatchSize, totalObjects, values, objects, styles, updatedNodes, totalNodes, isFirstChunk, isLastChunk, save)
{
    deactivateAllNodes = false;


    if (loadRestartTimer > -1)
    {
        clearTimeout(loadRestartTimer);
        loadRestartTimer = -1;
    }


    if (settings.logRawValues)  
        console.log('raw values = ', values);

    if (settings.logValueUpdates)  
        logValueUpdates(updateNodeId, updateParamId, values);


    const nodes = [];

    let i = 0;
    while (i < values.length)
    {
        const nodeId = values[i++];
        const count  = values[i++];

        const node   = nodeFromId(nodeId);


        if (node)
            pushUnique(nodes, node);


        if (count > 0)
        {
            const _ids    = [];
            const _values = [];


            for (let j = 0; j < count; j++)
            {
                const id   = values[i++];
                const type = values[i++];

                _ids.push(id);

                let value = parseValueFromType(type, values[i++]);

                if (value.nodeId)
                    value.nodeId = nodeId;
    
                _values.push(value);
            }


            if (node)
            {
                node.updateValues( 
                    requestId,
                    actionId,
                    updateNodeId == nodeId ? updateParamId : '',
                    _ids,
                    _values);

                node.valid = true;
            }
        }
    }

    
    totalObjectCount = totalObjects;
    
    if (getObjectCount(objects) > 40)
        totalObjectProgress = 0;
    else
        uiStartObjectProgress();
    
    updateObjectCountDisplay();


    if (   !isEmpty(objects)
        || !isEmpty(styles)
        || isLastChunk)
    {
        if (settings.logObjectUpdates) logObjectUpdates([...objects]);
        if (settings.logStyleUpdates ) logStyleUpdates ([...styles ]);

        objects = objects.filter(o => 
        {
            const node = nodeFromId(o[FO_NODE_ID]);
            return node && node.active;
        });


        uiQueueMessageToFigma(
        {
            cmd:            'figUpdateObjectsAndStyles',
            updateNodeId:    updateNodeId,
            updateParamId:   updateParamId,
            nodeIds:         nodes.map(n => n.id),
            objectBatchSize, objectBatchSize,
            objects:         [...objects],
            styles:          [...styles ],
            firstChunk:      isFirstChunk,
            lastChunk:       isLastChunk,
            zoomToFit:       graphView._zoomToFitObjects
        });
    }


    if (   !graphView.loadingNodes
        && !numberControlChanging
        &&  save)
        uiSaveNodes(nodes.map(n => n.id));


    for (const node of nodes)
    {
        if (   graphView.creatingNodes
            || graphView.loadingNodes
            || graphView.pastingNodes
            || graphView.restoringNodes)
            node.div.style.display = 'block';

        node.updateMeasureData();
        node.updateNode();
    }


    graphView.updateNodes(nodes);
    graphView.updateScrollWithBounds();


    if (graphView.loadingNodes)
        setLoadingProgress((0.7 + 0.3 * updatedNodes / totalNodes) / 0.7)

        
    if (isLastChunk)
    {
        if (graphView.loadingNodes)
        {
            if (save)
                uiSaveNodes(graph.nodes.map(n => n.id));
    
            graph.updatePages();
        }


        if (importZoomToNodes)
        {
            graphView.zoomToNodes(nodes);
            importZoomToNodes = false;
        }


        graphView.creatingNodes  = false;
        graphView.pastingNodes   = false;
        graphView.loadingNodes   = false;
        graphView.restoringNodes = false;

        actionManager.undoing    = false;
        actionManager.redoing    = false;
        

        loadingOverlay.style.display = 'none'; // for loading


        if (graphView._zoomToFitNodes)
        {
            for (let i = 0; i < 5; i++)
                graphView.zoomToNodes(nodes);

            graphView.selectedNodes = [];
            graphView._zoomToFitNodes = false;
        }

        graphView._zoomToFitObjects = false;


        uiUpdateAnimateNodes();
    }
}



function getObjectCount(objects)
{
    let count = 0;

    if (!isEmpty(objects))
    {
        for (const obj of objects)
        {
            switch (obj[FO_TYPE])
            {
                case SHAPE_GROUP: count += getObjectCount(obj[FO_GROUP_CHILDREN]); break;
                case FRAME:       count += getObjectCount(obj[FO_FRAME_CHILDREN]); break;
            }

            count++;
        }
    }
    
    return count;
}



function uiStartObjectProgress()
{
    if (objectProgressTimer)
        clearTimeout(objectProgressTimer);

    objectProgressTimer = setTimeout(() => 
    {
        totalObjectProgress = 0;
        updateObjectCountDisplay();

        objectProgressTimer = null;
    },
    500);
}



function uiUpdateAnimateNodes()
{
    const anims = graph.nodes.filter(n => 
           n.type == NUMBER_ANIMATE 
        && n.playing);

    anims.forEach(n => n.updatePlayback(false));

    if (anims.length > 0)
        pushUpdate(null, anims, false);
}



function uiInitGlobalProgress(requestId)
{
    commonProgressBar.style.width   = 0;
    commonProgressBar.style.display = 'block';
}



function uiUpdateGlobalProgress(progress)
{
    commonProgressBar.style.top     = (graphView.loadingNodes ? 0 : 40) + 'px';
    commonProgressBar.style.width   = (progress * 100) + '%';
    commonProgressBar.style.display = 'block';
}



function uiEndGlobalProgress()
{
    commonProgressBar.style.display = 'none';
}



function uiGetValueForGenerator(msg)
{
    switch (msg.key)
    {
        case 'curRequestId':  
        {
            uiPostMessageToGenerator(
            {
                cmd:  'returnUiGetValueForGenerator',
                key:   msg.key,
                value: curRequestId
            });

            break;
        }
    }
}



function uiGetValueForFigma(msg)
{
    switch (msg.key)
    {
        case 'returnObjectUpdate':  
        {
            if (objectProgressTimer)
            {
                clearTimeout(objectProgressTimer);
                objectProgressTimer = null;
            }


            totalObjectProgress = 
                totalObjectCount > 0
                ? msg.objectCount / totalObjectCount
                : 1;
            
            updateObjectCountDisplay();

            uiPostMessageToFigma(
            {
                cmd:  'returnUiGetValueForFigma',
                key:   msg.key,
                value: deactivateAllNodes
            });
           
            break;
        }
    }
}
