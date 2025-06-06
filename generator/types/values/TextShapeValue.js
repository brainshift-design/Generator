class TextShapeValue
extends ShapeValue
{
    text;
    x;
    y;
    width;
    height;
    font;
    style;
    size;
    alignX;
    alignY;
    lineHeight;
    letterSpacing;

    

    constructor(nodeId,
                text          = new TextValue(),
                x             = new NumberValue(0), 
                y             = new NumberValue(0), 
                width         = new NumberValue(0), 
                height        = new NumberValue(0), 
                font          = new NumberValue(0),
                style         = new NumberValue(0),
                size          = new NumberValue(0),
                alignX        = new NumberValue(0),
                alignY        = new NumberValue(0),
                lineHeight    = new NumberValue(0),
                letterSpacing = new NumberValue(0))
    {
        super(TEXT_SHAPE_VALUE, nodeId, 'text');

        this.text          = text;
        this.x             = x;
        this.y             = y;
        this.width         = width;
        this.height        = height;
        this.font          = font;
        this.style         = style;
        this.size          = size;
        this.alignX        = alignX;
        this.alignY        = alignY;
        this.lineHeight    = lineHeight;
        this.letterSpacing = letterSpacing;

        this.objects       = [];
    }



    static fromObject(obj)
    {
        return new TextShapeValue(
            obj.nodeId,
            new NumberValue(obj.text         ), 
            new NumberValue(obj.x            ), 
            new NumberValue(obj.y            ), 
            new NumberValue(obj.width        ), 
            new NumberValue(obj.height       ), 
            new NumberValue(obj.font         ),
            new NumberValue(obj.style        ),
            new NumberValue(obj.size         ),
            new NumberValue(obj.alignX       ),
            new NumberValue(obj.alignY       ),
            new NumberValue(obj.lineHeight   ),
            new NumberValue(obj.letterSpacing));
    }



    copy()
    {
        const copy = new TextShapeValue(
            this.nodeId,
            this.text         .copy(),
            this.x            .copy(), 
            this.y            .copy(), 
            this.width        .copy(), 
            this.height       .copy(), 
            this.font         .copy(),
            this.style        .copy(),
            this.size         .copy(),
            this.alignX       .copy(),
            this.alignY       .copy(),
            this.lineHeight   .copy(),
            this.letterSpacing.copy()); 

        copy.copyBase(this);

        return copy;
    }



    equals(text)
    {
        return text
            && this.text         .equals(text.text         )
            && this.x            .equals(text.x            )
            && this.y            .equals(text.y            )
            && this.width        .equals(text.width        )
            && this.height       .equals(text.height       )
            && this.font         .equals(text.font         )
            && this.style        .equals(text.style        )
            && this.size         .equals(text.size         )
            && this.alignX       .equals(text.alignX       )
            && this.alignY       .equals(text.alignY       )
            && this.lineHeight   .equals(text.lineHeight   )
            && this.letterSpacing.equals(text.letterSpacing);
    }



    async eval(parse)
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.text         .hasInitValue()
            && this.x            .hasInitValue()
            && this.y            .hasInitValue()
            && this.width        .hasInitValue()
            && this.height       .hasInitValue()
            && this.font         .hasInitValue()
            && this.style        .hasInitValue()
            && this.size         .hasInitValue()
            && this.alignX       .hasInitValue()
            && this.alignY       .hasInitValue()
            && this.lineHeight   .hasInitValue()
            && this.letterSpacing.hasInitValue();
    }


    
    isValid()
    {
        return super.isValid()
            && this.text          && this.text         .isValid()
            && this.x             && this.x            .isValid()
            && this.y             && this.y            .isValid()
            && this.width         && this.width        .isValid()
            && this.height        && this.height       .isValid()
            && this.font          && this.font         .isValid()
            && this.style         && this.style        .isValid()
            && this.size          && this.size         .isValid()
            && this.alignX        && this.alignX       .isValid()
            && this.alignY        && this.alignY       .isValid()
            && this.lineHeight    && this.lineHeight   .isValid()
            && this.letterSpacing && this.letterSpacing.isValid();
    }


    
    toNewValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.text         .toJson() // otherwise the string can't contain another string
            + ' ' + this.x            .toString()
            + ' ' + this.y            .toString()
            + ' ' + this.width        .toString()
            + ' ' + this.height       .toString()
            + ' ' + this.font         .toString()
            + ' ' + this.style        .toString()
            + ' ' + this.size         .toString()
            + ' ' + this.alignX       .toString()
            + ' ' + this.alignY       .toString()
            + ' ' + this.lineHeight   .toString()
            + ' ' + this.letterSpacing.toString()
            + ' ' + super.toString();
        }



    toPreviewString()
    {
        return 'textShape';      
            //this.text         .toJson() // otherwise the string can't contain another string
            //+ ' ' + this.x            .toPreviewString()
            //+ ' ' + this.y            .toPreviewString()
            //+ ' ' + this.width        .toPreviewString()
            //+ ' ' + this.height       .toPreviewString()
            //+ ' ' + this.font         .toPreviewString()
            //+ ' ' + this.style        .toPreviewString()
            //+ ' ' + this.size         .toPreviewString()
            //+ ' ' + this.alignX       .toPreviewString()
            //+ ' ' + this.alignY       .toPreviewString()
            //+ ' ' + this.lineHeight   .toPreviewString()
            //+ ' ' + this.letterSpacing.toPreviewString();
    }



    toDisplayString()
    {
        return      this.text         .toDisplayString()
            + ' ' + this.x            .toDisplayString()
            + ' ' + this.y            .toDisplayString()
            + ' ' + this.width        .toDisplayString()
            + ' ' + this.height       .toDisplayString()
            + ' ' + this.font         .toDisplayString()
            + ' ' + this.style        .toDisplayString()
            + ' ' + this.size         .toDisplayString()
            + ' ' + this.alignX       .toDisplayString()
            + ' ' + this.alignY       .toDisplayString()
            + ' ' + this.lineHeight   .toDisplayString()
            + ' ' + this.letterSpacing.toDisplayString();
    }



    toJson()
    {
        return      this.text         .toJson()
            + ' ' + this.x            .toJson()
            + ' ' + this.y            .toJson()
            + ' ' + this.width        .toJson()
            + ' ' + this.height       .toJson()
            + ' ' + this.font         .toJson()
            + ' ' + this.style        .toJson()
            + ' ' + this.size         .toJson()
            + ' ' + this.alignX       .toJson()
            + ' ' + this.alignY       .toJson()
            + ' ' + this.lineHeight   .toJson()
            + ' ' + this.letterSpacing.toJson();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { WS, SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        const fontName   = figUniqueFontNames[this.font.value];
        const fontStyles = getFontStyles(fontName);
        
        json += WSL(TAB(options.tab)) + '"text": '          + this.text         .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"x": '             + this.x            .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '             + this.y            .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"width": '         + this.width        .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"height": '        + this.height       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"font": "'         + fontName                               + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"style": "'        + fontStyles[this.style.value]           + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"size": '          + this.size         .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"alignX": "'       + TextAlignX[this.alignX.value] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"alignY": "'       + TextAlignY[this.alignY.value] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"lineHeight": '    + this.lineHeight   .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"letterSpacing": ' + this.letterSpacing.toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    static NaN()
    {
        return new TextShapeValue(
            '',
            new TextValue(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
    
    
    
    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [TextShapeValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const text          = TextValue.parse  (str[i]); i += text         [1];
        const x             = NumberValue.parse(str[i]); i += x            [1];
        const y             = NumberValue.parse(str[i]); i += y            [1];
        const width         = NumberValue.parse(str[i]); i += width        [1];
        const height        = NumberValue.parse(str[i]); i += height       [1];
        const font          = NumberValue.parse(str[i]); i += font         [1];
        const style         = NumberValue.parse(str[i]); i += style        [1];
        const size          = NumberValue.parse(str[i]); i += size         [1];
        const alignX        = NumberValue.parse(str[i]); i += alignX       [1];
        const alignY        = NumberValue.parse(str[i]); i += alignY       [1];
        const lineHeight    = NumberValue.parse(str[i]); i += lineHeight   [1];
        const letterSpacing = NumberValue.parse(str[i]); i += letterSpacing[1];
    
    
        const txts = new TextShapeValue(
            '', // set node ID elsewhere
            text         [0],
            x            [0],
            y            [0],
            width        [0],
            height       [0],
            font         [0],
            style        [0],
            size         [0],
            alignX       [0],
            alignY       [0],
            lineHeight   [0],
            letterSpacing[0]);
    
    
        i = ShapeValue.parse(str, i, txts);
    
        
        return [txts, i - iStart];
    }
}
