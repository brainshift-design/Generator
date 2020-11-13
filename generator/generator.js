const graph = new Graph();


onmessage = e =>
{
    switch (e.data.msg)
    {
        case 'createNode': createNode(e.data.opType); break;
    }
};


function createNode(opType)
{
    const node = graph.createNode(opType);

    postMessage({ 
        msg:     '_createNode',
        opType:   node.opType,
        dataType: node.dataType,
        nodeId:   node.id
    });
}


// function getObjectBounds(objects)
// {
//     var boundsL = Number.MAX_SAFE_INTEGER;
//     var boundsT = Number.MAX_SAFE_INTEGER;
//     var boundsR = Number.MIN_SAFE_INTEGER;
//     var boundsB = Number.MIN_SAFE_INTEGER;
    
//     for (const obj of objects)
//     {
//         boundsL = Math.min(boundsL, obj.x);
//         boundsT = Math.min(boundsT, obj.y);
//         boundsR = Math.max(boundsR, obj.x + obj.width);
//         boundsB = Math.max(boundsB, obj.y + obj.height);
//     }

//     return {
//         x: boundsL, 
//         y: boundsT,
//         w: boundsR - boundsL,
//         h: boundsB - boundsT };
// }