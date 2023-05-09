class FigmaLine
extends FigmaShape
{
    x;
    y;
    width;
    angle;



    constructor(nodeId, objectId, objectName, x, y, width, angle)
    {
        super(LINE, nodeId, objectId, objectName);
        
        this.x     = x;
        this.y     = y;
        this.width = width;
        this.angle = angle;
    }



    copy()
    {
        const copy = new FigmaLine(
            this.nodeId,
            this.objectId,
            this.objectName,
            this.x,
            this.y,
            this.width,
            this.angle);

        copy.copyBase(this);

        return copy;
    }
}