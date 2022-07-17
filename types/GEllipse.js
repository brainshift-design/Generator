class GEllipse
extends GType
{
    x;
    y;
    width;
    height;
    angle;



    constructor()
    {
        super(ELLIPSE);
        
        this.x      = new GNumber(  0);
        this.y      = new GNumber(  0);
        this.width  = new GNumber(100);
        this.height = new GNumber(100);
        this.angle  = new GNumber(  0);
    }


    
    get mustNotEval()
    {
        return this.x     .mustNotEval
            && this.y     .mustNotEval
            && this.width .mustNotEval
            && this.height.mustNotEval
            && this.angle .mustNotEval;
    }
}