class GEllipse
extends GShape
{
    input = null;

    from  = null;
    to    = null;
    inner = null;



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

        if (this.from ) copy.from  = this.from .copy();
        if (this.to   ) copy.to    = this.to   .copy();
        if (this.inner) copy.inner = this.inner.copy();
        
        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height, angle] = await this.evalBaseParams(parse);

        const from  = this.from  ? (await this.from .eval(parse)).toValue() : null;
        const to    = this.to    ? (await this.to   .eval(parse)).toValue() : null;
        const inner = this.inner ? (await this.inner.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new EllipseValue(
                this.nodeId,
                x      ?? input.x,
                y      ?? input.y,
                width  ?? input.width,
                height ?? input.height,
                angle  ?? input.angle,
                from   ?? input.from ,
                to     ?? input.to   ,
                inner  ?? input.inner);
        }
        else
        {
            this.value = new EllipseValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                angle,
                from,
                to, 
                inner);
        }


        this.updateValues = [[returnValueId, this.value]];


        await this.evalShapeBase(parse, input);


        this.evalObjects(parse);


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
           && this.angle)
       {
            const ellipse = new FigmaEllipse(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                this.value.x     .value,
                this.value.y     .value,
                this.value.width .value,
                this.value.height.value,
                this.value.angle .value,
                this.value.from  .value,
                this.value.to    .value,
                this.value.inner .value);

            ellipse.createDefaultTransform(
                this.value.x    .value,
                this.value.y    .value,
                this.value.angle.value/360*Tau);

            this.objects       = [ellipse];
            this.value.objects = [ellipse];
       }

       
       super.evalObjects(parse);
   }
   
    
        
   pushValueUpdates(parse)
   {
       super.pushValueUpdates(parse);

       if (this.input) this.input.pushValueUpdates(prase);
   }

   

   toValue()
   {
       const ellipse = new EllipseValue(
           this.nodeId,
           this.x     .toValue(),
           this.y     .toValue(),
           this.width .toValue(),
           this.height.toValue(),
           this.angle .toValue(),
           this.from  .toValue(),
           this.to    .toValue(),
           this.inner .toValue());

        ellipse.props   = this.props.toValue();
        ellipse.objects = this.objects.map(o => o.copy());
        
        return ellipse;
    }
    
    
        
    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}