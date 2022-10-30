class FigmaRectangle
extends FigmaObject
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(x, y, width, height, angle, round)
    {
        super(RECTANGLE);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;
    }



    copy()
    {
        const rect = new FigmaRectangle(
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.round);

        rect.copyBase(this);

        return rect;
    }
}