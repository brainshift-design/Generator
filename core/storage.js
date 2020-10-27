function loadState(state)
{
    resizeWindow(
        window.innerWidth, 
        state.windowHeight);
}    


function save(key, value)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd:   'save', 
        key:   key,
        value: value
    }}, '*');
}


function saveState()
{
    save('state',
    {
        windowHeight: window.innerHeight
    });
}