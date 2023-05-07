class GFrame
extends GShape
{
    input   = null;

    round   = null;
    objects = null;



    constructor(nodeId, options)
    {
        super(FRAME, nodeId, options);
    }



    copy()
    {
        const copy = new GFrame(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.round  ) copy.round   = this.round  .copy();
        if (this.objects) copy.objects = this.objects.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height, angle] = await this.evalBaseParams(parse);

        const round   = this.round   ? (await this.round  .eval(parse)).toValue() : null;
        const objects = this.objects ? (await this.objects.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new FrameValue(
                this.nodeId,
                x       ?? input.x,
                y       ?? input.y,
                width   ?? input.width,
                height  ?? input.height,
                angle   ?? input.angle,
                round   ?? input.round,
                objects ?? input.objects);
        }
        else
        {
            this.value = new FrameValue(this.nodeId, x, y, width, height, angle, round, objects);
        }


        this.updateValues =
        [
            ['value',   this.value        ],
            ['round',   this.value.round  ],
            ['objects', this.value.objects]
        ];



        await this.evalShapeBase(parse, input);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        // const objects = [];

        // if (this.objects.objects)
        // {
        //     const objPoints = this.objects.objects.filter(o => o.type == POINT);

        //     for (const pt of objPoints)
        //         points.push(new PointValue(
        //             this.nodeId,
        //             new NumberValue(pt.x), 
        //             new NumberValue(pt.y)));
        // }


        // if (   points.length >= 2
        //     && this.value.closed 
        //     && this.value.degree 
        //     && this.value.winding
        //     && this.value.round)
        // {
        //     this.objects =
        //     [
        //         new FigmaVectorPath(
        //             this.nodeId,
        //             NULL,
        //             points,
        //             this.value.closed .value,
        //             this.value.degree .value,
        //             this.value.winding.value,
        //             this.value.round  .value)
        //     ];
        // }
        // else
            this.objects = [];


        
        await super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.round  ) this.round  .pushValueUpdates(parse);
        if (this.objects) this.objects.pushValueUpdates(parse);
    }



    toValue()
    {
        const group = new ShapeGroupValue(
            this.nodeId,
            this.x      .toValue(),
            this.y      .toValue(),
            this.width  .toValue(),
            this.height .toValue(),
            this.angle  .toValue(),
            this.round  .toValue(),
            this.objects.toValue());

        group.props = this.props.toValue();

        return group;
    }



    isValid()
    {
        return super.isValid()
            && this.round  .isValid()
            && this.objects.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.round  ) this.round  .invalidate();
        if (this.objects) this.objects.invalidate();
    }
}