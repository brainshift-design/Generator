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



function genUpdateValues(updateNodeId, updateParamIndex, updateValues)
{
    // send messages in chunks

    const chunkSize = 10;
    
    let i = 0, 
        c = 0;
    
    let chunk = [];
    
    while (i < updateValues.length)
    {
        chunk.push(
            updateValues[i++],  // node id
            updateValues[i++],  // param index
            updateValues[i++]); // value

        if (++c == chunkSize)
        {
            genPostMessageToUi({ 
                cmd:    'uiUpdateValues',
                values: [updateNodeId, updateParamIndex, ...chunk]
            });

            chunk = [];
            c = 0;
        }
    }

    if (chunk.length > 0)
    {
        genPostMessageToUi({ 
            cmd:    'uiUpdateValues',
            values: [updateNodeId, updateParamIndex, ...chunk]
        });
    }
}



// function genClearGraph()
// {
//     genGraph.clear();
// }



// function genCreateNode(type, id, name)
// {
//     const node = genGraph.createNode(type, id, name);
//     genGraph.addNode(node);

//     // on the UI side the node has already been created by this point

//     genPostMessageToUi({
//         cmd:     'uiMakeActive',
//         nodeIds: [node.id]
//     });
// }



// function genDeleteNodes(nodeIds, uiActionId)
// {
//     var deleted = genGraph.deleteNodes(nodeIds);
//     deletedNodeArrays.push([uiActionId, deleted]);
// }



// function genUndeleteNodes(uiActionId)
// {
//     var deleted = deletedNodeArrays.find(n => n[0] == uiActionId);
//     var nodeIds = [];


//     for (const node of deleted[1])
//     {
//         genGraph.addNode(node);
//         nodeIds.push(node.id);
//     }

    
//     genPostMessageToUi({ 
//         cmd:    'uiMakeActive',
//         nodeIds: nodeIds
//     });

    
//     removeFromArray(deletedNodeArrays, deleted);
// }



// function genSetNodeId(id, newId)
// {
//     const node = genGraph.nodeFromId(id);
//     node.id    = newId;
// }



// function genSetActive(nodeId, active)
// {
//     const node  = genGraph.nodeFromId(nodeId);
//     node.active = active;
// }



// function genConnect(outputId, inputs)
// {
//     const outNode = genGraph.nodeFromId(outputId);

//     for (const input of inputs)
//     {
//         const inNode = genGraph.nodeFromId(input.nodeId);

//         genGraph.connect(
//             outNode.output, 
//             input.index >= 0
//             ? inNode.inputs[input.index]
//             : inNode.params.find(p => p.name == input.param).input);

//         if (inNode.type == 'object')
//             genUpdateObjects([input.nodeId]);
//     }
// }



// function genDisconnect(input)
// {
//     const node = genGraph.nodeFromId(input.nodeId);
//     genGraph.disconnect(node.inputs[input.index]);
// }



// function genSetParam(nodeId, name, value)
// {
//     const node  = genGraph.nodeFromId(nodeId);
//     const param = node.params.find(p => p.name == name);

//     param.value = value;

//     updateNodeGraph(node);
// }



// function updateNodeGraph(_node)
// {
//     const node = nodeFromId(_node.id);

//     let activeId = activeNodeInTree(node).id;

//     if (activeId > -1)
//     {
//         genPostMessageToUi({ 
//             cmd:    'uiUpdateNodes',
//             nodeIds: [activeId]
//         });
//     }
// }



// function genInvalidate(nodeId)
// {
//     const node = nodeFromId(nodeId);
//     node.valid = false;
// }



// function genUpdateObjects(nodeIds)
// {
//     for (const node of genGraph.nodes)
//         node.reset();


//     // first determine number of objects

//     let nObjects = 0;

//     for (const nodeId of nodeIds)
//     {
//         const node = genGraph.nodeFromId(nodeId);
//         const data = node.output.getData();
//         nObjects  += data.length;
//     }    

    
//     // now create the objects if necessary

//     if (nObjects > 0)
//     {
//         const objects = new Array(nObjects);

//         let i = 0;
//         for (const nodeId of nodeIds)
//         {
//             const node = genGraph.nodeFromId(nodeId);
//             const data = node.output.getData();
            
//             for (const obj of data)
//                 objects[i++] = obj;
//         }    

//         genPostMessageToUi({ 
//             cmd:    'uiUpdateObjects',
//             objects: objects
//         });
//     }
//     // else
//     // {
//     //     genPostMessageToUi({ cmd: 'uiUpdateGraph' });
//     // }
// }
