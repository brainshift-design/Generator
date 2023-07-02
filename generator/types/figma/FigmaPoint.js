class FigmaPoint
extends FigmaShape
{
    x;
    y;
    isCenter;



    constructor(nodeId, objectId, objectName, x, y, isDeco = false, isCenter = false)
    {
        super(POINT, nodeId, objectId, objectName, isDeco);
        
        this.x        = x;
        this.y        = y;
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



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:        this.x,
            y:        this.y,
            isCenter: this.isCenter
        };
    }
}