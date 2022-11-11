class FigmaRectangle
extends FigmaObject
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(nodeId, id, x, y, width, height, angle, round)
    {
        super(RECTANGLE, nodeId, id);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
    }



    copy()
    {
        const rect = new FigmaRectangle(
            this.nodeId,
            this.id,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round);

        rect.copyBase(this);

        return rect;
    }
}