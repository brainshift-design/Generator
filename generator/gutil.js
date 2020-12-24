function getObjectBounds(first, count)
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (var i = first; i < first + count; i++)
    {
        const obj = objects[i];
        
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