var genFigMessagePosted = false;



var uiMessages = [];



// --> from UI
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = function(e)
{
    const msg = JSON.parse(e.data);


    switch (msg.cmd)
    {
        case 'genFindCorrection':
            genFindCorrection(
                msg.nodeId, 
                msg.inputColor, 
                msg.param1,  msg.param2,  msg.param3,
                msg.locked1, msg.locked2, msg.locked3);  
        
            break;
        
        case 'genRequest':        genRequest(msg.request, msg.settings); break;

        case 'genEndUiMessage':   genEndUiMessage(msg.msgCmd);           break;
        case 'genEndFigMessage':  genEndFigMessage();                    break;
    }


    genPostMessageToUI({cmd: 'uiEndGenMessage'});
};



function genEndUiMessage(msgCmd)
{
    genPostNextMessageToUI();
}



function genEndFigMessage()
{
    genFigMessagePosted = false;
    
    if (   lastUpdateValues .length > 0
        || lastUpdateObjects.length > 0)
        genUpdateValuesAndObjects('', '', [], []);

    genPostNextMessageToUI();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to UI
///////////////////////////////////////////////////////////////////////////////////////////////////

function genPostMessageToUI(msg)
{
    postMessage(JSON.stringify(msg));
}



function genQueueMessageToUI(msg)
{
    uiMessages.push(msg);
    genPostNextMessageToUI();
}



function genPostNextMessageToUI(msg)
{
    if (uiMessages.length > 0)
    {
        let msg = uiMessages.shift();

        if (msg.cmd == 'uiUpdateParamsAndObjects')
        {
            // move along the queue since only the last message is important
            while (uiMessages.length > 0
                && uiMessages[0].cmd           == msg.cmd
                && uiMessages[0].updateNodeId  == msg.updateNodeId
                && uiMessages[0].updateParamId == msg.updateParamId)
                msg = uiMessages.shift();
        }

        if (    msg.cmd != 'uiUpdateParamsAndObjects'
            || !genFigMessagePosted)
            postMessage(JSON.stringify(msg));
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////