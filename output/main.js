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
figma.ui.resize(240, 400);
figma.ui.onmessage = msg => {
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);
    else if (msg.cmd === 'loadState') {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                var state = yield figma.clientStorage.getAsync('state');
                if (state == null) {
                    state =
                        {
                            windowHeight: 400
                        };
                }
                figma.ui.postMessage({
                    cmd: 'loadState',
                    state: state
                });
            });
        })();
    }
    else if (msg.cmd === 'resizeWindow')
        figma.ui.resize(msg.width, msg.height);
};
