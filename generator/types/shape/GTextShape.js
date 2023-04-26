class GTextShape
extends GShape
{
    input         = null;

    text          = null;
    x             = null;
    y             = null;
    width         = null;
    height        = null;
    angle         = null;
    font          = null;
    style         = null;
    size          = null;
    alignH        = null;
    alignV        = null;
    lineHeight    = null;
    letterSpacing = null;



    constructor(nodeId, options)
    {
        super(TEXTSHAPE, nodeId, options);
    }



    copy()
    {
        const copy = new GTextShape(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.text         ) copy.text          = this.text         .copy();
        if (this.x            ) copy.x             = this.x            .copy();
        if (this.y            ) copy.y             = this.y            .copy();
        if (this.width        ) copy.width         = this.width        .copy();
        if (this.height       ) copy.height        = this.height       .copy();
        if (this.angle        ) copy.angle         = this.angle        .copy();
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
        const angle         = this.angle         ? (await this.angle        .eval(parse)).toValue() : null;
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
                angle         ?? input.angle,
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
                width, 
                height, 
                angle, 
                font, 
                style,
                size,
                alignH,
                alignV,
                lineHeight,
                letterSpacing);
        }

       
        genPushUpdateValue(parse, this.nodeId, 'value',         this.value              );
        genPushUpdateValue(parse, this.nodeId, 'text',          this.value.text         );
        genPushUpdateValue(parse, this.nodeId, 'x',             this.value.x            );
        genPushUpdateValue(parse, this.nodeId, 'y',             this.value.y            );
        genPushUpdateValue(parse, this.nodeId, 'width',         this.value.width        );
        genPushUpdateValue(parse, this.nodeId, 'height',        this.value.height       );
        genPushUpdateValue(parse, this.nodeId, 'angle',         this.value.angle        );
        genPushUpdateValue(parse, this.nodeId, 'font',          this.value.font         );
        genPushUpdateValue(parse, this.nodeId, 'style',         this.value.style        );
        genPushUpdateValue(parse, this.nodeId, 'size',          this.value.size         );
        genPushUpdateValue(parse, this.nodeId, 'alignH',        this.value.alignH       );
        genPushUpdateValue(parse, this.nodeId, 'alignV',        this.value.alignV       );
        genPushUpdateValue(parse, this.nodeId, 'lineHeight',    this.value.lineHeight   );
        genPushUpdateValue(parse, this.nodeId, 'letterSpacing', this.value.letterSpacing);


        await this.evalBase(parse, input);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;

            
        if (   this.value.text
            && this.value.x 
            && this.value.y 
            && this.value.width 
            && this.value.height 
            && this.value.angle
            && this.value.font
            && this.value.style
            && this.value.size
            && this.value.alignH
            && this.value.alignV
            && this.value.lineHeight
            && this.value.letterSpacing)
        {
            const fontName = figUniqueFontNames[this.value.font.value];

            this.objects = 
            [
                new FigmaText(
                    this.nodeId,
                    0,
                    this.value.text         .value,
                    this.value.x            .value,
                    this.value.y            .value,
                    this.value.width        .value,
                    this.value.height       .value,
                    this.value.angle        .value,
                    fontName,
                    this.value.style        .value,
                    this.value.size         .value,
                    this.value.alignH       .value,
                    this.value.alignV       .value,
                    this.value.lineHeight   .value,
                    this.value.letterSpacing.value)
            ];
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return this.text         .isValid()
            && this.x            .isValid()
            && this.y            .isValid()
            && this.width        .isValid()
            && this.height       .isValid()
            && this.angle        .isValid()
            && this.font         .isValid()
            && this.style        .isValid()
            && this.size         .isValid()
            && this.alignH       .isValid()
            && this.alignV       .isValid()
            && this.lineHeight   .isValid()
            && this.letterSpacing.isValid()
            && super.isValid();
    }



    toValue()
    {
        const rect = new TextShapeValue(
            this.nodeId,
            this.text         .toValue(),
            this.x            .toValue(),
            this.y            .toValue(),
            this.width        .toValue(),
            this.height       .toValue(),
            this.angle        .toValue(),
            this.font         .toValue(),
            this.style        .toValue(),
            this.size         .toValue(),
            this.alignH       .toValue(),
            this.alignV       .toValue(),
            this.lineHeight   .toValue(),
            this.letterSpacing.toValue());

        rect.props = this.props.toValue();

        return rect;
    }
}