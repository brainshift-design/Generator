var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const windowWidth = 240;
figma.showUI(__html__);
figma.ui.resize(windowWidth, 0);
figma.ui.onmessage = msg => {
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);
    else if (msg.cmd === 'loadState') {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                // load state
                var state = yield figma.clientStorage.getAsync('state');
                if (state == null)
                    state = {};
                // ...
                // resize window
                var wndHeight = yield figma.clientStorage.getAsync('windowHeight');
                if (wndHeight == null)
                    wndHeight = 400;
                figma.ui.resize(windowWidth, Math.max(0, wndHeight));
            });
        })();
    }
    else if (msg.cmd === 'resizeWindow') {
        var wndHeight = Math.max(0, msg.height);
        figma.ui.resize(windowWidth, wndHeight);
        figma.clientStorage.setAsync('windowHeight', wndHeight);
    }
};
