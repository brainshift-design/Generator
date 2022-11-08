class GStar
extends GShapeBase
{
    input  = null;

    x      = null;
    y      = null;
    width  = null;
    height = null;
    angle  = null;
    round  = null;
    points = null;
    convex = null;



    constructor(nodeId, options)
    {
        super(STAR, nodeId, options);
    }



    copy()
    {
        const star = new GStar(this.nodeId, this.options);

        star.copyBase(this);

        if (this.input) 
            star.input = this.input.copy();

        if (this.x     ) star.x      = this.x     .copy();
        if (this.y     ) star.y      = this.y     .copy();
        if (this.width ) star.width  = this.width .copy();
        if (this.height) star.height = this.height.copy();
        if (this.angle ) star.angle  = this.angle .copy();
        if (this.round ) star.round  = this.round .copy();
        if (this.points) star.points = this.points.copy();
        if (this.convex) star.convex = this.convex.copy();

        return star;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

            
        if (this.input)
            this.input = this.input.eval(parse).copy();

        const hasInput =     
               this.input 
            && STAR_TYPES.includes(this.input.type);   

             
        if (this.x     ) this.x      = this.x     .eval(parse).copy(); else if (hasInput) this.x      = this.input.x     .copy();
        if (this.y     ) this.y      = this.y     .eval(parse).copy(); else if (hasInput) this.y      = this.input.y     .copy();
        if (this.width ) this.width  = this.width .eval(parse).copy(); else if (hasInput) this.width  = this.input.width .copy();
        if (this.height) this.height = this.height.eval(parse).copy(); else if (hasInput) this.height = this.input.height.copy();
        if (this.angle ) this.angle  = this.angle .eval(parse).copy(); else if (hasInput) this.angle  = this.input.angle .copy();
        if (this.round ) this.round  = this.round .eval(parse).copy(); else if (hasInput) this.round  = this.input.round .copy();
        if (this.points) this.points = this.points.eval(parse).copy(); else if (hasInput) this.points = this.input.points.copy();
        if (this.convex) this.convex = this.convex.eval(parse).copy(); else if (hasInput) this.convex = this.input.convex.copy();

        
        if (this.x     ) genPushUpdateValue(parse, this.nodeId, 'x',      this.x     .toValue());
        if (this.y     ) genPushUpdateValue(parse, this.nodeId, 'y',      this.y     .toValue());
        if (this.width ) genPushUpdateValue(parse, this.nodeId, 'width',  this.width .toValue());
        if (this.height) genPushUpdateValue(parse, this.nodeId, 'height', this.height.toValue());
        if (this.angle ) genPushUpdateValue(parse, this.nodeId, 'angle',  this.angle .toValue());
        if (this.round ) genPushUpdateValue(parse, this.nodeId, 'round',  this.round .toValue());
        if (this.points) genPushUpdateValue(parse, this.nodeId, 'points', this.points.toValue());
        if (this.convex) genPushUpdateValue(parse, this.nodeId, 'convex', this.convex.toValue());


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
           && this.round
           && this.points
           && this.convex)
       {
           this.objects = 
           [
               new FigmaStar(
                               this.x     .toValue().value,
                               this.y     .toValue().value,
                               this.width .toValue().value,
                               this.height.toValue().value,
                               this.angle .toValue().value,
                   Math.max(0, this.round .toValue().value),
                               this.points.toValue().value,
                               this.convex.toValue().value)
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
           && this.round .isValid()
           && this.points.isValid()
           && this.convex.isValid();
   }



   toValue()
   {
       return new StarValue(
           this.id,
           this.x     .toValue(),
           this.y     .toValue(),
           this.width .toValue(),
           this.height.toValue(),
           this.angle .toValue(),
           this.round .toValue(),
           this.points.toValue(),
           this.convex.toValue());
   }
}