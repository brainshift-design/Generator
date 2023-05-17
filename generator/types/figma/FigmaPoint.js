class FigmaPoint
extends FigmaShape
{
    x;
    y;



    constructor(nodeId, objectId, objectName, x, y)
    {
        super(POINT, nodeId, objectId, objectName);
        
        this.x = x;
        this.y = y;
    }



    copy()
    {
        const copy = new FigmaPoint(
            this.nodeId,
            this.objectId,
            this.objectName, 
            this.x,
            this.y);

        copy.copyBase(this);

        return copy;
    }
}