class FigmaPoint
extends FigmaShape
{
    x;
    y;
    isCenter;



    constructor(nodeId, objectId, objectName, x, y, isDeco = false, isCenter = false, isXform = false)
    {
        super(POINT, nodeId, objectId, objectName, isDeco, isXform);
        
        this.x        = x;
        this.y        = y;
        this.isCenter = isCenter;

        
        this.createDefaultSpace(x, y);

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



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.isCenter
        ];
    }
}
