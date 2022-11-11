class FigmaLine
extends FigmaObject
{
    x;
    y;
    width;
    angle;



    constructor(nodeId, id, x, y, width, angle)
    {
        super(LINE, nodeId, id);
        
        this.x     = x;
        this.y     = y;
        this.width = width;
        this.angle = angle;
    }



    copy()
    {
        const line = new FigmaLine(
            this.nodeId,
            this.id,
            this.x,
            this.y,
            this.width,
            this.angle);

        line.copyBase(this);

        return line;
    }
}