class GPlace
extends GOperator1
{
    position   = null;
    transform  = null;
    showCenter = null;
    
    

    constructor(nodeId, options)
    {
        super(PLACE, nodeId, options);
    }



    reset()
    {
        super.reset();
        
        this.position   = null;
        this.transform  = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GPlace(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position  ) copy.position   = this.position  .copy();
        if (this.transform ) copy.transform  = this.transform .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const position   = this.position   ? (await this.position  .eval(parse)).toValue() : null;
        const transform  = this.transform  ? (await this.transform .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;

        if (   this.input
            && position)
        {
            this.value = (await this.input.eval(parse)).toValue();

            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
            this.value = null;//new NullValue();



        if (   position
            && position.isValid())
            // && position.objects
            // && position.objects.length > 0)
        {
            const p0 = position.toPoint();//point(
                // position/*.objects[0]*/.x, 
                // position/*.objects[0]*/.y);

            const p1 = addv(p0, subv(position/*.objects[0]*/.sp1, position/*.objects[0]*/.sp0));
            const p2 = addv(p0, subv(position/*.objects[0]*/.sp2, position/*.objects[0]*/.sp0));

            await this.evalObjects(
                parse, 
                {
                    transform:  transform,
                    showCenter: showCenter,
                    sp0:        p0,
                    sp1:        p1,
                    sp2:        p2
                });
        }

        
        this.setUpdateValues(parse,
        [
            ['position',   position  ],
            ['transform',  transform ],
            ['showCenter', showCenter]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        if (   this.value
            && this.value.isValid())
        {
            this.value.objects = getValidObjects(this.input.value);


            const place = createTransform(
                options.sp0 ? options.sp0.x : 0,
                options.sp0 ? options.sp0.y : 0);


            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


                if (this.options.enabled)
                {
                    let xform = mulm3m3(
                        createTransform(
                            -obj.sp0.x, 
                            -obj.sp0.y),
                        place);


                    if (   options.transform.value > 0
                        && options.sp0
                        && options.sp1
                        && options.sp2)
                    {
                        const sp = getTransformFromPoints(
                            options.sp0, 
                            options.sp1, 
                            options.sp2);

                        xform = mulm3m3(xform, sp);

                        obj.sp1 = addv(obj.sp0, point(1, 0));
                        obj.sp2 = addv(obj.sp0, point(0, 1));
                    }


                    obj.applyTransform(xform, true);
                }
            }


            if (options.showCenter.value > 0)
            {
                const objects = [...this.value.objects]; // avoids infinite growth
                objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
            }
        }
        
        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
    
    
    
    isValid()
    {
        return super.isValid()
            && this.position   && this.position  .isValid()
            && this.transform  && this.transform .isValid()
            && this.showCenter && this.showCenter.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.position  ) this.position  .pushValueUpdates(parse);
        if (this.transform ) this.transform .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position  ) this.position  .invalidateInputs(parse, from, force);
        if (this.transform ) this.transform .invalidateInputs(parse, from, force);
        if (this.showCenter) this.showCenter.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.position  ) this.position  .iterateLoop(parse);
        if (this.transform ) this.transform .iterateLoop(parse);
        if (this.showCenter) this.showCenter.iterateLoop(parse);
    }
}



function getTransformFromPoints(p0, p1, p2) 
{
    const dx   = p1.x - p0.x;
    const dy   = p1.y - p0.y;

    const a    = Math.atan2(dy, dx);
  
    const cosa = Math.cos(a);
    const sina = Math.sin(a);


    const sx   = ((p1.y - p0.y) / nozero(p1.x - p0.x));
    const sy   = ((p2.x - p0.x) / nozero(p2.y - p0.y));

    // TODO add skew 

    return [[ cosa,         -sina /** sy*/, 0 ], 
            [ sina /** sx*/, cosa,          0 ], 
            [ 0,             0,             1 ]];
}