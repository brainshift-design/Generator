class GColor
extends GType
{
    space;
    c1;
    c2;
    c3;



    constructor()
    {
        super(COLOR);

        this.space = new GNumber(0);
        this.c1    = new GNumber(0);
        this.c2    = new GNumber(0);
        this.c3    = new GNumber(0);
    }


    
    get valid()
    {
        return this.space.valid
            && this.c1   .valid
            && this.c2   .valid
            && this.c3   .valid;
    }
}