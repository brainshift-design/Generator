class GTextShape
extends GShape
{
    input  = null;

    text   = null;
    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    font   = null;
    size   = null;



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

        if (this.text  ) copy.text   = this.text  .copy();
        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.width ) copy.width  = this.width .copy();
        if (this.height) copy.height = this.height.copy();
        if (this.angle ) copy.angle  = this.angle .copy();
        if (this.font  ) copy.font   = this.font  .copy();
        if (this.size  ) copy.size   = this.size  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const text   = this.text   ? (await this.text  .eval(parse)).toValue() : null;
        const x      = this.x      ? (await this.x     .eval(parse)).toValue() : null;
        const y      = this.y      ? (await this.y     .eval(parse)).toValue() : null;
        const width  = this.width  ? (await this.width .eval(parse)).toValue() : null;
        const height = this.height ? (await this.height.eval(parse)).toValue() : null;
        const angle  = this.angle  ? (await this.angle .eval(parse)).toValue() : null;
        const font   = this.font   ? (await this.font  .eval(parse)).toValue() : null;
        const size   = this.size   ? (await this.size  .eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new TextShapeValue(
                this.nodeId,
                text   ?? input.text,
                x      ?? input.x,
                y      ?? input.y,
                width  ?? input.width,
                height ?? input.height,
                angle  ?? input.angle,
                font   ?? input.font,
                size   ?? input.size);
        }
        else
        {
            this.value = new TextShapeValue(this.nodeId, text, x, y, width, height, angle, font, size);
        }

       
        genPushUpdateValue(parse, this.nodeId, 'value',  this.value       );
        genPushUpdateValue(parse, this.nodeId, 'text',   this.value.text  );
        genPushUpdateValue(parse, this.nodeId, 'x',      this.value.x     );
        genPushUpdateValue(parse, this.nodeId, 'y',      this.value.y     );
        genPushUpdateValue(parse, this.nodeId, 'width',  this.value.width );
        genPushUpdateValue(parse, this.nodeId, 'height', this.value.height);
        genPushUpdateValue(parse, this.nodeId, 'angle',  this.value.angle );
        genPushUpdateValue(parse, this.nodeId, 'font',   this.value.font  );
        genPushUpdateValue(parse, this.nodeId, 'size',   this.value.size  );


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
            && this.value.size)
        {
            console.log('figFonts[this.value.font.value] =', figFonts[this.value.font.value]);
            this.objects = 
            [
                new FigmaText(
                    this.nodeId,
                    0,
                    this.value.text  .value,
                    this.value.x     .value,
                    this.value.y     .value,
                    this.value.width .value,
                    this.value.height.value,
                    this.value.angle .value,
                    figFonts[this.value.font.value].fontName.family,
                    this.value.size  .value)
            ];
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return this.text  .isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.font  .isValid()
            && this.size  .isValid()
            && super.isValid();
    }



    toValue()
    {
        const rect = new TextShapeValue(
            this.nodeId,
            this.text  .toValue(),
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.angle .toValue(),
            this.font  .toValue(),
            this.size  .toValue());

        rect.props = this.props.toValue();

        return rect;
    }
}