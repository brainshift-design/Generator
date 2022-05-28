function getObjectBounds(objects)
{
    var boundsL = Number.MAX_SAFE_INTEGER;
    var boundsT = Number.MAX_SAFE_INTEGER;
    var boundsR = Number.MIN_SAFE_INTEGER;
    var boundsB = Number.MIN_SAFE_INTEGER;
    
    for (const obj of objects)
    {
        switch (obj[0])
        {
            case RECTANGLE:
                boundsL = Math.min(boundsL, obj[3]);
                boundsT = Math.min(boundsT, obj[4]);
                boundsR = Math.max(boundsR, obj[3] + obj[5]);
                boundsB = Math.max(boundsB, obj[4] + obj[6]);
                break;
        }
    }

    return {
        x: boundsL, 
        y: boundsT,
        w: boundsR - boundsL,
        h: boundsB - boundsT };
}