class FigmaPoint
extends FigmaShape
{
    x;
    y;
    isCenter;



    constructor(nodeId, objectId, objectName, x, y, isCenter = false)
    {
        super(POINT, nodeId, objectId, objectName);
        
        this.x        = x;
        this.y        = y;
        this.isCenter = isCenter;

        this.createDefaultTransform(x, y, 0, 0);
    }



    copy()
    {
        const copy = new FigmaPoint(
            this.nodeId,
            this.objectId,
            this.objectName, 
            this.x,
            this.y,
            this.isCenter);

        copy.copyBase(this);

        return copy;
    }
}