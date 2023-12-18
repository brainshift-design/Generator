class GTextShape
extends GShape
{
    text          = null;
    x             = null;
    y             = null;
    width         = null;
    height        = null;
    font          = null;
    size          = null;
    style         = null;
    alignH        = null;
    alignV        = null;
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
        this.alignH        = null;
        this.alignV        = null;
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
        if (this.alignH       ) copy.alignH        = this.alignH       .copy();
        if (this.alignV       ) copy.alignV        = this.alignV       .copy();
        if (this.lineHeight   ) copy.lineHeight    = this.lineHeight   .copy();
        if (this.letterSpacing) copy.letterSpacing = this.letterSpacing.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input         = this.input         ? (await this.input        .eval(parse)).toValue() : null;
        let   text          = this.text          ? (await this.text         .eval(parse)).toValue() : null;
        let   x             = this.x             ? (await this.x            .eval(parse)).toValue() : null;
        let   y             = this.y             ? (await this.y            .eval(parse)).toValue() : null;
        let   width         = this.width         ? (await this.width        .eval(parse)).toValue() : null;
        let   height        = this.height        ? (await this.height       .eval(parse)).toValue() : null;
        let   font          = this.font          ? (await this.font         .eval(parse)).toValue() : null;
        let   style         = this.style         ? (await this.style        .eval(parse)).toValue() : null;
        let   size          = this.size          ? (await this.size         .eval(parse)).toValue() : null;
        let   alignH        = this.alignH        ? (await this.alignH       .eval(parse)).toValue() : null;
        let   alignV        = this.alignV        ? (await this.alignV       .eval(parse)).toValue() : null;
        let   lineHeight    = this.lineHeight    ? (await this.lineHeight   .eval(parse)).toValue() : null;
        let   letterSpacing = this.letterSpacing ? (await this.letterSpacing.eval(parse)).toValue() : null;


        if (input)
        {
            this.value        = input.toValue();
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
            if (alignH       )  this.value.alignH        = alignH;         else  alignH        = this.value.alignH;
            if (alignV       )  this.value.alignV        = alignV;         else  alignV        = this.value.alignV;
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
                alignH,
                alignV,
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
            ['alignH',        alignH       ],
            ['alignV',        alignV       ],
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
        if (!this.alignH       ) this.alignH        = this.value.alignH       .copy();
        if (!this.alignV       ) this.alignV        = this.value.alignV       .copy();
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
            && this.value.alignH       .isValid()
            && this.value.alignV       .isValid()
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
                this.value.alignH       .value,
                this.value.alignV       .value,
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
            && this.alignH        && this.alignH       .isValid()
            && this.alignV        && this.alignV       .isValid()
            && this.lineHeight    && this.lineHeight   .isValid()
            && this.letterSpacing && this.letterSpacing.isValid();
    }



    toValue()
    {
        const text = new TextShapeValue(
            this.nodeId,
            this.text         .toValue(),
            this.x            .toValue(),
            this.y            .toValue(),
            this.width        .toValue(),
            this.height       .toValue(),
            this.font         .toValue(),
            this.style        .toValue(),
            this.size         .toValue(),
            this.alignH       .toValue(),
            this.alignV       .toValue(),
            this.lineHeight   .toValue(),
            this.letterSpacing.toValue());

        text.copyCustomParams(this.value);
           
        text.props   = this.props.toValue();
        text.objects = this.value.objects.map(o => o.copy());
        
        return text;
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
        if (this.alignH       ) this.alignH       .pushValueUpdates(parse);
        if (this.alignV       ) this.alignV       .pushValueUpdates(parse);
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
        if (this.alignH       ) this.alignH       .invalidateInputs(parse, from, force);
        if (this.alignV       ) this.alignV       .invalidateInputs(parse, from, force);
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
        if (this.alignH       ) this.alignH       .iterateLoop(parse);
        if (this.alignV       ) this.alignV       .iterateLoop(parse);
        if (this.lineHeight   ) this.lineHeight   .iterateLoop(parse);
        if (this.letterSpacing) this.letterSpacing.iterateLoop(parse);
    }
}