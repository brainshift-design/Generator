onmessage = function(e)
{
    if (e.data.msg === 'regenerateObjects')
    {
        var objects = generate(e.data.data);

        postMessage({ 
            cmd:    'regenerateObjects',
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
        case 'row'   : return generateRow   (obj);
        case 'column': return generateColumn(obj);
    }    
}


function generateRect(obj)
{   
    return [{
        id:     obj.type,
        type:   obj.type,
        nodeId: obj.id,
        itemId: 'rect_0',
        x:      0,//Number.NaN,
        y:      0,//Number.NaN,
        width:  obj.width,
        height: obj.height
    }];
}


function generateRow(node)
{
    var input = generate(node.inputs[0]);

    result = [];

    for (var i = 0, x = 0; i < node.count; i++)
    {
        for (var j = 0; j < input.length; j++)
        {
            var item = deepCopy(input[j]);
            item.itemId = 'row_' + i + '_' + j;

            item.x += x;
            
            result.push(item);
        }
        
        x += item.width + node.gap;
    }

    return result;
}


function generateColumn(node)
{
    var input = generate(node.inputs[0]);

    result = [];

    for (var i = 0, y = 0; i < node.count; i++)
    {
        for (var j = 0; j < input.length; j++)
        {
            var item = deepCopy(input[j]);
            item.itemId = 'column_' + i + '_' + j;

            item.y += y;
            
            result.push(item);
        }
        
        y += item.height + node.gap;
    }

    return result;
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
            var item = deepCopy(input[j]);
            item.itemId = 'spread_' + i + '_' + j;

            item.x += v.x;
            item.y += v.y;
            
            result.push(item);
        }
    }

    return result;
}
