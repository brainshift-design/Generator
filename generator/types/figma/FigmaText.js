class FigmaText
extends FigmaShape
{
    text;
    x;
    y;
    width;
    height;
    //angle;
    font;
    style;
    size;
    alignH;
    alignV;
    lineHeight;
    letterSpacing;



    constructor(nodeId, objectId, objectName, text, x, y, width, height, /*angle,*/ font, style, size, alignH, alignV, lineHeight, letterSpacing)
    {
        super(TEXTSHAPE, nodeId, objectId, objectName);
        
        this.text          = text;
        this.x             = x;
        this.y             = y;
        this.width         = width;
        this.height        = height;
        //this.angle         = angle;
        this.font          = font;
        this.style         = style;
        this.size          = size;
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
            //this.angle,
            this.font,
            this.style,
            this.size,
            this.alignH,
            this.alignV,
            this.lineHeight,
            this.letterSpacing);

        copy.copyBase(this);

        return copy;
    }
}