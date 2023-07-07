function uiUpdateValuesAndObjects(requestId, actionId, updateNodeId, updateParamId, values, objects, styles, updatedNodes, totalNodes, isLastChunk)
{
    if (requestId < lastRequestedId) 
        return;
    
    lastRequestedId = -1;

        
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

    
    if (   !isEmpty(objects)
        || !isEmpty(styles)
        || isLastChunk)
    {
        if (settings.logObjectUpdates) logObjectUpdates([...objects]);
        if (settings.logStyleUpdates)  logStyleUpdates ([...styles ]);

        objects = objects.filter(o => nodeFromId(o[FO_NODE_ID]).active);

        uiQueueMessageToFigma(
        {
            cmd:          'figUpdateObjectsAndStyles',
            updateNodeId:  updateNodeId,
            updateParamId: updateParamId,
            nodeIds:       nodes.map(n => n.id),
            objects:       [...objects],
            styles:        [...styles ],
            lastChunk:     isLastChunk 
        });
    }


    if (   !graphView.loadingNodes
        && !numberControlChanging)
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
            uiSaveNodes(graph.nodes.map(n => n.id));
            graph.updatePages();
        }

        graphView.creatingNodes  = false;
        graphView.pastingNodes   = false;
        graphView.loadingNodes   = false;
        graphView.restoringNodes = false;

        actionManager.undoing    = false;
        actionManager.redoing    = false;
        

        loadingOverlay.style.display = 'none'; // for loading
    }
}