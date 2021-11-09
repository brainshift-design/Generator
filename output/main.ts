function figDeleteNodeObjects(nodeIds)
{
    for (const nodeId of nodeIds)
    {
        if (!objNodes[nodeId]) continue;
        
        for (const obj of objNodes[nodeId])
            obj.remove();

        objNodes[nodeId] = null;
    }
}



function figDeleteAllObjects()
{
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id')) obj.remove();
}



function figUpdateObjects(msg)
{
    // prepare the buffers

    var nodeId = -1;
    var prevId = -1;
    var count  = 0;

    for (const obj of msg.objects)
    {
        count++;

        if (obj[2] != nodeId)
        {
            nodeId = obj[2];

            if (prevId > -1)
            {
                if (  !objNodes[prevId]
                    || objNodes[prevId].length != count)
                {
                    figDeleteNodeObjects([prevId]);
                    objNodes[prevId] = new Array(count).fill(null);
                }

                count = 0;
            }

            prevId = nodeId;
        }
    }

    if (   count > 0
        && (  !objNodes[nodeId]
            || objNodes[nodeId].length != count))
    {
        figDeleteNodeObjects([nodeId]);
        objNodes[nodeId] = new Array(count).fill(null);
    }


    // fill the buffers

    for (const obj of msg.objects)
    {
        switch (obj[0])
        {
            case OBJ_RECT:
            {
                if (!objNodes[obj[2]][obj[1]])
                {
                    figCreateRect(obj);
                }
                else 
                {
                    const cur = objNodes[obj[2]][obj[1]];

                    if (   cur.type == objTypeString(obj[0])
                        && cur.getPluginData('id')     == obj[1]
                        && cur.getPluginData('nodeId') == obj[2])
                        figUpdateRect(obj);

                    else
                        figNotify('Error: Object ID mismatch');
                }

                break;
            }
        }
    }
}



function figCreateFrame()
{
    let frame = figma.createFrame();

    frame.name = 'Generator';

    let tx : Paint = {type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0};
    frame.fills = [tx];

    //frame.resize(
    //    (nCols*rectSize + (nCols-1)*hgap),
    //    (nRows*rectSize + (nRows-1)*hgap));
}



function figCreateRect(obj)
{
    const rect = figma.createRectangle();

    rect.name = obj[2].toString() + ':' + obj[1].toString();

    rect.setPluginData('id',     obj[1].toString());
    rect.setPluginData('nodeId', obj[2].toString());
    rect.setPluginData('name',   rect.name);
    
    rect.x = obj[3]
    rect.y = obj[4];
    
    rect.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

    rect.resize(
        Math.max(0.01, obj[5]), 
        Math.max(0.01, obj[6]));

    rect.cornerRadius = obj[7];

    objNodes[obj[2]][obj[1]] = rect;
    figma.currentPage.appendChild(rect);
}



function figUpdateRect(obj)
{
    const rect = objNodes[obj[2]][obj[1]];

    rect.x = obj[3];
    rect.y = obj[4];

    if (   rect.width  != obj[5]
        || rect.height != obj[6])
    {
        rect.resize(
            Math.max(0.01, obj[5]), 
            Math.max(0.01, obj[6]));
    }

    rect.cornerRadius = obj[7];
}



// function updateRect(data)
// {
//     const existing = figma.currentPage.children.findIndex(obj => 
//         obj.getPluginData('#GEN') === '#GEN_' + data.itemId);

//     var rect;

//     if (existing < 0)
//     {
//         rect = figma.createRectangle()
//         rect.name  = data.itemId;
//         rect.setPluginData('#GEN', '#GEN_' + rect.name);
//         rect.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
//         rect.x     = data.x;
//         rect.y     = data.y;
    
//         figma.currentPage.appendChild(rect);
//     }    
//     else
//     {
//         rect = <RectangleNode>figma.currentPage.children[existing];

//         rect.x = data.x;
//         rect.y = data.y;
//     }    

//     if (   rect.width  != data.width
//         || rect.height != data.height)



function figOnSelectionChange()
{
    /*  Every time a selection changes, check that all objects in the object table
        still exist in the canvas. If not, remove the pointer from the object table.  
        
        NOTE: at this point I don't know if objects are deleted by the API, but then again,
        only one plugin runs at a time right now, so maybe it's not an issue.  */


    for (let i = 0; i < objNodes.length; i++)
    {
        for (let j = 0; j < objNodes[i].length; j++)
        {
            if (!objNodes[i][j]) continue;

            const exists = figma.currentPage.children.findIndex(obj => parseInt(obj.getPluginData('id')) == i);
            if (!exists) objNodes[i][j] = null;
        }
    }
}



function figOnPluginClose()
{
    figDeleteAllObjects();
}


const OBJ_RECT    = 1;

const MAX_OBJECTS = 0x10000;
const MAX_NODES   = 0x10000;

const objNodes    = new Array(MAX_NODES).fill(null);

var   minNodeId   = Number.MAX_SAFE_INTEGER;
var   maxNodeId   = Number.MIN_SAFE_INTEGER;


// const objects  = new Array(MAX_OBJECTS);
// var   maxObjId = -1;


figma.on('selectionchange', figOnSelectionChange);
figma.on('close',           figOnPluginClose);

figma.showUI(__html__);



// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////

figma.ui.onmessage = msg => 
{
    switch (msg.cmd)
    {
        case 'figLoadState':         figLoadState        (msg);                             break;
        case 'figResizeWindow':      figResizeWindow     (msg);                             break; 
        case 'figSaveLocal':         figSaveLocal        (msg.key, msg.value);              break;
        case 'figSetPluginData':     figSetPluginData    (msg.key, msg.value);              break;
        case 'figDeleteNodeObjects': figDeleteNodeObjects(msg.nodeIds);                     break; 
        case 'figUpdateObjects':     figUpdateObjects    (msg);                             break;
        case 'figNotify':            figNotify           (msg.text, msg.prefix, msg.delay); break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////



// to UI -->
function figPostMessageToUi(msg)
{
    figma.ui.postMessage(msg);
}



// to Generator -->
function figPostToGenerator(msg)
{
    figPostMessageToUi({
        cmd: 'uiForwardToGen',
        msg:  msg
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function figLoadState(msg)
{
    (async function()
    {
        // load state
        var state = await figma.clientStorage.getAsync('state');
        if (state == null) state = {};
        // ...


        // resize window
        let wndWidth  = await figma.clientStorage.getAsync('windowWidth');
        let wndHeight = await figma.clientStorage.getAsync('windowHeight');

        if (wndWidth  == null) wndWidth  = 400;
        if (wndHeight == null) wndHeight = 300;

        figma.ui.resize(
            Math.max(0, wndWidth),
            Math.max(0, wndHeight));

        // load product key
        let productKey = await figLoadLocal('productKey');
        if (productKey == null) productKey = '';


        // end load state
        figPostMessageToUi({
            cmd:        'uiEndLoadState',
            currentUser: figma.currentUser,
            productKey:  productKey });
    })();
}


async function figLoadLocal(key)
{
    return await figma.clientStorage.getAsync(key); 
}



function figSaveLocal(key, value)
{
    figma.clientStorage.setAsync(key, value); 
}



function figSetPluginData(key, value)
{
    figma.currentPage.setPluginData(key, value);
}


function figResizeWindow(msg)
{
    var width  = Math.floor(Math.max(0, msg.width ));
    var height = Math.floor(Math.max(0, msg.height));

    figma.ui.resize(width, height);

    figma.clientStorage.setAsync('windowWidth',  width);
    figma.clientStorage.setAsync('windowHeight', height);

    //figPostMessageToUi({cmd: 'uiUpdatePanAndZoom'});
}



function figNotify(text, prefix = 'Generator ', delay = 400)
{
    figma.notify(prefix + text, { timeout: delay });
}


function objTypeString(type)
{
    switch (type)
    {
        case OBJ_RECT: return 'RECTANGLE';
        // case 'VECTOR':
        // case 'LINE':
        // case 'ELLIPSE':
        // case 'POLYGON':
        // case 'STAR':
        // case 'TEXT':
        // case 'BOOLEAN_OPERATION':
    }

    return 'ERROR_TYPE';
}