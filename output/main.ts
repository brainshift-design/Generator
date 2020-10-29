figma.showUI(__html__);


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
            var wndWidth  = await figma.clientStorage.getAsync('windowWidth');
            var wndHeight = await figma.clientStorage.getAsync('windowHeight');

            if (wndWidth  == null) wndWidth  = 400;
            if (wndHeight == null) wndHeight = 300;

            figma.ui.resize(
                Math.max(0, wndWidth),
                Math.max(0, wndHeight));
        })();
    }

    else if (msg.cmd === 'resizeWindow')
    {
        var width  = Math.max(0, msg.width);
        var height = Math.max(0, msg.height);

        figma.ui.resize(width, height);

        figma.clientStorage.setAsync('windowWidth',  width);
        figma.clientStorage.setAsync('windowHeight', height);
    }
};
