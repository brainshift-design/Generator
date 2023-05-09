class FigmaFrame
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    round;
    children;



    constructor(nodeId, nodeName, objectId, x, y, width, height, angle, round, children = [])
    {
        super(FRAME, nodeId, nodeName, objectId);
        
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.angle    = angle;
        this.round    = round;
        this.children = clone(children);
    }



    copy()
    {
        const copy = new FigmaFrame(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round,
            this.children);

        copy.copyBase(this);

        return copy;
    }
}