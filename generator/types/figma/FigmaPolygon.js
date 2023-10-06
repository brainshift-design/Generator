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



    toData()
    {
        return [
            ...super.toData(),
   
            /* 23 */ this.x,
            /* 24 */ this.y,
            /* 25 */ this.width,
            /* 26 */ this.height,

            /* 27 */ this.round * Math.abs(this.scaleCorners),
            /* 28 */ this.corners
        ];
    }
}
