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
   
            /* 18 */ this.x,
            /* 19 */ this.y,
            /* 20 */ this.width,
            /* 21 */ this.height,
            
            /* 22 */ this.figWidth,
            /* 23 */ this.figHeight,
            
            /* 24 */ this.text,

            /* 25 */ this.font,
            /* 26 */ this.size,
            /* 27 */ this.style,
            
            /* 28 */ this.alignH,
            /* 29 */ this.alignV,
            
            /* 30 */ this.lineHeight,
            /* 31 */ this.letterSpacing
        ];
    }
}



const FO_FIG_WIDTH      = 22;
const FO_FIG_HEIGHT     = 23;
                                                                                
const FO_TEXT           = 24;
                                                                                                   
const FO_FONT           = 25;
const FO_FONT_SIZE      = 26;
const FO_FONT_STYLE     = 27;
                                                                                                   
const FO_ALIGN_H        = 28;
const FO_ALIGN_V        = 29;
                                                                                                   
const FO_LINE_HEIGHT    = 30;
const FO_LETTER_SPACING = 31;