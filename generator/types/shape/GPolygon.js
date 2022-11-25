class GPolygon
extends GShapeBase
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
        const poly = new GPolygon(this.nodeId, this.options);

        poly.copyBase(this);

        if (this.input) 
            poly.input = this.input.copy();

        if (this.x      ) poly.x       = this.x      .copy();
        if (this.y      ) poly.y       = this.y      .copy();
        if (this.width  ) poly.width   = this.width  .copy();
        if (this.height ) poly.height  = this.height .copy();
        if (this.angle  ) poly.angle   = this.angle  .copy();
        if (this.round  ) poly.round   = this.round  .copy();
        if (this.corners) poly.corners = this.corners.copy();

        return poly;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        if (this.input)
            this.input = this.input.eval(parse).copy();

        const hasInput =     
               this.input 
            && POLYGON_TYPES.includes(this.input.type);   

             
        if (this.x      ) this.x       = this.x      .eval(parse).copy(); else if (hasInput) this.x       = this.input.x      .copy();
        if (this.y      ) this.y       = this.y      .eval(parse).copy(); else if (hasInput) this.y       = this.input.y      .copy();
        if (this.width  ) this.width   = this.width  .eval(parse).copy(); else if (hasInput) this.width   = this.input.width  .copy();
        if (this.height ) this.height  = this.height .eval(parse).copy(); else if (hasInput) this.height  = this.input.height .copy();
        if (this.angle  ) this.angle   = this.angle  .eval(parse).copy(); else if (hasInput) this.angle   = this.input.angle  .copy();
        if (this.round  ) this.round   = this.round  .eval(parse).copy(); else if (hasInput) this.round   = this.input.round  .copy();
        if (this.corners) this.corners = this.corners.eval(parse).copy(); else if (hasInput) this.corners = this.input.corners.copy();

        
        if (this.x      ) genPushUpdateValue(parse, this.nodeId, 'x',       this.x      .toValue());
        if (this.y      ) genPushUpdateValue(parse, this.nodeId, 'y',       this.y      .toValue());
        if (this.width  ) genPushUpdateValue(parse, this.nodeId, 'width',   this.width  .toValue());
        if (this.height ) genPushUpdateValue(parse, this.nodeId, 'height',  this.height .toValue());
        if (this.angle  ) genPushUpdateValue(parse, this.nodeId, 'angle',   this.angle  .toValue());
        if (this.round  ) genPushUpdateValue(parse, this.nodeId, 'round',   this.round  .toValue());
        if (this.corners) genPushUpdateValue(parse, this.nodeId, 'corners', this.corners.toValue());


        if (    hasInput
            && !this.options) this.objects = this.input.objects;
        else                  this.evalObjects();


        this.validate();

        return this;
    }



    evalObjects()
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
                                -1,
                                this.x      .toValue().value,
                                this.y      .toValue().value,
                                this.width  .toValue().value,
                                this.height .toValue().value,
                                this.angle  .toValue().value,
                    Math.max(0, this.round  .toValue().value),
                                this.corners.toValue().value)
            ];
        }

        
        super.evalObjects();
    }



    isValid()
    {
        return this.x      .isValid()
            && this.y      .isValid()
            && this.width  .isValid()
            && this.height .isValid()
            && this.angle  .isValid()
            && this.round  .isValid()
            && this.corners.isValid();
    }



    toValue()
    {
        return new PolygonValue(
            this.id,
            this.x      .toValue(),
            this.y      .toValue(),
            this.width  .toValue(),
            this.height .toValue(),
            this.angle  .toValue(),
            this.round  .toValue(),
            this.corners.toValue());
    }
}