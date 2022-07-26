class GLineValue
extends GType
{
    x;
    y;
    width;
    angle;



    constructor(x      = new GNumberValue(0), 
                y      = new GNumberValue(0), 
                width  = new GNumberValue(0), 
                angle  = new GNumberValue(0))
    {
        super(LINE_VALUE);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        return new GLineValue(
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.angle .copy());
    }



    isValid()
    {
        return !isNaN(this.x    )
            && !isNaN(this.y    )
            && !isNaN(this.width)
            && !isNaN(this.angle);
    }



    eval(parse)
    {
        return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.x     .toString()
              + ' ' + this.y     .toString()
              + ' ' + this.width .toString()
              + ' ' + this.angle .toString()
            : INVALID;
    }



    static NaN = new GLineValue(
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGLineValue(str)
{
    if (str == INVALID)
        return GLineValue.NaN;

    const rect = str.split(' ');

    return new GLineValue(
        new GNumberValue(parseGNumberValue(rect[0])),
        new GNumberValue(parseGNumberValue(rect[1])),
        new GNumberValue(parseGNumberValue(rect[2])),
        new GNumberValue(parseGNumberValue(rect[3])));
}
