class GLine
extends GShapeBase
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
        const line = new GLine(this.nodeId, this.options);

        line.copyBase(this);

        if (this.input) 
            line.input = this.input.copy();

        if (this.x     ) line.x      = this.x     .copy();
        if (this.y     ) line.y      = this.y     .copy();
        if (this.width ) line.width  = this.width .copy();
        if (this.angle ) line.angle  = this.angle .copy();

        return line;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        if (this.input)
            this.input = this.input.eval(parse).copy();

        const hasInput =     
               this.input 
            && LINE_TYPES.includes(this.input.type);   

            
        if (this.x     ) this.x     = this.x     .eval(parse).copy(); else if (hasInput) this.x     = this.input.x     .copy();
        if (this.y     ) this.y     = this.y     .eval(parse).copy(); else if (hasInput) this.y     = this.input.y     .copy();
        if (this.width ) this.width = this.width .eval(parse).copy(); else if (hasInput) this.width = this.input.width .copy();
        if (this.angle ) this.angle = this.angle .eval(parse).copy(); else if (hasInput) this.angle = this.input.angle .copy();

        
        if (this.x     ) genPushUpdateValue(parse, this.nodeId, 'x',      this.x     .toValue());
        if (this.y     ) genPushUpdateValue(parse, this.nodeId, 'y',      this.y     .toValue());
        if (this.width ) genPushUpdateValue(parse, this.nodeId, 'width',  this.width .toValue());
        if (this.angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  this.angle .toValue());


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
            && this.angle)
        {
            this.objects = 
            [
                new FigmaLine(
                    this.x    .toValue().value,
                    this.y    .toValue().value,
                    this.width.toValue().value,
                    this.angle.toValue().value)
            ];
        }

        
        super.evalObjects();
    }



    isValid()
    {
        return this.x    .isValid()
            && this.y    .isValid()
            && this.width.isValid()
            && this.angle.isValid();
    }



    toValue()
    {
        return new LineValue(
            this.id,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.angle .toValue());
    }
}