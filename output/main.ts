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

    rect.name = obj.nodeId.toString() + ':' + obj.id.toString();

    rect.setPluginData('id',     obj.id    .toString());
    rect.setPluginData('nodeId', obj.nodeId.toString());
    rect.setPluginData('name',   rect.name);
    
    rect.x = obj.x
    rect.y = obj.y;
    
    rect.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

    rect.resize(
        Math.max(0.01, obj.width), 
        Math.max(0.01, obj.height));

    rect.cornerRadius = obj.round;

    objNodes[obj.nodeId][obj.id] = rect;
    figma.currentPage.appendChild(rect);
}



function figUpdateRect(obj)
{
    const rect = objNodes[obj.nodeId][obj.id];

    rect.x = obj.x;
    rect.y = obj.y;

    if (   rect.width  != obj.width
        || rect.height != obj.height)
    {
        rect.resize(
            Math.max(0.01, obj.width), 
            Math.max(0.01, obj.height));
    }

    rect.cornerRadius = obj.round;
}



function figUpdateObjects(objects)
{
    // prepare the buffers

    let nodeId = -1;
    let prevId = -1;
    let count  =  0;

    
    for (const obj of objects)
    {
        count++;

        if (obj.nodeId != nodeId)
        {
            nodeId = obj.nodeId;

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

    for (const obj of objects)
    {
        switch (obj.type)
        {
            case OBJ_RECT:
            {
                if (!objNodes[obj.nodeId][obj.id])
                {
                    figCreateRect(obj);
                }
                else 
                {
                    const cur = objNodes[obj.nodeId][obj.id];

                    if (   cur.type == objTypeString(obj.type)
                        && cur.getPluginData('id')     == obj.id
                        && cur.getPluginData('nodeId') == obj.nodeId)
                        figUpdateRect(obj);

                    else
                        figNotify('Error: Object ID mismatch', 400, true);
                }

                break;
            }
        }
    }
}



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


function figOnSelectionChange()
{
    /*  Every time a selection changes, check that all objects in the object table
        still exist in the canvas. If not, remove the pointer from the object table.  
        
        NOTE: at this point I don't know if objects are deleted by the API, but then again,
        only one plugin runs at a time right now, so maybe it's not an issue.  */


    for (let i = 0; i < objNodes.length; i++)
    {
        if (!objNodes[i]) continue;
        
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


function figLoadState(msg)
{
    (async function()
    {
        // load state
        let state = await figma.clientStorage.getAsync('state');
        if (state == null) state = {};
        // ...


        // resize window
        let wndWidth  = await figma.clientStorage.getAsync('windowWidth');
        let wndHeight = await figma.clientStorage.getAsync('windowHeight');

        if (wndWidth  == null) wndWidth  = 800;
        if (wndHeight == null) wndHeight = 600;

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


// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////

figma.ui.onmessage = msg => 
{
    switch (msg.cmd)
    {
        case 'figLoadState':         figLoadState        (msg);                                        break;
        case 'figResizeWindow':      figResizeWindow     (msg.width, msg.height);                      break; 
        case 'figSaveLocal':         figSaveLocal        (msg.key, msg.value);                         break;
        case 'figGetPluginData':     figGetPluginData    (msg.key);                                    break;
        case 'figSetPluginData':     figSetPluginData    (msg.key, msg.value);                         break;
        case 'figDeleteNodeObjects': figDeleteNodeObjects(msg.nodeIds);                                break; 
        case 'figUpdateObjects':     figUpdateObjects    (msg.objects);                                break;
        case 'figNotify':            figNotify           (msg.text, msg.prefix, msg.delay, msg.error); break;
    }

    figPostMessageToUi({cmd: 'uiEndFigMessage'});
}

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


async function figLoadLocal(key)
{
    return await figma.clientStorage.getAsync(key); 
}



function figSaveLocal(key, value)
{
    figma.clientStorage.setAsync(key, value); 
}



function figGetPluginData(key)
{
    const data = figma.currentPage.getPluginData(key);

    figPostMessageToUi({
        cmd:  'uiGetPluginDataReturn',
        key:   key,
        value: data
    });
}



function figSetPluginData(key, value)
{
    figma.currentPage.setPluginData(key, ''); // remove possible existing values first
    figma.currentPage.setPluginData(key, value);
}



function figResizeWindow(width, height)
{
    width  = Math.floor(Math.max(0, width ));
    height = Math.floor(Math.max(0, height));

    figma.ui.resize(width, height);

    figma.clientStorage.setAsync('windowWidth',  width);
    figma.clientStorage.setAsync('windowHeight', height);


    figPostMessageToUi({cmd: 'uiEndResizeWindow'});
}



function figNotify(text, prefix = 'Generator ', delay = 400, error = false)
{
    figma.notify(
        prefix + text, 
        {
            timeout: delay,
            error:   error
        });
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