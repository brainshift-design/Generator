class FigmaRectangle
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(nodeId, nodeName, objectId, x, y, width, height, angle, round)
    {
        super(RECTANGLE, nodeId, nodeName, objectId);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
    }



    copy()
    {
        const copy = new FigmaRectangle(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round);

        copy.copyBase(this);

        return copy;
    }
}