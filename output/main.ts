figma.showUI(__html__);


figma.ui.onmessage = msg => 
{
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);

    else if (msg.cmd === 'loadState'   ) msgLoadState(msg);
    else if (msg.cmd === 'resizeWindow') msgResizeWindow(msg);
    else if (msg.cmd === 'updateCanvas') msgUpdateCanvas(msg);
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


function msgUpdateCanvas(msg)
{
    removeGeneratedObjects();
    generateObjects(msg);
}


function removeGeneratedObjects()
{
    for (const node of figma.currentPage.children)
    {
        if (node.getPluginData('#GEN') === '#GEN')
            node.remove();
    }
}


function generateObjects(msg)
{
    for (const item of msg.data)
    {
        if (item.type == 'rect')
        {
            const rect = figma.createRectangle();
            rect.setPluginData('#GEN', '#GEN');

            rect.name  = item.id;

            rect.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

            rect.x     = item.x;
            rect.y     = item.y;

            rect.resize(
                Math.max(0.01, item.width ), 
                Math.max(0.01, item.height));

            figma.currentPage.appendChild(rect);
        }
    }
}