var genFigMessagePosted = false;



var  uiMessages = []; // messages from Generator to Figma (through UI)
var figMessages = []; // messages from Generator to Figma (through UI)



// --> from UI
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = function(e)
{
    const msg = JSON.parse(e.data);

    //console.log('msg.cmd', msg.cmd);
    switch (msg.cmd)
    {
        case 'genFindCorrection':
            genFindCorrection(
                msg.nodeId, 
                msg.inputColor, 
                msg.param1,  msg.param2,  msg.param3,
                msg.locked1, msg.locked2, msg.locked3);  
        
            break;
        
        case 'genRequest':        
            genRequest(msg.request, msg.settings);
            break;

        case 'genEndUiMessage':  
            genEndUiMessage();
            break;

        case 'genEndFigMessage':  
            genEndFigMessage();
            break;
    }


    postMessage(JSON.stringify({cmd: 'uiEndGenMessage'}));
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
    if (uiMessages.length > 0)
    {
        let msg = uiMessages.shift();

        if (msg.cmd == 'uiUpdateParams')
        {
            // move along the queue since only the last message is important
            while (uiMessages.length > 0
                && uiMessages[0].cmd       == msg.cmd
                && uiMessages[0].values[0] == msg.values[0]
                && uiMessages[0].values[1] == msg.values[1])
                msg = uiMessages.shift();
        }

        postMessage(JSON.stringify(msg));
    }
}



function genEndUiMessage()
{
    genPostNextMessageToUI();
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

function genQueueMessageToFigma(msg)
{
    figMessages.push(msg);
    genPostNextMessageToFigma();
}



function genPostNextMessageToFigma()
{
    if (figMessages.length > 0)
    {
        let msg = figMessages.shift();

        if (msg.cmd == 'figUpdateObjects')
        {
            // move along the queue since only the last message is important
            while (figMessages.length > 0
                && figMessages[0].cmd              == msg.cmd
                && figMessages[0].updateNodeId     == msg.updateNodeId
                && figMessages[0].updateParamIndex == msg.updateParamIndex)
                msg = figMessages.shift();
        }

        genPostMessageToUI({cmd: 'uiForwardToFigma', msg: msg});
        genFigMessagePosted = true;
    }
}



function genEndFigMessage()
{
    genFigMessagePosted = false;
    
    if (   lastUpdateValues .length > 0
        || lastUpdateObjects.length > 0)
    {
        console.log('restoring');

        genUpdateParamValuesAndObjects('', -1, [], []);
        clearLastUpdate();
    }

    genPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////