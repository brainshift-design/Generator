const ggraph = new GGraph();


onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'createNode':  createNode(e.data.opType, e.data.nodeId); break; 
        case 'removeNodes': removeNodes(e.data.nodeIds); break;             
        case 'setNodeId':   setNodeId(e.data.nodeId, e.data.newId); break; 
        case 'setActive':   setActive(e.data.nodeId, e.data.active); break;  // only state, no regeneration
        case 'connect':     connect(e.data.outputId, e.data.inputs); break; 
        case 'disconnect':  disconnect(e.data.input); break;
        case 'setParam':    setParam(e.data.nodeId, e.data.param, e.data.value); break;
        case 'invalidate':  invalidate(e.data.nodeId); break;
        case 'generate':    generate(e.data.nodeIds); break;
    }
};


function createNode(type, id)
{
    const node = ggraph.createNode(type);
    node.id    = id;

    postMessage({ 
        msg:   'makeActive',
        nodeId: node.id
    });
}


function removeNodes(ids)
{
    ggraph.removeNodes(ids);
}


function setNodeId(id, newId)
{
    const node = ggraph.nodeFromId(id);
    node.id    = newId;
}


function setActive(nodeId, active)
{
    const node  = ggraph.nodeFromId(nodeId);
    node.active = active;
}


function connect(outputId, inputs)
{
    const outNode = ggraph.nodeFromId(outputId);

    for (const input of inputs)
    {
        const inNode = ggraph.nodeFromId(input.nodeId);

        ggraph.connect(
            outNode.output, 
            input.index >= 0
            ? inNode.inputs[input.index]
            : inNode.params.find(p => p.name == input.param).input);

        requestGenerate([input.nodeId]);
    }
}


function disconnect(input)
{
    const node = ggraph.nodeFromId(_input.nodeId);
    ggraph.disconnect(node.inputs[input.index]);
}


function setParam(nodeId, name, value)
{
    const node  = ggraph.nodeFromId(nodeId);
    const param = node.params.find(p => p.name == name);
    param.value = value;

    requestGenerate([node.id]);
}


function invalidate(nodeId)
{
    const node = ggraph.nodes.find(n => n.id == nodeId);
    node.valid = false;
}


function generate(nodeIds)
{
    for (const node of ggraph.nodes)
        node.reset();
        
    for (const nodeId of nodeIds)
    {
        const node = ggraph.nodeFromId(nodeId);
        //objects    = objects.concat(node.output.getData());
        node.output.getData(); // just for the generate() inside
    }

    postMessage({ 
        msg:    'updateObjects',
        nodeIds: e.data.nodeIds,
        objects: objects
    });
}


function requestGenerate(nodeIds)
{
    postMessage({
        msg:    'requestGenerate',
        nodeIds: nodeIds
    });
}