const graph = new Graph();


function uiCreateNode(opType)
{
    const node = graph.createNode(opType);

    generator.postMessage({
        msg:     'createNode', 
        opType:   opType,
        nodeId:   node.id,
        nodeName: node.name
    });

    if (graphView.selected.length > 0)
    {
        const selNode = graph.nodes.find(n => n.selected);
        const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

        if (   !!selNode
            && selNode.output
            && inputs.length > 0)
            uiConnect(selNode.output, inputs[0]);
    }
    
    graphView.selected = [node];
    graphView.putNodeOnTop(node);

    graphView.updateNodeTransform(node);
}


function uiDeleteNodes(nodes)
{
    const nodeIds = nodes.map(n => n.id);
    graph.deleteNodes(nodeIds);

    generator.postMessage({
        msg:    'deleteNodes',
        nodeIds: nodeIds
    });

    uiDeleteNodeObjects(nodeIds);
}


function uiSetNodeId(nodeId, newId)
{
    const node = graph.nodeFromId(nodeId);

    node.id = newId;

    generator.postMessage({
        msg:   'setNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}


function uiConnect(output, input)
{
    graph.connect(output, input);

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
    graph.disconnect(input);

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
    if (graph.mutex)
    {
        //graph.deferNodes = [];

        for (const nodeId of nodeIds)
            graph.deferNodeIds.push(nodeId);

        return;
    }
    
    graph.mutex = true;


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
        case 'makeActive':      uiMakeActive(e.data.nodeId); break;
        case 'showParamValue':  uiShowParamValue(e.data.nodeId, e.data.param, e.data.value); break;
        case 'updateObjects':   uiUpdateObjects(e.data.objects); break;
        case 'generateObjects': uiGenerateObjects(e.data.nodeIds); break;
    }
};


function uiMakeActive(nodeId)
{
    const node = graph.nodeFromId(nodeId);
    node.makeActive();
}


function uiShowParamValue(nodeId, paramName, value)
{
    const node = graph.nodeFromId(nodeId);
            
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

    graph.mutex = false;
    

    if (graph.deferNodeIds.length > 0)
    {
        var deferNodes = Array.from(graph.deferNodeIds).filter(
            (value, index, self) => self.indexOf(value) === index);
            
        graph.deferNodeIds = [];

        uiGenerateObjects(deferNodes);
    }
}