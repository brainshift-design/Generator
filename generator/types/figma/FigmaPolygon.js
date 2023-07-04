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



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:       this.x,
            y:       this.y,
            width:   this.width,
            height:  this.height,

            round:   this.round,
            corners: this.corners
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 18 */ this.x,
            /* 19 */ this.y,
            /* 20 */ this.width,
            /* 21 */ this.height,

            /* 22 */ this.round,
            /* 23 */ this.corners
        ];
    }
}



const FO_POLY_ROUND   = 22;
const FO_POLY_CORNERS = 23;