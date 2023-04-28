class GStar
extends GShape
{
    input  = null;

    round  = null;
    points = null;
    convex = null;



    constructor(nodeId, options)
    {
        super(STAR, nodeId, options);
    }



    copy()
    {
        const copy = new GStar(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.round ) copy.round  = this.round .copy();
        if (this.points) copy.points = this.points.copy();
        if (this.convex) copy.convex = this.convex.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const [x, y, width, height, angle] = await this.evalBaseParams(parse);

        const round  = this.round  ? (await this.round .eval(parse)).toValue() : null;
        const points = this.points ? (await this.points.eval(parse)).toValue() : null;
        const convex = this.convex ? (await this.convex.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new StarValue(
                this.nodeId,
                x      ?? input.x,
                y      ?? input.y,
                width  ?? input.width,
                height ?? input.height,
                angle  ?? input.angle,
                round  ?? input.round,
                points ?? input.points,
                convex ?? input.convex);
        }
        else
        {
            this.value = new StarValue(this.nodeId, x, y, width, height, angle, round, points, convex);
        }

             
        genPushUpdateValue(parse, this.nodeId, 'value',  this.value       );
        genPushUpdateValue(parse, this.nodeId, 'round',  this.value.round );
        genPushUpdateValue(parse, this.nodeId, 'points', this.value.points);
        genPushUpdateValue(parse, this.nodeId, 'convex', this.value.convex);


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
           && this.points
           && this.convex)
       {
           this.objects = 
           [
               new FigmaStar(
                               this.nodeId,
                               0,
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

       
       super.evalObjects(parse);
   }



    toValue()
    {
       const star = new StarValue(
           this.nodeId,
           this.x     .toValue(),
           this.y     .toValue(),
           this.width .toValue(),
           this.height.toValue(),
           this.angle .toValue(),
           this.round .toValue(),
           this.points.toValue(),
           this.convex.toValue());

        star.props = this.props.toValue();

        return star;
   }



   isValid()
   {
      return super.isValid()
          && this.round .isValid()
          && this.points.isValid()
          && this.convex.isValid();
   }



   invalidate()
   {
      super.invalidate();

      if (this.input ) this.input .invalidate();
      if (this.round ) this.round .invalidate();
      if (this.points) this.points.invalidate();
      if (this.convex) this.convex.invalidate();
   }
}