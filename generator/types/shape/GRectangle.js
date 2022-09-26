class GRectangle
extends GShapeBase
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;



    constructor(nodeId, options)
    {
        super(RECTANGLE, nodeId, options);
    }



    copy()
    {
        const rect = new GRectangle(this.nodeId, this.options);

        if (this.input) 
            rect.input = this.input.copy();

        if (this.x     ) rect.x      = this.x     .copy();
        if (this.y     ) rect.y      = this.y     .copy();
        if (this.width ) rect.width  = this.width .copy();
        if (this.height) rect.height = this.height.copy();
        if (this.angle ) rect.angle  = this.angle .copy();
        if (this.round ) rect.round  = this.round .copy();

        rect.copyFromBase(this);

        return rect;
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.round .isValid();
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.x     ) this.x     .eval(parse);
        if (this.y     ) this.y     .eval(parse);
        if (this.width ) this.width .eval(parse);
        if (this.height) this.height.eval(parse);
        if (this.angle ) this.angle .eval(parse);
        if (this.round ) this.round .eval(parse);


        if (this.input)
        {
            while (!RECTANGLE_TYPES.includes(this.input.type))
                this.input = this.input.input;

            this.input.eval(parse);
        }

        
        const x      = this.x      ? this.x      : this.input && !isEmpty(this.input.objects) ? this.input.x      : null;
        const y      = this.y      ? this.y      : this.input && !isEmpty(this.input.objects) ? this.input.y      : null;
        const width  = this.width  ? this.width  : this.input && !isEmpty(this.input.objects) ? this.input.width  : null;
        const height = this.height ? this.height : this.input && !isEmpty(this.input.objects) ? this.input.height : null;
        const angle  = this.angle  ? this.angle  : this.input && !isEmpty(this.input.objects) ? this.input.angle  : null;
        const round  = this.round  ? this.round  : this.input && !isEmpty(this.input.objects) ? this.input.round  : null;


        if (x     ) genPushUpdateValue(parse, this.nodeId, 'x',      x     .toValue());
        if (y     ) genPushUpdateValue(parse, this.nodeId, 'y',      y     .toValue());
        if (width ) genPushUpdateValue(parse, this.nodeId, 'width',  width .toValue());
        if (height) genPushUpdateValue(parse, this.nodeId, 'height', height.toValue());
        if (angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  angle .toValue());
        if (round ) genPushUpdateValue(parse, this.nodeId, 'round',  round .toValue());


        if (    this.input
            && !this.options) this.objects = this.input.objects;
        else                  this.evalObjects();


        this.valid = true;
    }



    evalObjects()
    {
        const x      = this.x      ? this.x      : this.input ? this.input.x      : null;
        const y      = this.y      ? this.y      : this.input ? this.input.y      : null;
        const width  = this.width  ? this.width  : this.input ? this.input.width  : null;
        const height = this.height ? this.height : this.input ? this.input.height : null;
        const angle  = this.angle  ? this.angle  : this.input ? this.input.angle  : null;
        const round  = this.round  ? this.round  : this.input ? this.input.round  : null;


        if (   x 
            && y 
            && width 
            && height 
            && angle 
            && round)
        {
            this.objects = 
            [{
                type:   RECTANGLE,
                id:     0,
                x:                  x     .toValue().value,
                y:                  y     .toValue().value,
                width:              width .toValue().value,
                height:             height.toValue().value,
                angle:              angle .toValue().value,
                round:  Math.max(0, round .toValue().value)
            }];
        }

        
        super.evalObjects();
    }
}