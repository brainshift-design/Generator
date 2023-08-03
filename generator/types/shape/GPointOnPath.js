class GPointOnPath
extends GOperatorBase2
{
    measure    = null;
    amount     = null;
    transform  = null;
    showCenter = null;


    
    constructor(nodeId, options)
    {
        super(POINT_ON_PATH, nodeId, options);
    }


    
    copy()
    {
        const copy = new GPointOnPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.measure   ) copy.measure    = this.measure   .copy();
        if (this.amount    ) copy.amount     = this.amount    .copy();
        if (this.transform ) copy.transform  = this.transform .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const measure    = this.measure    ? (await this.measure   .eval(parse)).toValue() : null;
        const amount     = this.amount     ? (await this.amount    .eval(parse)).toValue() : null;
        const transform  = this.transform  ? (await this.transform .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (   this.input0
            && this.input1)
        {
            const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
            const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;

            if (   input0
                && input1)
            {
                // const p0  = point(input0.objects[0].x, input0.objects[0].y);
                // const p1  = point(input1.objects[0].x, input1.objects[0].y);
                // const amt = amount.value / 100;

                // const p   = lerpv(p0, p1, amt);

                    
                // let sp0 = lerpv(input0.objects[0].sp0, input1.objects[0].sp0, amt);
                // let sp1 = lerpv(input0.objects[0].sp1, input1.objects[0].sp1, amt);
                // let sp2 = lerpv(input0.objects[0].sp2, input1.objects[0].sp2, amt);

                // if (transform.value > 0)
                // {
                //     const l1 = distance(sp0, sp1);
                //     const l2 = distance(sp0, sp2);

                //     sp0 = clone(p);
                //     sp1 = addv(sp0, mulvs(unitv(subv(p1, p0)), l1));
                //     sp2 = addv(sp0, crossv(mulvs(unitv(subv(p1, p0)), l2)));
                // }


                // this.value = new PointValue(this.nodeId, new NumberValue(p.x), new NumberValue(p.y));

                // const pt = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, p.x, p.y);
                // pt.createDefaultTransform(p.x, p.y);
                // this.value.objects = [pt];

                // this.value.objects[0].sp0 = sp0;
                // this.value.objects[0].sp1 = sp1;
                // this.value.objects[0].sp2 = sp2;


                // if (showCenter.value > 0)
                // {
                //     const objects = [...this.value.objects]; // avoids infinite growth
                //     objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
                // }
            }
        }


        this.setUpdateValues(parse,
        [
            ['measure',    measure   ],
            ['amount',     amount    ],
            ['transform',  transform ],
            ['showCenter', showCenter]
        ]);
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.measure   ) this.measure   .pushValueUpdates(parse);
        if (this.amount    ) this.amount    .pushValueUpdates(parse);
        if (this.transform ) this.transform .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.measure   ) this.measure   .invalidateInputs(from);
        if (this.amount    ) this.amount    .invalidateInputs(from);
        if (this.transform ) this.transform .invalidateInputs(from);
        if (this.showCenter) this.showCenter.invalidateInputs(from);
    }
}