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
            const  inNode = ggraph.nodes.find(n => n.id == e.data.inputs[0]);
            ggraph.connect(outNode.output, inNode.inputs[e.data.input[1]]);
            break;
        }
        case 'disconnect':
            ggraph.disconnect(e.data.opType);
            break;


        case 'generate':
        {
            var data = [];

            for (const nodeId of e.data.nodeIds)
            {
                const node = ggraph.nodeFromId(nodeId);
                data = data.concat(node.output.data);
            }

            postMessage({ 
                msg:  'updateData',
                data: data
            });

            break;
        }
    }
};


function generateRow(node)
{
    var input  = generate(node.inputs[0]);
    var bounds = getBounds(input);

    result = [];

    for (var i = 0, x = 0; i < node.count; i++)
    {
        for (var j = 0; j < input.length; j++)
        {
            var item = shallowCopy(input[j]);
            item.itemId = node.nodeId + '_' + i + '_' + j;

            item.x += x;
            
            result.push(item);
        }
        
        x += bounds.w + node.gap;
    }

    return result;
}


function generateColumn(node)
{
    var input  = generate(node.inputs[0]);
    var bounds = getBounds(input);

    result = [];

    for (var i = 0, y = 0; i < node.count; i++)
    {
        for (var j = 0; j < input.length; j++)
        {
            var item = shallowCopy(input[j]);
            item.itemId = node.nodeId + '_' + i + '_' + j;

            item.y += y;
            
            result.push(item);
        }
        
        y += bounds.h + node.gap;
    }

    return result;
}


function generateSpread(node)
{
    var input  = generate(node.inputs[0]);
    var bounds = getBounds(input);

    var rnd = new Random(node.seed);

    result = [];

    var a = 0;

    for (var i = 0; i < node.count; i++)
    {
        var d = rnd.next() * node.radius;
        var v = vector(a, d);
        
        for (var j = 0; j < input.length; j++)
        {
            var item = shallowCopy(input[j]);
            item.itemId = node.nodeId + '_' + i + '_' + j;

            item.x += v.x;
            item.y += v.y;
            
            result.push(item);
        }

        a += Tau * phi;
    }

    return result;
}


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