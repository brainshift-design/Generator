const ggraph = new GGraph();


onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'createNode':  createNode(e.data.opType, e.data.nodeUid, e.data.nodeId); break; 
        case 'deleteNodes': deleteNodes(e.data.nodeIds); break;             
        case 'setNodeId':   setNodeId(e.data.nodeId, e.data.newId); break; 
        case 'setActive':   setActive(e.data.nodeId, e.data.active); break;  // only state, no regeneration
        case 'connect':     connect(e.data.outputId, e.data.inputs); break; 
        case 'disconnect':  disconnect(e.data.input); break;
        case 'setParam':    setParam(e.data.nodeId, e.data.param, e.data.value); break;
        case 'invalidate':  invalidate(e.data.nodeId); break;
        case 'generate':    generate(e.data.nodeIds); break;
    }
};


function createNode(type, uid, id)
{
    const node = ggraph.createNode(type);
    node.uid   = uid;
    node.id    = id;

    postMessage({ 
        msg:    'makeActive',
        nodeUid: node.uid
    });
}


function deleteNodes(ids)
{
    ggraph.deleteNodes(ids);
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

        generate([input.node.id]);
        //requestGenerate([input.nodeId]);
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

    generate([node.id]);
    //requestGenerate([node.id]);
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
        
    var nObjects = 0;

    for (const nodeId of nodeIds)
    {
        const node = ggraph.nodeFromId(nodeId);
        const data = node.output.getData();
        nObjects += data[1];
    }    

    
    const objects = new Array(nObjects);

    var i = 0;
    for (const nodeId of nodeIds)
    {
        const node = ggraph.nodeFromId(nodeId);
        const data = node.output.getData();
        
        const first = data[0];
        const count = data[1];
        
        for (var j = first; j < first + count; i++, j++)
            objects[i] = gObjects[j];
    }    
    
    postMessage({ 
        msg:    'updateObjects',
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