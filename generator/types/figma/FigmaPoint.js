class FigmaPoint
extends FigmaShape
{
    x;
    y;

    

    constructor(nodeId, objectId, x, y)
    {
        super(POINT, nodeId, objectId);
        
        this.x = x;
        this.y = y;
    }



    copy()
    {
        const copy = new FigmaPoint(
            this.nodeId,
            this.objectId,
            this.x,
            this.y);

        copy.copyBase(this);

        return copy;
    }
}