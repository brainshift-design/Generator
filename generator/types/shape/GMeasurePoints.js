class GMeasurePoints
extends GOperator2
{
    distance = null;
    angle    = null;


    
    constructor(nodeId, options)
    {
        super(MEASURE_POINTS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.distance = null;
        this.angle    = null;
    }



    copy()
    {
        const copy = new GMeasurePoints(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.distance) copy.distance = this.distance.copy();
        if (this.angle   ) copy.angle    = this.angle   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;


        if (   input0
            && input1)
        {
            const dist = distv(input0.toPoint(), input1.toPoint());

            let ang = angle(subv(input1.toPoint(), input0.toPoint()));
            if (ang > Tau/2) ang -= Tau;

            this.distance = new NumberValue(dist);
            this.angle    = new NumberValue(ang / Tau * 360);
        }
        else
        {
            this.distance = NumberValue.NaN.copy();
            this.angle    = NumberValue.NaN.copy();
        }


        this.setUpdateValues(parse,
        [
            ['distance', this.distance],
            ['angle',    this.angle   ]
        ]);
        

        this.validate();

        return this;
    }



    // isValid()
    // {
    //     return super.isValid()
    //         && this.distance && this.distance.isValid()
    //         && this.angle    && this.angle   .isValid();
    // }



    // pushValueUpdates(parse)
    // {
    //     super.pushValueUpdates(parse);

    //     if (this.distance) this.distance.pushValueUpdates(parse);
    //     if (this.angle   ) this.angle   .pushValueUpdates(parse);
    // }



    // invalidateInputs(parse, from, force)
    // {
    //     super.invalidateInputs(parse, from, force);

    //     if (this.distance) this.distance.invalidateInputs(parse, from, force);
    //     if (this.angle   ) this.angle   .invalidateInputs(parse, from, force);
    // }



    // iterateLoop(parse)
    // {
    //     super.iterateLoop(parse);

    //     if (this.distance) this.distance.iterateLoop(parse);
    //     if (this.angle   ) this.angle   .iterateLoop(parse);
    // }
}