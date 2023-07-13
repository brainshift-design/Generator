class FigmaStar
extends FigmaShape
{
    x;
    y;
    width;
    height;

    round;
    points;
    convex;



    constructor(nodeId, objectId, objectName, x, y, width, height, round, points, convex)
    {
        super(STAR, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;

        this.round  = round;
        this.points = points;
        this.convex = convex;
    }



    copy()
    {
        const copy = new FigmaStar(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width,
            this.height,

            this.round,
            this.points,
            this.convex);

        copy.copyBase(this);

        return copy;
    }


    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:      this.x,
            y:      this.y,
            width:  this.width,
            height: this.height,

            round:  this.round,
            points: this.points,
            convex: this.convex
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.width,
            /* 24 */ this.height,

            /* 25 */ this.round * this.scale,
            /* 26 */ this.points,
            /* 27 */ this.convex
        ];
    }
}
