class FigmaLine
extends FigmaObject
{
    x;
    y;
    width;
    angle;



    constructor(x, y, width, angle)
    {
        super(RECTANGLE);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.angle  = angle;
    }



    copy()
    {
        const rect = new FigmaLine(
            this.x,
            this.y,
            this.width,
            this.angle);

        rect.copyBase(this);

        return rect;
    }
}