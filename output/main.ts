figma.showUI(__html__);
figma.ui.resize(240, 400);

figma.ui.onmessage = msg => 
{
    if (msg.cmd === 'save')
        figma.clientStorage.setAsync(msg.key, msg.value);

    else if (msg.cmd === 'loadState')
    {
        (async function()
        {
            var state = await figma.clientStorage.getAsync('state');

            if (state == null)
            {
                state = 
                {
                    windowHeight: 400
                };
            }

            figma.ui.postMessage(
            {
                cmd:   'loadState',
                state: state
            });

        })();
    }

    else if (msg.cmd === 'resizeWindow')
        figma.ui.resize(msg.width, msg.height);
};
