class GTextShape
extends GShape
{
    static { GNode.types[TEXT_SHAPE] = this; }



    text          = null;
    x             = null;
    y             = null;
    width         = null;
    height        = null;
    font          = null;
    size          = null;
    style         = null;
    alignX        = null;
    alignY        = null;
    lineHeight    = null;
    letterSpacing = null;
    
    

    constructor(nodeId, options)
    {
        super(TEXT_SHAPE, nodeId, options);
    }


    
    reset()
    {
        super.reset();
        
        this.text          = null;
        this.x             = null;
        this.y             = null;
        this.width         = null;
        this.height        = null;
        this.font          = null;
        this.size          = null;
        this.style         = null;
        this.alignX        = null;
        this.alignY        = null;
        this.lineHeight    = null;
        this.letterSpacing = null;
    }



    copy()
    {
        const copy = new GTextShape(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.text         ) copy.text          = this.text         .copy();
        if (this.x            ) copy.x             = this.x            .copy();
        if (this.y            ) copy.y             = this.y            .copy();
        if (this.width        ) copy.width         = this.width        .copy();
        if (this.height       ) copy.height        = this.height       .copy();
        if (this.font         ) copy.font          = this.font         .copy();
        if (this.style        ) copy.style         = this.style        .copy();
        if (this.size         ) copy.size          = this.size         .copy();
        if (this.alignX       ) copy.alignX        = this.alignX       .copy();
        if (this.alignY       ) copy.alignY        = this.alignY       .copy();
        if (this.lineHeight   ) copy.lineHeight    = this.lineHeight   .copy();
        if (this.letterSpacing) copy.letterSpacing = this.letterSpacing.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'text':          return this.input ? this.value.text          : this.text;
            case 'x':             return this.input ? this.value.x             : this.x;
            case 'y':             return this.input ? this.value.y             : this.y;
            case 'width':         return this.input ? this.value.width         : this.width;
            case 'height':        return this.input ? this.value.height        : this.height;
            case 'font':          return this.input ? this.value.font          : this.font;
            case 'style':         return this.input ? this.value.style         : this.style;
            case 'size':          return this.input ? this.value.size          : this.size;
            case 'alignX':        return this.input ? this.value.alignX        : this.alignX;
            case 'alignY':        return this.input ? this.value.alignY        : this.alignY;
            case 'lineHeight':    return this.input ? this.value.lineHeight    : this.lineHeight;
            case 'letterSpacing': return this.input ? this.value.letterSpacing : this.letterSpacing;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input         = await evalTextShapeValue(this.input,         parse);
        let   text          = await evalTextValue     (this.text,          parse);
        let   x             = await evalNumberValue   (this.x,             parse);
        let   y             = await evalNumberValue   (this.y,             parse);
        let   width         = await evalNumberValue   (this.width,         parse);
        let   height        = await evalNumberValue   (this.height,        parse);
        let   font          = await evalNumberValue   (this.font,          parse);
        let   style         = await evalNumberValue   (this.style,         parse);
        let   size          = await evalNumberValue   (this.size,          parse);
        let   alignX        = await evalNumberValue   (this.alignX,        parse);
        let   alignY        = await evalNumberValue   (this.alignY,        parse);
        let   lineHeight    = await evalNumberValue   (this.lineHeight,    parse);
        let   letterSpacing = await evalNumberValue   (this.letterSpacing, parse);


        if (text          && !text         .isValid()) text          = new TextValue();
        if (x             && !x            .isValid()) x             = NumberValue.NaN();
        if (y             && !y            .isValid()) y             = NumberValue.NaN();
        if (width         && !width        .isValid()) width         = NumberValue.NaN();
        if (height        && !height       .isValid()) height        = NumberValue.NaN();
        if (font          && !font         .isValid()) font          = NumberValue.NaN();
        if (style         && !style        .isValid()) style         = NumberValue.NaN();
        if (size          && !size         .isValid()) size          = NumberValue.NaN();
        if (alignX        && !alignX       .isValid()) alignX        = NumberValue.NaN();
        if (alignY        && !alignY       .isValid()) alignY        = NumberValue.NaN();
        if (lineHeight    && !lineHeight   .isValid()) lineHeight    = NumberValue.NaN();
        if (letterSpacing && !letterSpacing.isValid()) letterSpacing = NumberValue.NaN();


        // for incorrect incoming types
        if (text          && text         .type !=   TEXT_VALUE) text          = new TextValue();
        if (x             && x            .type != NUMBER_VALUE) x             = NumberValue.NaN();
        if (y             && y            .type != NUMBER_VALUE) y             = NumberValue.NaN();
        if (width         && width        .type != NUMBER_VALUE) width         = NumberValue.NaN();
        if (height        && height       .type != NUMBER_VALUE) height        = NumberValue.NaN();
        if (font          && font         .type != NUMBER_VALUE) font          = NumberValue.NaN();
        if (style         && style        .type != NUMBER_VALUE) style         = NumberValue.NaN();
        if (size          && size         .type != NUMBER_VALUE) size          = NumberValue.NaN();
        if (alignX        && alignX       .type != NUMBER_VALUE) alignX        = NumberValue.NaN();
        if (alignY        && alignY       .type != NUMBER_VALUE) alignY        = NumberValue.NaN();
        if (lineHeight    && lineHeight   .type != NUMBER_VALUE) lineHeight    = NumberValue.NaN();
        if (letterSpacing && letterSpacing.type != NUMBER_VALUE) letterSpacing = NumberValue.NaN();

        
        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);
            
            if (text         )  this.value.text          = text;           else  text          = this.value.text;
            if (x            )  this.value.x             = x;              else  x             = this.value.x;
            if (y            )  this.value.y             = y;              else  y             = this.value.y;
            if (width        )  this.value.width         = width;          else  width         = this.value.width;
            if (height       )  this.value.height        = height;         else  height        = this.value.height;
            if (font         )  this.value.font          = font;           else  font          = this.value.font;
            if (style        )  this.value.style         = style;          else  style         = this.value.style;
            if (size         )  this.value.size          = size;           else  size          = this.value.size;
            if (alignX       )  this.value.alignX        = alignX;         else  alignX        = this.value.alignX;
            if (alignY       )  this.value.alignY        = alignY;         else  alignY        = this.value.alignY;
            if (lineHeight   )  this.value.lineHeight    = lineHeight;     else  lineHeight    = this.value.lineHeight;
            if (letterSpacing)  this.value.letterSpacing = letterSpacing;  else  letterSpacing = this.value.letterSpacing; 
        }
        else
        {
            this.value = new TextShapeValue(
                this.nodeId, 
                text, 
                x, 
                y, 
                width, //this.width .type != NUMBER_VALUE ? width  : new NumberValue(0), 
                height, //this.height.type != NUMBER_VALUE ? height : new NumberValue(0), 
                font, 
                style,
                size,
                alignX,
                alignY,
                lineHeight,
                letterSpacing);
        }

       
        this.setUpdateValues(parse, 
        [
            ['text',          text         ],
            ['x',             x            ],
            ['y',             y            ],
            ['width',         width        ],
            ['height',        height       ],
            ['font',          font         ],
            ['style',         style        ],
            ['size',          size         ],
            ['alignX',        alignX       ],
            ['alignY',        alignY       ],
            ['lineHeight',    lineHeight   ],
            ['letterSpacing', letterSpacing]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.text         ) this.text          = this.value.text         .copy();
        if (!this.x            ) this.x             = this.value.x            .copy();
        if (!this.y            ) this.y             = this.value.y            .copy();
        if (!this.width        ) this.width         = this.value.width        .copy();
        if (!this.height       ) this.height        = this.value.height       .copy();
        if (!this.font         ) this.font          = this.value.font         .copy();
        if (!this.style        ) this.style         = this.value.style        .copy();
        if (!this.size         ) this.size          = this.value.size         .copy();
        if (!this.alignX       ) this.alignX        = this.value.alignX       .copy();
        if (!this.alignY       ) this.alignY        = this.value.alignY       .copy();
        if (!this.lineHeight   ) this.lineHeight    = this.value.lineHeight   .copy();
        if (!this.letterSpacing) this.letterSpacing = this.value.letterSpacing.copy();
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;

        
        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.text         .isValid()
            && this.value.x            .isValid()
            && this.value.y            .isValid()
            && this.value.width        .isValid()
            && this.value.height       .isValid()
            && this.value.font         .isValid()
            && this.value.style        .isValid()
            && this.value.size         .isValid()
            && this.value.alignX       .isValid()
            && this.value.alignY       .isValid()
            && this.value.lineHeight   .isValid()
            && this.value.letterSpacing.isValid())
        {
            let x = this.value.x     .value;
            let y = this.value.y     .value;
            let w = this.value.width .value;
            let h = this.value.height.value;

            const fontName   = figUniqueFontNames[this.value.font.value];
            const fontStyles = getFontStyles(fontName);

            const text = new FigmaText(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                this.value.text.value,
                x, y, w, h,
                fontName,
                this.value.size         .value,
                fontStyles[Math.min(this.value.style.value, fontStyles.length-1)],
                this.value.alignX       .value,
                this.value.alignY       .value,
                this.value.lineHeight   .value,
                this.value.letterSpacing.value);

                
            text.createDefaultTransform(x, y);
 
            // if (   text.width  == 0
            //     && text.height == 0)
            // {
            //     const {objectId, width, height} = await genGetObjectSizeFromFigma(text.toData());

            //     text.width  = width;
            //     text.height = height;

            //     this.value.width.value  = width;
            //     this.value.height.value = height;

            //     text.createDefaultTransformPoints(x, y, width, height);

            //     this.value.objects.push(text);
            // }
            // else
            // {
                text.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(text);
            // }
        }

        
        await super.evalObjects(parse);
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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
        
        if (this.text         ) this.text         .pushValueUpdates(parse);
        if (this.x            ) this.x            .pushValueUpdates(parse);
        if (this.y            ) this.y            .pushValueUpdates(parse);
        if (this.width        ) this.width        .pushValueUpdates(parse);
        if (this.height       ) this.height       .pushValueUpdates(parse);
        if (this.font         ) this.font         .pushValueUpdates(parse);
        if (this.style        ) this.style        .pushValueUpdates(parse);
        if (this.size         ) this.size         .pushValueUpdates(parse);
        if (this.alignX       ) this.alignX       .pushValueUpdates(parse);
        if (this.alignY       ) this.alignY       .pushValueUpdates(parse);
        if (this.lineHeight   ) this.lineHeight   .pushValueUpdates(parse);
        if (this.letterSpacing) this.letterSpacing.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);
        
        if (this.text         ) this.text         .invalidateInputs(parse, from, force);
        if (this.x            ) this.x            .invalidateInputs(parse, from, force);
        if (this.y            ) this.y            .invalidateInputs(parse, from, force);
        if (this.width        ) this.width        .invalidateInputs(parse, from, force);
        if (this.height       ) this.height       .invalidateInputs(parse, from, force);
        if (this.font         ) this.font         .invalidateInputs(parse, from, force);
        if (this.style        ) this.style        .invalidateInputs(parse, from, force);
        if (this.size         ) this.size         .invalidateInputs(parse, from, force);
        if (this.alignX       ) this.alignX       .invalidateInputs(parse, from, force);
        if (this.alignY       ) this.alignY       .invalidateInputs(parse, from, force);
        if (this.lineHeight   ) this.lineHeight   .invalidateInputs(parse, from, force);
        if (this.letterSpacing) this.letterSpacing.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
        
        if (this.text         ) this.text         .iterateLoop(parse);
        if (this.x            ) this.x            .iterateLoop(parse);
        if (this.y            ) this.y            .iterateLoop(parse);
        if (this.width        ) this.width        .iterateLoop(parse);
        if (this.height       ) this.height       .iterateLoop(parse);
        if (this.font         ) this.font         .iterateLoop(parse);
        if (this.style        ) this.style        .iterateLoop(parse);
        if (this.size         ) this.size         .iterateLoop(parse);
        if (this.alignX       ) this.alignX       .iterateLoop(parse);
        if (this.alignY       ) this.alignY       .iterateLoop(parse);
        if (this.lineHeight   ) this.lineHeight   .iterateLoop(parse);
        if (this.letterSpacing) this.letterSpacing.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const text = new GTextShape(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(text, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, text);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            text.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {       
            case 'text':          text.text          = genParse(parse); break;
            case 'x':             text.x             = genParse(parse); break;
            case 'y':             text.y             = genParse(parse); break;
            case 'width':         text.width         = genParse(parse); break;
            case 'height':        text.height        = genParse(parse); break;
            case 'font':          text.font          = genParse(parse); break;
            case 'size':          text.size          = genParse(parse); break;
            case 'style':         text.style         = genParse(parse); break;
            case 'props':         text.props         = genParse(parse); break;
            case 'alignX':        text.alignX        = genParse(parse); break;
            case 'alignY':        text.alignY        = genParse(parse); break;
            case 'lineHeight':    text.lineHeight    = genParse(parse); break;
            case 'letterSpacing': text.letterSpacing = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, text);
        return text;
    }
}