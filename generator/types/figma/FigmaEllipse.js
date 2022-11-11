class FigmaEllipse
extends FigmaObject
{
    x;
    y;
    width;
    height;
    angle;



    constructor(nodeId, id, x, y, width, height, angle)
    {
        super(ELLIPSE, nodeId, id);
        
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
            this.id,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle);

        ellipse.copyBase(this);

        return ellipse;
    }
}