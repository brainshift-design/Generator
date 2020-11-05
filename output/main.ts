figma.showUI(__html__);


figma.ui.onmessage = msg => 
{
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);

    else if (msg.cmd === 'loadState'     ) msgLoadState     (msg);
    else if (msg.cmd === 'resizeWindow'  ) msgResizeWindow  (msg);
    else if (msg.cmd === 'removeOutput'  ) msgRemoveOutput  (msg);
    else if (msg.cmd === 'regenerateNode') msgRegenerateNode(msg);
};


function msgLoadState(msg)
{
    (async function()
    {
        // load state
        var state = await figma.clientStorage.getAsync('state');
        if (state == null) state = {};
        // ...

        // resize window
        var wndWidth  = await figma.clientStorage.getAsync('windowWidth');
        var wndHeight = await figma.clientStorage.getAsync('windowHeight');

        if (wndWidth  == null) wndWidth  = 400;
        if (wndHeight == null) wndHeight = 300;

        figma.ui.resize(
            Math.max(0, wndWidth),
            Math.max(0, wndHeight));
    })();
}


function msgResizeWindow(msg)
{
    var width  = Math.max(0, msg.width);
    var height = Math.max(0, msg.height);

    figma.ui.resize(width, height);

    figma.clientStorage.setAsync('windowWidth',  width);
    figma.clientStorage.setAsync('windowHeight', height);
}


function msgRemoveOutput(msg)
{
    removeGeneratedObjects(msg.nodeId);
}


function msgRegenerateNode(msg)
{
    regenerateObjects(msg);
}


function removeGeneratedObjects(nodeId)
{
    for (const obj of figma.currentPage.children)
    {
        if (madeByNode(obj, nodeId))
            obj.remove();
    }
}


function regenerateObjects(msg)
{
    for (const item of msg.data)
    {
        if (item.type == 'rect')
            regenerateRect(item);
    }
}


function regenerateRect(item)
{
    const existing = figma.currentPage.children.findIndex(obj => 
        obj.getPluginData('#GEN') === '#GEN_' + item.itemId);

    var rect;

    if (existing < 0)
    {
        rect = figma.createRectangle()
        rect.setPluginData('#GEN', '#GEN_' + item.itemId);
        rect.name  = item.id;
        rect.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
        rect.x     = 0;
        rect.y     = 0;
    
        figma.currentPage.appendChild(rect);
    }    
    else
    {
        rect = <RectangleNode>figma.currentPage.children[existing];

        if (!isNaN(item.x) && rect.x != item.x) rect.x = item.x;
        if (!isNaN(item.y) && rect.y != item.y) rect.y = item.y;
    }    

    if (   rect.width != item.width
        || rect.height != item.height)
    {
        rect.resize(
            Math.max(0.01, item.width ), 
            Math.max(0.01, item.height));
    }
}


function madeByNode(obj, nodeId)
{
    const tag     = obj.getPluginData('#GEN');
    const nodeTag = '#GEN_' + nodeId;

    if (nodeTag.length < tag.length) 
        return false;
    
    return tag.substring(0, nodeTag.length) === nodeTag;
}