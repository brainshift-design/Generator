class GReorientPaths
extends GShape
{
    inputs  = [];



    constructor(nodeId, options)
    {
        super(JOIN_PATHS, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];
    }



    copy()
    {
        const copy = new GReorientPaths(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.inputs.length > 0)
        {
            // const paths  = [];
            // const points = new ListValue();

            // for (const _input of this.inputs)
            // {
            //     const input = await evalVectorPathValue(_input, parse);

            //     if (isListValueType(input.type)) paths.push(...input.items);
            //     else                             paths.push(input);
            // }


            // // convert each path to cubic and 
            // // add the points to the list of points

            // for (let i = 0; i < paths.length; i++)
            // {
            //     const path = paths[i];
                
            //     if (   !path
            //         || !path.objects
            //         ||  path.objects.length == 0)
            //         continue;


            //     let _degree;

            //          if (path.type == VECTOR_PATH_VALUE) _degree = path.degree.value;
            //     else if (path.type == ARC_PATH_VALUE   ) _degree = 2;
            //     else if (path.type == WAVE_PATH_VALUE  ) _degree = path.shape.value == 4 ? 2 : 0;


            //     const pathPoints = path.objects[0].pathPoints;
            //     const pathDegree = Math.min(_degree, 2) + 1;

                
            //     if (pathPoints.length == 0) continue;


            //     const segment = this.makeCubic(pathPoints, pathDegree);

            //     if (   i > 0
            //         && points.items.length > 1
            //         && segment.length > 1)
            //         this.joinSegment(points, segment, degree);

            //     points.items.push(...segment.map(p => PointValue.fromPoint(this.nodeId, p)));
            // }


            // if (   closed.value > 0
            //     && points.items.length > 1)
            // {
            //     const segment = [ points.items[0].toPoint(),
            //                       points.items[1].toPoint() ];

            //     this.joinSegment(points, segment, degree);

            //     points.items.push(points.items[0].copy());
            // }


            // this.value = new VectorPathValue(
            //     this.nodeId, 
            //     points, 
            //     closed, 
            //     new NumberValue(2),
            //     winding, 
            //     round);
            this.value = new ListValue();
        }
        else
        {
            this.value = new ListValue();
        }


        this.setUpdateValues(parse, 
        [
            ['', new NullValue]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        // const points = [];

        // for (const pt of this.value.points.items)
        // {
        //     const p = PointValue.create(this.nodeId, pt.x.value, pt.y.value);
            
        //     if (pt.smooth != null)
        //         p.smooth = new NumberValue(pt.smooth);

        //     points.push(p);
        // }


        this.value.objects = [];


        // if (   super.baseIsValid()   
        //     && points.length >= 2)
        // {
        //     const path = new FigmaVectorPath(
        //         this.nodeId,
        //         this.nodeId,
        //         this.nodeName,
        //         points,
        //         this.value.closed .value,
        //         this.value.degree .value,
        //         this.value.winding.value,
        //         this.value.round  .value);

                
        //     const bounds = getObjBounds([path]);

        //     let x = bounds.x;
        //     let y = bounds.y;
        //     let w = bounds.w;
        //     let h = bounds.h;

            
        //     path.createDefaultSpace(x + w/2, y + h/2);
        //     path.createDefaultTransform(x, y);
        //     path.createDefaultTransformPoints(x, y, w, h);

        //     this.value.objects.push(path);
        // }


        await super.evalObjects(parse);
    }



    isValid()
    {
        if (!super.isValid()) 
            return false;

        for (const input of this.inputs)
            if (!input.isValid())
                return false;

        return true;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}