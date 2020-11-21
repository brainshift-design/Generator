var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            msgRemoveNodeObjects(msg.nodeId);
            break;
        case 'removeObjectList':
            msgRemoveObjectList(msg);
            break;
        case 'recreateObjects':
            msgrecreateObjects(msg);
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
function msgRemoveNodeObjects(nodeId) {
    for (const obj of figma.currentPage.children) {
        if (madeByNode(obj, nodeId))
            obj.remove();
    }
}
function msgRemoveObjectList(msg) {
    for (const _obj of msg.objects) {
        var obj = figma.currentPage.children.find(n => n.getPluginData('#GEN') === '#GEN_' + _obj.itemId);
        if (obj)
            obj.remove();
    }
}
function msgrecreateObjects(msg) {
    for (const nodeId of msg.nodeIds)
        msgRemoveNodeObjects(nodeId);
    for (const obj of msg.objects) {
        switch (obj.objType) {
            case 'rect':
                createRect(obj);
                break;
        }
    }
}
function createRect(obj) {
    const rect = figma.createRectangle();
    rect.name = obj.itemId;
    rect.setPluginData('#GEN', '#GEN_' + rect.name);
    rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rect.x = obj.x;
    rect.y = obj.y;
    figma.currentPage.appendChild(rect);
    rect.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    rect.cornerRadius = obj.round;
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
//     {
//         rect.resize(
//             Math.max(0.01, data.width ), 
//             Math.max(0.01, data.height));
//     }
// }
function madeByNode(obj, nodeId) {
    const tag = obj.getPluginData('#GEN');
    const nodeTag = '#GEN_' + nodeId;
    return tag.substring(0, Math.min(tag.length, nodeTag.length)) === nodeTag;
}
