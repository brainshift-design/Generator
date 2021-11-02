function loadState(state)
{
    resizeWindow(
        window.innerWidth, 
        state.windowHeight);
}    


function uiSetPluginData(key, value)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:  'setPluginData', 
        key:   key,
        value: value
    }}, '*');
}



function uiSetPluginData(key, value)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:  'setPluginData', 
        key:   key,
        value: value
    }}, '*');
}



function uiSaveLocal(key, value)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:  'saveLocal', 
        key:   key,
        value: value
    }}, '*');
}



// function saveState()
// {
//     uiSetPluginData('state',
//     {
//         //windowHeight: window.innerHeight
//     });
// }