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
function isTagKey(key, tag) {
    return key.substring(0, tag.length + 1) == tag + ' ';
}
function noTag(key, tag) {
    return key.substring(tag.length + 1);
}
function isNodeKey(key) { return isTagKey(key, nodeTag); }
function isConnKey(key) { return isTagKey(key, connTag); }
function noNodeTag(key) { return noTag(key, nodeTag); }
function noConnTag(key) { return noTag(key, connTag); }
function logFunction(funcName) {
    console.log('%c ' + funcName + '() ', 'background: #09f; color: white;');
}
function logSavedNode(nodeKey) {
    console.log('%c%s\n%c%s', 'background: #fdb', noNodeTag(nodeKey), 'background: #fed;', figGetPageData(nodeKey, false)
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n', '')
        .replace('\n  ]', ''));
}
function logSavedConn(connKey) {
    let conn = '';
    const parts = noConnTag(connKey).split(' ');
    for (let i = 0; i < parts.length; i++) {
        conn += parts[i];
        if (i == 1)
            conn += ' -> ';
        else if (i < parts.length - 1)
            conn += ' ';
    }
    console.log('%c%s', 'background: #cfc', conn);
}
function logRequest(request) {
    // typescript doesn't implement String.replaceAll(), 
    // and because this file is included by both JS and TS,
    // I'm using .split().join()
    console.log('%c%s', 'background: #60aa60; color: #fff', JSON.stringify(request)
        .split('""').join('\'\'') //.replaceAll('""', '\'\'')
        .split('"').join('') //.replaceAll('"', '')
        .split('[').join('') //.replaceAll('[', '')
        .split(']').join('') //.replaceAll(']', '')
        .split(',').join(' ')); //.replaceAll(',', ' '));
}
function logParamUpdates(values) {
    console.log('%cvalues', 'background: #e70; color: white;', values);
}
function logObjectUpdates(objects) {
    console.log('%cobjects', 'background: #07e; color: white;', objects);
}
//////////// WARNING ////////////
//                             //
//  DO NOT TOUCH THIS FILE!!!  //
//                             //
/////////////////////////////////
const NUMBER_VALUE = 'N'; // value (s) (with significant decimals)
const NUMBER = 'NUM'; // N | n
const NUMBER_MINMAX = 'MNMX'; // N:min N:max
const NUMBER_ADD = 'ADD'; // count N...
const NUMBER_SUBTRACT = 'SUB'; // count N...
const NUMBER_MULTIPLY = 'MUL'; // count N...
const NUMBER_DIVIDE = 'DIV'; // count N...
const NUMBER_MODULO = 'MOD'; // count N...
const NUMBER_EXPONENT = 'EXP'; // count N...
const NUMBER_MATH = 'MATH'; // op count N...
const NUMBER_INTERPOLATE = 'LERP'; // count N... N:amount
const COLOR_VALUE = 'C'; // N:space N:1 N:2 N:3 (c)
const COLOR = 'COL'; // C | c
const COLOR_INTERPOLATE = 'CLERP'; // C C N:amount
const COLOR_VALIDATE = 'CVLD'; // C
const COLOR_CONTRAST = 'CCNT'; // C:text C:background
const COLORBLIND = 'BLND'; // C
const STRING_VALUE = 'S'; // "..." (s) (escape \\ and \")
const STRING = 'STR'; // S | s
const STRING_ADD = 'SADD'; // S S
const STRING_REPLACE = 'SREPL'; // S S:what S:with
//const RECTANGLE_VALUE    = 'R';
const RECTANGLE = 'RECT'; // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const ELLIPSE = 'ELPS'; // N:x N:y N:width N:height N:angle
const GROUP = 'GRP'; // ???? count O...
const COMMENT = 'CMNT';
const ACTIVE = 'ACT';
const PARAM = 'PARAM'; // nodeId paramIndex
/*

ARROW       A
COLOR       C
ELLIPSE     E
FRAME       F
GROUP       G
IMAGE       I
LIST        L
NUMBER      N
POLYGON     P
RECTANGLE   R
SLICE       /
STAR        *
STRING      S
TEXT        T
VECTOR      V

*/
const settings = {
    showNodeId: true,
    logStorage: true,
    logActions: true,
    logRequests: true,
    logParamUpdates: true,
    logObjectUpdates: false
};
//const MAX_OBJECTS = 0x10000;
const figObjectArrays = []; // {nodeId, [objects]}
function figUpdateObjects(/*updateId,*/ genObjects) {
    if (settings.logObjectUpdates)
        logObjectUpdates(genObjects);
    let curNodeId = '';
    let figObjects = null;
    for (const genObj of genObjects) {
        if (genObj.nodeId != curNodeId) {
            curNodeId = genObj.nodeId;
            figObjects = figObjectArrays.find(a => a.nodeId == genObj.nodeId);
            if (!figObjects)
                figObjectArrays.push(figObjects = { nodeId: genObj.nodeId, objects: [] });
        }
        const figObj = figObjects[genObj.id];
        if (!figObj
            || figObj.removed) // no existing object, create new object
            figCreateObject(figObjects, genObj);
        else if (figObj.getPluginData('type') == genObj.type.toString()) // update existing object
            figUpdateObject(figObj, genObj);
        else // delete existing object, create new object
         {
            figObj.remove();
            figCreateObject(figObjects, genObj);
        }
    }
}
// function figUpdateObjectArrays(genNodes)
// {
//     for (let i = 0; i < genNodes.length; i++)
//     {
//         let index = figObjectArrays.findIndex(a => a.nodeId = genNodes[i].nodeId);
//         if (index < 0) 
//         {
//             figObjectArrays.push({nodeId: genNodes[i].nodeId, objects: []});
//             index = figObjectArrays.length-1;
//         }
//     }
// }
function figCreateObject(objects, genObj) {
    let figObj;
    switch (genObj.type) {
        case RECTANGLE:
            figObj = figCreateRect(genObj);
            break;
    }
    figObj.name = 'G   ' + genObj.nodeId.toString() + ':' + genObj.id.toString();
    figObj.setPluginData('id', genObj.id.toString());
    figObj.setPluginData('type', genObj.type.toString());
    figObj.setPluginData('nodeId', genObj.nodeId.toString());
    //genObj.setPluginData('name',   rect.name);
    objects[genObj.id] = figObj;
    figma.currentPage.appendChild(figObj);
}
// function figCreateFrame()
// {
//     let frame = figma.createFrame();
//     frame.name = 'Generator';
//     let tx : Paint = {type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0};
//     frame.fills = [tx];
//     //frame.resize(
//     //    (nCols*rectSize + (nCols-1)*hgap),
//     //    (nRows*rectSize + (nRows-1)*hgap));
//     return frame;
// }
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
function figUpdateObject(figObj, genObj) {
    switch (genObj.type) {
        case RECTANGLE:
            {
                figUpdateRect(figObj, genObj);
                break;
            }
    }
}
function figUpdateRect(figRect, genRect) {
    figRect.x = genRect.x;
    figRect.y = genRect.y;
    if (figRect.width != genRect.width
        || figRect.height != genRect.height) {
        figRect.resize(Math.max(0.01, genRect.width), Math.max(0.01, genRect.height));
    }
    figRect.rotation = genRect.angle;
    figRect.cornerRadius = genRect.round;
}
function figDeleteObjectsFromNodeIds(nodeIds) {
    figma.currentPage
        .findAll(o => nodeIds.includes(o.getPluginData('nodeId')))
        .forEach(o => o.remove());
}
function figDeleteAllObjects() {
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id'))
            obj.remove();
}
// function logStorage()
// {
//     figLogAllSavedNodesAndConns({ logStorage: true });
// }
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
        case 'figRemoveConnsToNodes':
            figRemoveConnsToNodes(msg.nodeIds);
            break;
        case 'figRemoveSavedNodesAndConns':
            figRemoveSavedNodesAndConns(msg.nodeIds);
            break;
        case 'figRemoveAllSavedNodesAndConns':
            figRemoveAllSavedNodesAndConns();
            break;
        case 'figLogAllSavedNodesAndConns':
            figLogAllSavedNodesAndConns(msg.settings);
            break;
        case 'figLogAllSavedNodes':
            figLogAllSavedNodes(msg.settings);
            break;
        case 'figLogAllSavedConns':
            figLogAllSavedConns(msg.settings);
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
        case 'figUpdateObjects':
            figUpdateObjects(/*msg.updateId,*/ msg.objects);
            figEndGeneratorMessage();
            return;
        case 'figDeleteObjects':
            figDeleteObjectsFromNodeIds(msg.nodeIds);
            figEndGeneratorMessage();
            return;
    }
    figPostMessageToUi({ cmd: 'uiEndFigMessage' });
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// to UI -->
///////////////////////////////////////////////////////////////////////////////////////////////////
function figPostMessageToUi(msg) {
    figma.ui.postMessage(msg);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////
function figPostMessageToGenerator(msg) {
    figPostMessageToUi({
        cmd: 'uiForwardToGen',
        msg: msg
    });
}
function figEndGeneratorMessage() {
    figPostMessageToGenerator({ cmd: 'genEndFigMessage' });
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
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
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
        figSetPageData(nodeNameForStorage(nodeIds[i]), nodeJson[i]);
    }
}
function figRemoveConnsToNodes(nodeIds) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of connKeys) {
        const parts = noConnTag(key).split(' ');
        if (nodeIds.includes(parts[0])
            || nodeIds.includes(parts[2]))
            figClearPageData(key);
    }
}
function figRemoveSavedNodesAndConns(nodeIds) {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k)
        && nodeIds.includes(noNodeTag(k)));
    nodeKeys.forEach(k => figClearPageData(k));
    figRemoveConnsToNodes(nodeIds);
}
function figRemoveAllSavedNodesAndConns() {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of nodeKeys)
        figClearPageData(key);
    for (const key of connKeys)
        figClearPageData(key);
}
function figLogAllSavedNodesAndConns(settings) {
    figLogAllSavedNodes(settings);
    figLogAllSavedConns(settings);
}
function figLogAllSavedNodes(settings) {
    if (!settings.logStorage)
        return;
    figma.currentPage.getPluginDataKeys()
        .filter(k => isNodeKey(k))
        .forEach(k => logSavedNode(k));
}
function figLogAllSavedConns(settings) {
    if (!settings.logStorage)
        return;
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isConnKey(k));
    connKeys.sort((key1, key2) => {
        const p1 = noConnTag(key1).split(' ');
        const p2 = noConnTag(key2).split(' ');
        if (p1[2] != p2[2])
            return p1[2] < p2[2] ? -1 : 1;
        if (p1[3] != p2[3])
            return parseInt(p1[3]) - parseInt(p2[3]);
        if (p1[2] == p2[0])
            return -1;
        if (p2[2] == p1[0])
            return 1;
        return 0;
    });
    connKeys.forEach(k => logSavedConn(k));
}
function figSaveConnection(name, json) {
    // console.log('key', connNameForStorage(name));
    // console.log('connection', json);
    figSetPageData(connNameForStorage(name), json);
}
function figRemoveSavedConnection(name) {
    //console.log('figRemoveSavedConnection('+name+')');
    figClearPageData(connNameForStorage(name));
}
function figRemoveSavedConnectionsToNode(nodeId) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of connKeys) {
        const parts = key.split(' ');
        if (parts[3] == nodeId)
            figClearPageData(key);
    }
}
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
// function objTypeString(type)
// {
//     switch (type)
//     {
//         case RECTANGLE: return 'RECTANGLE';
//         // case 'VECTOR':
//         // case 'LINE':
//         // case 'ELLIPSE':
//         // case 'POLYGON':
//         // case 'STAR':
//         // case 'TEXT':
//         // case 'BOOLEAN_OPERATION':
//     }
//     return 'ERROR_TYPE';
// }
