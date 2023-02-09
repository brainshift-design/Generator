var genFigMessagePosted = false;



var uiMessages = [];



// --> from UI
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = function(e)
{
    const msg = JSON.parse(e.data);


    switch (msg.cmd)
    {
        case 'genRequest':       genRequest      (msg.request); break;
        case 'genStopGenerate':  genStopGenerate (msg);         break;

        case 'genEndUiMessage':  genEndUiMessage (msg.msgCmd);  break;
        case 'genEndFigMessage': genEndFigMessage();            break;
    }


    genPostMessageToUI({
        cmd:   'uiEndGenMessage',
        msgCmd: msg.cmd
    });
};

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
    if (!isEmpty(uiMessages))
        //&& !genFigMessagePosted)
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

        genPostMessageToUI(msg);
    }
}



function genEndUiMessage(msgCmd)
{
    //console.log('next UI message');
    genPostNextMessageToUI();
}



function genEndFigMessage()
{
    //console.log('next FIG message');

    genFigMessagePosted = false;
    
    if (   !isEmpty(lastUpdateValues .length)
        || !isEmpty(lastUpdateObjects.length)
        || !isEmpty(lastUpdateStyles .length))
        genUpdateValuesAndObjects(-1, lastUpdateNodeId, lastUpdateParamId, [], [], []);

    genPostNextMessageToUI();
}

///////////////////////////////////////////////////////////////////////////////////////////////////