class FigmaPolygon
extends FigmaShape
{
    x;
    y;
    width;
    height;
    round;
    corners;



    constructor(nodeId, objectId, objectName, x, y, width, height, round, corners)
    {
        super(POLYGON, nodeId, objectId, objectName);
        
        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;

        this.round   = round;
        this.corners = corners;

        
        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaPolygon(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width,
            this.height,
            
            this.round,
            this.corners);


        copy.copyBase(this);


        return copy;
    }



    toNewValue()
    {
        return PolygonValue.fromObject(this);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 24 */ this.x,
            /* 25 */ this.y,
            /* 26 */ this.width,
            /* 27 */ this.height,

            /* 28 */ this.round * Math.abs(this.scaleCorners),
            /* 29 */ this.corners
        ];
    }
}
