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


        const input0  = await evalPointValue (this.input0,  parse);
        const input1  = await evalPointValue (this.input1,  parse);
        const input2  = await evalPointValue (this.input2,  parse);
        const input3  = await evalPointValue (this.input3,  parse);
        const segment = await evalNumberValue(this.segment, parse);


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
                segment.value > 0);

            this.value = PointValue.fromPoint(this.nodeId, p);
        }
        else
        {
            this.value = PointValue.NaN();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['value',   this.value],
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