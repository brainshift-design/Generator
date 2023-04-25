class FigmaText
extends FigmaShape
{
    text;
    x;
    y;
    width;
    height;
    angle;
    font;
    size;



    constructor(nodeId, objectId, text, x, y, width, height, angle, font, size)
    {
        super(TEXTSHAPE, nodeId, objectId);
        
        this.text   = text;
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.font   = font;
        this.size   = size;
    }



    copy()
    {
        const copy = new FigmaText(
            this.nodeId,
            this.objectId,
            this.text,
            this.x,
            this.y,
            this.width,
            this.height,
            this.angle,
            this.font,
            this.size);

        copy.copyBase(this);

        return copy;
    }
}