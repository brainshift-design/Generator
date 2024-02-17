class GClosestPointOnPath
extends GOperator2
{
    constrain  = null;
    transform  = null;
    showCenter = null;
    
    
    
    constructor(nodeId, options)
    {
        super(CLOSEST_POINT_ON_PATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.constrain  = null;
        this.transform  = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GClosestPointOnPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.constrain ) copy.constrain  = this.constrain .copy();
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

        const constrain  = this.constrain  ? (await this.constrain .eval(parse)).toValue() : null;
        const transform  = this.transform  ? (await this.transform .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        let tangent = point_NaN;


        if (   input0
            && input1
            && input0.objects.length > 0
            && input1.objects.length > 0)
        {
            const degree = Math.min(input0.degree.value, 2) + 1;

            const points = createCompleteCurve(
                degree, 
                input0.objects[0].pathPoints, 
                input0.closed.value > 0);

            let closest;
            [closest, tangent] = closestTangentOnCurve(
                degree, 
                points, 
                input1.objects[0].toPoint(),
                constrain.value);
                
            this.value = PointValue.fromPoint(this.nodeId, closest);
        }
        else
            this.value = PointValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['constrain',  constrain ],
            ['transform',  transform ],
            ['showCenter', showCenter]
        ]);
        

        await this.evalObjects(parse,
        {
            transform:  transform,
            showCenter: showCenter,
            tangent:    tangent
        });


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
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


            if (   options.transform.value > 0
                && options.tangent)
            {
                const a     = -anglev(options.tangent);
                const xform =  createRotateTransform(a);

                point.applyTransform(xform, options.transform.value > 0);
            }
            
            
            this.value.objects = [point];


            if (options.showCenter.value > 0)
            {
                const objects = [...this.value.objects]; // avoids infinite growth
                objects.forEach(o => addObjectCenter(this, o, parse.viewportZoom));
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