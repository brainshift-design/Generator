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
        case 'uiForwardToGenerator':              uiPostMessageToGenerator         (msg.msg);      break;

        case 'uiStylePropertyChange':             uiStylePropertyChange            (msg);          break;
        case 'uiStyleDelete':                     uiStyleDelete                    (msg);          break;
            
        case 'uiEndFigMessage':                   uiEndFigMessage                  (msg.msgCmd);   break;
                                    
        case 'uiReturnFigStartGenerator':         uiReturnFigStartGenerator        (msg);          break;
                                             
        case 'uiReturnFigLoadNodesAndConns':      uiReturnFigLoadNodesAndConns     (msg);          break;
                                             
        case 'uiReturnFigGetLocalData':           uiReturnFigGetLocalData          (msg);          break;
        case 'uiReturnFigGetPageData':            uiReturnFigGetPageData           (msg);          break;
                                                   
        case 'uiReturnFigResizeWindow':           uiReturnFigResizeWindow          ();             break;
                           
        case 'uiReturnFigGetAllLocalColorStyles': uiReturnFigGetAllLocalColorStyles(msg);          break;

        case 'uiReturnFigGetMousePosition':       uiUpdateWindowStartRect          (msg);          break;

        case 'uiSetStyleId':                      uiSetStyleId                     (msg);          break;
        case 'uiHideClearUndoWarning':            uiHideClearUndoWarning           ();             break;
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
    if (   !isEmpty(uiFigMessages)
        && !uiFigMessagePosted)
    {
        let msg = uiFigMessages.shift();


        if (   msg.cmd == 'figResizeWindow'
            || msg.cmd == 'figSetWindowRect')
        {
            // move along the queue since only the last message is important
            while (!isEmpty(uiFigMessages)
                &&  uiFigMessages[0].cmd == msg.cmd)
                msg = uiFigMessages.shift();
        }


        uiPostMessageToFigma(msg);    
    }
}



function uiEndFigMessage(msgCmd)
{
    uiFigMessagePosted = false;

    //if (msgCmd == 'figUpdateObjectsAndStyles')
    //{
        uiPostMessageToGenerator({
            cmd:      'genEndFigMessage',
            msgCmd:    msgCmd });
    //}

    uiPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                               from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    //console.log('e =', e);
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
        case 'uiEndGenMessage': uiEndGenMessage(); break;
        
        case 'uiUpdateValuesAndObjects': 
            uiUpdateValuesAndObjects(
                parseInt(msg.requestId), 
                msg.actionId, 
                msg.updateNodeId, 
                msg.updateParamId, 
                msg.values, 
                msg.objects, 
                msg.styles,
                msg.updatedNodes,
                msg.totalNodes,
                msg.isLastChunk);  
                
            break;
        
        case 'uiInitNodeProgress':   nodeFromId(msg.nodeId).initProgress();                break;
        case 'uiUpdateNodeProgress': nodeFromId(msg.nodeId).updateProgress(msg.progress);  break;
        
        case 'uiForwardToFigma':     uiPostMessageToFigma(msg.msg);                                        break;
    }
};



function uiEndGenMessage()
{
    genMessagePosted = false;
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
    if (isEmpty(genMessages))
        return;


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



function uiPostMessageToGenerator(msg)
{
    generator.postMessage(JSON.stringify(msg));

    if (settings.logMessages)
        console.log('%c%s UI '+msg.cmd+' --► GEN', 'background: #ffb; color: black;', '\n            ');
}

///////////////////////////////////////////////////////////////////////////////////////////////////