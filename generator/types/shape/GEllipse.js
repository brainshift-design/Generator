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
            let    x = this.value.x     .value;
            let    y = this.value.y     .value;
            let    w = this.value.width .value;
            let    h = this.value.height.value;
            let    a = this.value.angle .value;
            let   _a = a/360*Tau;
            const  f = this.value.from .value;
            const  t = this.value.to   .value;
            const  i = this.value.inner.value;


            [x, y, w, h, a, _a] = validateObjectRect(x, y, w, h, a, _a);


            if (   w != 0 
                && h != 0)
            {
                const ellipse = new FigmaEllipse(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, a, f, t, i);

                ellipse.createDefaultTransform(x, y, _a);

                this      .objects = [ellipse];
                this.value.objects = [ellipse];
            }
            else
            {
                this      .objects = [];
                this.value.objects = [];
            }
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
    
    
        
    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
    }
}