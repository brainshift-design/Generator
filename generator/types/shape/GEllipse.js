class GEllipse
extends GShape
{
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

        if (this.from ) copy.from  = this.from .copy();
        if (this.to   ) copy.to    = this.to   .copy();
        if (this.inner) copy.inner = this.inner.copy();
        
        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height] = await this.evalBaseParams(parse);

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
                from   ?? input.from,
                to     ?? input.to,
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
                from,
                to, 
                inner);
        }


        this.setUpdateValues(parse, [['value', this.value]]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
       if (!this.options.enabled)
           return;
           
           
        this.value.objects = [];


        if (   this.value.x 
            && this.value.y 
            && this.value.width 
            && this.value.height) 
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const f = this.value.from  .value;
            const t = this.value.to    .value;
            const i = this.value.inner .value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const ellipse = new FigmaEllipse(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, f, t, i);

                ellipse.createDefaultTransform(x, y);
                ellipse.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(ellipse);
            }
        }

       
        await super.evalObjects(parse);
    }
   
    
        
    toValue()
    {
        const ellipse = new EllipseValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.from  .toValue(),
            this.to    .toValue(),
            this.inner .toValue());

        ellipse.props   = this.props.toValue();
        ellipse.objects = this.value.objects.map(o => o.copy());
        
        return ellipse;
    }
    

    
    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.from ) this.from .pushValueUpdates(parse);
        if (this.to   ) this.to   .pushValueUpdates(parse);
        if (this.inner) this.inner.pushValueUpdates(parse);
    }

   
        
    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.from ) this.from .invalidateInputs(from);
        if (this.to   ) this.to   .invalidateInputs(from);
        if (this.inner) this.inner.invalidateInputs(from);
    }
}