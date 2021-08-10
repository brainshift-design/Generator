//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);



const uiGraph = new UGraph();



initSelect(presets,
[
    {value: '', text: 'untitled'},
]);    



parent.postMessage({ pluginMessage: 
{ 
    cmd:    'loadState',
    onLoad: 'loadState'
}}, '*');    



onmessage = e =>
{
    var msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'forwardToGen': 
            generator.postMessage(msg.msg); 
            break;

        // case 'updatePanAndZoom':    
        //     graphView.updatePanAndZoom();
        //     break;
    }    
}    



function uiNotify(text)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd: 'notify',
        text: text
    }}, '*');        
}    



function uiCreateNode(opType, node = null)
{
    if (node == null)
        node = uiGraph.createNode(opType);

    
    generator.postMessage({
        msg:     'createNode', 
        opType:   opType,
        nodeId:   node.id,
        nodeName: node.name
    });


    if (graphView.selected.length > 0)
    {
        const selNode = uiGraph.nodes.find(n => n.selected);
        const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

        if (   !!selNode
            && selNode.output
            && inputs.length > 0)
            uiConnect(selNode.output, inputs[0]);
    }
    

    graphView.selected = [node];
    graphView.putNodeOnTop(node);

    graphView.updateNodeTransform(node);


    return node;
}



function uiDeleteNodes(nodes, actionId)
{
    const nodeIds = nodes.map(n => n.id);
    uiGraph.deleteNodes(nodeIds);
    
    generator.postMessage({
        msg:     'deleteNodes',
        nodeIds:  nodeIds,
        actionId: actionId
    });
    
    uiDeleteNodeObjects(nodeIds);
}



function uiUndeleteNodes(nodes, actionId)
{
    uiGraph.addNodes(nodes);


    graphView.selected = nodes;
    
    for (const node in nodes)
        graphView.updateNodeTransform(node);
    
    graphView.putNodeOnTop(lastOf(nodes));


    generator.postMessage({
        msg:       'undeleteNodes',
        uiActionId: actionId
    });
}



function uiSetNodeId(nodeId, newId)
{
    const node = uiGraph.nodeFromId(nodeId);

    node.id = newId;

    generator.postMessage({
        msg:   'setNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}



function uiConnect(output, input)
{
    uiGraph.connect(output, input);

    generator.postMessage({
        msg:     'connect', 
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

    generator.postMessage({
        msg: 'disconnect',
        input:
        {
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }
    });
}



function uiSetParam(param, value)
{
    generator.postMessage({
        msg:   'setParam', 
        nodeId: param.op.id, 
        param:  param.name,
        value:  value
    });
}



function uiInvalidate(node)
{
    generator.postMessage({
        msg:   'invalidate', 
        nodeId: node.id
    });
}



function uiSetActive(node, active)
{
    generator.postMessage({
        msg:   'setActive', 
        nodeId: node.id,
        active: active
    });
}



function uiDeleteNodeObjects(nodeIds)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:    'deleteNodeObjects',
        nodeIds: nodeIds
    }}, '*');

    generator.postMessage({
        cmd:    'deleteNodeObjects',
        nodeIds: nodeIds
    });
}



/////////////////////////////////////////////////////////////////////



function uiGenerateObjects(nodeIds)
{
    if (uiGraph.mutex)
    {
        //uiGraph.deferNodes = [];

        for (const nodeId of nodeIds)
            uiGraph.deferNodeIds.push(nodeId);

        return;
    }
    
    uiGraph.mutex = true;


    generator.postMessage({
        msg:    'generateObjects',
        nodeIds: nodeIds
    });
}



/////////////////////////////////////////////////////////////////////



const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));



generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'makeActive':      uiMakeActive     (e.data.nodeIds);                            break;
        case 'showParamValue':  uiShowParamValue (e.data.nodeId, e.data.param, e.data.value); break;
        case 'updateObjects':   uiUpdateObjects  (e.data.objects);                            break;
        case 'generateObjects': uiGenerateObjects(e.data.nodeIds);                            break;
    }
};



/////////////////////////////////////////////////////////////////////



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
            
    if (!!node) // this is mainly for deleted nodes which still exist 
    {           // in Generator Graph but no longer in the UI Graph
        const param = node.params.find(p => p.name == paramName);
        param.control.setValue(value, false);
    }
}



function uiUpdateObjects(objects)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:    'updateObjects',
        objects: objects
    }}, '*');    

    uiGraph.mutex = false;
    

    if (uiGraph.deferNodeIds.length > 0)
    {
        var deferNodes = Array.from(uiGraph.deferNodeIds).filter(
            (value, index, self) => self.indexOf(value) === index);
            
        uiGraph.deferNodeIds = [];

        uiGenerateObjects(deferNodes);
    }
}