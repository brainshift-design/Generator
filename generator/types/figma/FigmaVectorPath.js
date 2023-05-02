class FigmaVectorPath
extends FigmaShape
{
    x;
    y;
    pathData;
    winding;
    round;



    constructor(nodeId, objectId, points, degree, winding, round)
    {
        super(VECTOR_PATH, nodeId, objectId);
        
        this.pathData = getPathDataFromPoints(points, degree);
        

        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;

        for (const p of points)
        {
            minX = Math.min(minX, p.x.toNumber());
            minY = Math.min(minY, p.y.toNumber());
        }


        this.x = minX;
        this.y = minY;
        
        
        // for (const p of points)
        // {
        //     p.x.value -= minX;
        //     p.y.value -= minY;
        // }


        this.winding  = winding;
        this.round    = round;
    }



    copy()
    {
        const copy = new FigmaVectorPath(
            this.nodeId,
            this.objectId,
            [], 0,
            this.winding,
            this.round);

        copy.pathData = this.pathData;

        copy.copyBase(this);

        return copy;
    }
}



function getPathDataFromPoints(points, degree)
{
    let pathData = '';


    switch (degree)
    {
    case 0: // linear
        if (points.length < 2)
            break;

        pathData += 'M';
        pathData += ' ' + points[0].x.toNumber();
        pathData += ' ' + points[0].y.toNumber();

        for (let i = 1; i < points.length; i++)
        {
            pathData += 
                  ' L'
                + ' ' + points[i].x.toNumber()
                + ' ' + points[i].y.toNumber();
        }

        break;

    case 1: // quadratic
        if (points.length < 3)
            break;

        pathData += 'M';
        pathData += ' ' + points[0].x.toNumber();
        pathData += ' ' + points[0].y.toNumber();

        for (let i = 1; i < points.length-1; i += 2)
        {
            pathData += 
                    ' Q'
                + ' ' + points[i  ].x.toNumber()
                + ' ' + points[i  ].y.toNumber()
                + ' ' + points[i+1].x.toNumber()
                + ' ' + points[i+1].y.toNumber();
        }

        break;

    case 2: // cubic
        if (points.length < 4)
            break;

        pathData += 'M';
        pathData += ' ' + points[0].x.toNumber();
        pathData += ' ' + points[0].y.toNumber();

        for (let i = 1; i < points.length-2; i += 3)
        {
            pathData += 
                    ' C'
                + ' ' + points[i  ].x.toNumber()
                + ' ' + points[i  ].y.toNumber()
                + ' ' + points[i+1].x.toNumber()
                + ' ' + points[i+1].y.toNumber()
                + ' ' + points[i+2].x.toNumber()
                + ' ' + points[i+2].y.toNumber();
        }

        break;

    case 3: // smooth
        break;
    }


    if (   points.length > 2
        && points[0].equals(points.at(-1)))
        pathData += ' Z';


    return pathData;
}
