function uiCreateNode(opType, createdId = -1, updateUI = true)
{
    let node = graph.createNode(opType, createdId);
    
    // if (graphView.selected.length > 0)
    // {
    //     const selNode = graph.nodes.find(n => n.selected);
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

        updateGraphNodes();
    }


    // uiPostMessageToGenerator({
    //     msg:     'genCreateNode',
    //     opType:   opType,
    //     nodeId:   node.id,
    //     nodeName: node.name
    // });


    return node;
}



function uiDeleteNodes(nodeIds, actionId)
{
    graph.deleteNodes(nodeIds);
    
    // uiPostMessageToGenerator({
    //     msg:     'genDeleteNodes',
    //     nodeIds:  nodeIds,
    //     actionId: actionId
    // });
    
    uiDeleteNodeObjects(nodeIds);
}



function uiUndeleteNodes(nodes, nodePos, actionId)
{
    graph.addNodes(nodes);


    graphView.selected = nodes;
    
    graphView.putNodeOnTop(lastOf(nodes));

    for (let i = 0; i < nodes.length; i++)
    {
        setNodePosition(
            nodes[i], 
            nodePos[i].x, 
            nodePos[i].y);
    }
        

    // uiPostMessageToGenerator({
    //     msg:       'genUndeleteNodes',
    //     uiActionId: actionId
    // });
}



function uiDeleteNodeObjects(nodeIds)
{
    uiPostMessageToFigma({ 
        cmd:    'figDeleteNodeObjects',
        nodeIds: nodeIds
    });

    // uiPostMessageToGenerator({
    //     cmd:    'genDeleteNodeObjects',
    //     nodeIds: nodeIds
    // });
}



function uiSetNodeId(nodeId, newId)
{
    const node = graph.nodeFromId(nodeId);

    node.id = newId;

    // uiPostMessageToGenerator({
    //     msg:   'genSetNodeId', 
    //     nodeId: nodeId,
    //     newId:  newId
    // });
}



function uiVariableConnect(outputOp, outputIndex, inputOp, inputIndex)
{
    if (inputOp._variableInputs)
    {
        const input = lastOf(inputOp.inputs);

        uiConnect(
            outputOp.outputs[outputIndex],
            input,
            inputIndex);
    }
    else
    {
        uiConnect(
            outputOp.outputs[outputIndex],
             inputOp. inputs[ inputIndex]);
    }
}



function uiConnect(output, input, inputIndex = -1)
{
    graph.connect(output, input, inputIndex);

    // uiPostMessageToGenerator({
    //     msg:     'genConnect', 
    //     outputId: output.op.id, 
    //     inputs:  
    //     [{
    //         nodeId: input.op.id, 
    //         index:  input.op.inputs.indexOf(input)
    //     }]
    // });
}



function uiDisconnect(input)
{
    graph.disconnect(input);

    // uiPostMessageToGenerator({
    //     msg: 'genDisconnect',
    //     input:
    //     {
    //         nodeId: input.op.id, 
    //         index:  input.op.inputs.indexOf(input)
    //     }
    // });
}



function uiSetParam(param, value)
{
    // uiPostMessageToGenerator({
    //     msg:   'genSetParam', 
    //     nodeId: param.op.id, 
    //     param:  param.name,
    //     value:  value
    // });
}



function uiInvalidate(node)
{
    // uiPostMessageToGenerator({
    //     msg:   'genInvalidate', 
    //     nodeId: node.id
    // });
}



function uiSetActive(node, active)
{
    // uiPostMessageToGenerator({
    //     msg:   'genSetActive', 
    //     nodeId: node.id,
    //     active: active
    // });
}



function uiMakeActive(nodeIds)
{
    for (const nodeId of nodeIds)
    {
        const node = graph.nodeFromId(nodeId);
        node.makeActive();
    }
}



function uiShowParamValue(nodeId, paramName, value)
{
    const node = graph.nodeFromId(nodeId);
            
    if (!!node) // this is for deleted nodes which still exist 
    {           // in genGraph but no longer in graph
        const param = node.params.find(p => p.name == paramName);
        param.control.setValue(value, false);
    }
}



function uiUpdateNodes(nodeIds)
{
    if (graph.mutex)
    {
        for (const nodeId of nodeIds)
            graph.deferNodeIds.push(nodeId);

        return;
    }
    

    graph.mutex = true;


    // uiPostMessageToGenerator({
    //     msg:    'genUpdateObjects',
    //     nodeIds: nodeIds
    // });
}



function uiUpdateGraph()
{
    graph.mutex = false;


    if (graph.deferNodeIds.length > 0)
    {
        let deferNodes = Array.from(graph.deferNodeIds).filter(
            (value, index, self) => self.indexOf(value) === index);
            
        graph.deferNodeIds = [];

        uiUpdateNodes(deferNodes);
    }
}



function uiUpdateObjects(objects)
{
    uiUpdateGraph();
    
    uiPostMessageToFigma({ 
        cmd:    'figUpdateObjects',
        objects: objects
    });    
}



function uiCopyNodes(nodeIds)
{
    const nodes = graph.nodes.filter(n => nodeIds.includes(n.id));
    copiedJson = nodesToJson(nodes);
    console.log(copiedJson);
}



function uiPasteNodes()
{
    console.log('paste');
}



function updateGraphNodes()
{
    for (const node of graphView.selected)      updateGraphNode(node);
    for (const node of graphView._prevSelected) updateGraphNode(node);
    for (const node of graphView.lastSelected)  updateGraphNode(node);
}



function updateGraphNode(node)
{
    node.updateNode();

    
    let boxShadow = '';

    // const selecting = 
    //        !graphView.zoomSelecting
    //     && !graphView.spaceDown;

    // if (selecting)
    // {
    //     boxShadow += 
    //           '0px 5px ' 
    //         + (node.selected ? 20 : 10)
    //         + 'px ' 
    //         + (node.selected ? '#0001' : '#00000008')
    //         + ', ';
    // } 

    boxShadow += '0 0 0 1px ' + (node.div.over ? colorStyleRgb(rgbActiveObject) : '#0001');


    node.inner.style.boxShadow = boxShadow;
}