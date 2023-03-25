class GRectangle
extends GObjectBase
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
        const copy = new GRectangle(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.width ) copy.width  = this.width .copy();
        if (this.height) copy.height = this.height.copy();
        if (this.angle ) copy.angle  = this.angle .copy();
        if (this.round ) copy.round  = this.round .copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        if (this.input)
            this.input = this.input.eval(parse).copy();

        const hasInput =     
               this.input 
            && RECTANGLE_TYPES.includes(this.input.type);   

            
        if (this.x     ) this.x      = this.x     .eval(parse).copy(); else if (hasInput) this.x      = this.input.x     .copy();
        if (this.y     ) this.y      = this.y     .eval(parse).copy(); else if (hasInput) this.y      = this.input.y     .copy();
        if (this.width ) this.width  = this.width .eval(parse).copy(); else if (hasInput) this.width  = this.input.width .copy();
        if (this.height) this.height = this.height.eval(parse).copy(); else if (hasInput) this.height = this.input.height.copy();
        if (this.angle ) this.angle  = this.angle .eval(parse).copy(); else if (hasInput) this.angle  = this.input.angle .copy();
        if (this.round ) this.round  = this.round .eval(parse).copy(); else if (hasInput) this.round  = this.input.round .copy();

        
        if (this.x     ) genPushUpdateValue(parse, this.nodeId, 'x',      this.x     .toValue());
        if (this.y     ) genPushUpdateValue(parse, this.nodeId, 'y',      this.y     .toValue());
        if (this.width ) genPushUpdateValue(parse, this.nodeId, 'width',  this.width .toValue());
        if (this.height) genPushUpdateValue(parse, this.nodeId, 'height', this.height.toValue());
        if (this.angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  this.angle .toValue());
        if (this.round ) genPushUpdateValue(parse, this.nodeId, 'round',  this.round .toValue());


        if (    hasInput
            && !this.options) this.objects = this.input.objects;
        else                  this.evalObjects();


        this.validate();

        return this;
    }



    evalObjects(options = {})
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
            [
                new FigmaRectangle(
                                this.nodeId,
                                0,
                                this.x     .toValue().value,
                                this.y     .toValue().value,
                                this.width .toValue().value,
                                this.height.toValue().value,
                                this.angle .toValue().value,
                    Math.max(0, this.round .toValue().value))
            ];
        }

        
        super.evalObjects();
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



    toValue()
    {
        return new RectangleValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.angle .toValue(),
            this.round .toValue());
    }
}