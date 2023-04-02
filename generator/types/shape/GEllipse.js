class GEllipse
extends GObjectBase
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;



    constructor(nodeId, options)
    {
        super(ELLIPSE, nodeId, options);
    }



    copy()
    {
        const copy = new GEllipse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.width ) copy.width  = this.width .copy();
        if (this.height) copy.height = this.height.copy();
        if (this.angle ) copy.angle  = this.angle .copy();

        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        if (this.input)
            await this.input.eval(parse);

        const hasInput =     
               this.input 
            && ELLIPSE_TYPES.includes(this.input.type);   

            
        if (this.x     ) await this.x     .eval(parse); else if (hasInput) this.x      = this.input.x     ;
        if (this.y     ) await this.y     .eval(parse); else if (hasInput) this.y      = this.input.y     ;
        if (this.width ) await this.width .eval(parse); else if (hasInput) this.width  = this.input.width ;
        if (this.height) await this.height.eval(parse); else if (hasInput) this.height = this.input.height;
        if (this.angle ) await this.angle .eval(parse); else if (hasInput) this.angle  = this.input.angle ;

        
        if (this.x     ) genPushUpdateValue(parse, this.nodeId, 'x',      this.x     .toValue());
        if (this.y     ) genPushUpdateValue(parse, this.nodeId, 'y',      this.y     .toValue());
        if (this.width ) genPushUpdateValue(parse, this.nodeId, 'width',  this.width .toValue());
        if (this.height) genPushUpdateValue(parse, this.nodeId, 'height', this.height.toValue());
        if (this.angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  this.angle .toValue());


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
           && this.angle)
       {
           this.objects = 
           [
               new FigmaEllipse(
                    this.nodeId,
                    0,
                    this.x     .toValue().value,
                    this.y     .toValue().value,
                    this.width .toValue().value,
                    this.height.toValue().value,
                    this.angle .toValue().value)
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
           && this.angle .isValid();
   }



   toValue()
   {
       return new EllipseValue(
           this.nodeId,
           this.x     .toValue(),
           this.y     .toValue(),
           this.width .toValue(),
           this.height.toValue(),
           this.angle .toValue());
   }
}