class FigmaArcPath
extends FigmaVectorPath
{
    position;
    x;
    y;
    width;
    height;

    start;
    sweep;

    

    constructor(nodeId, objectId, objectName, pos, x, y, width, height, start, sweep)
    {
        const points = makeArc_(
            point(
                x + width /2, 
                y + height/2), 
            width/2,  
            start, 
            start + sweep)
            .map(p => PointValue.fromPoint(nodeId, p));

        
        points.forEach(p => 
        {
            if (pos > 0) p.y.value *= height/width;
            else         p.y.value  = height/2 + (p.y.value - height/2) * height/width;
        });


        super(
            nodeId, 
            objectId,
            objectName, 
            points,
            0,  // open
            2,  // cubic
            0,  // even-odd winding
            0); // no round
        
        this.position = pos;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;

        this.start    = start;
        this.sweep    = sweep;

        
        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaArcPath(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.position,
            this.x,
            this.y,
            this.width,
            this.height,
            
            this.start,
            this.sweep);


        copy.copyBase(this);


        return copy;
    }
}