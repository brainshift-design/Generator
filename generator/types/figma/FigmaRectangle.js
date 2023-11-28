class FigmaRectangle
extends FigmaShape
{
    x;
    y;
    width;
    height;

    round;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, round)
    {
        super(RECTANGLE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;

        this.round  = round;

        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaRectangle(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width,
            this.height,
            
            this.round);


        copy.copyBase(this);


        return copy;
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 25 */ this.x,
            /* 26 */ this.y,
            /* 27 */ this.width,
            /* 28 */ this.height,

            /* 29 */ this.round * Math.abs(this.scaleCorners)
        ];
    }
}
