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

        
        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
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
   
            /* 23 */ this.x,
            /* 24 */ this.y,
            /* 25 */ this.width,
            /* 26 */ this.height,
            
            /* 27 */ this.figWidth,
            /* 28 */ this.figHeight,
            
            /* 29 */ this.text,

            /* 30 */ this.font,
            /* 31 */ this.size,
            /* 32 */ this.style,
            
            /* 33 */ this.alignH,
            /* 34 */ this.alignV,
            
            /* 35 */ this.lineHeight,
            /* 36 */ this.letterSpacing
        ];
    }
}
