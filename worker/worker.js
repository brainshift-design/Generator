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
    var boundsL = Number.MAX_VALUE;
    var boundsT = Number.MAX_VALUE;
    var boundsR = Number.MIN_VALUE;
    var boundsB = Number.MIN_VALUE;
    
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