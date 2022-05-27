/*

*/


var nextGenObjectId = 0;


const OBJ_RECT = 1;


//const genGraph          = new GGraph();
const deletedNodeArrays = []; // array of [id,nodeArray,actionId] tuples



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



function genPushUpdateParamValue(parse, nodeId, paramIndex, value)
{
    const found = parse.updateParamValues.find(v => 
           v[0] == nodeId 
        && v[1] == paramIndex);

    if (!found)
        parse.updateParamValues.push([nodeId, paramIndex, value]);
    else
        console.assert(found[2] == value);
}



function genPushUpdateOutputCache(parse, nodeId, outputIndex, cache)
{
    const found = parse.updateOutputCaches.find(v => 
           v[0] == nodeId 
        && v[1] == outputIndex);

    if (!found)
        parse.updateOutputCaches.push([nodeId, outputIndex, cache]);
    else
        found[2] = cache;
}



function genUpdateParamValues(updateNodeId, updateParamIndex, updateValues)
{
    // send messages in chunks

    const chunkSize = 20;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateValues.length)
    {
        chunk.push(
            updateValues[i][0],  // node id
            updateValues[i][1],  // param index
            updateValues[i][2]); // value

        if (++c == chunkSize)
        {
            genPostMessageToUi({ 
                cmd:    'uiUpdateParamValues',
                values: [updateNodeId, updateParamIndex, ...chunk]
            });

            chunk = [];
            c = 0;
        }

        i++;
    }

    if (chunk.length > 0)
    {
        genPostMessageToUi({ 
            cmd:    'uiUpdateParamValues',
            values: [updateNodeId, updateParamIndex, ...chunk]
        });
    }
}



function genUpdateOutputCaches(updateCaches)
{
    // send messages in chunks

    const chunkSize = 20;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateCaches.length)
    {
        chunk.push(
            updateCaches[i][0],  // node id
            updateCaches[i][1],  // output index
            updateCaches[i][2]); // cached value

        if (++c == chunkSize)
        {
            genPostMessageToUi({ 
                cmd:    'uiUpdateOutputCaches',
                caches:  chunk
            });

            chunk = [];
            c = 0;
        }

        i++;
    }

    if (chunk.length > 0)
    {
        genPostMessageToUi({ 
            cmd:    'uiUpdateOutputCaches',
            caches:  chunk
        });
    }
}