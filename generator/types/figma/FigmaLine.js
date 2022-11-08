class FigmaLine
extends FigmaObject
{
    x;
    y;
    width;
    angle;



    constructor(x, y, width, angle)
    {
        super(LINE);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;
    }



    copy()
    {
        const line = new FigmaLine(
            this.x,
            this.y,
            this.width,
            this.angle);

        line.copyBase(this);

        return line;
    }
}