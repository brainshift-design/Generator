class FigmaPolygon
extends FigmaObject
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor(nodeId, id, x, y, width, height, angle, round, corners)
    {
        super(POLYGON, nodeId, id);
        
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
            this.id,
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