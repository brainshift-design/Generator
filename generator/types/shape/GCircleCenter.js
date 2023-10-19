class GCircleCenter
extends GOperator3
{
    constructor(nodeId, options)
    {
        super(CIRCLE_CENTER, nodeId, options);
    }


    
    // reset()
    // {
    //     super.reset();
    // }



    copy()
    {
        const copy = new GCircleCenter(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (   this.input0
            && this.input1
            && this.input2)
        {
            const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
            const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;
            const input2 = this.input2 ? (await this.input2.eval(parse)).toValue() : null;

            if (   input0
                && input1
                && input2)
            {
                const pc = circleCenter(
                    input0.toPoint(),
                    input1.toPoint(),
                    input2.toPoint());

                this.value = PointValue.fromPoint(this.nodeId, pc);
            }
            else
            {
                this.value = PointValue.NaN.copy();
            }
        }
        else
        {
            this.value = PointValue.NaN.copy();
        }


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.distance && this.distance.isValid()
            && this.angle    && this.angle   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.distance) this.distance.pushValueUpdates(parse);
        if (this.angle   ) this.angle   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.distance) this.distance.invalidateInputs(parse, from, force);
        if (this.angle   ) this.angle   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.distance) this.distance.iterateLoop(parse);
        if (this.angle   ) this.angle   .iterateLoop(parse);
    }
}