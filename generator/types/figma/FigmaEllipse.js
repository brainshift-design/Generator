class FigmaEllipse
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;



    constructor(nodeId, nodeName, objectId, x, y, width, height, angle)
    {
        super(ELLIPSE, nodeId, nodeName, objectId);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
    }



    copy()
    {
        const ellipse = new FigmaEllipse(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle);

        ellipse.copyBase(this);

        return ellipse;
    }
}