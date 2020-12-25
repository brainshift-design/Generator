var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const OBJ_RECT = 1;
const MAX_OBJECTS = 0x10000;
const objects = new Array(MAX_OBJECTS);
var nObjects = 0;
figma.showUI(__html__);
figma.ui.onmessage = msg => {
    switch (msg.cmd) {
        case 'save':
            figma.clientStorage.setAsync(msg.key, msg.value);
            break;
        case 'loadState':
            msgLoadState(msg);
            break;
        case 'resizeWindow':
            msgResizeWindow(msg);
            break;
        case 'removeNodeObjects':
            msgRemoveNodeObjects(msg.nodeIds);
            break;
        case 'removeObjectList':
            msgRemoveObjectList(msg);
            break;
        case 'updateObjects':
            msgUpdateObjects(msg);
            break;
    }
};
function msgLoadState(msg) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            // load state
            var state = yield figma.clientStorage.getAsync('state');
            if (state == null)
                state = {};
            // ...
            // resize window
            var wndWidth = yield figma.clientStorage.getAsync('windowWidth');
            var wndHeight = yield figma.clientStorage.getAsync('windowHeight');
            if (wndWidth == null)
                wndWidth = 400;
            if (wndHeight == null)
                wndHeight = 300;
            figma.ui.resize(Math.max(0, wndWidth), Math.max(0, wndHeight));
        });
    })();
}
function msgResizeWindow(msg) {
    var width = Math.floor(Math.max(0, msg.width));
    var height = Math.floor(Math.max(0, msg.height));
    figma.ui.resize(width, height);
    figma.clientStorage.setAsync('windowWidth', width);
    figma.clientStorage.setAsync('windowHeight', height);
}
function msgRemoveNodeObjects(nodeIds) {
    for (const obj of figma.currentPage.children) {
        if (madeByNodes(obj, nodeIds))
            obj.remove();
    }
}
function msgRemoveObjectList(msg) {
    for (const _obj of msg.objects) {
        var obj = figma.currentPage.children.find(n => n.getPluginData('#') === '#' + _obj.itemId);
        if (obj)
            obj.remove();
    }
}
function msgUpdateObjects(msg) {
    // for (const nodeId of msg.nodeIds)
    //     msgRemoveNodeObjects(nodeIds);
    for (const obj of msg.objects) {
        switch (obj[0]) {
            case OBJ_RECT:
                if (!objects[obj[1]])
                    createRect(obj);
                else {
                    const cur = objects[obj[1]];
                    if (cur.type == obj2type(obj[0])
                        && cur.getPluginData('uid') == obj[1]
                        && cur.getPluginData('nodeId') == obj[2])
                        updateRect(obj);
                    else
                        figma.notify('ERROR: object ID mismatch');
                }
                break;
        }
    }
}
function createRect(obj) {
    const rect = figma.createRectangle();
    rect.name = obj[1].toString(); //obj.itemId;
    rect.setPluginData('uid', obj[1].toString());
    rect.setPluginData('nodeId', obj[2].toString());
    rect.setPluginData('name', rect.name);
    rect.x = obj[3];
    rect.y = obj[4];
    rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rect.resize(Math.max(0.01, obj[5]), Math.max(0.01, obj[6]));
    figma.currentPage.appendChild(rect);
    objects[obj[1]] = rect;
    rect.cornerRadius = obj[7];
}
function updateRect(obj) {
    const rect = objects[obj[1]];
    rect.x = obj[3];
    rect.y = obj[4];
    if (rect.width != obj[5]
        || rect.height != obj[6]) {
        rect.resize(Math.max(0.01, obj[5]), Math.max(0.01, obj[6]));
    }
    rect.cornerRadius = obj[7];
}
function madeByNodes(obj, nodeIds) {
    const tag = obj.getPluginData('name');
    for (const nodeId of nodeIds) {
        let nodeTag = nodeId;
        if (tag.substring(0, Math.min(tag.length, nodeTag.length)) === nodeTag)
            return true;
    }
    return false;
}
function obj2type(type) {
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
