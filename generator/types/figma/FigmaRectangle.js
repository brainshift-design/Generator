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



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:      this.x,
            y:      this.y,
            width:  this.width,
            height: this.height,

            round:  this.round
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.width,
            /* 24 */ this.height,

            /* 25 */ this.round
        ];
    }
}
