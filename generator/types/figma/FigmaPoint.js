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



    getBounds()
    {
        return new Rect(
            this.x - 0.005, 
            this.y - 0.005, 
            0.01, 
            0.01);
    }



    toPoint()
    {
        return point(this.x, this.y);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 23 */ this.x,
            /* 24 */ this.y,
            /* 25 */ this.isCenter
        ];
    }
}
