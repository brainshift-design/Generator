class FigmaShapeGroup
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    children;



    constructor(nodeId, objectId, x, y, width, height, angle, children = [])
    {
        super(SHAPE_GROUP, nodeId, objectId);
        
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.angle    = angle;
        this.children = clone(children);
    }



    copy()
    {
        const copy = new FigmaShapeGroup(
            this.nodeId,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.children);

        copy.copyBase(this);

        return copy;
    }
}