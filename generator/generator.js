const ggraph = new GGraph();


onmessage = function(e)
{
    console.log('generator msg = ' + e.data.msg);
    switch (e.data.msg)
    {
        case 'createNode': 
            ggraph.createNode(e.data.opType);
            break;

        case 'connect':
        {
            const outNode = ggraph.nodes.find(n => n.id == e.data.output);
            const  inNode = ggraph.nodes.find(n => n.id == e.data.input[0]);
            ggraph.connect(outNode.output, inNode.inputs[e.data.input[1]]);
            break;
        }
        case 'disconnect':
            ggraph.disconnect(e.data.opType);
            break;


        case 'generate':
        {
            console.log('generator msg generate');
            const objects = [];

            for (const nodeId of e.data.nodeIds)
                objects = objects.concat(generate(nodeId));

            postMessage({ 
                cmd:    'updateObjects',
                nodeId:  e.data.nodeId,
                objects: objects
            });

            break;
        }
    }
};


function generate(nodeId)
{
    console.log('generator generate()');
    const node = ggraph.nodeFromId(nodeId).generate();
}


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