class GColorValue
extends GType
{
    space;
    c1;
    c2;
    c3;



    constructor(space, c1, c2, c3)
    {
        super(COLOR_VALUE);

        this.space = space;
        this.c1    = c1;
        this.c2    = c2;
        this.c3    = c3;
    }



    copy()
    {
        return new GColorValue(
            this.space, 
            this.c1, 
            this.c2, 
            this.c3);
    }



    isValid()
    {
        return !isNaN(this.space)
            && !isNaN(this.c1)
            && !isNaN(this.c2)
            && !isNaN(this.c3);
    }



    eval(parse)
    {
        return this.result = this;
    }



    toString()
    {
        return this.isValid()
            ?         this.space.toString()
              + ' ' + this.c1.toString()
              + ' ' + this.c2.toString()
              + ' ' + this.c3.toString()
            : '?';
    }
}