class GJoinPaths
extends GShape
{
    inputs  = [];

    closed  = null;
    degree  = null;
    winding = null;
    round   = null;



    constructor(nodeId, options)
    {
        super(JOIN_PATHS, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];

        this.closed  = null;
        this.degree  = null;
        this.winding = null;
        this.round   = null;
    }



    copy()
    {
        const copy = new GJoinPaths(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.closed ) copy.closed  = this.closed .copy();
        if (this.degree ) copy.degree  = this.degree .copy();
        if (this.winding) copy.winding = this.winding.copy();
        if (this.round  ) copy.round   = this.round  .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'closed':  return this.input ? this.value.closed  : this.closed;
            case 'degree':  return this.input ? this.value.degree  : this.degree;
            case 'winding': return this.input ? this.value.winding : this.winding;
            case 'round':   return this.input ? this.value.round   : this.round;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const closed  = await evalNumberValue(this.closed,  parse);
        const degree  = await evalNumberValue(this.degree,  parse);
        const winding = await evalNumberValue(this.winding, parse);
        const round   = await evalNumberValue(this.round,   parse);


        if (this.inputs.length > 0)
        {
            const paths  = [];
            const points = new ListValue();

            for (const _input of this.inputs)
            {
                const input = await evalVectorPathValue(_input, parse);

                if (isListValueType(input.type)) paths.push(...input.items);
                else                             paths.push(input);
            }


            // convert each path to cubic and 
            // add the points to the list of points

            for (let i = 0; i < paths.length; i++)
            {
                const path = paths[i];
                
                if (   !path
                    || !path.objects
                    ||  path.objects.length == 0)
                    continue;


                let _degree;

                     if (path.type == VECTOR_PATH_VALUE) _degree = path.degree.value;
                else if (path.type == ARC_PATH_VALUE   ) _degree = 2;
                else if (path.type == WAVE_PATH_VALUE  ) _degree = path.shape.value == 4 ? 2 : 0;


                const pathPoints = path.objects[0].pathPoints;
                const pathDegree = Math.min(_degree, 2) + 1;

                
                if (pathPoints.length == 0) continue;


                const segment = this.makeCubic(pathPoints, pathDegree);

                if (   i > 0
                    && points.items.length > 1
                    && segment.length > 1)
                    this.joinSegment(points, segment, degree);

                points.items.push(...segment.map(p => PointValue.fromPoint(this.nodeId, p)));
            }


            if (   closed.value > 0
                && points.items.length > 1)
            {
                const segment = [ points.items[0].toPoint(),
                                  points.items[1].toPoint() ];

                this.joinSegment(points, segment, degree);

                points.items.push(points.items[0].copy());
            }


            this.value = new VectorPathValue(
                this.nodeId, 
                points, 
                closed, 
                new NumberValue(2),
                winding, 
                round);


            this.value.points.objects = this.value.points.items.map(p =>
            {
                return new FigmaPoint(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    p.x.value,
                    p.y.value,
                    p.smooth ? p.smooth.value/100 : 1);
            });
        }
        else
        {
            this.value = new VectorPathValue(
                this.nodeId, 
                new ListValue(), 
                closed, 
                new NumberValue(2),
                winding, 
                round);
        }


        this.setUpdateValues(parse, 
        [
            ['closed',  closed ],
            ['degree',  degree ],
            ['winding', winding],
            ['round',   round  ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    joinSegment(points, segment, degree)
    {
        const p_2 = points.items.at(-2).toPoint();
        const p_1 = points.items.at(-1).toPoint();

        const p0  = segment[0];
        const p1  = segment[1];

        if (!equalv(p_1, p0))
            points.items.push(...this.getJoinPoints(p_2, p_1, p0, p1, degree).map(p => PointValue.fromPoint(this.nodeId, p)));
        else
            points.items.pop();
    }



    getJoinPoints(p_2, p_1, p0, p1, degree)
    {
        const points = [];


        switch (degree.value)
        { 
            case 0: // linear
                points.push(lerpv(p_1, p0, 1/3));
                points.push(lerpv(p_1, p0, 2/3));
                break;

            case 1: // cubic
            {
                const c = intersectLines(p_2, p_1, p1, p0, false);
                points.push(addv(p_1, mulvs(unitv(subv(c, p_1)), Math.min(distv(p_2, p_1), distv(p_1, c) * 2/3))));
                points.push(addv(p0,  mulvs(unitv(subv(c, p0 )), Math.min(distv(p1,  p0),  distv(p0,  c) * 2/3))));
                break;
            }
            case 2: // smooth
                points.push(addv(p_2, mulvs(subv(p_1, p_2), 2)));
                points.push(addv(p1,  mulvs(subv(p0,  p1),  2)));
                break;

            case 3: // sin X
                points.push(point(lerp(p_1.x, p0.x, 0.3615), p_1.y));
                points.push(point(lerp(p0.x, p_1.x, 0.3615), p0 .y));
                break;

            case 4: // sin Y
                points.push(point(p_1.x, lerp(p_1.y, p0.y, 0.3615)));
                points.push(point(p0 .x, lerp(p0.y, p_1.y, 0.3615)));
                break;
        }

        
        return points;
    }



    makeCubic(pathPoints, pathDegree)
    {
        const points = [pathPoints[0]];


        for (let i = 0; i < pathPoints.length-pathDegree; i += pathDegree)
        {
            let segPoints;

            switch (pathDegree)
            {
                case 1: segPoints = linear2cubic(pathPoints.slice(i, i+2)); break;
                case 2: segPoints =   quad2cubic(pathPoints.slice(i, i+3)); break;
                case 3: segPoints =              pathPoints.slice(i, i+4);  break;
            }

            points.push(...segPoints.slice(1)); 
        }

       
        return points;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        const points = [];

        for (const pt of this.value.points.items)
        {
            const p = PointValue.create(this.nodeId, pt.x.value, pt.y.value);
            
            if (pt.smooth != null)
                p.smooth = new NumberValue(pt.smooth);

            points.push(p);
        }


        this.value.objects = [];


        if (   super.baseIsValid()   
            && points.length >= 2
            && this.value.closed .isValid()
            && this.value.degree .isValid()
            && this.value.winding.isValid()
            && this.value.round  .isValid())
        {
            const path = new FigmaVectorPath(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                points,
                this.value.closed .value,
                this.value.degree .value,
                this.value.winding.value,
                this.value.round  .value);

                
            const bounds = getObjBounds([path]);

            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;

            
            path.createDefaultSpace(x + w/2, y + h/2);
            path.createDefaultTransform(x, y);
            path.createDefaultTransformPoints(x, y, w, h);

            this.value.objects.push(path);
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        if (!super.isValid()) 
            return false;

        for (const input of this.inputs)
            if (!input.isValid())
                return false;

        return this.closed  && this.closed .isValid()
            && this.degree  && this.degree .isValid()
            && this.winding && this.winding.isValid()
            && this.round   && this.round  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.closed ) this.closed .pushValueUpdates(parse);
        if (this.degree ) this.degree .pushValueUpdates(parse);
        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.round  ) this.round  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.closed ) this.closed .invalidateInputs(parse, from, force);
        if (this.degree ) this.degree .invalidateInputs(parse, from, force);
        if (this.winding) this.winding.invalidateInputs(parse, from, force);
        if (this.round  ) this.round  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.closed ) this.closed .iterateLoop(parse);
        if (this.degree ) this.degree .iterateLoop(parse);
        if (this.winding) this.winding.iterateLoop(parse);
        if (this.round  ) this.round  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const join = new GJoinPaths(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(join, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, join);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        for (let i = 0; i < nInputs; i++)
            join.inputs.push(genParse(parse));
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {       
            case 'closed':  join.closed  = genParse(parse); break;
            case 'degree':  join.degree  = genParse(parse); break;
            case 'winding': join.winding = genParse(parse); break;
            case 'round':   join.round   = genParse(parse); break;
            case 'props':   join.props   = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, join);
        return join;
    }
}