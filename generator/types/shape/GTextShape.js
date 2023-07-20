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

            
        const text          = this.text          ? (await this.text         .eval(parse)).toValue() : null;
        const x             = this.x             ? (await this.x            .eval(parse)).toValue() : null;
        const y             = this.y             ? (await this.y            .eval(parse)).toValue() : null;
        const width         = this.width         ? (await this.width        .eval(parse)).toValue() : null;
        const height        = this.height        ? (await this.height       .eval(parse)).toValue() : null;
        const font          = this.font          ? (await this.font         .eval(parse)).toValue() : null;
        const style         = this.style         ? (await this.style        .eval(parse)).toValue() : null;
        const size          = this.size          ? (await this.size         .eval(parse)).toValue() : null;
        const alignH        = this.alignH        ? (await this.alignH       .eval(parse)).toValue() : null;
        const alignV        = this.alignV        ? (await this.alignV       .eval(parse)).toValue() : null;
        const lineHeight    = this.lineHeight    ? (await this.lineHeight   .eval(parse)).toValue() : null;
        const letterSpacing = this.letterSpacing ? (await this.letterSpacing.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new TextShapeValue(
                this.nodeId,
                text          ?? input.text,
                x             ?? input.x,
                y             ?? input.y,
                width         ?? input.width,
                height        ?? input.height,
                font          ?? input.font,
                style         ?? input.style,
                size          ?? input.size,
                alignH        ?? input.size,
                alignV        ?? input.size,
                lineHeight    ?? input.size,
                letterSpacing ?? input.size);
        }
        else
        {
            this.value = new TextShapeValue(
                this.nodeId, 
                text, 
                x, 
                y, 
                this.width .type != NUMBER_VALUE ? width  : new NumberValue(0), 
                this.height.type != NUMBER_VALUE ? height : new NumberValue(0), 
                font, 
                style,
                size,
                alignH,
                alignV,
                lineHeight,
                letterSpacing);
        }

       
        this.updateValues = [['value', this.value]];


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;

        
        this.value.objects = [];


        if (   this.value.text
            && this.value.x 
            && this.value.y 
            && this.value.width 
            && this.value.height 
            && this.value.font
            && this.value.style
            && this.value.size
            && this.value.alignH
            && this.value.alignV
            && this.value.lineHeight
            && this.value.letterSpacing)
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
 
            if (   text.width  == 0
                && text.height == 0)
            {
                const {objectId, width, height} = await genGetObjectSizeFromFigma(text.toData());

                text.width  = width;
                text.height = height;

                this.value.width.value  = width;
                this.value.height.value = height;

                this.value.objects.push(text, ...text.createDefaultTransformPoints(parse, x, y, width, height));
            }
            else
                this.value.objects.push(text, ...text.createDefaultTransformPoints(parse, x, y, w, h));
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.text         .isValid()

            && this.x            .isValid()
            && this.y            .isValid()
            && this.width        .isValid()
            && this.height       .isValid()
            
            && this.font         .isValid()
            && this.style        .isValid()
            && this.size         .isValid()
            
            && this.alignH       .isValid()
            && this.alignV       .isValid()
            
            && this.lineHeight   .isValid()
            && this.letterSpacing.isValid();
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);
        
        if (this.text         ) this.text         .invalidateInputs(from);
        if (this.x            ) this.x            .invalidateInputs(from);
        if (this.y            ) this.y            .invalidateInputs(from);
        if (this.width        ) this.width        .invalidateInputs(from);
        if (this.height       ) this.height       .invalidateInputs(from);
        if (this.font         ) this.font         .invalidateInputs(from);
        if (this.style        ) this.style        .invalidateInputs(from);
        if (this.size         ) this.size         .invalidateInputs(from);
        if (this.alignH       ) this.alignH       .invalidateInputs(from);
        if (this.alignV       ) this.alignV       .invalidateInputs(from);
        if (this.lineHeight   ) this.lineHeight   .invalidateInputs(from);
        if (this.letterSpacing) this.letterSpacing.invalidateInputs(from);
    }
}