class FigmaPoint
extends FigmaShape
{
    x;
    y;

    

    constructor(nodeId, nodeName, objectId, x, y)
    {
        super(POINT, nodeId, nodeName, objectId);
        
        this.x = x;
        this.y = y;
    }



    copy()
    {
        const copy = new FigmaPoint(
            this.nodeId,
            this.nodeName, 
            this.objectId,
            this.x,
            this.y);

        copy.copyBase(this);

        return copy;
    }
}