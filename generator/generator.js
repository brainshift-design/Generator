const ggraph = new GGraph();


onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'createNode': 
        {
            const node = ggraph.createNode(e.data.opType);
            
            node.id = e.data.nodeId;

            postMessage({ 
                msg:    'makeActive',
                nodeId:  node.id
            });
            
            break;
        }
        case 'setNodeId': 
        {
            const node = ggraph.nodeFromId(e.data.nodeId);
            node.id = e.data.newId;
            break;
        }
        case 'connect':
        {
            const outNode = ggraph.nodes.find(n => n.id == e.data.output);

            for (const input of e.data.inputs)
            {
                const inNode = ggraph.nodes.find(n => n.id == input.nodeId);

                ggraph.connect(
                    outNode.output, 
                    input.index >= 0
                    ? inNode.inputs[input.index]
                    : inNode.params.find(p => p.name == input.param).input);
            }

            break;
        }
        case 'disconnect':
            for (const input of e.data.inputs)
            {
                const inNode = ggraph.nodes.find(n => n.id == input.nodeId);
                ggraph.disconnect(inNode.inputs[input.index]);
            }
            break;
        
        case 'setParam':
        {
            const node  = ggraph.nodes.find(n => n.id == e.data.nodeId);
            const param = node.params.find(p => p.name == e.data.param);
            param.value = e.data.value;
            generate([node.id]);
            break;
        }

        case 'invalidate':
        {
            const node = ggraph.nodes.find(n => n.id == e.data.nodeId);
            node.valid = false;
            generate([node.id]);
            break;
        }

        case 'generate':
        {
            for (const node of ggraph.nodes)
                node.reset();
                
            var objects = [];
            
            for (const nodeId of e.data.nodeIds)
            {
                const node = ggraph.nodeFromId(nodeId);
                objects = objects.concat(node.output.getData());
            }

            postMessage({ 
                msg:    'recreateObjects',
                nodeIds: e.data.nodeIds,
                objects: objects
            });

            break;
        }
    }
};


function generate(nodeIds)
{
    postMessage({
        msg:    'requestGenerate',
        nodeIds: nodeIds
    });
}


// function generateSpread(node)
// {
//     var input  = generate(node.inputs[0]);
//     var bounds = getBounds(input);

//     var rnd = new Random(node.seed);

//     result = [];

//     var a = 0;

//     for (var i = 0; i < node.count; i++)
//     {
//         var d = rnd.next() * node.radius;
//         var v = vector(a, d);
        
//         for (var j = 0; j < input.length; j++)
//         {
//             var item = shallowCopy(input[j]);
//             item.itemId = node.nodeId + '_' + i + '_' + j;

//             item.x += v.x;
//             item.y += v.y;
            
//             result.push(item);
//         }

//         a += Tau * phi;
//     }

//     return result;
// }


function getBounds(objects)
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (const obj of objects)
    {
        boundsL = Math.min(boundsL, obj.x);
        boundsT = Math.min(boundsT, obj.y);
        boundsR = Math.max(boundsR, obj.x + obj.width);
        boundsB = Math.max(boundsB, obj.y + obj.height);
    }

    return {
        x: boundsL, 
        y: boundsT,
        w: boundsR - boundsL,
        h: boundsB - boundsT };
}