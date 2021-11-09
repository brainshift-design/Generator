// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    var msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'uiForwardToGen': uiPostMessageToGenerator(msg.msg); break;
        case 'uiEndLoadState': uiEndLoadState          (msg);     break;
        //case 'uiUpdatePanAndZoom': graphView.updatePanAndZoom(); break;
    }    
}    
  
///////////////////////////////////////////////////////////////////////////////////////////////////



// from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'uiMakeActive':      uiMakeActive     (e.data.nodeIds);                            break;
        case 'uiShowParamValue':  uiShowParamValue (e.data.nodeId, e.data.param, e.data.value); break;
        case 'uiUpdateObjects':   uiUpdateObjects  (e.data.objects);                            break;
        case 'uiGenerateObjects': uiGenerateObjects(e.data.nodeIds);                            break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
function uiPostMessageToFigma(msg)
{
    parent.postMessage({ pluginMessage: msg }, '*');    
}



// to Generator -->
function uiPostMessageToGenerator(msg)
{
    generator.postMessage(msg);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function uiEndLoadState(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    initMenuSelect(menuSelect);
    menuSelect.initMenu();

    updateMenuSelectItems();
}



function updateMenuSelectItems()
{
    let items = 
    [
        {value: 'graph0',     text: 'Untitled'      },
        {value: 'new',        text: 'New graph'     },
        {value: 'loadLocal',  text: 'Load from file'}
    ];

    checkAddMenuItemsSave     (items);
    checkAddMenuItemProductKey(items);

    menuSelect.updateItems(items);
}



function checkAddMenuItemsSave(menuSelectItems)
{
    if (validateProductKey(currentUser.id, productKey))
    {
        menuSelectItems.push(...
        [
            {value: 'duplicate',  text: 'Duplicate'      },
            {value: 'saveLocal',  text: 'Save local copy'},
            {value: 'delete',     text: 'Delete'         } 
        ]);
    }
}



function checkAddMenuItemProductKey(menuSelectItems)
{
    if (!validateProductKey(currentUser.id, productKey))
        menuSelectItems.push({value: 'productKey', text: 'Enter product key'});
}



function removeMenuItemProductKey()
{
    let index = menuSelect.items.findIndex(item => item.value == 'productKey');
    removeAt(menuSelect.items, index);
    menuSelect.updateItems();
}



function uiNotify(text, prefix = 'Generator: ', delay = 4000)
{
    uiPostMessageToFigma({ 
        cmd:   'notify',
        text:   text,
        prefix: prefix,
        delay:  delay
    });        
}    



function uiCreateNode(opType, updateUI = true, createdId = -1)
{
    let node = uiGraph.createNode(opType, createdId);

    
    if (graphView.selected.length > 0)
    {
        const selNode = uiGraph.nodes.find(n => n.selected);
        const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

        if (   !!selNode
            && selNode.output
            && inputs.length > 0)
            uiConnect(selNode.output, inputs[0]);
    }
    

    if (updateUI)
    {
        graphView.selected = [node];
        graphView.putNodeOnTop(node);

        graphView.updateNodeTransform(node);
    }


    uiPostMessageToGenerator({
        msg:     'genCreateNode', 
        opType:   opType,
        nodeId:   node.id,
        nodeName: node.name
    });


    return node;
}



function uiDeleteNodes(nodeIds, actionId)
{
    uiGraph.deleteNodes(nodeIds);
    
    uiPostMessageToGenerator({
        msg:     'genDeleteNodes',
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


    uiPostMessageToGenerator({
        msg:       'genUndeleteNodes',
        uiActionId: actionId
    });
}



function uiDeleteNodeObjects(nodeIds)
{
    uiPostMessageToFigma({ 
        cmd:    'figDeleteNodeObjects',
        nodeIds: nodeIds
    });

    uiPostMessageToGenerator({
        cmd:    'genDeleteNodeObjects',
        nodeIds: nodeIds
    });
}



function uiSetNodeId(nodeId, newId)
{
    const node = uiGraph.nodeFromId(nodeId);

    node.id = newId;

    uiPostMessageToGenerator({
        msg:   'genSetNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}



function uiConnect(output, input)
{
    uiGraph.connect(output, input);

    uiPostMessageToGenerator({
        msg:     'genConnect', 
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

    uiPostMessageToGenerator({
        msg: 'genDisconnect',
        input:
        {
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }
    });
}



function uiSetParam(param, value)
{
    uiPostMessageToGenerator({
        msg:   'genSetParam', 
        nodeId: param.op.id, 
        param:  param.name,
        value:  value
    });
}



function uiInvalidate(node)
{
    uiPostMessageToGenerator({
        msg:   'genInvalidate', 
        nodeId: node.id
    });
}



function uiSetActive(node, active)
{
    uiPostMessageToGenerator({
        msg:   'genSetActive', 
        nodeId: node.id,
        active: active
    });
}



function uiGenerateObjects(nodeIds)
{
    if (uiGraph.mutex)
    {

        for (const nodeId of nodeIds)
            uiGraph.deferNodeIds.push(nodeId);

        return;
    }
    
    uiGraph.mutex = true;


    uiPostMessageToGenerator({
        msg:    'genGenerateObjects',
        nodeIds: nodeIds
    });
}



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
    uiPostMessageToFigma({ 
        cmd:    'figUpdateObjects',
        objects: objects
    });    


    uiGraph.mutex = false;
    

    if (uiGraph.deferNodeIds.length > 0)
    {
        var deferNodes = Array.from(uiGraph.deferNodeIds).filter(
            (value, index, self) => self.indexOf(value) === index);
            
        uiGraph.deferNodeIds = [];

        uiGenerateObjects(deferNodes);
    }
}