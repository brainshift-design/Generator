onmessage = function(e)
{
    if (e.data.msg === 'regenerate')
    {
        postMessage({ 
            cmd:    'regenerate',
            nodeId:  e.data.nodeId,
            data:    generate(e.data.data)
        });
    }
};


function generate(data)
{
    switch (data.type)
    {
        case 'number': return generateNumber(
        case 'rect'  : return generateRect  (data);
        case 'row'   : return generateRow   (data);
        case 'column': return generateColumn(data);
        case 'spread': return generateSpread(data);
    }    
}


function generateRect(obj)
{   
    return [{
        id:     obj.type,
        type:   obj.type,
        nodeId: obj.id,
        itemId: 'rect_0',
        x:      obj.x,
        y:      obj.y,
        width:  obj.width,
        height: obj.height
    }];
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
            item.itemId = 'row_' + i + '_' + j;

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
            item.itemId = 'column_' + i + '_' + j;

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
            item.itemId = 'spread_' + i + '_' + j;

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