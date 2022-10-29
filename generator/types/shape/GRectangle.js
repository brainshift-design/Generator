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

        rect.copyBase(this);

        if (this.input) 
            rect.input = this.input.copy();

        if (this.x     ) rect.x      = this.x     .copy();
        if (this.y     ) rect.y      = this.y     .copy();
        if (this.width ) rect.width  = this.width .copy();
        if (this.height) rect.height = this.height.copy();
        if (this.angle ) rect.angle  = this.angle .copy();
        if (this.round ) rect.round  = this.round .copy();

        return rect;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

            
        if (this.input)
            this.input = this.input.eval(parse).copy();

        const hasInput =     
               this.input 
            && RECTANGLE_TYPES.includes(this.input.type);   

            
        if (this.x     ) this.x      = this.x     .eval(parse).copy(); else if (hasInput) this.x      = this.input.x;
        if (this.y     ) this.y      = this.y     .eval(parse).copy(); else if (hasInput) this.y      = this.input.y;
        if (this.width ) this.width  = this.width .eval(parse).copy(); else if (hasInput) this.width  = this.input.width;
        if (this.height) this.height = this.height.eval(parse).copy(); else if (hasInput) this.height = this.input.height;
        if (this.angle ) this.angle  = this.angle .eval(parse).copy(); else if (hasInput) this.angle  = this.input.angle;
        if (this.round ) this.round  = this.round .eval(parse).copy(); else if (hasInput) this.round  = this.input.round;

        
        if (this.x     ) genPushUpdateValue(parse, this.nodeId, 'x',      this.x     .toValue());
        if (this.y     ) genPushUpdateValue(parse, this.nodeId, 'y',      this.y     .toValue());
        if (this.width ) genPushUpdateValue(parse, this.nodeId, 'width',  this.width .toValue());
        if (this.height) genPushUpdateValue(parse, this.nodeId, 'height', this.height.toValue());
        if (this.angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  this.angle .toValue());
        if (this.round ) genPushUpdateValue(parse, this.nodeId, 'round',  this.round .toValue());


        if (    hasInput
            && !this.options) this.objects = this.input.objects;
        else                  this.evalObjects();


        this.valid = true;

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
            && this.round)
        {
            this.objects = 
            [{
                type:   RECTANGLE,
                id:     0,
                x:                  this.x     .toValue().value,
                y:                  this.y     .toValue().value,
                width:              this.width .toValue().value,
                height:             this.height.toValue().value,
                angle:              this.angle .toValue().value,
                round:  Math.max(0, this.round .toValue().value)
            }];
        }

        
        super.evalObjects();
    }



    // isValid()
    // {
    //     return this.x     .isValid()
    //         && this.y     .isValid()
    //         && this.width .isValid()
    //         && this.height.isValid()
    //         && this.angle .isValid()
    //         && this.round .isValid();
    // }
}