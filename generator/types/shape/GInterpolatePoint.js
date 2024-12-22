class GInterpolatePoint
extends GOperator2
{
    static { GNode.types[INTERPOLATE_POINT] = this; }



    amount    = null;
    transform = null;


    
    constructor(nodeId, options)
    {
        super(INTERPOLATE_POINT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.amount    = null;
        this.transform = null;
    }



    copy()
    {
        const copy = new GInterpolatePoint(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.amount   ) copy.amount    = this.amount   .copy();
        if (this.transform) copy.transform = this.transform.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0    = await evalPointValue (this.input0,    parse);
        const input1    = await evalPointValue (this.input1,    parse);
        const amount    = await evalNumberValue(this.amount,    parse);
        const transform = await evalNumberValue(this.transform, parse);


        if (   input0 && input0.isValid() && input0.objects  && input0.objects.length > 0
            && input1 && input1.isValid() && input1.objects  && input1.objects.length > 0)
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
        }
        else
            this.value = PointValue.NaN();


        this.setUpdateValues(parse,
        [
            ['amount',    amount   ],
            ['transform', transform]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.amount    && this.amount   .isValid()
            && this.transform && this.transform.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.amount   ) this.amount   .pushValueUpdates(parse);
        if (this.transform) this.transform.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.amount   ) this.amount   .invalidateInputs(parse, from, force);
        if (this.transform) this.transform.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.amount   ) this.amount   .iterateLoop(parse);
        if (this.transform) this.transform.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const lerp = new GInterpolatePoint(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(lerp, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, lerp);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            lerp.input0 = genParse(parse);
            lerp.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
    
    
        lerp.amount     = genParse(parse);
        lerp.transform  = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, lerp);
        return lerp;
    }
}