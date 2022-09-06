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
const smallScrollGap = 6;
const largeScrollGap = 14;
const MAX_INT32 = 2147483647;
const TAB = '  ';
const NL = '\n';
const INVALID = '?';
const DISPLAY_INVALID = INVALID; //'🤷‍♂️';
const NUMBER_VALUE = 'N'; // value (s) (with significant decimals)
const NUMBER = 'NUM'; // N | n
const NUMBER_LIMITS = 'LIM'; // N:min N:max
const NUMBER_ADD = 'ADD'; // count N...
const NUMBER_SUBTRACT = 'SUB'; // count N...
const NUMBER_MULTIPLY = 'MUL'; // count N...
const NUMBER_DIVIDE = 'DIV'; // count N...
const NUMBER_MODULO = 'MOD'; // count N...
const NUMBER_EXPONENT = 'EXP'; // count N...
const NUMBER_MATH = 'MATH'; // op count N...
const NUMBER_INTERPOLATE = 'LERP'; // count N... N:amount
const NUMBER_TYPES = [
    NUMBER_VALUE,
    NUMBER,
    NUMBER_LIMITS,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT,
    NUMBER_MATH,
    NUMBER_INTERPOLATE
];
const STRING_VALUE = 'S'; // "..." (s) (escape \\ and \")
const STRING = 'STR'; // S | s
const STRING_ADD = 'SADD'; // S S
const STRING_REPLACE = 'SREPL'; // S S:what S:with
const COLOR_VALUE = 'C'; // color value
const COLOR = 'COL'; // C | N:space N:c1 N:c2 N:c3
const COLOR_INTERPOLATE = 'CLERP'; // C C N:amount
const COLOR_VALIDATE = 'CVLD'; // C
const COLOR_CONTRAST = 'CCNT'; // C:text C:background
const COLORBLIND = 'BLND'; // C
const COLOR_TYPES = [
    COLOR_VALUE,
    COLOR,
    COLOR_INTERPOLATE,
    COLOR_VALIDATE,
    COLORBLIND
];
const FILL_VALUE = 'FL';
const FILL = 'FILL';
const FILL_TYPES = [
    FILL_VALUE,
    FILL
];
const STROKE_VALUE = 'SK';
const STROKE = 'STRK';
const STROKE_TYPES = [
    STROKE_VALUE,
    STROKE
];
const COLOR_STOP_VALUE = 'CS';
const COLOR_STOP = 'CSTOP';
const GRADIENT_VALUE = 'GR';
const GRADIENT = 'GRAD';
//const GEOMETRY_VALUE      = 'G0';    // abstract placeholder
const RECTANGLE_VALUE = 'R';
const LINE_VALUE = 'L';
const ELLIPSE_VALUE = 'E';
const POLYGON_VALUE = 'P';
const STAR_VALUE = 'ST';
const RECTANGLE = 'RECT'; // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const LINE = 'LINE'; // N:x N:y N:width N:height N:angle
const ELLIPSE = 'ELPS'; // N:x N:y N:width N:height N:angle
const POLYGON = 'POLY'; // N:x N:y N:width N:height N:angle N:corners
const STAR = 'STAR'; // N:x N:y N:width N:height N:angle N:points N:convex
const GEOMETRY_VALUES = [
    //GEOMETRY_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE
];
const GEOMETRY_TYPES = [
    ...GEOMETRY_VALUES,
    RECTANGLE,
    LINE,
    ELLIPSE,
    POLYGON,
    STAR //,
    //TEXT
];
const GROUP = 'GRP'; // ???? count O...
const COMMENT = 'CMNT';
const ACTIVE = 'ACT';
const PARAM = 'PARAM'; // nodeId paramId
/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/
class RequestSettings {
    constructor(request, pos) {
        this.so = 0;
        this.nTab = 0;
        this.skipNewLine = false;
        this.loggedNodeIds = [];
        this.request = request;
        this.pos = pos;
    }
    get tab() {
        if (this.skipNewLine) {
            this.skipNewLine = false;
            return '';
        }
        else
            return NL + TAB.repeat(Math.max(0, this.nTab));
    }
}
function logFunction(funcName) {
    console.log('%c ' + funcName + ' ', 'background: #09f; color: white;');
}
function logSavedNode(nodeKey) {
    let txt = figGetPageData(nodeKey, false)
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + TAB, '')
        .replace('\n' + TAB + ']', '')
        .split(TAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS
        .split('": "').join(': ')
        .split('", "').join(': ')
        .split(TAB + '"').join(TAB)
        .split(TAB + TAB + '["').join(TAB + TAB)
        .split('",\n').join('\n')
        .split('"\n').join('\n')
        .split('"],\n').join('\n');
    if (txt[txt.length - 1] == '"')
        txt = txt.substring(0, txt.length - 1);
    if (txt.substring(txt.length - 2) == '"]')
        txt = txt.substring(0, txt.length - 2);
    console.log('%c%s\n%c%s', 'background: #fdb', noNodeTag(nodeKey), 'background: #fed;', txt);
}
function logSavedConn(connKey) {
    const parts = noConnTag(connKey).split(' ');
    const conn = parts[0] + '.' + parts[1]
        + ' → '
        + parts[2] + '.' + parts[3];
    console.log('%c%s', 'background: #cfc', conn);
}
function logValueUpdates(updateNodeId, updateParamId, values) {
    //console.log('values = ', values);
    let log = '';
    let newLine = true;
    if (updateNodeId != ''
        || updateParamId != '')
        log = '↓ ' + logReqId(updateNodeId) + '.' + logReqId(updateParamId);
    else
        newLine = false;
    let i = 0;
    let nTab = 0;
    while (i < values.length) {
        const nodeId = values[i++];
        const nValues = parseInt(values[i++]);
        log +=
            (newLine ? NL : '') + TAB.repeat(Math.max(0, nTab))
                + nodeId; // + ' ' + nValues;
        newLine = true;
        nTab++;
        for (let j = 0; j < nValues; j++) {
            const index = values[i++];
            const type = values[i++];
            const value = values[i++];
            log +=
                NL + TAB.repeat(Math.max(0, nTab))
                    + index + ' ' + displayValue(type, value);
        }
        nTab--;
    }
    console.log('%c%s', 'background: #e70; color: white;', log);
}
function logObjectUpdates(objects) {
    console.log('%cobjects', 'background: #07e; color: white;', objects);
}
function logRequest(parse) {
    let log = '';
    if (parse.updateNodeId != ''
        || parse.updateParamId != '')
        log = '↓ ' + logReqId(parse.updateNodeId) + '.' + logReqId(parse.updateParamId);
    log += parse.log;
    console.log('%c%s', 'background: #60aa60; color: #fff', log);
}
function logReqNodeId(node) {
    return ' '
        + logReqId(node.nodeId)
        + logReqActive(node);
}
function logReqId(nodeId) {
    return nodeId == '' ? '\'\'' : nodeId;
}
function logReqActive(node) {
    return node.active
        ? ' ' + ACTIVE
        : '';
}
function logReqParam(param, type, parse) {
    parse.log +=
        parse.tab + PARAM
            + ' ' + type
            + ' ' + logReqId(param.nodeId)
            + '.' + logReqId(param.paramId);
}
function logReqNode(node, parse) {
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node);
}
const settings = {
    showNodeId: false,
    logMessages: false,
    logActions: false,
    logRawLoading: true,
    logRawSaving: true,
    logLoading: false,
    logRawRequests: false,
    logRawValues: false,
    logRequests: false,
    logValues: false,
    logObjectUpdates: false
};
const figObjectArrays = []; // {nodeId, [objects]}
function figUpdate(msg) {
    if (settings.logObjectUpdates
        && msg.objects.length > 0)
        logObjectUpdates(msg.objects);
    if (msg.updateNodeId != ''
        && msg.updateParamId != '') {
        const index = msg.nodeIds.indexOf(msg.updateNodeId);
        if (index > -1)
            figSaveNodes([msg.updateNodeId], [msg.nodeJson[index]]);
    }
    // else
    //     figSaveNodes(msg.nodeIds, msg.nodeJson);
    let curNodeId = '';
    let figObjects = null;
    for (const genObj of msg.objects) {
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
function figCreateObject(objects, genObj) {
    let figObj;
    const name = '◦G•   ' + genObj.nodeId.toString() + ' : ' + genObj.id.toString();
    switch (genObj.type) {
        case RECTANGLE:
            figObj = figCreateRect(genObj, name);
            break;
        case LINE:
            figObj = figCreateLine(genObj, name);
            break;
        case ELLIPSE:
            figObj = figCreateEllipse(genObj, name);
            break;
        case POLYGON:
            figObj = figCreatePolygon(genObj, name);
            break;
        case STAR:
            figObj = figCreateStar(genObj, name);
            break;
    }
    figObj.setPluginData('id', genObj.id.toString());
    figObj.setPluginData('type', genObj.type.toString());
    figObj.setPluginData('nodeId', genObj.nodeId.toString());
    objects[genObj.id] = figObj;
    figma.currentPage.appendChild(figObj);
}
function figUpdateObject(figObj, genObj) {
    switch (genObj.type) {
        case RECTANGLE:
            figUpdateRect(figObj, genObj);
            break;
        case LINE:
            figUpdateLine(figObj, genObj);
            break;
        case ELLIPSE:
            figUpdateEllipse(figObj, genObj);
            break;
        case POLYGON:
            figUpdatePolygon(figObj, genObj);
            break;
        case STAR:
            figUpdateStar(figObj, genObj);
            break;
    }
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
figma.showUI(__html__, {
    visible: false,
    themeColors: true
});
function figStartGenerator() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let productKey = yield figLoadLocal('productKey');
            if (productKey == null)
                productKey = '';
            let wndWidth = yield figma.clientStorage.getAsync('windowWidth');
            let wndHeight = yield figma.clientStorage.getAsync('windowHeight');
            if (wndWidth == null)
                wndWidth = 800;
            if (wndHeight == null)
                wndHeight = 600;
            figma.ui.resize(Math.max(0, wndWidth), Math.max(0, wndHeight));
            figPostMessageToUI({
                cmd: 'uiEndStartGenerator',
                currentUser: figma.currentUser,
                productKey: productKey
            });
            figma.ui.show();
        });
    })();
}
// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////
figma.ui.onmessage = msg => {
    msg = JSON.parse(msg);
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
        case 'figUpdate':
            figUpdate(msg);
            break;
        case 'figDeleteObjects':
            figDeleteObjectsFromNodeIds(msg.nodeIds);
            break;
    }
    figPostMessageToUI({
        cmd: 'uiEndFigMessage',
        msgCmd: msg.cmd
    });
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// to UI -->
///////////////////////////////////////////////////////////////////////////////////////////////////
function figPostMessageToUI(msg) {
    figma.ui.postMessage(JSON.stringify(msg));
    if (settings.logMessages)
        console.log('%cFIG --► UI ' + msg.cmd, 'background: #08f; color: white;');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////
// function figPostMessageToGenerator(msg)
// {
//     figPostMessageToUI({
//         cmd: 'uiForwardToGen',
//         msg:  msg
//     });
// }
// function figEndGeneratorMessage()
// {
//     figPostMessageToGenerator({cmd: 'genEndFigMessage'}); 
// }
///////////////////////////////////////////////////////////////////////////////////////////////////
function figCreateRect(obj, name) {
    //console.log(obj);
    const rect = figma.createRectangle();
    rect.name = name;
    rect.x = obj.x;
    rect.y = obj.y;
    setObjectFills(rect, obj);
    setObjectStrokes(rect, obj);
    rect.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    rect.rotation = obj.angle;
    rect.cornerRadius = obj.round;
    return rect;
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
    setObjectFills(figRect, genRect);
    setObjectStrokes(figRect, genRect);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function figCreateLine(obj, name) {
    //console.log(obj);
    const line = figma.createLine();
    line.name = name;
    line.x = obj.x;
    line.y = obj.y;
    line.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    line.resize(Math.max(0.01, obj.width), 0);
    line.rotation = obj.angle;
    return line;
}
function figUpdateLine(figLine, genLine) {
    figLine.x = genLine.x;
    figLine.y = genLine.y;
    if (figLine.width != genLine.width)
        figLine.resize(Math.max(0.01, genLine.width), 0);
    figLine.rotation = genLine.angle;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function figCreateEllipse(obj, name) {
    //console.log(obj);
    const ellipse = figma.createEllipse();
    ellipse.name = name;
    ellipse.x = obj.x;
    ellipse.y = obj.y;
    ellipse.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    ellipse.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    ellipse.rotation = obj.angle;
    return ellipse;
}
function figUpdateEllipse(figEllipse, genEllipse) {
    figEllipse.x = genEllipse.x;
    figEllipse.y = genEllipse.y;
    if (figEllipse.width != genEllipse.width
        || figEllipse.height != genEllipse.height) {
        figEllipse.resize(Math.max(0.01, genEllipse.width), Math.max(0.01, genEllipse.height));
    }
    figEllipse.rotation = genEllipse.angle;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function figCreatePolygon(obj, name) {
    //console.log(obj);
    const poly = figma.createPolygon();
    poly.name = name;
    poly.x = obj.x;
    poly.y = obj.y;
    poly.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    poly.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    poly.rotation = obj.angle;
    poly.cornerRadius = obj.round;
    poly.pointCount = obj.corners;
    return poly;
}
function figUpdatePolygon(figPoly, genPoly) {
    figPoly.x = genPoly.x;
    figPoly.y = genPoly.y;
    if (figPoly.width != genPoly.width
        || figPoly.height != genPoly.height) {
        figPoly.resize(Math.max(0.01, genPoly.width), Math.max(0.01, genPoly.height));
    }
    figPoly.rotation = genPoly.angle;
    figPoly.cornerRadius = genPoly.round;
    figPoly.pointCount = genPoly.corners;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function figCreateStar(obj, name) {
    //console.log(obj);
    const star = figma.createStar();
    star.name = name;
    star.x = obj.x;
    star.y = obj.y;
    star.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    star.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    star.rotation = obj.angle;
    star.cornerRadius = obj.round;
    star.pointCount = obj.points;
    star.innerRadius = obj.convex / 100;
    return star;
}
function figUpdateStar(figStar, genStar) {
    figStar.x = genStar.x;
    figStar.y = genStar.y;
    if (figStar.width != genStar.width
        || figStar.height != genStar.height) {
        figStar.resize(Math.max(0.01, genStar.width), Math.max(0.01, genStar.height));
    }
    figStar.rotation = genStar.angle;
    figStar.cornerRadius = genStar.round;
    figStar.pointCount = genStar.points;
    figStar.innerRadius = genStar.convex / 100;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////
function setObjectFills(obj, src) {
    if (src.fills !== null
        && src.fills.length > 0)
        obj.fills = getObjectFills(src.fills);
    else
        obj.fills = []; //{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
}
function getObjectFills(objFills) {
    const fills = [];
    for (const _fill of objFills) {
        const fill = _fill[1].split(' ');
        switch (_fill[0]) {
            case 'SOLID':
                fills.push({
                    type: 'SOLID',
                    color: {
                        r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1),
                        g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1),
                        b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1)
                    },
                    opacity: parseFloat(fill[3]) / 100
                });
                break;
        }
    }
    return fills;
}
function setObjectStrokes(obj, src) {
    if (src.strokes != null
        && src.strokes.length > 0) {
        obj.strokes = getObjectFills(src.strokes);
        obj.strokeWeight = Math.max(0, src.strokeWeight);
        obj.strokeAlign = src.strokeAlign;
        obj.strokeJoin = src.strokeJoin;
        obj.strokeMiterLimit = Math.min(Math.max(0, src.strokeMiterLimit), 16);
    }
    else
        obj.strokes = [];
}
// function getObjectStrokes(objStrokes)
// {
//     const strokes = [];
//     for (const stroke of objStrokes)
//     {
//         const c = stroke[1].split(' ');
//         switch (stroke[0])
//         {
//             case FILL:
//                 strokes.push(
//                 {
//                     type: 'SOLID', 
//                     color: {
//                         r: Math.min(Math.max(0, parseFloat(c[0])), 1), 
//                         g: Math.min(Math.max(0, parseFloat(c[1])), 1), 
//                         b: Math.min(Math.max(0, parseFloat(c[2])), 1) },
//                     opacity: parseFloat(stroke[2])
//                 });
//                 break;
//         }
//     }
//     return strokes;
// }
// function setNodeFill(node, fill)
// {
//     switch (node.type)
//     {
//         case 'RECTANGLE':
//         case 'VECTOR':
//         case 'LINE':
//         case 'ELLIPSE':
//         case 'POLYGON':
//         case 'STAR':
//         case 'TEXT':
//         case 'BOOLEAN_OPERATION':
//         {
//             let n = node as typeof node;
//             let f = clone(n.fills);
//             f = fill;
//             n.fills = f;
//         }
//     }
// }
function figLoadLocal(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield figma.clientStorage.getAsync(key);
    });
}
function figGetLocalData(key) {
    figma.clientStorage.getAsync(key).then(data => {
        //console.log('getAsync', data);
        figPostMessageToUI({
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
        figPostMessageToUI({
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
    figPostMessageToUI({
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
    if (!settings.logLoading)
        return;
    figma.currentPage.getPluginDataKeys()
        .filter(k => isNodeKey(k))
        .forEach(k => logSavedNode(k));
}
function figLogAllSavedConns(settings) {
    if (!settings.logLoading)
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
    figPostMessageToUI({ cmd: 'uiEndResizeWindow' });
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
function clone(val) {
    const type = typeof val;
    if (val === null)
        return null;
    else if (type === 'undefined'
        || type === 'number'
        || type === 'string'
        || type === 'boolean')
        return val;
    else if (type === 'object') {
        if (val instanceof Array)
            return val.map(x => clone(x));
        else if (val instanceof Uint8Array)
            return new Uint8Array(val);
        else {
            let obj = {};
            for (const key in val)
                obj[key] = clone(val[key]);
            return obj;
        }
    }
    throw 'unknown';
}
