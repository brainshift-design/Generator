class GVector
extends GOperator2
{
    transform  = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(VECTOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();
        
        this.transform  = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GVector(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.transform ) copy.transform  = this.transform .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0     = this.input0     ? (await this.input0    .eval(parse)).toValue() : null;
        const input1     = this.input1     ? (await this.input1    .eval(parse)).toValue() : null;
        const transform  = this.transform  ? (await this.transform .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (   input0
            && input1)
        {
            this.value = PointValue.fromPoint(
                this.nodeId,
                subv(input1.toPoint(), input0.toPoint()));

            await this.evalObjects(
                parse, 
                {
                    transform:  transform,
                    showCenter: showCenter
                });
        }
        else
        {
            this.value = PointValue.NaN.copy();
        }


        this.setUpdateValues(parse,
        [
            ['transform',  transform ],
            ['showCenter', showCenter]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        // if (!this.options.enabled)
        //     return;
            
            
        if (!this.value.objects)
            this.value.objects = [];


        if (   this.value.x
            && this.value.y   
            && this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x,
                y,
                this.smooth ? this.smooth.value/100 : 1);


            point.createDefaultTransform(x, y);

            
            if (options.transform.value > 0)
            {
                point.applyTransform(
                    getTransformFromAngle(anglev(point.toPoint())),
                    true);
            }
    
    
            this.value.objects = [point];


            if (lengthv_(x, y) > 0)
            {
                if (options.showCenter.value > 0)
                {
                    const objects = [...this.value.objects]; // avoids infinite growth
                    objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
                }
            }
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.transform  && this.transform .isValid()
            && this.showCenter && this.showCenter.isValid();
}



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.transform ) this.transform .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.transform ) this.transform .invalidateInputs(parse, from, force);
        if (this.showCenter) this.showCenter.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.transform ) this.transform .iterateLoop(parse);
        if (this.showCenter) this.showCenter.iterateLoop(parse);
    }
}



function getTransformFromAngle(a) 
{
    const cosa = Math.cos(a);
    const sina = Math.sin(a);

    return [[ cosa, -sina, 0 ], 
            [ sina,  cosa, 0 ], 
            [ 0,     0,    1 ]];
}