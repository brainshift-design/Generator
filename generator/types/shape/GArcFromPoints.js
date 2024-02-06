class GArcFromPoints
extends GShape
{
    middle = null;

    input0 = null;
    input1 = null;
    input2 = null;

    

    constructor(nodeId, options)
    {
        super(ARC_FROM_POINTS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.input0 = null;
        this.input1 = null;
        this.input2 = null;

        this.middle = null;
    }



    copy()
    {
        const copy = new GArcFromPoints(this.nodeId, this.options);

        copy.copyBase(this);

        if (base.input0) this.input0 = base.input0.copy();
        if (base.input1) this.input1 = base.input1.copy();
        if (base.input2) this.input2 = base.input2.copy();

        if (this.middle) copy.middle = this.middle.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;
        const input2 = this.input2 ? (await this.input2.eval(parse)).toValue() : null;

        const middle = this.middle ? (await this.middle.eval(parse)).toValue() : null;


        if (   input0 && input0.isValid()
            && input1 && input1.isValid()
            && input2 && input2.isValid()
            && middle && middle.isValid())
        {
            const p0 = input0.toPoint();
            const p1 = input1.toPoint();
            const p2 = input2.toPoint();

            // const pc = 
            //     middle.value > 0
            //     ? point(p2.x, p0.y)
            //     : circleCenter(p0, p1, p2);

            const points = makeArc(p0, p1, p2);

            this.value = new VectorPathValue(
                this.nodeId,
                new ListValue(points.map(p => PointValue.fromPoint(this.nodeId, p))),
                new NumberValue(0),
                new NumberValue(2),
                new NumberValue(0),
                new NumberValue(0));
        }
        else
        {
            this.value = VectorPathValue.NaN.copy();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
            //['value', this.value]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        const points = [];

        if (this.value.points)
        {
            for (const pt of this.value.points.items)
            {
                const p = PointValue.create(this.nodeId, pt.x, pt.y);
                
                // if (pt.smooth != null)
                //     p.smooth = new NumberValue(pt.smooth);

                points.push(p);
            }
        }


        this.value.objects = [];


        console.log('this.value =', this.value);
        console.log('this =', this);
        console.log('super.baseIsValid() =', super.baseIsValid());
        console.log('this.value.closed .isValid() =', this.value.closed .isValid());
        console.log('this.value.degree .isValid() =', this.value.degree .isValid());
        console.log('this.value.winding.isValid() =', this.value.winding.isValid());
        console.log('this.value.round  .isValid() =', this.value.round  .isValid());

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



    isValid()
    {
        return this.input0 && this.input0.isValid()
            && this.input1 && this.input1.isValid()
            && this.input2 && this.input2.isValid()
            && this.middle && this.middle.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
        if (this.input2) this.input2.pushValueUpdates(parse);
        if (this.middle) this.middle.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input0) this.input0.invalidateInputs(parse, from, force);
        if (this.input1) this.input1.invalidateInputs(parse, from, force);
        if (this.input2) this.input2.invalidateInputs(parse, from, force);
        if (this.middle) this.middle.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input0) this.input0.iterateLoop(parse);
        if (this.input1) this.input1.iterateLoop(parse);
        if (this.input2) this.input2.iterateLoop(parse);
        if (this.middle) this.middle.iterateLoop(parse);
    }
}