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



    constructor(nodeId, objectId, x, y, width, height, angle, round, corners)
    {
        super(POLYGON, nodeId, objectId);
        
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
        const copy = new FigmaPolygon(
            this.nodeId,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round,
            this.corners);

        copy.copyBase(this);

        return copy;
    }
}