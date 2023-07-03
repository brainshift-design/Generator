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

        
        this.updateValues = [['value', this.value]];
        

        await this.evalShapeBase(parse, input);

        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        const objects = [];


        if (   this.value.x 
            && this.value.y 
            && this.value.width 
            && this.value.height 
            && this.value.round
            && this.value.corners)
        {
            let    x = this.value.x      .value;
            let    y = this.value.y      .value;
            let    w = this.value.width  .value;
            let    h = this.value.height .value;
            let    a = 0;
            let   _a = a/360*Tau;
            const  r = Math.max(0, this.value.round.value);
            const  c = this.value.corners.value;


            [x, y, w, h, a, _a] = validateObjectRect(x, y, w, h, a, _a);


            if (   w != 0 
                && h != 0)
            {
                const poly = new FigmaPolygon(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, c);

                poly.createDefaultTransform(x, y);

                objects.push(poly, ...poly.createTransformPoints(parse, x, y, w, h));
            }
        }

        
        this      .objects = [...objects];
        this.value.objects = [...objects];


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
        poly.objects = this.objects.map(o => o.copy());

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