function loadState(state)
{
    resizeWindow(
        window.innerWidth, 
        state.windowHeight);
}    


function setPluginData(key, value)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:  'setPluginData', 
        key:   key,
        value: value
    }}, '*');
}


function saveState()
{
    setPluginData('state',
    {
        //windowHeight: window.innerHeight
    });
}