const OBJ_RECT = 1;


const ggraph = new GGraph();


onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'createNode':      genCreateNode     (e.data.opType, e.data.nodeId, e.data.nodeId); break; 
        case 'deleteNodes':     genDeleteNodes    (e.data.nodeIds); break;             
        case 'setNodeId':       genSetNodeId      (e.data.nodeId, e.data.newId); break; 
        case 'setActive':       genSetActive      (e.data.nodeId, e.data.active); break;  // only state, no regeneration
        case 'connect':         genConnect        (e.data.outputId, e.data.inputs); break; 
        case 'disconnect':      genDisconnect     (e.data.input); break;
        case 'setParam':        genSetParam       (e.data.nodeId, e.data.param, e.data.value); break;
        case 'invalidate':      genInvalidate     (e.data.nodeId); break;
        case 'generateObjects': genGenerateObjects(e.data.nodeIds); break;
    }
};


function genCreateNode(type, id, name)
{
    const node = ggraph.createNode(type);

    node.id    = id;
    node.name  = name;

    postMessage({ 
        msg:    'makeActive',
        nodeId:  node.id
    });
}


function genDeleteNodes(nodeIds)
{
    ggraph.deleteNodes(nodeIds);
}


function genSetNodeId(id, newId)
{
    const node = ggraph.nodeFromId(id);
    node.id    = newId;
}


function genSetActive(nodeId, active)
{
    const node  = ggraph.nodeFromId(nodeId);
    node.active = active;
}


function genConnect(outputId, inputs)
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

        genGenerateObjects([input.nodeId]);
    }
}


function genDisconnect(input)
{
    const node = ggraph.nodeFromId(input.nodeId);
    ggraph.disconnect(node.inputs[input.index]);
}


function genSetParam(nodeId, name, value)
{
    const node  = ggraph.nodeFromId(nodeId);
    const param = node.params.find(p => p.name == name);
    param.value = value;

    const activeId = activeNodeInTree(ggraph.nodes.find(n => n.id == node.id)).id;

    if (activeId > -1)
    {
        postMessage({ 
            msg:    'generateObjects',
            nodeIds: [activeId]
        });
    }

    //genGenerateObjects([activeId]);
}


function genInvalidate(nodeId)
{
    const node = ggraph.nodes.find(n => n.id == nodeId);
    node.valid = false;
}


function genGenerateObjects(nodeIds)
{
    for (const node of ggraph.nodes)
        node.reset();
        

    // first determine number of objects

    var nObjects = 0;

    for (const nodeId of nodeIds)
    {
        const node = ggraph.nodeFromId(nodeId);
        const data = node.output.getData();
        nObjects  += data.length;
    }    

    
    // now create the objects

    const objects = new Array(nObjects);

    var i = 0;
    for (const nodeId of nodeIds)
    {
        const node = ggraph.nodeFromId(nodeId);
        const data = node.output.getData();
        
        for (const obj of data)
            objects[i++] = obj;
    }    
    
    
    postMessage({ 
        msg:    'updateObjects',
        objects: objects
    });
}
