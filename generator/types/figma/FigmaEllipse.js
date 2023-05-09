class FigmaEllipse
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, angle)
    {
        super(ELLIPSE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
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
            this.angle);

        copy.copyBase(this);

        return copy;
    }
}