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


    
    get mustNotEval()
    {
        return this.space.mustNotEval
            && this.c1   .mustNotEval
            && this.c2   .mustNotEval
            && this.c3   .mustNotEval;
    }
}