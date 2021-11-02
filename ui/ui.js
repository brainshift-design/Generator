//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);


var currentUser = '';



const uiGraph = new UGraph();



initMenuSelect(menuSelect,
[
    {value: 'graph0',     text: 'Untitled'},
    {value: 'new',        text: 'New graph'},
    {value: 'loadLocal',  text: 'Load from file'},
    {value: 'duplicate',  text: 'Duplicate'},
    {value: 'saveLocal',  text: 'Save local copy'},
    {value: 'delete',     text: 'Delete'},
    {value: 'productKey', text: 'Enter product key'}
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

        case 'loadState':
            currentUser = msg.currentUser;
            break;

        // case 'updatePanAndZoom':    
        //     graphView.updatePanAndZoom();
        //     break;
    }    
}    



function uiNotify(text, prefix = 'Generator: ', delay = 4000)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:   'notify',
        text:   text,
        prefix: prefix,
        delay:  delay
    }}, '*');        
}    



function uiCreateNode(opType, createdId = -1)
{
    var node = uiGraph.createNode(opType, createdId);

    
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



function uiDeleteNodes(nodeIds, actionId)
{
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
    
    for (const node of nodes)
        graphView.updateNodeTransform(node);
    
    graphView.putNodeOnTop(lastOf(nodes));


    generator.postMessage({
        msg:       'undeleteNodes',
        uiActionId: actionId
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



/////////////////////////////////////////////////////////////////////



function uiGenerateObjects(nodeIds)
{
    if (uiGraph.mutex)
    {

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
            
    if (!!node) // this is for deleted nodes which still exist 
    {           // in genGraph but no longer in uiGraph
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



function strFromData(data)
{
    var str = '';

    for (var i = 0; i < data.length; i++)
        str += String.fromCharCode(data[si]);

    return str;
}