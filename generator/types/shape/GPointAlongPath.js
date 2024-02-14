class GPointAlongPath
extends GOperator1
{
    position   = null;
    distance   = null;
    transform  = null;
    showCenter = null;
    
    
    
    constructor(nodeId, options)
    {
        super(POINT_ALONG_PATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.position   = null;
        this.distance   = null;
        this.transform  = null;
        this.showCenter = null;
    }



    copy()
    {
        const copy = new GPointAlongPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position  ) copy.position   = this.position  .copy();
        if (this.distance  ) copy.distance   = this.distance  .copy();
        if (this.transform ) copy.transform  = this.transform .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input      = this.input      ? (await this.input     .eval(parse)).toValue() : null;

        const position   = this.position   ? (await this.position  .eval(parse)).toValue() : null;
        const distance   = this.distance   ? (await this.distance  .eval(parse)).toValue() : null;
        const transform  = this.transform  ? (await this.transform .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        let tangent = point_NaN;


        if (   input
            && input.objects.length > 0)
        {
            const degree     = Math.min(input.degree.value, 2) + 1;
            const pathPoints = input.objects[0].pathPoints;

            const points = pathPoints.slice(0, Math.floor((pathPoints.length-1) / degree) * degree + 1);
            const length = curveLength(degree, points);

            const dist = 
                position.value > 0 
                ? distance.value               // absolute
                : distance.value/100 * length; // relative


            if (   dist >= 0 
                && dist <= length)
            {
                const t = positionOnCurve(degree, points, dist);

                this.value = PointValue.fromPoint(
                    this.nodeId, 
                    pointOnCurve(degree, points, t));

                tangent = tangentOnCurve(degree, points, t);
            }
            else
                this.value = PointValue.NaN.copy();
        }
        else
            this.value = PointValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['position',   position  ],
            ['distance',   distance  ],
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
            && this.position   && this.position  .isValid()
            && this.distance   && this.distance  .isValid()
            && this.transform  && this.transform .isValid()
            && this.showCenter && this.showCenter.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.position  ) this.position  .pushValueUpdates(parse);
        if (this.distance  ) this.distance  .pushValueUpdates(parse);
        if (this.transform ) this.transform .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position  ) this.position  .invalidateInputs(parse, from, force);
        if (this.distance  ) this.distance  .invalidateInputs(parse, from, force);
        if (this.transform ) this.transform .invalidateInputs(parse, from, force);
        if (this.showCenter) this.showCenter.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.position  ) this.position  .iterateLoop(parse);
        if (this.distance  ) this.distance  .iterateLoop(parse);
        if (this.transform ) this.transform .iterateLoop(parse);
        if (this.showCenter) this.showCenter.iterateLoop(parse);
    }
}