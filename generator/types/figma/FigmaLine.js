class FigmaLine
extends FigmaShape
{
    x;
    y;
    width;



    constructor(nodeId, objectId, objectName, x, y, width)
    {
        super(LINE, nodeId, objectId, objectName);
        
        this.x     = x;
        this.y     = y;
        this.width = width;
    }



    copy()
    {
        const copy = new FigmaLine(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width);


        copy.copyBase(this);


        return copy;
    }



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:     this.x,
            y:     this.y,
            width: this.width
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.width
        ];
    }
}