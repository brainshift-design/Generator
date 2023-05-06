class GVectorPath
extends GShape
{
    input   = null;

    points  = null;
    closed  = null;
    degree  = null;
    winding = null;
    round   = null;



    constructor(nodeId, options)
    {
        super(VECTOR_PATH, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.points ) copy.objects  = this.points .copy();
        if (this.closed ) copy.closed  = this.closed .copy();
        if (this.degree ) copy.degree  = this.degree .copy();
        if (this.winding) copy.winding = this.winding.copy();
        if (this.round  ) copy.round   = this.round  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const points  = this.points  ? (await this.points .eval(parse)).toValue() : null;
        const closed  = this.closed  ? (await this.closed .eval(parse)).toValue() : null;
        const degree  = this.degree  ? (await this.degree .eval(parse)).toValue() : null;
        const winding = this.winding ? (await this.winding.eval(parse)).toValue() : null;
        const round   = this.round   ? (await this.round  .eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new VectorPathValue(
                this.nodeId,
                points  ?? input.points,
                closed  ?? input.closed,
                degree  ?? input.degree,
                winding ?? input.winding,
                round   ?? input.round);
        }
        else
        {
            this.value = new VectorPathValue(this.nodeId, points, closed, degree, winding, round);
        }


        this.updateValues =
        [
            ['value',   this.value        ],
            ['points',  this.value.points ],
            ['closed',  this.value.closed ],
            ['degree',  this.value.degree ],
            ['winding', this.value.winding],
            ['round',   this.value.round  ]
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
            

        const points = [];

        if (this.points.objects)
        {
            const objPoints = this.points.objects.filter(o => o.type == POINT);

            for (const pt of objPoints)
                points.push(new PointValue(
                    this.nodeId,
                    new NumberValue(pt.x), 
                    new NumberValue(pt.y)));
        }


        if (   points.length >= 2
            && this.value.closed 
            && this.value.degree 
            && this.value.winding
            && this.value.round)
        {
            this.objects =
            [
                new FigmaVectorPath(
                    this.nodeId,
                    NULL,
                    points,
                    this.value.closed .value,
                    this.value.degree .value,
                    this.value.winding.value,
                    this.value.round  .value)
            ];
        }
        else
            this.objects = [];


        
        await super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.points ) this.points .pushValueUpdates(parse);
        if (this.closed ) this.closed .pushValueUpdates(parse);
        if (this.degree ) this.degree .pushValueUpdates(parse);
        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.round  ) this.round  .pushValueUpdates(parse);
    }



    toValue()
    {
        const path = new VectorPathValue(
            this.nodeId,
            this.points .toValue(),
            this.closed .toValue(),
            this.degree .toValue(),
            this.winding.toValue(),
            this.round  .toValue());

        path.props = this.props.toValue();

        return path;
    }



    isValid()
    {
        return super.isValid()
            && this.points .isValid()
            && this.closed .isValid()
            && this.degree .isValid()
            && this.winding.isValid()
            && this.round  .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.points ) this.points .invalidate();
        if (this.closed ) this.closed .invalidate();
        if (this.degree ) this.degree .invalidate();
        if (this.winding) this.winding.invalidate();
        if (this.round  ) this.round  .invalidate();
    }
}