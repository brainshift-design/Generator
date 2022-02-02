// function uiLoadState(state)
// {
//     uiResizeWindow(
//         window.innerWidth, 
//         state.windowHeight);
// }    



function uiGetPluginData(key)
{
    uiPostMessageToFigma({ 
        cmd: 'figGetPluginData', 
        key:  key
    });
}



function uiGetPluginDataReturn(msg)
{
    // choose here which data is being returned

    switch (msg.key)
    {
        case 'graph':
            loadGraph(msg.value);
            break;
    }
}



function uiEndResizeWindow()
{
    graphView.updatePanAndZoom();

    btnZoom.style.top  = 0;
    btnZoom.style.left = window.innerWidth - btnZoom.offsetWidth;

    btnToggleWires.style.top  = 0;
    btnToggleWires.style.left = btnZoom.offsetLeft - btnToggleWires.offsetWidth;
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