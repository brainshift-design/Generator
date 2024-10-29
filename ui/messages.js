var uiFigMessagePosted = false;



// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    let msg = JSON.parse(e.data.pluginMessage);


    if (msg.cmd == 'returnFigGetValue') // ignore this message in the queue
        return;


    if (   msg.cmd == 'uiForwardToGenerator'
        || msg.cmd == 'uiEndFigMessage')
    {
        if (settings.logThreadMessages)
            logFigToUi(msg);
    }
    else if (msg.cmd == 'uiReturnFigGetLocalData'
          || msg.cmd == 'uiReturnFigGetPageData'
          || msg.cmd == 'uiReturnFigSetLocalData')
    {
        if (settings.logDataMessages)
            logFigToUi(msg);
    }
    else 
        if (settings.logMessages)
            logFigToUi(msg);


    switch (msg.cmd)
    {
        case 'uiForwardToGenerator':              uiPostMessageToGenerator         (msg.msg);           break;
       
        case 'uiStylePropertyChange':             uiStylePropertyChange            (msg);               break;
        case 'uiStyleDelete':                     uiStyleDelete                    (msg);               break;
                   
        case 'uiEndFigMessage':                   uiEndFigMessage                  (msg.msgCmd);        break;
                                           
        case 'uiReturnFigStartGenerator':         uiReturnFigStartGenerator        (msg);               break;
                                                    
        case 'uiReturnFigLoadNodesAndConns':      uiReturnFigLoadNodesAndConns     (msg);               break;
                                                    
        case 'uiReturnFigSetLocalData':           uiReturnFigSetLocalData          (msg);               break;

        case 'uiReturnFigGetLocalData':           uiReturnFigGetLocalData          (msg);               break;
        case 'uiReturnFigGetPageData':            uiReturnFigGetPageData           (msg);               break;
                                                   
        case 'uiReturnFigGetVariableUpdates':     uiReturnFigGetVariableUpdates    (msg.variables);     break;

        case 'uiReturnFigResizeWindow':           uiReturnFigResizeWindow          (msg);               break;
                           
        case 'uiReturnFigGetAllLocalVariables':   uiReturnFigGetAllLocalVariables  (msg);               break;
        case 'uiReturnFigLinkNodeToVariable':     uiReturnFigLinkNodeToVariable    (msg);               break;

        case 'uiReturnFigGetAllLocalColorStyles': uiReturnFigGetAllLocalColorStyles(msg);               break;
        case 'uiReturnGetAllLocalTemplateNames':  uiReturnGetAllLocalTemplateNames (msg.templateNames); break;
        
        case 'uiReturnFigGetMousePosition':       uiUpdateWindowStartRect          (msg);               break;

        case 'uiReturnFigSaveSnapshot':           uiReturnFigSaveSnapshot          (msg);               break;
        
        case 'uiReturnFigRelinkVariable':         uiReturnFigRelinkVariable        (msg);               break;

        case 'uiSetStyleId':                      uiSetStyleId                     (msg);               break;
        case 'uiHideClearUndoWarning':            uiHideClearUndoWarning           ();                  break;

        case 'uiUpdateZoom':                      uiUpdateZoom                     (msg.zoom);          break;

        case 'uiUpdateGroupBounds':               uiUpdateGroupBounds              (msg);               break;

        case 'uiGetValueForFigma':                uiGetValueForFigma               (msg);               break;

        case 'updateMetrics':                     updateMetrics                    ();                  break;       
    }
};



function logFigToUi(msg)
{
    let _msg = msg.cmd;

    if (msg.cmd == 'uiEndFigMessage')
        _msg += ': ' + msg.msgCmd;

    console.log('%cFIG '+_msg+' --► UI', 'background: #08f; color: white;');
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

function uiPostMessageToFigma(msg)
{
    uiFigMessagePosted = true;
    parent.postMessage({pluginMessage: JSON.stringify(msg)}, '*');

    
    if (   msg.cmd == 'figGetLocalData'
        || msg.cmd == 'figSetLocalData'
        || msg.cmd == 'figGetPageData'
        || msg.cmd == 'figSetPageData')
    {
        if (settings.logDataMessages)
            logUiToFig(msg);
    }
    else 
        if (settings.logMessages)
            logUiToFig(msg);
}



function logUiToFig(msg)
{
    console.log('%c%s FIG ◄-- UI ' + msg.cmd, 'background: #bef; color: black;', '\n            ');    
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


    if (   msg.cmd == 'uiForwardToFigma'
        || msg.cmd == 'uiEndGenMessage')
    {
        if (settings.logThreadMessages)
            logGenToUi(msg);
    }
    else 
        if (settings.logMessages)
            logGenToUi(msg);


    switch (msg.cmd)
    {
        case 'uiEndGenMessage': uiEndGenMessage(); break;
        
        case 'uiUpdateValuesAndObjects': 
            uiUpdateValuesAndObjects(
                parseInt(msg.requestId), 
                msg.actionId, 
                msg.updateNodeId, 
                msg.updateParamId,
                msg.objectBatchSize, 
                msg.totalObjects,
                msg.values, 
                msg.objects, 
                msg.styles,
                msg.updatedNodes,
                msg.totalNodes,
                msg.isFirstChunk,
                msg.isLastChunk,
                msg.save);  
                
            break;
        
        case 'uiInitNodeProgress':   
        {
            const node = nodeFromId(msg.nodeId);

            if (node)
                node.initProgress();      

            break;
        }
        
        case 'uiUpdateNodeProgress': 
        {
            const node = nodeFromId(msg.nodeId);

            if (node) 
                node.updateProgress(msg); 

            break;
        }

        case 'uiEndNodeProgress':    
        {
            const node = nodeFromId(msg.nodeId);

            if (node)
                node.endProgress();       

            break;
        }

        case 'uiInitGlobalProgress':   uiInitGlobalProgress(msg.requestId);      break;
        case 'uiEndGlobalProgress':    uiEndGlobalProgress();                    break;
  
        case 'uiGetValueForGenerator': uiGetValueForGenerator(msg);              break;
        
        case 'uiForwardToFigma':       uiPostMessageToFigma(msg.msg);            break;
    }
};



function logGenToUi(msg)
{
    let _msg = msg.cmd;

    if (msg.cmd == 'uiEndGenMessage')
        _msg += ': ' + msg.msgCmd;

    console.log('%c%sUI ◄-- GEN '+_msg, 'background: #ca0; color: white;', '\n');
}



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
    
    if (!genMessagePosted)
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
            && genMessages[1].request[3] == msg.request[3]
            && genMessages[1].request[4] == msg.request[4])
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
    
    
    if (      settings.logThreadMessages
        && msg.cmd == 'genEndUiMessage'
        && msg.cmd == 'genEndFigMessage'
     ||    settings.logMessages
        && msg.cmd != 'genEndUiMessage'
        && msg.cmd != 'genEndFigMessage')
        console.log('%c%s UI '+msg.cmd+' --► GEN', 'background: #ffb; color: black;', '\n            ');
}

///////////////////////////////////////////////////////////////////////////////////////////////////