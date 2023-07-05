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



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:             this.x,
            y:             this.y,
            width:         this.width,
            height:        this.height,

            figWidth:      this.figWidth,
            figHeight:     this.figHeight,

            text:          this.text,

            font:          this.font,
            size:          this.size,
            style:         this.style,

            alignH:        this.alignH,
            alignV:        this.alignV,
            
            lineHeight:    this.lineHeight,
            letterSpacing: this.letterSpacing
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 19 */ this.x,
            /* 20 */ this.y,
            /* 21 */ this.width,
            /* 22 */ this.height,
            
            /* 23 */ this.figWidth,
            /* 24 */ this.figHeight,
            
            /* 25 */ this.text,

            /* 26 */ this.font,
            /* 27 */ this.size,
            /* 28 */ this.style,
            
            /* 29 */ this.alignH,
            /* 30 */ this.alignV,
            
            /* 31 */ this.lineHeight,
            /* 32 */ this.letterSpacing
        ];
    }
}
