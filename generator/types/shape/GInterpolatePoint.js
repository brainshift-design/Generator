class GInterpolatePoint
extends GOperator2
{
    amount     = null;
    transform  = null;
    showCenter = null;


    
    constructor(nodeId, options)
    {
        super(INTERPOLATE_POINT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.amount     = null;
        this.transform  = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GInterpolatePoint(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.amount    ) copy.amount     = this.amount    .copy();
        if (this.transform ) copy.transform  = this.transform .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0     = await evalPointValue (this.input0,     parse);
        const input1     = await evalPointValue (this.input1,     parse);
        const amount     = await evalNumberValue(this.amount,     parse);
        const transform  = await evalNumberValue(this.transform,  parse);
        const showCenter = await evalNumberValue(this.showCenter, parse);


        if (   input0
            && input1
            && input0.isValid()
            && input1.isValid())
        {
            const p0  = point(input0.objects[0].x, input0.objects[0].y);
            const p1  = point(input1.objects[0].x, input1.objects[0].y);
            const amt = amount.value / 100;

            const p   = lerpv(p0, p1, amt);

                
            let sp0 = lerpv(input0.objects[0].sp0, input1.objects[0].sp0, amt);
            let sp1 = lerpv(input0.objects[0].sp1, input1.objects[0].sp1, amt);
            let sp2 = lerpv(input0.objects[0].sp2, input1.objects[0].sp2, amt);

            if (transform.value > 0)
            {
                const l1 = distv(sp0, sp1);
                const l2 = distv(sp0, sp2);

                sp0 = clone(p);
                sp1 = addv(sp0, mulvs(unitv(subv(p1, p0)), l1));
                sp2 = addv(sp0, crossv(mulvs(unitv(subv(p1, p0)), l2)));
            }


            this.value = new PointValue(this.nodeId, new NumberValue(p.x), new NumberValue(p.y));

            const pt = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, p.x, p.y);
            pt.createDefaultTransform(p.x, p.y);
            this.value.objects = [pt];

            this.value.objects[0].sp0 = sp0;
            this.value.objects[0].sp1 = sp1;
            this.value.objects[0].sp2 = sp2;


            if (showCenter.value > 0)
            {
                const objects = [...this.value.objects]; // avoids infinite growth
                objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
            }
        }
        else
            this.value = PointValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['amount',     amount    ],
            ['transform',  transform ],
            ['showCenter', showCenter]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.amount     && this.amount    .isValid()
            && this.transform  && this.transform .isValid()
            && this.showCenter && this.showCenter.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.amount    ) this.amount    .pushValueUpdates(parse);
        if (this.transform ) this.transform .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.amount    ) this.amount    .invalidateInputs(parse, from, force);
        if (this.transform ) this.transform .invalidateInputs(parse, from, force);
        if (this.showCenter) this.showCenter.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.amount    ) this.amount    .iterateLoop(parse);
        if (this.transform ) this.transform .iterateLoop(parse);
        if (this.showCenter) this.showCenter.iterateLoop(parse);
    }
}