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
    switch (e.data.msg)
    {
        case 'genFindCorrection':   
            genFindCorrection(
                e.data.nodeId, 
                e.data.inputColor, 
                e.data.param1,  e.data.param2,  e.data.param3,
                e.data.locked1, e.data.locked2, e.data.locked3);  
        
            break;
        
        case 'genParseRequest':  console.log('gen request', e.data.request); genParseRequest(e.data.request); break;
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
};

///////////////////////////////////////////////////////////////////////////////////////////////////



function genPostMessageToUi(msg)
{
    postMessage(msg); // this call is too ambiguous to understand when reading code
}



///////////////////////////////////////////////////////////////////////////////////////////////////



// some parse functions return values
// some parse functions update values
// some parse functions update objects



function genParseRequest(req, parse = {pos:0})
{
    const stackOverflowProtect = 100;

    nextGenObjectId = 0;

    for (so = 0; parse.pos < req.length && so < stackOverflowProtect; )
    {
        const next = req[parse.pos];

             if (next == NUMBER   )     genNumber   (req, parse.pos);
        else if (next == RECTANGLE)     genRectangle(req, parse.pos);
        else if (strIsNum(next)) return genNumValue (req, parse.pos);
        else so++;
    }
}



function genNumValue(req, parse)
{
    // values are always a value/decimals pair

    const val = parseFloat(req[parse.pos++]);

    parse.pos++; // decimals

    return val;
}



function genNumber(req, parse)
{
    parse.pos++;

    const nodeId = req[parse.pos++];
    const val    = genParseRequest(req, parse);

    genPostMessageToUi({ 
        msg:    'uiUpdateValues',
        values: [{
            nodeId:     nodeId,
            paramIndex: 0, 
            value:      val }]
    });

    return val;
}



function genRectangle(req, i)
{
    genPostMessageToUi({ 
        msg:    'uiUpdateObjects',
        objects: [{
            type:   OBJ_RECT,
            id:     nextGenObjectId++,
            nodeId: req[i+1],
            x:      req[i+2],
            y:      req[i+3],
            width:  req[i+4],
            height: req[i+5],
            angle:  req[i+6],
            round:  req[i+7] }]
    });
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
//         msg:     'uiMakeActive',
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
//         msg:    'uiMakeActive',
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
//             msg:    'uiUpdateNodes',
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
//             msg:    'uiUpdateObjects',
//             objects: objects
//         });
//     }
//     // else
//     // {
//     //     genPostMessageToUi({ msg: 'uiUpdateGraph' });
//     // }
// }
