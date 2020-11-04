onmessage = function(e)
{
    if (e.data.msg === 'generate')
    {
        var objects = generate(e.data.graph);

        postMessage({ 
            cmd:    'updateCanvas',
            objects: objects
        });
    }
};


function generate(node, result = null)
{
    if (result == null)
        result = [];
    
    switch (node.type)
    {
        case 'rect'  : result = generateRect  (node); break;
        case 'spread': result = generateSpread(node, result); break;
    }    

    return result;
}


function generateRect(node)
{   
    return [{
        id:     node.id,
        type:   node.type,
        x:      0,
        y:      0,
        width:  node.width,
        height: node.height
    }];
}


function generateSpread(node, result)
{
    var input = result;
    result = [];
    
    var rnd = new Random(node.seed);

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