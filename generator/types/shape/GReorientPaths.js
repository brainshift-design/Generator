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

                if (isListValueType(input.type)) paths.push(...input.items);
                else                             paths.push(input);
            }


            const reorientedPaths = reorientPaths(paths, reverse.value > 0);

            
            this.value = new ListValue();

            
            consoleAssert(paths.length == reorientedPaths.length, 'original path count must match reoriented path count')
            
            for (let i = 0; i < reorientedPaths.length; i++)
            {
                const points = 
                    this.options.enabled
                    ? reorientedPaths[i].map(p => PointValue.fromPoint(this.nodeId, p))
                    : paths[i].points.items;

                const path = new VectorPathValue(
                    this.nodeId,
                    new ListValue(points),
                    paths[i].closed,
                    paths[i].degree,
                    paths[i].winding,
                    paths[i].round);

                path.copyBase(paths[i]);

                this.value.items.push(path);
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
        this.value.objects = [];


        for (let i = 0; i < this.value.items.length; i++)
        {
            const _path = this.value.items[i];

            if (   _path.points.items.length >= 2
                && _path.closed .isValid()
                && _path.degree .isValid()
                && _path.winding.isValid()
                && _path.round  .isValid())
            {
                const path = new FigmaVectorPath(
                     this.nodeId,
                     this.nodeId + OBJECT_SEPARATOR + i,
                     this.nodeName,
                    _path.points.items,
                    _path.closed .value,
                    _path.degree .value,
                    _path.winding.value,
                    _path.round  .value);


                if (_path.props)
                    addProps(path, _path.props);

                    
                _path.objects = [path];

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
    const orderedPaths = [];

    let remainingPaths = paths
        .filter(path => path.objects && path.objects.length > 0)
        .map   (path => path.objects[0].pathPoints);


    orderedPaths.push(remainingPaths.shift());


    while (remainingPaths.length > 0) 
    {
        const currentPath = orderedPaths.at(-1);
        
        const { closestPathIndex, shouldReverse } = findNextPath(currentPath, remainingPaths);

        if (closestPathIndex == -1) 
            break; // no more close curves found

        let nextPath = remainingPaths.splice(closestPathIndex, 1)[0];
        
        if (shouldReverse)
            nextPath.reverse();

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