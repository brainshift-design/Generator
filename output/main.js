var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nodeTag = 'G_NODE';
const connTag = 'G_CONN';
const MAX_OBJECTS = 0x10000;
const genObjects = new Array(MAX_OBJECTS);
const OBJ_RECT = 1;
function figUpdateObjects(objects) {
    // // prepare the buffers
    // let nodeId = -1;
    // let prevId = -1;
    // let count  =  0;
    // here the ID acts as the index into the object table
    for (const obj of objects) {
        const genObj = genObjects[obj.id];
        if (!genObj
            || genObj.removed) // no existing object, create new object
         {
            figCreateObject(obj);
        }
        else if (genObj.getPluginData('type') == obj.type.toString()) // update existing object
         {
            figUpdateObject(obj);
        }
        else // delete existing object, create new object
         {
            genObj.remove();
            figCreateObject(obj);
        }
        //     count++;
        //     if (obj.nodeId != nodeId)
        //     {
        //         nodeId = obj.nodeId;
        //         if (prevId > -1)
        //         {
        //             if (  !objNodes[prevId]
        //                 || objNodes[prevId].length != count)
        //             {
        //                 figDeleteObjects([prevId]);
        //                 objNodes[prevId] = new Array(count).fill(null);
        //             }
        //             count = 0;
        //         }
        //         prevId = nodeId;
        //     }
        // }
        // if (   count > 0
        //     && (  !objNodes[nodeId]
        //         || objNodes[nodeId].length != count))
        // {
        //     figDeleteObjects([nodeId]);
        //     objNodes[nodeId] = new Array(count).fill(null);
    }
    // // fill the buffers
    // for (const obj of objects)
    // {
    //     switch (obj.type)
    //     {
    //         case OBJ_RECT:
    //         {
    //             if (!objNodes[obj.nodeId][obj.id])
    //             {
    //                 figCreateRect(obj);
    //             }
    //             else 
    //             {
    //                 const cur = objNodes[obj.nodeId][obj.id];
    //                 if (   cur.type == objTypeString(obj.type)
    //                     && cur.getPluginData('id')     == obj.id
    //                     && cur.getPluginData('nodeId') == obj.nodeId)
    //                     figUpdateRect(obj);
    //                 else
    //                     figNotify('Error: Object ID mismatch', '', 400, true);
    //             }
    //             break;
    //         }
    //     }
    // }
}
function figCreateObject(obj) {
    let genObj;
    switch (obj.type) {
        case OBJ_RECT:
            genObj = figCreateRect(obj);
            break;
    }
    genObj.name = obj.nodeId.toString() + ':' + obj.id.toString();
    genObj.setPluginData('id', obj.id.toString());
    genObj.setPluginData('type', obj.type.toString());
    genObj.setPluginData('nodeId', obj.nodeId.toString());
    //genObj.setPluginData('name',   rect.name);
    genObjects[obj.id] = genObj;
    figma.currentPage.appendChild(genObj);
}
function figCreateFrame() {
    let frame = figma.createFrame();
    frame.name = 'Generator';
    let tx = { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 };
    frame.fills = [tx];
    //frame.resize(
    //    (nCols*rectSize + (nCols-1)*hgap),
    //    (nRows*rectSize + (nRows-1)*hgap));
    return frame;
}
function figCreateRect(obj) {
    //console.log(obj);
    const rect = figma.createRectangle();
    rect.x = obj.x;
    rect.y = obj.y;
    rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rect.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    rect.rotation = obj.angle;
    rect.cornerRadius = obj.round;
    return rect;
}
function figUpdateObject(obj) {
    switch (obj.type) {
        case OBJ_RECT:
            {
                figUpdateRect(obj);
                break;
            }
    }
}
function figUpdateRect(obj) {
    const rect = genObjects[obj.id];
    rect.x = obj.x;
    rect.y = obj.y;
    if (rect.width != obj.width
        || rect.height != obj.height) {
        rect.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    }
    rect.rotation = obj.angle;
    rect.cornerRadius = obj.round;
}
function figDeleteObjects(nodeIds) {
    const objects = figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId')));
    for (const obj of objects)
        obj.remove();
}
function figDeleteAllObjects() {
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id'))
            obj.remove();
}
function figOnSelectionChange() {
    /*  Every time a selection changes, check that all objects in the object table
        still exist in the canvas. If not, remove the pointer from the object table.
        
        NOTE: at this point I don't know if objects are deleted by the API, but then again,
        only one plugin runs at a time right now, so maybe it's not an issue.  */
    // for (let i = 0; i < objNodes.length; i++)
    // {
    //     if (!objNodes[i]) continue;
    //     for (let j = 0; j < objNodes[i].length; j++)
    //     {
    //         if (!objNodes[i][j]) continue;
    //         const exists = figma.currentPage.children.findIndex(obj => parseInt(obj.getPluginData('id')) == i);
    //         if (!exists) objNodes[i][j] = null;
    //     }
    // }
}
function figOnPluginClose() {
    figDeleteAllObjects();
}
//const MAX_NODES   = 0x10000;
//const objNodes    = new Array(MAX_NODES).fill(null);
//var   minNodeId   = Number.MAX_SAFE_INTEGER;
//var   maxNodeId   = Number.MIN_SAFE_INTEGER;
figma.on('selectionchange', figOnSelectionChange);
figma.on('close', figOnPluginClose);
figma.showUI(__html__);
function figStartGenerator() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            // load product key
            let productKey = yield figLoadLocal('productKey');
            if (productKey == null)
                productKey = '';
            // size window
            let wndWidth = yield figma.clientStorage.getAsync('windowWidth');
            let wndHeight = yield figma.clientStorage.getAsync('windowHeight');
            if (wndWidth == null)
                wndWidth = 800;
            if (wndHeight == null)
                wndHeight = 600;
            figma.ui.resize(Math.max(0, wndWidth), Math.max(0, wndHeight));
            //
            figPostMessageToUi({
                cmd: 'uiEndStartGenerator',
                currentUser: figma.currentUser,
                productKey: productKey
            });
        });
    })();
}
// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////
figma.ui.onmessage = msg => {
    switch (msg.cmd) {
        case 'figStartGenerator':
            figStartGenerator();
            break;
        case 'figResizeWindow':
            figResizeWindow(msg.width, msg.height);
            break;
        case 'figNotify':
            figNotify(msg.text, msg.prefix, msg.delay, msg.error);
            break;
        case 'figGetLocalData':
            figGetLocalData(msg.key);
            break;
        case 'figSetLocalData':
            figSetLocalData(msg.key, msg.value);
            break;
        case 'figGetPageData':
            figGetPageData(msg.key);
            break;
        case 'figSetPageData':
            figSetPageData(msg.key, msg.value);
            break;
        case 'figLoadNodesAndConns':
            figLoadNodesAndConns();
            break;
        case 'figSaveNodes':
            figSaveNodes(msg.nodeIds, msg.nodeJson);
            break;
        case 'figRemoveSavedNodesAndConns':
            figRemoveSavedNodesAndConns(msg.nodeIds);
            break;
        case 'figRemoveAllSavedNodesAndConns':
            figRemoveAllSavedNodesAndConns();
            break;
        case 'figLogAllSavedNodesAndConns':
            figLogAllSavedNodesAndConns();
            break;
        case 'figSaveConnection':
            figSaveConnection(msg.name, msg.json);
            break;
        case 'figRemoveSavedConnection':
            figRemoveSavedConnection(msg.name);
            break;
        case 'figRemoveSavedConnectionsToNode':
            figRemoveSavedConnectionsToNode(msg.nodeId);
            break;
        // case 'figSaveActiveNode':               figSaveActiveNode              (msg.nodeId);                                 break;
        // case 'figRemoveSavedActiveNode':        figRemoveSavedActiveNode       (msg.nodeId);                                 break;
        case 'figDeleteObjects':
            figDeleteObjects(msg.nodeIds);
            break;
        case 'figUpdateObjects':
            figUpdateObjects(msg.objects);
            break;
    }
    figPostMessageToUi({ cmd: 'uiEndFigMessage' });
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// to UI -->
function figPostMessageToUi(msg) {
    figma.ui.postMessage(msg);
}
// to Generator -->
function figPostMessageToGenerator(msg) {
    figPostMessageToUi({
        cmd: 'uiForwardToGen',
        msg: msg
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function figLoadLocal(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield figma.clientStorage.getAsync(key);
    });
}
function figGetLocalData(key) {
    figma.clientStorage.getAsync(key).then(data => {
        //console.log('getAsync', data);
        figPostMessageToUi({
            cmd: 'uiGetLocalDataReturn',
            key: key,
            value: data
        });
    });
}
function figSetLocalData(key, value) {
    figma.clientStorage.setAsync(key, value);
}
function figGetPageData(key, postToUi = true) {
    const data = figma.currentPage.getPluginData(key);
    if (postToUi) {
        figPostMessageToUi({
            cmd: 'uiGetPageDataReturn',
            key: key,
            value: data
        });
    }
    return data;
}
function figSetPageData(key, value) {
    figClearPageData(key); // remove possible existing values first
    figma.currentPage.setPluginData(key, value);
}
function figClearPageData(key) {
    figma.currentPage.setPluginData(key, '');
}
function figLoadNodesAndConns() {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, nodeTag.length + 1) == nodeTag + ' ');
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, connTag.length + 1) == connTag + ' ');
    const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k));
    const conns = connKeys.map(k => figma.currentPage.getPluginData(k));
    const nodesJson = JSON.stringify(nodes);
    const connsJson = JSON.stringify(conns);
    figPostMessageToUi({
        cmd: 'uiLoadNodesAndConns',
        nodesJson: nodesJson,
        connsJson: connsJson
    });
}
function figSaveNodes(nodeIds, nodeJson) {
    for (let i = 0; i < nodeIds.length; i++) {
        // console.log('key', nodeNameForStorage(nodeIds[i]));
        // console.log('value', nodeJson[i]);
        figSetPageData(nodeNameForStorage(nodeIds[i]), nodeJson[i]);
    }
}
function figRemoveSavedNodesAndConns(nodeIds) {
    for (let i = 0; i < nodeIds.length; i++)
        figClearPageData(nodeNameForStorage(nodeIds[i]));
}
function figRemoveAllSavedNodesAndConns() {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, nodeTag.length + 1) == nodeTag + ' ');
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, connTag.length + 1) == connTag + ' ');
    for (const key of nodeKeys)
        figClearPageData(key);
    for (const key of connKeys)
        figClearPageData(key);
}
function figLogAllSavedNodesAndConns() {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, nodeTag.length + 1) == nodeTag + ' ');
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, connTag.length + 1) == connTag + ' ');
    for (const key of nodeKeys)
        console.log(key + '\n', figGetPageData(key, false));
    for (const key of connKeys)
        console.log(key + '\n', figGetPageData(key, false));
    console.log('------------------END-LOAD-------------------');
}
function figSaveConnection(name, json) {
    // console.log('key', connNameForStorage(name));
    // console.log('connection', json);    //     this.#paramValue.control.readOnly = this.inputs[0].connected;
    figSetPageData(connNameForStorage(name), json);
}
function figRemoveSavedConnection(name) {
    figClearPageData(connNameForStorage(name));
}
function figRemoveSavedConnectionsToNode(nodeId) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k.substring(0, 3) == connTag + ' ');
    for (const key of connKeys) {
        const parts = key.split(' ');
        if (parts[3] == nodeId)
            figClearPageData(key);
    }
}
// function figSaveActiveNode(nodeId)
// {
//     figSetPageData(activeName(nodeId), nodeId);
// }
// function figRemoveSavedActiveNode(nodeId)
// {
//     figClearPageData(activeName(nodeId));        
// }
function nodeNameForStorage(nodeId) { return nodeTag + ' ' + nodeId; }
function connNameForStorage(name) { return connTag + ' ' + name; }
function figResizeWindow(width, height) {
    width = Math.floor(Math.max(0, width));
    height = Math.floor(Math.max(0, height));
    figma.ui.resize(width, height);
    figma.clientStorage.setAsync('windowWidth', width);
    figma.clientStorage.setAsync('windowHeight', height);
    figPostMessageToUi({ cmd: 'uiEndResizeWindow' });
}
function figNotify(text, prefix = 'Generator ', delay = 400, error = false) {
    figma.notify(prefix + text, {
        timeout: delay,
        error: error
    });
}
function objTypeString(type) {
    switch (type) {
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
