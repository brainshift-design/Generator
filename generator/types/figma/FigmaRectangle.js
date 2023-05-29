class FigmaRectangle
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    round;


    constructor(nodeId, objectId, objectName, x, y, width, height, angle, round)
    {
        super(RECTANGLE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;

        this.createDefaultTransform(x, y, width, height, angle/360*Tau);
    }



    copy()
    {
        const copy = new FigmaRectangle(
            this.nodeId,
            this.objectId,
            this.objectName,
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