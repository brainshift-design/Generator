class FigmaStar
extends FigmaShape
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor(nodeId, objectId, x, y, width, height, angle, round, points, convex)
    {
        super(STAR, nodeId, objectId);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
        this.points = points;
        this.convex = convex;
    }



    copy()
    {
        const copy = new FigmaStar(
            this.nodeId,
            this.objectId,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round,
            this.points,
            this.convex);

        copy.copyBase(this);

        return copy;
    }
}