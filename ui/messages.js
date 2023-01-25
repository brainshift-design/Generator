var uiFigMessagePosted = false;



// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = JSON.parse(e.data.pluginMessage);


    if (settings.logMessages)
    {
        let _msg = msg.cmd;

        if (msg.cmd == 'uiReturnFigMessage')
            _msg += ': ' + msg.msgCmd;

            console.log('%cFIG '+_msg+' --► UI', 'background: #08f; color: white;');
    }


    switch (msg.cmd)
    {
        case 'uiReturnFigMessage':           uiReturnFigMessage          (msg.msgCmd); break;
              
        case 'uiReturnFigStartGenerator':    uiReturnFigStartGenerator   (msg);        break;
        
        case 'uiReturnFigLoadNodesAndConns': uiReturnFigLoadNodesAndConns(msg);        break;
        
        case 'uiReturnFigGetLocalData':      uiReturnFigGetLocalData     (msg);        break;
        case 'uiReturnFigGetPageData':       uiReturnFigGetPageData      (msg);        break;
              
        case 'uiReturnFigResizeWindow':      uiReturnFigResizeWindow     ();           break;
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



function uiReturnFigMessage(msgCmd)
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
        case 'uiEndGenMessage':          uiEndGenMessage();                                                                                                 break;
        case 'uiUpdateValuesAndObjects': uiUpdateValuesAndObjects(msg.actionId, msg.updateNodeId, msg.updateParamId, msg.values, msg.objects, msg.styles);  break;
        case 'uiStartNodeProgress':      uiStartNodeProgress     (msg.nodeId);                                                                              break;
        case 'uiUpdateNodeProgress':     uiUpdateNodeProgress    (msg.nodeId, msg.progress);                                                                break;
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
    if (genMessages.length > 0)
    {
        let msg = genMessages[0];
        
        if (msg.cmd == 'genRequest')
        {
            // move along the queue since only the last message is important
            while (genMessages.length > 1
                && genMessages[1].cmd        == msg.cmd
                && genMessages[1].request[2] == msg.request[2]
                && genMessages[1].request[3] == msg.request[3])
            {
                genMessages.shift();
                msg = genMessages[0];
            }
        }

        
        if (!genMessagePosted)
        {
            genMessages.shift();
            uiPostMessageToGenerator(msg);

            genMessagePosted = true;
        }
    }
}



function uiPostMessageToGenerator(msg)
{
    generator.postMessage(JSON.stringify(msg));

    if (settings.logMessages)
        console.log('%c%s UI '+msg.cmd+' --► GEN', 'background: #ffb; color: black;', '\n            ');
}

///////////////////////////////////////////////////////////////////////////////////////////////////