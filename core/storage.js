function uiLoadState(state)
{
    uiResizeWindow(
        window.innerWidth, 
        state.windowHeight);
}    



function uiGetPluginData(key)
{
    console.log('uiGetPluginData()');
    uiPostMessageToFigma({ 
        cmd: 'figGetPluginData', 
        key:  key
    });
}



function uiGetPluginDataReturn(msg)
{
    console.log('uiGetPluginDataReturns()');
    // choose here which data is being returned

    switch (msg.key)
    {
        case 'graph':
            loadGraph(msg.value);
            break;
    }
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
//     uiPostMessageToFigma({ 
//         cmd:  'figSaveState', 
//         key:   key,
//         value: value
//     });
// }