class GStar
extends GType
{
    x;
    y;
    width;
    height;
    angle;
    round;
    points;
    convex;



    constructor()
    {
        super(STAR);
        
        this.x      = new GNumber(  0  );
        this.y      = new GNumber(  0  );
        this.width  = new GNumber(100  );
        this.height = new GNumber(100  );
        this.angle  = new GNumber(  0  );
        this.round  = new GNumber(  0  );
        this.points = new GNumber(  5  );
        this.convex = new GNumber( 38.2);
    }


    
    get mustNotEval()
    {
        return this.x     .mustNotEval
            && this.y     .mustNotEval
            && this.width .mustNotEval
            && this.height.mustNotEval
            && this.angle .mustNotEval
            && this.round .mustNotEval
            && this.points.mustNotEval
            && this.convex.mustNotEval;
    }
}