class GIntersectLines
extends GOperator4
{
    segment = null;



    constructor(nodeId, options)
    {
        super(INTERSECT_LINES, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        if (this.segment) this.segment.reset();
    }



    copy()
    {
        const copy = new GIntersectLines(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.segment) copy.segment = this.segment.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const segment = this.segment ? (await this.segment.eval(parse)).toValue() : null;


        if (   this.input0
            && this.input1
            && this.input2
            && this.input3)
        {
            const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
            const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;
            const input2 = this.input2 ? (await this.input2.eval(parse)).toValue() : null;
            const input3 = this.input3 ? (await this.input3.eval(parse)).toValue() : null;

            if (   input0
                && input1
                && input2
                && input3)
            {
                const p = intersectLines(
                    input0.toPoint(),
                    input1.toPoint(),
                    input2.toPoint(),
                    input3.toPoint(),
                    segment.value != 0);

                this.value = PointValue.fromPoint(this.nodeId, p);
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


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            //['value',   this.value],
            ['segment', segment   ]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.segment && this.segment.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.segment) this.segment.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.segment) this.segment.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.segment) this.segment.iterateLoop(parse);
    }
}