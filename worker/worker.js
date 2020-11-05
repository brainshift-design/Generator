onmessage = function(e)
{
    if (e.data.msg === 'regenerateNode')
    {
        var objects = generate(e.data.data);

        postMessage({ 
            cmd:    'regenerateNode',
            nodeId:  e.data.nodeId,
            objects: objects
        });
    }
};


function generate(node)
{
    switch (node.type)
    {
        case 'rect'  : return generateRect  (node);
        case 'spread': return generateSpread(node);
    }    
}


function generateRect(node)
{   
    return [{
        id:     node.type,
        type:   node.type,
        nodeId: node.id,
        x:      0,
        y:      0,
        width:  node.width,
        height: node.height
    }];
}


function generateSpread(node)
{
    var input = generate(node.inputs[0]);


    var rnd = new Random(node.seed);

    result = [];

    for (var i = 0; i < node.count; i++)
    {
        var a = rnd.next() * Tau;
        var d = rnd.next() * node.radius;
        
        var v = vector(a, d);
        
        for (var j = 0; j < input.length; j++)
        {
            var item = Object.assign({}, input[j]);
            
            item.x += v.x;
            item.y += v.y;
            
            result.push(item);
        }
    }

    return result;
}