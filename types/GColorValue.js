class GColorValue
extends GType
{
    space;
    c1;
    c2;
    c3;



    constructor(space = new GNumberValue(0), 
                c1    = new GNumberValue(0), 
                c2    = new GNumberValue(0), 
                c3    = new GNumberValue(0))
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
            this.space.copy(), 
            this.c1   .copy(), 
            this.c2   .copy(), 
            this.c3   .copy());
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
        return this.result = this.copy();
    }



    toDataColor()
    {
        return[
            colorSpace(this.space.value), 
            getNormalColorValue(this.c1.value, colorSpace(this.space.value), 0), 
            getNormalColorValue(this.c2.value, colorSpace(this.space.value), 1), 
            getNormalColorValue(this.c3.value, colorSpace(this.space.value), 2) ]; 
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



    static NaN = new GColorValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGColorValue(str)
{
    if (str == '?')
        return GColorValue.NaN;

    const col = str.split(' ');

    return new GColorValue(
        new GNumberValue(col[0]),
        new GNumberValue(col[1]),
        new GNumberValue(col[2]),
        new GNumberValue(col[3]));
}
