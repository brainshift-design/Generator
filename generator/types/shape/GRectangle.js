class GRectangle
extends GShape
{
    input = null;

    round = null;



    constructor(nodeId, options)
    {
        super(RECTANGLE, nodeId, options);
    }



    copy()
    {
        const copy = new GRectangle(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.round) copy.round = this.round.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const [x, y, width, height, angle] = await this.evalBaseParams(parse);

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
                angle  ?? input.angle,
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
                angle, 
                round);
        }

       
        this.updateValues =
        [
            ['value', this.value      ],
            ['round', this.value.round]
        ];


        await this.evalShapeBase(parse, input);


        this.evalObjects(parse);


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (   this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.angle
            && this.value.round)
        {
            let    x = this.value.x     .value;
            let    y = this.value.y     .value;
            let    w = this.value.width .value;
            let    h = this.value.height.value;
            let    a = this.value.angle .value;
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
                    x, y, w, h, a, r);

                rect.createDefaultTransform(x, y, _a);

                this      .objects = [rect];
                this.value.objects = [rect];
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

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.round) this.round.pushValueUpdates(parse);
    }



    toValue()
    {
        const rect = new RectangleValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.angle .toValue(),
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



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
        if (this.round) this.round.invalidateInputs();
    }
}