class FigmaText
extends FigmaShape
{
    text;
    x;
    y;
    width;
    height;
    figWidth;
    figHeight;
    font;
    size;
    style;
    alignH;
    alignV;
    lineHeight;
    letterSpacing;



    constructor(nodeId, objectId, objectName, text, x, y, width, height, font, size, style, alignH, alignV, lineHeight, letterSpacing)
    {
        super(TEXT_SHAPE, nodeId, objectId, objectName);
        
        this.text          = text;
        this.x             = x;
        this.y             = y;
        this.width         = width;
        this.height        = height;
        this.figWidth      = width;
        this.figHeight     = height;
        this.font          = font;
        this.size          = size;
        this.style         = style;
        this.alignH        = alignH;
        this.alignV        = alignV;
        this.lineHeight    = lineHeight;
        this.letterSpacing = letterSpacing;
    }



    copy()
    {
        const copy = new FigmaText(
            this.nodeId,
            this.objectId,
            this.objectName,
            this.text,
            this.x,
            this.y,
            this.width,
            this.height,
            this.font,
            this.size,
            this.style,
            this.alignH,
            this.alignV,
            this.lineHeight,
            this.letterSpacing);

        copy.figWidth  = this.figWidth;
        copy.figHeight = this.figHeight;

        copy.copyBase(this);

        return copy;
    }
}