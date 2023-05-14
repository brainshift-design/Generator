class GEllipse
extends GShape
{
    input  = null;



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

        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height, angle] = await this.evalBaseParams(parse);


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
                angle  ?? input.angle);
        }
        else
        {
            this.value = new EllipseValue(this.nodeId, x, y, width, height, angle);
        }


        this.updateValues = [['value', this.value]];


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
                this.value.angle .value);

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
           this.angle .toValue());

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