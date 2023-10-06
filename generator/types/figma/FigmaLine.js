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

        
        this.createDefaultSpace(
            x + width/2, 
            y);
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



    toData()
    {
        return [
            ...super.toData(),
   
            /* 23 */ this.x,
            /* 24 */ this.y,
            /* 25 */ this.width
        ];
    }
}