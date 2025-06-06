class FigmaPoint
extends FigmaShape
{
    x;
    y;
    smooth;



    constructor(nodeId, objectId, objectName, x, y, smooth = 1, isDeco = false, isCenter = false, isXform = false)
    {
        super(POINT, nodeId, objectId, objectName, isDeco, isXform);
        
        this.x        = x;
        this.y        = y;
        this.smooth   = smooth;
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
            this.smooth,
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



    applyTransform(xform, affectSpace)
    {
        const space = this.createSpaceTransform();

        if (affectSpace > 0)
        {
            const p = transformPoint(point(this.x, this.y), xform, space);

            this.x = p.x;
            this.y = p.y;
        }

        if (affectSpace != 1)
            this.applySpaceTransform(xform, space);
    }
    
    
    
    checkFlipped2(flipX, flipY) {}



    toPoint()
    {
        return point(this.x, this.y);
    }



    toNewValue()
    {
        return PointValue.fromObject(this);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 24 */ this.x,
            /* 25 */ this.y
        ];
    }



    static fromPoint3(point3)
    {
        return new FigmaPoint(
            point3.nodeId,
            point3.objectId,
            point3.objectName, 
            point3.x,
            point3.y);
    }
}
