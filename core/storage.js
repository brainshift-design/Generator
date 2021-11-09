function uiLoadState(state)
{
    uiResizeWindow(
        window.innerWidth, 
        state.windowHeight);
}    



function uiSetPluginData(key, value)
{
    uiPostMessageToFigma({ 
        cmd:  'figSetPluginData', 
        key:   key,
        value: value
    });
}



function uiSaveLocal(key, value)
{
    uiPostMessageToFigma({ 
        cmd:  'figSaveLocal', 
        key:   key,
        value: value
    });
}



// function uiSaveState()
// {
//     uiSetPluginData('state',
//     {
//         //windowHeight: window.innerHeight
//     });
// }