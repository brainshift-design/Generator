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


function generate(obj)
{
    switch (obj.type)
    {
        case 'rect'  : return generateRect  (obj);
        case 'spread': return generateSpread(obj);
    }    
}


function generateRect(obj)
{   
    return [{
        id:     obj.type,
        type:   obj.type,
        nodeId: obj.id,
        itemId: obj.id + '_0',
        x:      Number.NaN,
        y:      Number.NaN,
        width:  obj.width,
        height: obj.height
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
            item.itemId = item.nodeId + '_' + j;

            item.x += v.x;
            item.y += v.y;
            
            result.push(item);
        }
    }

    return result;
}