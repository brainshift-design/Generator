class GReorientPaths
extends GShape
{
    inputs  = [];

    reverse = null;



    constructor(nodeId, options)
    {
        super(JOIN_PATHS, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs  = [];

        this.reverse = null;
    }



    copy()
    {
        const copy = new GReorientPaths(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.reverse) copy.reverse = this.reverse.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const reverse = await evalNumberValue(this.reverse, parse);


        if (this.inputs.length > 0)
        {
            const paths = [];
        
            for (const _input of this.inputs)
            {
                const input = await evalVectorPathValue(_input, parse);
    
                if (isListValueType(input.type))
                {
                    for (const item of input.items)
                    {
                        if (!PATH_VALUES.includes(item.type))
                            continue;

                        const path = await evalVectorPathValue(item, parse);
                        paths.push(path);
                    }
                }
                else
                {
                    const path = await evalNumberValue(input, parse);
                    paths.push(path);
                }
            }


            const reorientedPaths = reorientPaths(paths, reverse.value > 0);

            this.value = new ListValue();

            for (let i = 0; i < paths.length; i++)
            {
                this.value.items.push(new VectorPathValue(
                    this.nodeId,
                    new ListValue(reorientedPaths[i].map(p => PointValue.fromPoint(this.nodeId, p))),
                    paths[i].closed,
                    paths[i].degree,
                    paths[i].winding,
                    paths[i].round));
            }
        }
        else
        {
            this.value = new ListValue();
        }


        this.setUpdateValues(parse, 
        [
            ['reverse', reverse]
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
            

        this.value.objects = [];


        for (const _path of this.value.items)
        {
            const points = [];

            if (_path.points.objects)
            {
                const objPoints = _path.points.objects.filter(o => o.type == POINT);

                for (const pt of objPoints)
                {
                    const p = PointValue.create(this.nodeId, pt.x, pt.y);
                    
                    if (pt.smooth != null)
                        p.smooth = new NumberValue(pt.smooth);

                    points.push(p);
                }
            }


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

                this.value.objects.push(path);
            }
        }


        const bounds = getObjBounds(this.value.objects);

        for (const path of this.value.objects)
        {
            path.createDefaultSpace(
                bounds.x + bounds.width /2,            
                bounds.y + bounds.height/2            
            );


            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;
            
            path.createDefaultTransform(x, y);
            path.createDefaultTransformPoints(x, y, w, h);
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

        return this.reverse && this.reverse.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.reverse) this.reverse.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    
        if (this.reverse) this.reverse.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.reverse) this.reverse.iterateLoop(parse);
    }
}



function reorientPaths(paths, reverse) 
{
    const orderedPaths   = [];
    let   remainingPaths = paths.map(c => c.toPointArray());//slice();


    // start with the first curve (could enhance by choosing a smarter start)
    
    orderedPaths.push(remainingPaths.shift());


    // iterate until all curves are reoriented and ordered
    
    while (remainingPaths.length > 0) 
    {
        const currentPath = orderedPaths.at(-1);
        
        const { closestPathIndex, shouldReverse } = findNextPath(currentPath, remainingPaths);

        if (closestPathIndex === -1) 
            break; // no more close curves found

        let nextPath = remainingPaths.splice(closestPathIndex, 1)[0];
        
        if (shouldReverse)
            nextPath = nextPath.slice().reverse();

        orderedPaths.push(nextPath);
    }


    return reverse
         ? orderedPaths.reverse().map(path => path.slice().reverse())
         : orderedPaths;
}



function findNextPath(currentPath, remainingPaths)
{
    let minDistance      = Infinity;
    let closestPathIndex = -1;
    let shouldReverse    = false;

    const currentEndPoint = currentPath.at(-1);

    remainingPaths.forEach((path, index) => 
    {
        const distanceToStart = distv(currentEndPoint, path.at( 0));
        const distanceToEnd   = distv(currentEndPoint, path.at(-1));

        if (distanceToStart < minDistance) 
        {
            minDistance      = distanceToStart;
            closestPathIndex = index;
            shouldReverse    = false;
        }

        if (distanceToEnd < minDistance) 
        {
            minDistance      = distanceToEnd;
            closestPathIndex = index;
            shouldReverse    = true;
        }
    });

    return { closestPathIndex, shouldReverse };
}