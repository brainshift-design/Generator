const graph = new Graph();


function createNode(opType)
{
    const node = graph.createNode(opType);

    generator.postMessage({
        msg:    'createNode', 
        opType:  opType,
        nodeUid: node.uid,
        nodeId:  node.id
    });

    if (graphView.selected.length > 0)
    {
        const selNode = graph.nodes.find(n => n.selected);
        const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

        if (   !!selNode
            && selNode.output
            && inputs.length > 0)
            connect(selNode.output, inputs[0]);
    }
    
    graphView.selected = [node];
    graphView.putNodeOnTop(node);

    graphView.updateNodeTransform(node);
}


function deleteNodes(nodes)
{
    const nodeIds = nodes.map(n => n.uid);
    graph.deleteNodes(nodeIds);

    generator.postMessage({
        msg:    'deleteNodes',
        nodeIds: nodeIds
    });

    deleteNodeObjects(nodeIds);
}


function setNodeId(nodeId, newId)
{
    const node = graph.nodeFromId(nodeId);

    node.id = newId;

    generator.postMessage({
        msg:   'setNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}


function connect(output, input)
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


function disconnect(input, deletingOutput)
{
    graph.disconnect(input, deletingOutput);

    generator.postMessage({
        msg: 'disconnect',
        input:
        {
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }
    });
}


function setParam(param, value)
{
    generator.postMessage({
        msg:   'setParam', 
        nodeId: param.op.id, 
        param:  param.name,
        value:  value
    });
}


function invalidate(node)
{
    generator.postMessage({
        msg:   'invalidate', 
        nodeId: node.id
    });
}



function setActive(node, active)
{
    generator.postMessage({
        msg:   'setActive', 
        nodeId: node.id,
        active: active
    });
}


function deleteNodeObjects(nodeIds)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:    'deleteNodeObjects',
        nodeIds: nodeIds
    }}, '*');
}


/////////////////////////////////////////////////////////////////////


function generate(nodes)
{
    if (graph.mutex)
    {
        graph.deferNodes = [];

        for (const node of nodes)
            graph.deferNodes.push(node);

        return;
    }
    
    graph.mutex = true;
    var posted = false;

    const nodeIds = nodes.map(n => n.id);

    generator.postMessage({
        msg:    'generate',
        nodeIds: nodeIds
    });

    posted = true;


    if (!posted)
        graph.mutex = false;
}


/////////////////////////////////////////////////////////////////////


const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'makeActive':      makeActive(e.data.nodeUid); break;
        case 'showParamValue':  showParamValue(e.data.nodeId, e.data.param, e.data.value); break;
        //case 'requestGenerate': requestGenerate(nodeIds); break;
        case 'reset':           reset(); break;
        case 'updateObjects':   updateObjects(e.data.objects); break;
    }
};


function makeActive(nodeUid)
{
    const node = graph.nodeFromUid(nodeUid);
    node.makeActive();
}


function showParamValue(nodeId, paramName, value)
{
    const node = graph.nodeFromId(nodeId);
            
    if (!!node) // this is mainly for deleted nodes which still exist 
    {           // in Generator Graph but no longer in the UI Graph
        const param = node.params.find(p => p.name == paramName);
        param.control.setValue(value, false);
    }
}


// function requestGenerate(nodeIds)
// {
//     const nodes = [];

//     for (const nodeId of nodeIds)
//     {
//         const node = graph.nodes.find(n => n.id == nodeId);

//         if (!nodes.includes(node.activeNodeInTree))
//             nodes.push(node.activeNodeInTree);
//     }

//     generate(nodes);
// }


function reset()
{
    // const node = graph.nodes.find(n => n.id == e.data.nodeId);

    // generator.postMessage({
    //     cmd:   'reset',
    //     nodeId: node.activeNodeInTree.id
    // });    
}


function updateObjects(objects)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:    'updateObjects',
        objects: objects
    }}, '*');    

    graph.mutex = false;

    
    if (graph.deferNodes.length > 0)
    {
        var deferNodes = Array.from(graph.deferNodes);
        graph.deferNodes = [];

        generate(deferNodes);
    }
}