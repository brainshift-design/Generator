class GPointAlongPath
extends GOperator1
{
    position  = null;
    distance  = null;
    offset    = null;
    transform = null;
    
    
    
    constructor(nodeId, options)
    {
        super(POINT_ALONG_PATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.position  = null;
        this.distance  = null;
        this.offset    = null;
        this.transform = null;
    }



    copy()
    {
        const copy = new GPointAlongPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position ) copy.position  = this.position .copy();
        if (this.distance ) copy.distance  = this.distance .copy();
        if (this.offset   ) copy.offset    = this.offset   .copy();
        if (this.transform) copy.transform = this.transform.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = await evalVectorPathValue(this.input,     parse);
        const position  = await evalNumberValue    (this.position,  parse);
        const distance  = await evalNumberValue    (this.distance,  parse);
        const offset    = await evalNumberValue    (this.offset,    parse);
        const transform = await evalNumberValue    (this.transform, parse);


        let pt;
        let tangent = point_NaN;


        if (   input
            && input.objects.length > 0)
        {
            const degree = Math.min(input.degree.value, 2) + 1;

            const points = createCompleteCurve(
                degree, 
                input.objects[0].pathPoints, 
                input.closed.value > 0);


            let length = curveLength(degree, points);

            
            const dist = 
                position.value > 0 
                ? distance.value                                         // absolute
                : Math.min(Math.max(0, distance.value/100), 1) * length; // relative


            if (   dist >= 0 
                && dist <= length
                && points.length >= degree-1)
            {
                pt      =   pointAlongCurve(degree, points, dist);
                tangent = tangentAlongCurve(degree, points, dist);

                this.value = PointValue.fromPoint(this.nodeId, pt);
            }
            else
                this.value = PointValue.NaN.copy();
        }
        else
            this.value = PointValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['position',  position ],
            ['distance',  distance ],
            ['offset',    offset   ],
            ['transform', transform]
        ]);
        

        await this.evalObjects(parse,
        {
            transform:  transform,
            tangent:    tangent,
            offset:     offset.value
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
                let   xform = createTransform();

                xform = mulm3m3(xform, createRotateTransform(a));

                if (options.offset)
                    xform = mulm3m3(xform, createTransform(0, options.offset));

                point.applyTransform(xform, options.transform.value > 0);
            }


            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.position  && this.position .isValid()
            && this.distance  && this.distance .isValid()
            && this.offset    && this.offset   .isValid()
            && this.transform && this.transform.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.position ) this.position .pushValueUpdates(parse);
        if (this.distance ) this.distance .pushValueUpdates(parse);
        if (this.offset   ) this.offset   .pushValueUpdates(parse);
        if (this.transform) this.transform.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position ) this.position .invalidateInputs(parse, from, force);
        if (this.distance ) this.distance .invalidateInputs(parse, from, force);
        if (this.offset   ) this.offset   .invalidateInputs(parse, from, force);
        if (this.transform) this.transform.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.position ) this.position .iterateLoop(parse);
        if (this.distance ) this.distance .iterateLoop(parse);
        if (this.offset   ) this.offset   .iterateLoop(parse);
        if (this.transform) this.transform.iterateLoop(parse);
    }
}