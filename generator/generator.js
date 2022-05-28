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
        
        case 'genRequest': genRequest(msg.request, msg.settings); break;
        // case 'genCreateNode':    genCreateNode   (e.data.nodeType,   e.data.nodeId, e.data.nodeId); break; 
        // case 'genDeleteNodes':   genDeleteNodes  (e.data.nodeIds,  e.data.uiActionId);            break;             
        // case 'genUndeleteNodes': genUndeleteNodes(e.data.uiActionId);                             break;             
        // case 'genSetNodeId':     genSetNodeId    (e.data.nodeId,   e.data.newId);                 break; 
        // case 'genSetActive':     genSetActive    (e.data.nodeId,   e.data.active);                break;  // only state, no regeneration
        // case 'genConnect':       genConnect      (e.data.outputId, e.data.inputs);                break; 
        // case 'genDisconnect':    genDisconnect   (e.data.input);                                  break;
        // case 'genSetParam':      genSetParam     (e.data.nodeId,   e.data.param, e.data.value);   break;
        // case 'genInvalidate':    genInvalidate   (e.data.nodeId);                                 break;
        // case 'genUpdateObjects': genUpdateObjects(e.data.nodeIds);                                break;
    }

    genPostMessageToUi({cmd: 'uiEndGenMessage'});
};

///////////////////////////////////////////////////////////////////////////////////////////////////



function genPostMessageToUi(msg)
{
    postMessage(JSON.stringify(msg)); // this call is too ambiguous to understand when reading code
}



///////////////////////////////////////////////////////////////////////////////////////////////////
