var uiFigMessagePosted = false;



// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = JSON.parse(e.data.pluginMessage);


    if (settings.logMessages)
    {
        let _msg = msg.cmd;

        if (msg.cmd == 'uiEndFigMessage')
            _msg += ': ' + msg.msgCmd;

            console.log('%cFIG '+_msg+' --► UI', 'background: #08f; color: white;');
    }


    switch (msg.cmd)
    {
        case 'uiEndFigMessage':      uiEndFigMessage     (msg.msgCmd);                                   break;
        
        
        case 'uiEndStartGenerator':  uiEndStartGenerator (msg);                                          break;
        
        case 'uiLoadNodesAndConns':  uiLoadNodesAndConns (msg.nodesJson, msg.connsJson, msg.activeJson); break;
        
        case 'uiGetLocalDataReturn': uiGetLocalDataReturn(msg);                                          break;
        case 'uiGetPageDataReturn':  uiGetPageDataReturn (msg);                                          break;
        
        
        case 'uiEndResizeWindow':    uiEndResizeWindow   ();                                             break;
    }
}    

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiPostMessageToFigma(msg)
{
    uiFigMessagePosted = true;
    parent.postMessage({pluginMessage: JSON.stringify(msg)}, '*');

    if (settings.logMessages)
        console.log('%c%s FIG ◄-- UI '+msg.cmd, 'background: #bef; color: black;', '\n            ');
}



function uiQueueMessageToFigma(msg)
{
    uiFigMessages.push(msg);
    uiPostNextMessageToFigma();
}



function uiPostNextMessageToFigma()
{
    if (    uiFigMessages.length > 0
        && !uiFigMessagePosted)
    {
        let msg = uiFigMessages.shift();

        if (msg.cmd == 'figResizeWindow')
        {
            // move along the queue since only the last message is important
            while (uiFigMessages.length > 0
                && uiFigMessages[0].cmd == msg.cmd)
                msg = uiFigMessages.shift();
        }

        uiPostMessageToFigma(msg);    
    }
}



function uiEndFigMessage(msgCmd)
{
    uiFigMessagePosted = false;

    if (msgCmd == 'figUpdateObjects')
        uiPostMessageToGenerator({
            cmd:   'genEndFigMessage',
            msgCmd: msgCmd});

    uiPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                               from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    const msg = JSON.parse(e.data);

    if (settings.logMessages)
    {
        let _msg = msg.cmd;

        if (msg.cmd == 'uiEndGenMessage')
            _msg += ': ' + msg.msgCmd;

        console.log('%c%sUI ◄-- GEN '+_msg, 'background: #ca0; color: white;', '\n                        ');
    }

    switch (msg.cmd)
    {
        case 'uiEndGenMessage':          uiEndGenMessage();                                                                                             break;
        case 'uiUpdateValuesAndObjects': uiUpdateValuesAndObjects(msg.updateNodeId, msg.updateParamId, msg.values, msg.objects);                        break;
        case 'uiUpdateNodeProgress':     uiUpdateNodeProgress    (msg.nodeId, msg.progress);                                                            break;
        //case 'uiEndFindCorrection':    uiEndFindCorrection           (msg.nodeId, msg.success, msg.closestOrder, msg.closest1, msg.closest2, msg.closest3); break;
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