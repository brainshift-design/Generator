class GLine
extends GShape
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    angle  = null;



    constructor(nodeId, options)
    {
        super(LINE, nodeId, options);
    }



    copy()
    {
        const copy = new GLine(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.width ) copy.width  = this.width .copy();
        if (this.angle ) copy.angle  = this.angle .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const x     = this.x     ? (await this.x    .eval(parse)).toValue() : null;
        const y     = this.y     ? (await this.y    .eval(parse)).toValue() : null;
        const width = this.width ? (await this.width.eval(parse)).toValue() : null;
        const angle = this.angle ? (await this.angle.eval(parse)).toValue() : null;

        
        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new LineValue(
                this.nodeId,
                x     ?? input.x,
                y     ?? input.y,
                width ?? input.width,
                angle ?? input.angle);
        }
        else
        {
            this.value = new LineValue(this.nodeId, x, y, width, angle);
        }


            
        genPushUpdateValue(parse, this.nodeId, 'value', this.value      );
        genPushUpdateValue(parse, this.nodeId, 'x',     this.value.x    );
        genPushUpdateValue(parse, this.nodeId, 'y',     this.value.y    );
        genPushUpdateValue(parse, this.nodeId, 'width', this.value.width);
        genPushUpdateValue(parse, this.nodeId, 'angle', this.value.angle);


        await this.evalBase(parse, input);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (   this.x 
            && this.y 
            && this.width 
            && this.angle)
        {
            this.objects = 
            [
                new FigmaLine(
                    this.nodeId,
                    0,
                    this.value.x    .value,
                    this.value.y    .value,
                    this.value.width.value,
                    this.value.angle.value)
            ];
        }

        
        super.evalObjects(parse);
    }



    isValid()
    {
        return this.x    .isValid()
            && this.y    .isValid()
            && this.width.isValid()
            && this.angle.isValid()
            && super.isValid();
    }



    toValue()
    {
        const line = new LineValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.angle .toValue());

        line.props = this.props.toValue();

        return line;
    }
}