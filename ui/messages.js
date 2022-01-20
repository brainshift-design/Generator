// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    var msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'uiForwardToGen':        uiPostMessageToGenerator(msg.msg); break;
        case 'uiEndLoadState':        uiEndLoadState(msg);               break;
        case 'uiGetPluginDataReturn': uiGetPluginDataReturn(msg);        break;
        case 'uiClosePlugin':         uiClosePlugin();                   break;

        case 'uiFigMsgReceived':      uiPostNextMessageToFigma();        break;
      //case 'uiUpdatePanAndZoom': graphView.updatePanAndZoom();     break;
    }    
}    
  
///////////////////////////////////////////////////////////////////////////////////////////////////



// from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'uiMakeActive':      uiMakeActive    (e.data.nodeIds);                            break;
        case 'uiShowParamValue':  uiShowParamValue(e.data.nodeId, e.data.param, e.data.value); break;
        case 'uiUpdateNodes':     uiUpdateNodes   (e.data.nodeIds);                            break;
        case 'uiUpdateGraph':     uiUpdateGraph   ();                                          break;
        case 'uiUpdateObjects':   uiUpdateObjects (e.data.objects);                            break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////






// <-- to Figma
function uiPostMessageToFigma(msg)
{
    figMessages.push(msg);
}



function uiPostNextMessageToFigma()
{
    console.log('uiPostNextMessageToFigma()');
    if (figMessages.length > 0)
    {
        let msg = figMessages.shift();

        if (msg.cmd == 'figResizeWindow')
        {
            // move along the queue since only the last message is important
            while (figMessages.length > 0
                && figMessages[0].cmd == msg.cmd)
                msg = figMessages.shift();
        }

        parent.postMessage({pluginMessage: msg}, '*');    
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////



// to Generator -->
function uiPostMessageToGenerator(msg)
{
    generator.postMessage(msg);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
