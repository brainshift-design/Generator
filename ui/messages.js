// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'uiForwardToGen':        uiPostMessageToGenerator(msg.msg); break;
        case 'uiEndLoadState':        uiEndLoadState(msg);               break;
        case 'uiGetPluginDataReturn': uiGetPluginDataReturn(msg);        break;
        case 'uiEndResizeWindow':     uiEndResizeWindow();               break;

        case 'uiEndFigMessage':       uiPostNextMessageToFigma();        break;
    }    
}    
  
///////////////////////////////////////////////////////////////////////////////////////////////////



// from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'uiUpdateFindCorrection': uiUpdateFindCorrectionProgress(e.data.nodeId, e.data.progress); break;
        case 'uiEndFindCorrection':    uiEndFindCorrectionProgress   (e.data.nodeId, e.data.success, e.data.closestOrder, e.data.closest1, e.data.closest2, e.data.closest3); break;
        // case 'uiMakeActive':      uiMakeActive    (e.data.nodeIds);                            break;
        // case 'uiShowParamValue':  uiShowParamValue(e.data.nodeId, e.data.param, e.data.value); break;
        // case 'uiUpdateNodes':     uiUpdateNodes   (e.data.nodeIds);                            break;
        // case 'uiUpdateGraph':     uiUpdateGraph   ();                                          break;
        // case 'uiUpdateObjects':   uiUpdateObjects (e.data.objects);                            break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////






// <-- to Figma
function uiPostMessageToFigma(msg)
{
    figMessages.push(msg);
    uiPostNextMessageToFigma();
}



function uiPostNextMessageToFigma()
{
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
