class GVectorPath
extends GShape
{
    input   = null;

    points  = null;
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

        if (this.points ) copy.points  = this.points .copy();
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
                degree  ?? input.degree,
                winding ?? input.winding,
                round   ?? input.round);
        }
        else
        {
            this.value = new VectorPathValue(this.nodeId, points, degree, winding, round);
        }


        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value',   this.value        );
            genPushUpdateValue(parse, this.nodeId, 'points',  this.value.points );
            genPushUpdateValue(parse, this.nodeId, 'degree',  this.value.degree );
            genPushUpdateValue(parse, this.nodeId, 'winding', this.value.winding);
            genPushUpdateValue(parse, this.nodeId, 'round',   this.value.round  );
        }


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
            console.log('this.points.objects =', this.points.objects);
            const objPoints = this.points.objects.filter(o => o.type == POINT);

            for (const pt of objPoints)
                points.push(new PointValue(
                    new NumberValue(pt._x), 
                    new NumberValue(pt._y)));
        }


console.log('points =', points);
        if (   points.length >= 2
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
                    this.value.degree .value,
                    this.value.winding.value,
                    this.value.round  .value)
            ];
        }
        else
            this.objects = [];


        
        await super.evalObjects(parse);
    }



    toValue()
    {
        const path = new VectorPathValue(
            this.nodeId,
            this.points .toValue(),
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
            && this.degree .isValid()
            && this.winding.isValid()
            && this.round  .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.points ) this.points .invalidate();
        if (this.degree ) this.degree .invalidate();
        if (this.winding) this.winding.invalidate();
        if (this.round  ) this.round  .invalidate();
    }
}