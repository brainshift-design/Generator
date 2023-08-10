class GVectorPath
extends GShape
{
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

        if (this.points ) copy.points  = this.points .copy();
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
            this.value = new VectorPathValue(
                this.nodeId, 
                points, 
                closed, 
                degree, 
                winding, 
                round);
        }

        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.points ) this.points  = this.value.points .copy();
        if (!this.closed ) this.closed  = this.value.closed .copy();
        if (!this.degree ) this.degree  = this.value.degree .copy();
        if (!this.winding) this.winding = this.value.winding.copy();
        if (!this.round  ) this.round   = this.value.round  .copy();



        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        const points = [];

        if (this.value.points.objects)
        {
            const objPoints = this.value.points.objects.filter(o => o.type == POINT);

            for (const pt of objPoints)
                points.push(PointValue.create(this.nodeId, pt.x, pt.y));
        }


        this.value.objects = [];


        if (   super.baseIsValid()   
            && points.length >= 2
            && this.value.closed .isValid()
            && this.value.degree .isValid()
            && this.value.winding.isValid()
            && this.value.round  .isValid())
        {
            const path = new FigmaVectorPath(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                points,
                this.value.closed .value,
                this.value.degree .value,
                this.value.winding.value,
                this.value.round  .value);

            
            const bounds = getObjBounds([path]);

            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;

            
            path.createDefaultTransform(x, y);
            path.createDefaultTransformPoints(x, y, w, h);

            this.value.objects.push(path);
        }


        await super.evalObjects(parse);
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

        path.props   = this.props.toValue();
        path.objects = this.value.objects.map(o => o.copy());

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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.points ) this.points .pushValueUpdates(parse);
        if (this.closed ) this.closed .pushValueUpdates(parse);
        if (this.degree ) this.degree .pushValueUpdates(parse);
        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.round  ) this.round  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.points ) this.points .invalidateInputs(from);
        if (this.closed ) this.closed .invalidateInputs(from);
        if (this.degree ) this.degree .invalidateInputs(from);
        if (this.winding) this.winding.invalidateInputs(from);
        if (this.round  ) this.round  .invalidateInputs(from);
    }
}