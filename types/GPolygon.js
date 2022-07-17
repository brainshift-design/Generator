class GPolygon
extends GType
{
    x;
    y;
    width;
    height;
    angle;
    round;
    corners;



    constructor()
    {
        super(POLYGON);
        
        this.x       = new GNumber(  0);
        this.y       = new GNumber(  0);
        this.width   = new GNumber(100);
        this.height  = new GNumber(100);
        this.angle   = new GNumber(  0);
        this.round   = new GNumber(  0);
        this.corners = new GNumber(  3);
    }


    
    get mustNotEval()
    {
        return this.x      .mustNotEval
            && this.y      .mustNotEval
            && this.width  .mustNotEval
            && this.height .mustNotEval
            && this.angle  .mustNotEval
            && this.round  .mustNotEval
            && this.corners.mustNotEval;
    }
}