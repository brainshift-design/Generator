// from Figma -->
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'uiEndStartGenerator':  uiEndStartGenerator(msg);                                          break;
        case 'uiLoadNodesAndConns':  uiLoadNodesAndConns(msg.nodesJson, msg.connsJson, msg.activeJson); break;
        
        case 'uiGetLocalDataReturn': uiGetLocalDataReturn(msg);                                         break;
        case 'uiGetPageDataReturn':  uiGetPageDataReturn(msg);                                          break;
              
        case 'uiEndResizeWindow':    uiEndResizeWindow();                                               break;
              
        case 'uiForwardToGen':       uiPostMessageToGenerator(msg.msg);                                 break;
              
        case 'uiEndFigMessage':      uiEndFigMessage();                                                 break;
    }
}    
  
///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                               <-- from Generator
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    const msg = JSON.parse(e.data);

    switch (msg.cmd)
    {
        case 'uiUpdateFindCorrection': uiUpdateFindCorrectionProgress(msg.nodeId, msg.progress); break;
        case 'uiEndFindCorrection':    uiEndFindCorrection           (msg.nodeId, msg.success, msg.closestOrder, msg.closest1, msg.closest2, msg.closest3); break;

        // case 'uiMakeActive':        uiMakeActive    (msg.nodeIds);                            break;
        // case 'uiShowParamValue':    uiShowParamValue(msg.nodeId, msg.param, msg.value); break;
        // case 'uiUpdateNodes':       uiUpdateNodes   (msg.nodeIds);                            break;
        // case 'uiUpdateGraph':       uiUpdateGraph   ();                                          break;

        case 'uiUpdateValues':         uiUpdateValues                (msg.values);                  break;
        case 'uiUpdateObjects':        uiUpdateObjects               (msg.objects);                 break;

        case 'uiEndGenMessage':        uiEndGenMessage();                                           break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////




// <-- to Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiPostMessageToFigma(msg)
{
    figMessages.push(msg);
    uiPostNextMessageToFigma();
}



function uiPostNextMessageToFigma()
{
    if (    figMessages.length > 0
        && !figMessagePosted)
    {
        let msg = figMessages.shift();

        if (   msg.cmd == 'figResizeWindow'
            || msg.cmd == 'figUpdateObjects')
        {
            // move along the queue since only the last message is important
            while (figMessages.length > 0
                && figMessages[0].cmd == msg.cmd)
                msg = figMessages.shift();
        }

        parent.postMessage({pluginMessage: msg}, '*');    
        figMessagePosted = true;
    }
}



function uiEndFigMessage()
{
    figMessagePosted = false;
    uiPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                                 to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiPostMessageToGenerator(msg)
{
    genMessages.push(msg);
    uiPostNextMessageToGenerator();
}



function uiPostNextMessageToGenerator()
{
    if (    genMessages.length > 0
        && !genMessagePosted)
    {
        let msg = genMessages.shift();

        if (msg.cmd == 'genRequest')
        {
            // move along the queue since only the last message is important
            while (genMessages.length > 0
                && genMessages[0].cmd        == msg.cmd
                && genMessages[0].request[0] == msg.request[0]
                && genMessages[0].request[1] == msg.request[1])
                msg = genMessages.shift();
        }

        generator.postMessage(JSON.stringify(msg));
        genMessagePosted = true;
    }
}



function uiEndGenMessage()
{
    genMessagePosted = false;
    uiPostNextMessageToGenerator();
}

///////////////////////////////////////////////////////////////////////////////////////////////////