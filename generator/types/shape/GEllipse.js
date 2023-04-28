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


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value       );


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

       
       super.evalObjects(parse);
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

        ellipse.props = this.props.toValue();
        
        return ellipse;
    }
    
    
        
    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
    }
}