class FigmaStar
extends FigmaObject
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor(nodeId, id, x, y, width, height, angle, round, points, convex)
    {
        super(STAR, nodeId, id);
        
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
        const star = new FigmaStar(
            this.nodeId,
            this.id,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round,
            this.points,
            this.convex);

        star.copyBase(this);

        return star;
    }
}