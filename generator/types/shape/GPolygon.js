class GPolygon
extends GShape
{
    round   = null;
    corners = null;



    constructor(nodeId, options)
    {
        super(POLYGON, nodeId, options);
    }



    copy()
    {
        const copy = new GPolygon(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round  ) copy.round   = this.round  .copy();
        if (this.corners) copy.corners = this.corners.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const [x, y, width, height] = await this.evalBaseParams(parse);

        const round   = this.round   ? (await this.round  .eval(parse)).toValue() : null;
        const corners = this.corners ? (await this.corners.eval(parse)).toValue() : null;


        let input = null;
             
        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new PolygonValue(
                this.nodeId,
                x       ?? input.x,
                y       ?? input.y,
                width   ?? input.width,
                height  ?? input.height,
                round   ?? input.round,
                corners ?? input.corners);
        }
        else
        {
            this.value = new PolygonValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                round, 
                corners);
        }

        
        this.setUpdateValues(parse, [['value', this.value]]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x      ) this.x       = this.value.x      .copy();
        if (!this.y      ) this.y       = this.value.y      .copy();
        if (!this.width  ) this.width   = this.value.width  .copy();
        if (!this.height ) this.height  = this.value.height .copy();
        if (!this.round  ) this.round   = this.value.round  .copy();
        if (!this.corners) this.corners = this.value.corners.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x      .isValid()
            && this.value.y      .isValid()
            && this.value.width  .isValid()
            && this.value.height .isValid()
            && this.value.round  .isValid()
            && this.value.corners.isValid())
        {
            let   x = this.value.x      .value;
            let   y = this.value.y      .value;
            let   w = this.value.width  .value;
            let   h = this.value.height .value;
            const r = Math.max(0, this.value.round.value);
            const c = this.value.corners.value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const poly = new FigmaPolygon(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, c);

                poly.createDefaultTransform(x, y);
                poly.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(poly);
            }
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        const poly = new PolygonValue(
            this.nodeId,
            this.x      .toValue(),
            this.y      .toValue(),
            this.width  .toValue(),
            this.height .toValue(),
            this.round  .toValue(),
            this.corners.toValue());

        poly.props   = this.props.toValue();
        poly.objects = this.value.objects.map(o => o.copy());

        return poly;
    }



    isValid()
    {
        return super.isValid()
            && this.round  .isValid()
            && this.corners.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round  ) this.round  .pushValueUpdates(parse);
        if (this.corners) this.corners.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.round  ) this.round  .invalidateInputs(from);
        if (this.corners) this.corners.invalidateInputs(from);
    }
}