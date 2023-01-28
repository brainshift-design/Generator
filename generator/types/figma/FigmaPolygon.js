class FigmaPolygon
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor(nodeId, nodeName, objectId, x, y, width, height, angle, round, corners)
    {
        super(POLYGON, nodeId, nodeName, objectId);
        
        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.angle   = angle;
        this.round   = round;
        this.corners = corners;
    }



    copy()
    {
        const poly = new FigmaPolygon(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round,
            this.corners);

        poly.copyBase(this);

        return poly;
    }
}