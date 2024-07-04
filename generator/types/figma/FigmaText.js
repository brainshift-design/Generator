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
    
    alignX;
    alignY;
    
    lineHeight;
    letterSpacing;



    constructor(nodeId, objectId, objectName, text, x, y, width, height, font, size, style, alignX, alignY, lineHeight, letterSpacing)
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
    
        this.alignX        = alignX;
        this.alignY        = alignY;
    
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
    
            this.alignX,
            this.alignY,
    
            this.lineHeight,
            this.letterSpacing);


        copy.figWidth  = this.figWidth;
        copy.figHeight = this.figHeight;


        copy.copyBase(this);


        return copy;
    }



    toValue()
    {
        return TextShapeValue.fromObject(this);
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

            alignX:        this.alignX,
            alignY:        this.alignY,
            
            lineHeight:    this.lineHeight,
            letterSpacing: this.letterSpacing
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 24 */ this.x,
            /* 25 */ this.y,
            /* 26 */ this.width,
            /* 27 */ this.height,
            
            /* 28 */ this.figWidth,
            /* 29 */ this.figHeight,
            
            /* 30 */ this.text,

            /* 31 */ this.font,
            /* 32 */ this.size,
            /* 33 */ this.style,
            
            /* 34 */ this.alignX,
            /* 35 */ this.alignY,
            
            /* 36 */ this.lineHeight,
            /* 37 */ this.letterSpacing
        ];
    }
}
