var genFigMessagePosted = false;



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
    if (    figMessages.length > 0
        && !genFigMessagePosted)
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
    genPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////