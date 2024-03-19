class GVectorRegion
extends GShape
{
    inputs  = [];

    loops   = null;
    winding = null;



    constructor(nodeId, options)
    {
        super(VECTOR_REGION, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];

        this.loops   = null;
        this.winding = null;
    }



    copy()
    {
        const copy = new GVectorRegion(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.winding) copy.winding = this.winding.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'loops':   return this.input ? this.value.loops   : this.loops;
            case 'winding': return this.input ? this.value.winding : this.winding;
        }

        return super.paramFromId(paramId);
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached()
            && this.winding.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const winding = await evalNumberValue(this.winding, parse);


        this.loops = new ListValue();


        const loop = new ListValue();

        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = await evalVectorEdgeValue(this.inputs[i], parse);

            if (isListValueType(input.type))
            {
                const _loop = new ListValue();

                for (let j = 0; j < input.items.length; j++)
                {
                    const item = input.items[j];

                    if (item.type == VECTOR_EDGE_VALUE)
                    {
                        const edge = item.copy();

                        if (_loop.items.length > 0)
                        {
                            const prevEdge = _loop.items.at(-1);

                            if (   edge.end.x.equals(prevEdge.end.x)
                                && edge.end.y.equals(prevEdge.end.y))
                            {
                                [edge.start,        edge.end       ] = [edge.end,        edge.start       ];
                                [edge.startTangent, edge.endTangent] = [edge.endTangent, edge.startTangent];
                            }
                        }

                        _loop.items.push(edge);
                    }
                }

                if (!isEmpty(_loop.items))
                    loops.items.push(_loop);
            }
            else
            {
                consoleAssert(
                     input.type == VECTOR_EDGE_VALUE, 
                    'input.type must be VECTOR_EDGE_VALUE');

                const edge = input.copy();

                if (loop.items.length > 0)
                {
                    const prevEdge = loop.items.at(-1);

                    if (   edge.end.x.equals(prevEdge.end.x)
                        && edge.end.y.equals(prevEdge.end.y))
                    {
                        [edge.start,        edge.end       ] = [edge.end,        edge.start       ];
                        [edge.startTangent, edge.endTangent] = [edge.endTangent, edge.startTangent];
                    }
                }

                loop.items.push(edge);
            }
        }


        if (!isEmpty(loop.items))
            this.loops.items.push(loop);


        this.value = new VectorRegionValue(
            this.nodeId,
            this.loops, 
            winding);


        this.value.uniqueId = this.uniqueId;


        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['winding', winding   ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   !this.options.enabled
            || !this.value.isValid())
            return;
            
            
        this.value.objects = [];

        
        if (   this.loops  .isValid()
            && this.winding.isValid())
        {
            const regions = [];


            for (let i = 0; i < this.loops.items.length; i++)
            {
                const loop = this.loops.items[i];


                const points = [];
    
                for (let j = 0; j < loop.items.length; j++)
                {
                    const edge = loop.items[j];
                    const next = loop.items[j == loop.items.length-1 ? 0 : j+1];

                    points.push(
                           edge.start.uniqueId == next.start.uniqueId
                        || edge.start.uniqueId == next.end  .uniqueId
                        ? edge.end  
                        : edge.start);
                }


                regions.push(new FigmaVectorPath(
                    this.nodeId,
                    this.nodeId + '/' + i,
                    this.nodeName,
                    points,
                    1,
                    0, // linear
                    this.winding.value,
                    0));
            }
            

            let bounds = getObjBounds(regions);

            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;


            for (const region of regions)
            {
                region.createDefaultTransform(x, y);
                region.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(region);
            }
        }


        await super.evalObjects(parse);
    }



    // toValue()
    // {
    //     const region = new VectorRegionValue(
    //         this.nodeId,
    //         this.loops  .toValue(),
    //         this.winding.toValue(),
    //         this.props  .toValue());

    //     region.copyCustomParams(this.value);

    //     region.uniqueId = this.value.uniqueId;
    //     region.objects  = this.value.objects.map(o => o.copy());

    //     return region;
    // }



    isValid()
    {
        if (!super.isValid())
            return false;
            
        for (const input of this.inputs)
            if (!input.isCached())
                return false;
        
        return this.winding.isValid()
            && this.props  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.props  ) this.props  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));

        if (this.winding) this.winding.invalidateInputs(parse, from, force);
        if (this.props  ) this.props  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.winding) this.winding.iterateLoop(parse);
        if (this.props  ) this.props  .iterateLoop(parse);
    }
}