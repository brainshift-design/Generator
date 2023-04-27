class GPolygon
extends GShape
{
    input   = null;

    x       = null;
    y       = null;
    width   = null;
    height  = null;
    angle   = null;
    round   = null;
    corners = null;



    constructor(nodeId, options)
    {
        super(POLYGON, nodeId, options);
    }



    copy()
    {
        const copy = new GPolygon(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x      ) copy.x       = this.x      .copy();
        if (this.y      ) copy.y       = this.y      .copy();
        if (this.width  ) copy.width   = this.width  .copy();
        if (this.height ) copy.height  = this.height .copy();
        if (this.angle  ) copy.angle   = this.angle  .copy();
        if (this.round  ) copy.round   = this.round  .copy();
        if (this.corners) copy.corners = this.corners.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const x       = this.x       ? (await this.x      .eval(parse)).toValue() : null;
        const y       = this.y       ? (await this.y      .eval(parse)).toValue() : null;
        const width   = this.width   ? (await this.width  .eval(parse)).toValue() : null;
        const height  = this.height  ? (await this.height .eval(parse)).toValue() : null;
        const angle   = this.angle   ? (await this.angle  .eval(parse)).toValue() : null;
        const round   = this.round   ? (await this.round  .eval(parse)).toValue() : null;
        const corners = this.corners ? (await this.corners.eval(parse)).toValue() : null;


        let input = null;
             
        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new PolygonValue(
                this.nodeId,
                x       ?? input.x,
                y       ?? input.y,
                width   ?? input.width,
                height  ?? input.height,
                angle   ?? input.angle,
                round   ?? input.round,
                corners ?? input.corners);
        }
        else
        {
            this.value = new PolygonValue(this.nodeId, x, y, width, height, angle, round, corners);
        }

        
        genPushUpdateValue(parse, this.nodeId, 'value',   this.value        );
        genPushUpdateValue(parse, this.nodeId, 'x',       this.value.x      );
        genPushUpdateValue(parse, this.nodeId, 'y',       this.value.y      );
        genPushUpdateValue(parse, this.nodeId, 'width',   this.value.width  );
        genPushUpdateValue(parse, this.nodeId, 'height',  this.value.height );
        genPushUpdateValue(parse, this.nodeId, 'angle',   this.value.angle  );
        genPushUpdateValue(parse, this.nodeId, 'round',   this.value.round  );
        genPushUpdateValue(parse, this.nodeId, 'corners', this.value.corners);


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
            && this.height 
            && this.angle 
            && this.round
            && this.corners)
        {
            this.objects = 
            [
                new FigmaPolygon(
                                this.nodeId,
                                0,
                                this.x      .toValue().value,
                                this.y      .toValue().value,
                                this.width  .toValue().value,
                                this.height .toValue().value,
                                this.angle  .toValue().value,
                    Math.max(0, this.round  .toValue().value),
                                this.corners.toValue().value)
            ];
        }

        
        super.evalObjects(parse);
    }



    toValue()
    {
        const poly = new PolygonValue(
            this.nodeId,
            this.x      .toValue(),
            this.y      .toValue(),
            this.width  .toValue(),
            this.height .toValue(),
            this.angle  .toValue(),
            this.round  .toValue(),
            this.corners.toValue());

        poly.props = this.props.toValue();

        return poly;
    }



    isValid()
    {
        return this.x      .isValid()
            && this.y      .isValid()
            && this.width  .isValid()
            && this.height .isValid()
            && this.angle  .isValid()
            && this.round  .isValid()
            && this.corners.isValid()
            && super.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.x      ) this.x      .invalidate();
        if (this.y      ) this.y      .invalidate();
        if (this.width  ) this.width  .invalidate();
        if (this.height ) this.height .invalidate();
        if (this.angle  ) this.angle  .invalidate();
        if (this.round  ) this.round  .invalidate();
        if (this.corners) this.corners.invalidate();
    }
}