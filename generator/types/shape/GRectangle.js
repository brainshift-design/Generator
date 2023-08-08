class GRectangle
extends GShape
{
    round = null;



    constructor(nodeId, options)
    {
        super(RECTANGLE, nodeId, options);
    }



    copy()
    {
        const copy = new GRectangle(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round) copy.round = this.round.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const [x, y, width, height] = await this.evalBaseParams(parse);

        const round = this.round ? (await this.round.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new RectangleValue(
                this.nodeId,
                x      ?? input.x,
                y      ?? input.y,
                width  ?? input.width,
                height ?? input.height,
                round  ?? input.round);
        }
        else
        {
            this.value = new RectangleValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                round);
        }

       
        this.setUpdateValues(parse, [['value', this.value]]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x     ) this.x      = this.value.x     .copy();
        if (!this.y     ) this.y      = this.value.y     .copy();
        if (!this.width ) this.width  = this.value.width .copy();
        if (!this.height) this.height = this.value.height.copy();
        if (!this.round ) this.round  = this.value.round .copy();


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
            && this.value.height
            && this.value.round)
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const r = Math.max(0, this.value.round.value);


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const rect = new FigmaRectangle(
                    this.nodeId, 
                    this.nodeId, 
                    this.nodeName, 
                    x, y, w, h, r);

                rect.createDefaultTransform(x, y);
                rect.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(rect);
            }
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const rect = new RectangleValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.round .toValue());

        rect.props   = this.props.toValue();
        rect.objects = this.value.objects.map(o => o.copy());

        return rect;
    }



    isValid()
    {
        return super.isValid()
            && this.round.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round) this.round.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.round) this.round.invalidateInputs(from);
    }
}