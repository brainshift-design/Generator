function uiCreateNode(opType, creatingButton, createdId = -1, updateUI = true)
{
    let node = createNode(opType, creatingButton, createdId);
    
    graph.addNode(node);
    
    uiSaveNodes([node.id]);


    // if (graphView.selectedNodes.length > 0)
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
        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];

        //node.pushUpdate();
        
        //graphView.putNodeOnTop(node);
        //graphView.updateNodeTransform(node);

        //updateGraphNodes();
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
    
    uiRemoveSavedNodes(nodeIds);


    // uiPostMessageToGenerator({
    //     msg:     'genDeleteNodes',
    //     nodeIds:  nodeIds,
    //     actionId: actionId
    // });
    
    uiDeleteNodeObjects(nodeIds);
}



// function uiUndeleteNodes(nodes, nodePos, actionId)
// {
//     graph.addNodes(nodes);


//     graphView.selectedNodes = nodes;
    
//     graphView.putNodeOnTop(lastOf(nodes));

//     for (let i = 0; i < nodes.length; i++)
//     {
//         setNodePosition(
//             nodes[i], 
//             nodePos[i].x, 
//             nodePos[i].y);
//     }
        

//     // uiPostMessageToGenerator({
//     //     msg:       'genUndeleteNodes',
//     //     uiActionId: actionId
//     // });
// }



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
    const node = nodeFromId(nodeId);

    node.id = newId;

    // uiPostMessageToGenerator({
    //     msg:   'genSetNodeId', 
    //     nodeId: nodeId,
    //     newId:  newId
    // });
}



function uiVariableConnect(outputOp, outputIndex, inputOp, inputIndex)
{
    //console.log('uiVariableConnect()');
    
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
    const conn = graph.connect(output, input, inputIndex);

    uiSaveConnection(
        output.op.id,
        output.op.outputs.indexOf(output), 
        input.op.id,
        input.op.inputs.indexOf(input),
        conn.toJson());

    // uiPostMessageToGenerator({
    //     msg:     'genConnect', 
    //     outputId: output.op.id, 
    //     inputs:  
    //     [{
    //         nodeId: input.op.id, 
    //         index:  input.op.inputs.indexOf(input)
    //     }]
    // });

    return conn;
}



function uiDisconnect(input)
{
    uiRemoveSavedConnection(
        input.connectedOutput.op.id,
        input.connectedOutput.op.outputs.indexOf(input.connectedOutput), 
        input.op.id,
        input.op.inputs.indexOf(input));

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
        const node = nodeFromId(nodeId);
        node.makeActive();
    }
}



function uiShowParamValue(nodeId, paramName, value)
{
    const node = nodeFromId(nodeId);
            
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
    const nodes      = graph.nodes.filter(n => nodeIds.includes(n.id));
    const copiedJson = nodesToJson(nodes, true, false);

    //log(copiedJson);

    return copiedJson;
}



function uiPasteNodes(nodesJson, pasteOutsideConnections)
{
    graphView.loadingNodes = true;


    pasteOffset[0] += pasteOffsetDelta[0];
    pasteOffset[1] += pasteOffsetDelta[1];


    const data  = JSON.parse(nodesJson);


    // offset new nodes (must be done before loading)
    for (let i = 0; i < data.nodes.length; i++)
    {
        data.nodes[i].x = parseFloat(data.nodes[i].x) + pasteOffset[0] / graphView.zoom;
        data.nodes[i].y = parseFloat(data.nodes[i].y) + pasteOffset[1] / graphView.zoom;
    }

    
    const nodes = loadNodes(data);

    // get the new names of the nodes after they've been added
    for (let i = 0; i < nodes.length; i++)
    {
        graph.addNode(nodes[i], false);
        data.nodes[i].newId = nodes[i].id;
    }
    
    if (data.connections)
    {
        correctNodeNamesInConnections(data);
        loadConnections(data, pasteOutsideConnections);
    }
    
    graphView.selectedNodes = nodes;
    
    graphView.loadingNodes = false;
    return nodes;
}



function correctNodeNamesInConnections(data)
{
    for (let i = 0; i < data.connections.length; i++)
    {
        const _conn = data.connections[i];

        let outputOpIndex = data.nodes.findIndex(n => n.id == _conn.outputOp);
        if (outputOpIndex > -1) data.connections[i].outputOp = data.nodes[outputOpIndex].newId;

        const inputOpIndex = data.nodes.findIndex(n => n.id == _conn. inputOp);
        data.connections[i].inputOp = data.nodes[inputOpIndex].newId;
    }
}



function updateGraphNodes()
{
    for (const node of graphView.selectedNodes)      node.updateNode();
    for (const node of graphView._prevSelectedNodes) node.updateNode();
    for (const node of graphView.lastSelectedNodes)  node.updateNode();
}



function uiSaveNodes(nodeIds)
{
    const nodes    = graph.nodes.filter(n => nodeIds.includes(n.id));
    const nodeJson = [];

    for (const node of nodes)
        nodeJson.push(node.toJson());

    uiPostMessageToFigma({
        cmd:     'figSaveNodes',
        nodeIds:  nodeIds,
        nodeJson: nodeJson
    });
}



function uiRemoveSavedNodes(nodeIds)
{
    uiPostMessageToFigma({
        cmd:    'figRemoveSavedNodes',
        nodeIds: nodeIds
    });
}



function uiSaveConnection(outputOpId, outputIndex, inputOpId, inputIndex, connJson)
{
    uiPostMessageToFigma({
        cmd: 'figSaveConnection',
        name: outputOpId  + ' ' 
            + outputIndex + ' ' 
            + inputOpId   + ' ' 
            + inputIndex,
        json: connJson
    });
}



function uiRemoveSavedConnection(outputOpId, outputIndex, inputOpId, inputIndex)
{
    uiPostMessageToFigma({
        cmd: 'figRemoveSavedConnection',
        name: outputOpId  + ' ' 
            + outputIndex + ' ' 
            + inputOpId   + ' ' 
            + inputIndex
    });
}