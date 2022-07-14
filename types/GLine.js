class GLine
extends GType
{
    x;
    y;
    width;
    //height;
    angle;



    constructor()
    {
        super(LINE);
        
        this.x      = new GNumber(  0);
        this.y      = new GNumber(  0);
        this.width  = new GNumber(100);
        //this.height = new GNumber(0);
        this.angle  = new GNumber(  0);
    }


    
    get valid()
    {
        return this.x     .valid
            && this.y     .valid
            && this.width .valid
            //&& this.height.valid
            && this.angle .valid;
    }
}