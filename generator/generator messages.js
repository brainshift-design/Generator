var figMessages = []; // messages from Generator to Figma (through UI)
var figMessagePosted = false;



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
        
        case 'genRequest':        genRequest(msg.request, msg.settings); break;

        case 'genEndFigMessage':  genEndFigMessage();                    break;
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
        && !figMessagePosted)
    {
        let msg = figMessages.shift();

        // if (msg.cmd == 'uiUpdateObjects')
        // {
        //     // move along the queue since only the last message is important
        //     while (uiMessages.length > 0
        //         && uiMessages[0].cmd        == msg.cmd
        //         && uiMessages[0].request[0] == msg.request[0]
        //         && uiMessages[0].request[1] == msg.request[1])
        //         msg = uiMessages.shift();
        // }

        genPostMessageToUI({ cmd: 'uiForwardToFigma', msg: msg });
        figMessagePosted = true;
    }
}



function genEndFigMessage()
{
    figMessagePosted = false;
    genPostNextMessageToFigma();
}

///////////////////////////////////////////////////////////////////////////////////////////////////