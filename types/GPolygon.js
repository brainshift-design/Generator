class GPolygon
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
        this.x       = new GNumber(  0);
        this.y       = new GNumber(  0);
        this.width   = new GNumber(100);
        this.height  = new GNumber(100);
        this.angle   = new GNumber(  0);
        this.round   = new GNumber(  0);
        this.corners = new GNumber(  3);
    }


    
    get valid()
    {
        return this.x      .valid
            && this.y      .valid
            && this.width  .valid
            && this.height .valid
            && this.angle  .valid
            && this.round  .valid
            && this.corners.valid;
    }
}