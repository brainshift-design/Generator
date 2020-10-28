const windowWidth = 240;

figma.showUI(__html__);
figma.ui.resize(windowWidth, 0);


figma.ui.onmessage = msg => 
{
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);

    else if (msg.cmd === 'loadState')
    {
        (async function()
        {
            // load state
            var state = await figma.clientStorage.getAsync('state');
            if (state == null) state = {};
            // ...

            // resize window
            var wndHeight = await figma.clientStorage.getAsync('windowHeight');
            if (wndHeight == null) wndHeight = 400;

            figma.ui.resize(
                windowWidth, 
                Math.max(0, wndHeight));
        })();
    }

    else if (msg.cmd === 'resizeWindow')
    {
        var wndHeight = Math.max(0, msg.height);
        figma.ui.resize(windowWidth, wndHeight);

        figma.clientStorage.setAsync('windowHeight', wndHeight);
    }
};
