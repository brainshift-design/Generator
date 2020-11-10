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
            msgRemoveNodeObjects(msg);
            break;
        case 'removeObjectList':
            msgRemoveObjectList(msg);
            break;
        case 'regenerateObjects':
            msgRegenerateObjects(msg);
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
    var width = Math.max(0, msg.width);
    var height = Math.max(0, msg.height);
    figma.ui.resize(width, height);
    figma.clientStorage.setAsync('windowWidth', width);
    figma.clientStorage.setAsync('windowHeight', height);
}
function msgRemoveNodeObjects(msg) {
    for (const obj of figma.currentPage.children) {
        if (madeByNode(obj, msg.nodeId))
            obj.remove();
    }
}
function msgRemoveObjectList(msg) {
    for (const _obj of msg.data) {
        var obj = figma.currentPage.children.find(n => n.getPluginData('#GEN') === '#GEN_' + _obj.itemId);
        if (obj)
            obj.remove();
    }
}
function msgRegenerateObjects(msg) {
    //msgRemoveNodeObjects(msg);
    for (const item of msg.data) {
        if (item.type == 'rect')
            regenerateRect(item);
    }
}
function regenerateRect(item) {
    const existing = figma.currentPage.children.findIndex(obj => obj.getPluginData('#GEN') === '#GEN_' + item.itemId);
    var rect;
    //var cx, cy;
    if (existing < 0) {
        rect = figma.createRectangle();
        rect.setPluginData('#GEN', '#GEN_' + item.itemId);
        rect.name = item.itemId; //item.id;
        rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        rect.x = item.x;
        rect.y = item.y;
        figma.currentPage.appendChild(rect);
    }
    else {
        rect = figma.currentPage.children[existing];
        rect.x = item.x;
        rect.y = item.y;
        // if (!isNaN(item.x) && rect.x != item.x) rect.x = item.x;
        // if (!isNaN(item.y) && rect.y != item.y) rect.y = item.y;
        // cx = rect.x + rect.width /2;
        // cy = rect.y + rect.height/2; 
        // will be finished later
    }
    if (rect.width != item.width
        || rect.height != item.height) {
        rect.resize(Math.max(0.01, item.width), Math.max(0.01, item.height));
    }
    // if (existing >= 0) // finishing up
    // {
    //     rect.x = cx - rect.width /2;
    //     rect.y = cy - rect.height/2;
    // }
}
function madeByNode(obj, nodeId) {
    const tag = obj.getPluginData('#GEN');
    const nodeTag = '#GEN_' + nodeId;
    return tag.substring(0, Math.min(tag.length, nodeTag.length)) === nodeTag;
}
