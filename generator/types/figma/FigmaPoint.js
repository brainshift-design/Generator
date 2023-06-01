class FigmaPoint
extends FigmaShape
{
    x;
    y;
    isDeco;
    isCenter;



    constructor(nodeId, objectId, objectName, x, y, isDeco = false, isCenter = false)
    {
        super(POINT, nodeId, objectId, objectName);
        
        this.x        = x;
        this.y        = y;
        this.isDeco   = isDeco;
        this.isCenter = isCenter;

        this.createDefaultTransform(x, y);
    }



    copy()
    {
        const copy = new FigmaPoint(
            this.nodeId,
            this.objectId,
            this.objectName, 
            this.x,
            this.y,
            this.isDeco,
            this.isCenter);

        copy.copyBase(this);

        return copy;
    }
}