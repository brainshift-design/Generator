var genFigMessagePosted = false;

var uiMessages          = [];


var figFonts            = [];
var figUniqueFontNames  = [];



// --> from UI
///////////////////////////////////////////////////////////////////////////////////////////////////

var lastMessage = null;


onmessage = function(e)
{
    const msg = JSON.parse(e.data);


    if (msg.cmd == 'returnUiGetValueForGenerator') // ignore this message in the queue
        return;
    

    if (msg.cmd == 'genRequest')
    {
        if (   lastMessage
            && lastMessage.cmd == 'genRequest')
            return;


        genRequest(msg.request, msg.save);         
    }
    else
    {
        switch (msg.cmd)
        {
            case 'initFonts':        initFonts(msg.fonts, msg.uniqueFontNames); break;
        
            case 'genEndUiMessage':  genEndUiMessage (msg.msgCmd);              break;
            case 'genEndFigMessage': genEndFigMessage();                        break;
        }

        lastMessage = null;
    }


    genPostMessageToUi(
    {
        cmd:   'uiEndGenMessage',
        msgCmd: msg.cmd
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to UI
///////////////////////////////////////////////////////////////////////////////////////////////////

function genPostMessageToUi(msg)
{
    if (msg == undefined)
    {
        consoleError('undefined message');
        console.trace();
    }

    postMessage(JSON.stringify(msg));
}



function genQueueMessageToUi(msg)
{
    uiMessages.push(msg);
    genPostNextMessageToUi();
}



function genPostNextMessageToUi(msg)
{
    if (!isEmpty(uiMessages))
    //    && !genFigMessagePosted)
    {
        //console.log('yes');
        let msg = uiMessages.shift();

        // while (   !isEmpty(uiMessages)
        //        &&  uiMessages[0].cmd     == 'uiUpdateValuesAndObjects'
        //        &&  uiMessages[0].chunkId == 0)
        // {
        //     const nextFirst = uiMessages.find(m => 
        //            m.cmd     == msg.cmd 
        //         && m.chunkId == 0);

        //     if (nextFirst)
        //     {
        //         while (!isEmpty(uiMessages)
        //             &&  uiMessages[0].cmd           == msg.cmd
        //             &&  uiMessages[0].updateNodeId  == msg.updateNodeId
        //             &&  uiMessages[0].updateParamId == msg.updateParamId
        //             &&  uiMessages[0].cmd.chunkId   >  0)
        //             msg = uiMessages.shift();

        //         msg = uiMessages.shift();
        //     }
        // }

        genPostMessageToUi(msg);
    }
}



function genEndUiMessage(msgCmd)
{
    //console.log('next UI message');
    genPostNextMessageToUi();
}



function genEndFigMessage()
{
    genFigMessagePosted = false;
    
    if (   !isEmpty(lastUpdateValues )
        || !isEmpty(lastUpdateObjects)
        || !isEmpty(lastUpdateStyles ))
    {
        genUpdateValuesAndObjects(
            lastRequestId,
            -1, 
            Number.MAX_SAFE_INTEGER, 
            lastUpdateNodeId, 
            lastUpdateParamId, 
            [], 
            [],
            [],
            false);
    }

    genPostNextMessageToUi();
}

///////////////////////////////////////////////////////////////////////////////////////////////////