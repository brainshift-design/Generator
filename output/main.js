figma.showUI(__html__);
figma.ui.resize(240, 400);
figma.ui.onmessage = msg => {
    if (msg.cmd === 'resizeWindow')
        figma.ui.resize(msg.width, msg.height);
};
