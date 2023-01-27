class FigmaLine
extends FigmaShape
{
    x;
    y;
    width;
    angle;



    constructor(nodeId, nodeName, objectId, x, y, width, angle)
    {
        super(LINE, nodeId, nodeName, objectId);
        
        this.x     = x;
        this.y     = y;
        this.width = width;
        this.angle = angle;
    }



    copy()
    {
        const line = new FigmaLine(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.angle);

        line.copyBase(this);

        return line;
    }
}