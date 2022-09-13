// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = JSON.parse(e.data.pluginMessage);


    if (settings.logMessages)
        console.log('%cFIG '+msg.cmd+' --► UI', 'background: #08f; color: white;');


    switch (msg.cmd)
    {
        case 'uiEndStartGenerator':  uiEndStartGenerator (msg);                                          break;

        case 'uiLoadNodesAndConns':  uiLoadNodesAndConns (msg.nodesJson, msg.connsJson, msg.activeJson); break;
        
        case 'uiGetLocalDataReturn': uiGetLocalDataReturn(msg);                                          break;
        case 'uiGetPageDataReturn':  uiGetPageDataReturn (msg);                                          break;
        
        case 'uiEndResizeWindow':    uiEndResizeWindow   ();                                             break;
        
        case 'uiEndFigMessage':      uiEndFigMessage     (msg.msgCmd);                                   break;
    }
}    

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiPostMessageToFigma(msg)
{
    parent.postMessage({pluginMessage: JSON.stringify(msg)}, '*');

    if (settings.logMessages)
        console.log('%c%s FIG ◄-- UI '+msg.cmd, 'background: #bef; color: black;', '\n            ');
}



function uiQueueMessageToFigma(msg)
{
    figMessages.push(msg);
    uiPostNextMessageToFigma();
}



function uiPostNextMessageToFigma()
{
    if (figMessages.length > 0)
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

        uiPostMessageToFigma(msg);    
    }
}



function uiEndFigMessage(msgCmd)
{
    if (msgCmd == 'figUpdate')
        uiPostMessageToGenerator({cmd: 'genEndFigMessage'});

    //uiFigMessagePosted = false;
    uiPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                               from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    const msg = JSON.parse(e.data);

    switch (msg.cmd)
    {
        case 'uiEndGenMessage':          uiEndGenMessage();                                                                                                   break;
        case 'uiUpdateValuesAndObjects': uiUpdateValuesAndObjects      (msg.updateNodeId, msg.updateParamId, msg.values, msg.objects); break;
        case 'uiUpdateFindCorrection':   uiUpdateFindCorrectionProgress(msg.nodeId, msg.progress);                                                            break;
        case 'uiEndFindCorrection':      uiEndFindCorrection           (msg.nodeId, msg.success, msg.closestOrder, msg.closest1, msg.closest2, msg.closest3); break;
    }
};



function uiEndGenMessage()
{
    genMessagePosted = false;
    
    if (genMessages.length > 0)
        uiPostNextMessageToGenerator();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                                 to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiQueueMessageToGenerator(msg)
{
    genMessages.push(msg);
    uiPostNextMessageToGenerator();
}



function uiPostNextMessageToGenerator()
{
    if (    genMessages.length > 0
        && !genMessagePosted)
    {
        //console.log('message');
        let msg = genMessages.shift();

        if (msg.cmd == 'genRequest')
        {
            // move along the queue since only the last message is important
            while (genMessages.length > 0
                && genMessages[0].cmd        == msg.cmd
                && genMessages[0].request[0] == msg.request[0]
                && genMessages[0].request[1] == msg.request[1])
            {
                //console.log('skipping');
                msg = genMessages.shift();//deepCopy(genMessages.shift());
            }
        }

        uiPostMessageToGenerator(msg);
        genMessagePosted = true;
    }
}



function uiPostMessageToGenerator(msg)
{
    generator.postMessage(JSON.stringify(msg));

    if (settings.logMessages)
        console.log('%c%s UI '+msg.cmd+' --► GEN', 'background: #ffb; color: black;', '\n            ');
}

///////////////////////////////////////////////////////////////////////////////////////////////////