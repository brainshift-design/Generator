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
            && this.value.round)
        {
            let    x = this.value.x     .value;
            let    y = this.value.y     .value;
            let    w = this.value.width .value;
            let    h = this.value.height.value;
            let    a = 0;
            let   _a = a/360*Tau;
            const  r = Math.max(0, this.value.round.value);


            [x, y, w, h, a, _a] = validateObjectRect(x, y, w, h, a, _a);


            if (   w != 0 
                && h != 0)
            {
                const rect = new FigmaRectangle(
                    this.nodeId, 
                    this.nodeId, 
                    this.nodeName, 
                    x, y, w, h, r);

                rect.createDefaultTransform(x, y);

                objects.push(rect, ...rect.createTransformPoints(parse, x, y, w, h));
            }
        }


        this      .objects = [...objects];
        this.value.objects = [...objects];


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
        rect.objects = this.objects.map(o => o.copy());

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