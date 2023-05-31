class FigmaRectangle
extends FigmaShape
{
    x;
    y;
    width;
    height;
    round;


    constructor(nodeId, objectId, objectName, x, y, width, height, round)
    {
        super(RECTANGLE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.round  = round;

        this.createDefaultTransform(x, y);
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
            this.round);

        copy.copyBase(this);

        return copy;
    }
}