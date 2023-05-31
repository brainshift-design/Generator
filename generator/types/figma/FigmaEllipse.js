class FigmaEllipse
extends FigmaShape
{
    x;
    y;
    width;
    height;
    //angle;
    from;
    to;
    inner;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, angle, from, to, inner)
    {
        super(ELLIPSE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        //this.angle  = angle;
        this.from   = from;
        this.to     = to;
        this.inner  = inner;
    }



    copy()
    {
        const copy = new FigmaEllipse(
            this.nodeId,
            this.objectId,
            this.objectName,
            this.x,
            this.y,
            this.width,
            this.height,
            //this.angle,
            this.from,
            this.to,
            this.inner);

        copy.copyBase(this);

        return copy;
    }
}