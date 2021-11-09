const OBJ_RECT = 1;


const genGraph          = new GGraph();
const deletedNodeArrays = []; // array of [id,nodeArray,actionId] tuples



// --> from UI
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'genCreateNode':      genCreateNode     (e.data.opType,   e.data.nodeId, e.data.nodeId); break; 
        case 'genDeleteNodes':     genDeleteNodes    (e.data.nodeIds,  e.data.uiActionId);            break;             
        case 'genUndeleteNodes':   genUndeleteNodes  (e.data.uiActionId);                             break;             
        case 'genSetNodeId':       genSetNodeId      (e.data.nodeId,   e.data.newId);                 break; 
        case 'genSetActive':       genSetActive      (e.data.nodeId,   e.data.active);                break;  // only state, no regeneration
        case 'genConnect':         genConnect        (e.data.outputId, e.data.inputs);                break; 
        case 'genDisconnect':      genDisconnect     (e.data.input);                                  break;
        case 'genSetParam':        genSetParam       (e.data.nodeId,   e.data.param, e.data.value);   break;
        case 'genInvalidate':      genInvalidate     (e.data.nodeId);                                 break;
        case 'genGenerateObjects': genGenerateObjects(e.data.nodeIds);                                break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////



function genPostMessageToUi(msg)
{
    postMessage(msg); // this call is too ambiguous to understand when reading code
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genClearGraph()
{
    genGraph.clear();
}



function genCreateNode(type, id, name)
{
    const node = genGraph.createNode(type, id, name);

    genPostMessageToUi({
        msg:     'uiMakeActive',
        nodeIds: [node.id]
    });
}



function genDeleteNodes(nodeIds, uiActionId)
{
    var deleted = genGraph.deleteNodes(nodeIds);
    deletedNodeArrays.push([uiActionId, deleted]);
}



function genUndeleteNodes(uiActionId)
{
    var deleted = deletedNodeArrays.find(n => n[0] == uiActionId);
    var nodeIds = [];


    for (const node of deleted[1])
    {
        genGraph.addNode(node);
        nodeIds.push(node.id);
    }

    
    genPostMessageToUi({ 
        msg:    'uiMakeActive',
        nodeIds: nodeIds
    });

    
    removeFromArray(deletedNodeArrays, deleted);
}



function genSetNodeId(id, newId)
{
    const node = genGraph.nodeFromId(id);
    node.id    = newId;
}



function genSetActive(nodeId, active)
{
    const node  = genGraph.nodeFromId(nodeId);
    node.active = active;
}



function genConnect(outputId, inputs)
{
    const outNode = genGraph.nodeFromId(outputId);

    for (const input of inputs)
    {
        const inNode = genGraph.nodeFromId(input.nodeId);

        genGraph.connect(
            outNode.output, 
            input.index >= 0
            ? inNode.inputs[input.index]
            : inNode.params.find(p => p.name == input.param).input);

        genGenerateObjects([input.nodeId]);
    }
}



function genDisconnect(input)
{
    const node = genGraph.nodeFromId(input.nodeId);
    genGraph.disconnect(node.inputs[input.index]);
}



function genSetParam(nodeId, name, value)
{
    const node  = genGraph.nodeFromId(nodeId);
    const param = node.params.find(p => p.name == name);
    param.value = value;

    const activeId = activeNodeInTree(genGraph.nodes.find(n => n.id == node.id)).id;

    if (activeId > -1)
    {
        genPostMessageToUi({ 
            msg:    'uiGenerateObjects',
            nodeIds: [activeId]
        });
    }

    //genGenerateObjects([activeId]);
}



function genInvalidate(nodeId)
{
    const node = genGraph.nodes.find(n => n.id == nodeId);
    node.valid = false;
}



function genGenerateObjects(nodeIds)
{
    for (const node of genGraph.nodes)
        node.reset();


    // first determine number of objects

    var nObjects = 0;

    for (const nodeId of nodeIds)
    {
        const node = genGraph.nodeFromId(nodeId);
        const data = node.output.getData();
        nObjects  += data.length;
    }    

    
    // now create the objects

    const objects = new Array(nObjects);

    var i = 0;
    for (const nodeId of nodeIds)
    {
        const node = genGraph.nodeFromId(nodeId);
        const data = node.output.getData();
        
        for (const obj of data)
            objects[i++] = obj;
    }    
    
    
    genPostMessageToUi({ 
        msg:    'uiUpdateObjects',
        objects: objects
    });
}
