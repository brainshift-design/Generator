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
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);
    else if (msg.cmd === 'loadState')
        msgLoadState(msg);
    else if (msg.cmd === 'resizeWindow')
        msgResizeWindow(msg);
    else if (msg.cmd === 'updateCanvas')
        msgUpdateCanvas(msg);
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
function msgUpdateCanvas(msg) {
    for (const node of figma.currentPage.children) {
        if (node.getPluginData('#GEN') === '#GEN')
            node.remove();
    }
    //
    if (msg.data.type == 'rect') {
        const rect = figma.createRectangle();
        rect.setPluginData('#GEN', '#GEN');
        rect.x = 0;
        rect.y = 0;
        rect.name = msg.data.id;
        rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        //rect.cornerRadius = 2 / zoom;
        rect.resize(msg.data.width, msg.data.height);
        figma.currentPage.appendChild(rect);
    }
}
