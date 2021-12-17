function uiCreateNode(opType, updateUI = true, createdId = -1)
{
    let node = uiGraph.createNode(opType, createdId);

    
    // if (graphView.selected.length > 0)
    // {
    //     const selNode = uiGraph.nodes.find(n => n.selected);
    //     const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

    //     if (   !!selNode
    //         && selNode.output
    //         && inputs.length > 0)
    //         uiConnect(selNode.output, inputs[0]);
    // }
    

    if (updateUI)
    {
        graphView.lastSelected = graphView.selected;
        graphView.selected     = [node];

        graphView.putNodeOnTop(node);
        graphView.updateNodeTransform(node);

        updateNodes();
    }


    uiPostMessageToGenerator({
        msg:     'genCreateNode',
        opType:   opType,
        nodeId:   node.id,
        nodeName: node.name
    });


    return node;
}



function uiDeleteNodes(nodeIds, actionId)
{
    uiGraph.deleteNodes(nodeIds);
    
    uiPostMessageToGenerator({
        msg:     'genDeleteNodes',
        nodeIds:  nodeIds,
        actionId: actionId
    });
    
    uiDeleteNodeObjects(nodeIds);
}



function uiUndeleteNodes(nodes, actionId)
{
    uiGraph.addNodes(nodes);


    graphView.selected = nodes;
    
    for (const node of nodes)
        graphView.updateNodeTransform(node);
    
    graphView.putNodeOnTop(lastOf(nodes));


    uiPostMessageToGenerator({
        msg:       'genUndeleteNodes',
        uiActionId: actionId
    });
}



function uiDeleteNodeObjects(nodeIds)
{
    uiPostMessageToFigma({ 
        cmd:    'figDeleteNodeObjects',
        nodeIds: nodeIds
    });

    uiPostMessageToGenerator({
        cmd:    'genDeleteNodeObjects',
        nodeIds: nodeIds
    });
}



function uiSetNodeId(nodeId, newId)
{
    const node = uiGraph.nodeFromId(nodeId);

    node.id = newId;

    uiPostMessageToGenerator({
        msg:   'genSetNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}



function uiConnect(output, input)
{
    uiGraph.connect(output, input);

    uiPostMessageToGenerator({
        msg:     'genConnect', 
        outputId: output.op.id, 
        inputs:  
        [{
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }]
    });
}



function uiDisconnect(input)
{
    uiGraph.disconnect(input);

    uiPostMessageToGenerator({
        msg: 'genDisconnect',
        input:
        {
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }
    });
}



function uiSetParam(param, value)
{
    uiPostMessageToGenerator({
        msg:   'genSetParam', 
        nodeId: param.op.id, 
        param:  param.name,
        value:  value
    });
}



function uiInvalidate(node)
{
    uiPostMessageToGenerator({
        msg:   'genInvalidate', 
        nodeId: node.id
    });
}



function uiSetActive(node, active)
{
    uiPostMessageToGenerator({
        msg:   'genSetActive', 
        nodeId: node.id,
        active: active
    });
}



function uiMakeActive(nodeIds)
{
    for (const nodeId in nodeIds)
    {
        const node = uiGraph.nodeFromId(nodeId);
        node.makeActive();
    }
}



function uiShowParamValue(nodeId, paramName, value)
{
    const node = uiGraph.nodeFromId(nodeId);
            
    if (!!node) // this is for deleted nodes which still exist 
    {           // in genGraph but no longer in uiGraph
        const param = node.params.find(p => p.name == paramName);
        param.control.setValue(value, false);
    }
}



function uiGenerateObjects(nodeIds)
{
    if (uiGraph.mutex)
    {
        for (const nodeId of nodeIds)
            uiGraph.deferNodeIds.push(nodeId);

        return;
    }
    
    uiGraph.mutex = true;


    uiPostMessageToGenerator({
        msg:    'genGenerateObjects',
        nodeIds: nodeIds
    });
}



function uiUpdateObjects(objects)
{
    uiGraph.mutex = false;
    

    if (uiGraph.deferNodeIds.length > 0)
    {
        let deferNodes = Array.from(uiGraph.deferNodeIds).filter(
            (value, index, self) => self.indexOf(value) === index);
            
        uiGraph.deferNodeIds = [];

        uiGenerateObjects(deferNodes);
    }


    uiPostMessageToFigma({ 
        cmd:    'figUpdateObjects',
        objects: objects
    });    
}



function updateNodes()
{
    for (const node of graphView.selected)      updateNode(node);
    for (const node of graphView._prevSelected) updateNode(node);
    for (const node of graphView.lastSelected) updateNode(node);
}



function updateNode(node)
{
    const selecting = 
           !graphView.zoomSelecting
        && !graphView.spaceDown;


    let boxShadow = '';

    if (selecting)
    {
        boxShadow += 
            '0px 5px ' 
            + (node.selected ? 20 : 10)
            + 'px ' 
            + (node.selected ? '#0001' : '#00000008')
            + ', ';
    } 

    boxShadow += '0 0 0 1px ' + (node.div.over ? activeObjectColor : '#00000008');


    node.inner.style.boxShadow = boxShadow;
}