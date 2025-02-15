class FigmaPoint3
extends FigmaShape
{
    x;
    y;
    z;
    smooth;



    constructor(nodeId, objectId, objectName, x = 0, y = 0, z = 0, smooth = 1, isDeco = false, isCenter = false, isXform = false)
    {
        super(POINT3, nodeId, objectId, objectName, isDeco, isXform);
        
        this.x        = x;
        this.y        = y;
        this.z        = z;
        this.smooth   = smooth;
        this.isCenter = isCenter;

        
        this.createDefaultSpace(x, y, z);


        this.createDefaultTransform(x, y);
    }



    copy()
    {
        const copy = new FigmaPoint3(
            this.nodeId,
            this.objectId,
            this.objectName, 
            this.x,
            this.y,
            this.z,
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
        const this_type = this.type;
        this.type = POINT;

        const data = [
            ...super.toData(),
   
            /* 24 */ this.x,
            /* 25 */ this.y
        ];

        this.type = this_type;

        return data;
    }



    static fromPoint(point)
    {
        return new FigmaPoint3(
            point.nodeId,
            point.objectId,
            point.objectName, 
            point.x,
            point.y);
    }
}
